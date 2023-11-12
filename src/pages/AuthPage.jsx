import {
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {auth, provider} from "./../firebase/config";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [mail, setMail] = useState("");
  const [showErr, setShowErr] = useState(false);

  // hesabı daha önce açıksa
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/feed");
    }
  }, []);

  // formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    setMail(email);
    const pass = e.target[1].value;

    if (signUp) {
      // yeni hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("Hesabınız oluşturuldu");
        })
        .catch((err) => {
          toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
        });
    } else {
      // varolan hesaba griş yap
      signInWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("Hesaba giriş yapıldı ");
        })
        .catch((err) => {
          // şifresi yanlışsa state'i true ya çek
          if (err.code === "auth/invalid-login-credentials") {
            setShowErr(true);
          }
          toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
        });
    }
  };

  // google ile giriş
  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);

      toast.success("Google hesabınız ile giriş yapıldı");
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  // şifre sıfırlama epostası gönderiri
  const handleReset = () => {
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        toast.info(`${mail} > malinize sıfırlama e-posta'sı gönderildi`);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(`Üzgünüz bir hata oluştu: ${errorCode}`);
      });
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32  rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logoo.webp" alt="twitter-logo" />
        </div>

        <h1 className="text-center font-bold text-xl">Twitter'a giriş yap</h1>

        {/* google button */}
        <div
          onClick={handleGoogle}
          className="flex items-center bg-white py-2 px-10  rounded-full cursor-pointer gap-3 text-black hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logoo.svg" alt="google-logo" />
          <span className="whitespace-nowrap">Google ile Giriş Yap</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            required
          />

          <label className="mt-5">Şifre</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
            required
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {signUp ? "Kaydol " : "Giriş Yap"}
          </button>

          <p className="mt-5 flex gap-4">
            <span className="text-gray-500">
              {signUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
            </span>

            <span
              onClick={() => setSignUp(!signUp)}
              className="cursor-pointer text-blue-500"
            >
              {signUp ? "Giriş Yap" : "Kaydol"}
            </span>
          </p>
        </form>

        {/* şifreden kayanlklı hata varsa gösteririrz */}
        {showErr && (
          <p
            onClick={handleReset}
            className="text-red-400 cursor-pointer text-center"
          >
            Şifrenizi mi unuttunuz?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
