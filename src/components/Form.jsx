import {BsCardImage} from "react-icons/bs";
import {toast} from "react-toastify";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db, storage} from "./../firebase/config";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {useState} from "react";

const Form = ({user}) => {
  const [isLoading, setIsLoading] = useState(false);

  // kolleksiyonun referansını alma
  const collectionRef = collection(db, "tweets");

  // medyayı storage'a yükler ve url'ini döndürür
  const uploadImage = async (image) => {
    if (!image) {
      return null;
    }
    
    // strage'da dosya için yer ayarlama
    const storageRef = ref(storage, `${image.name}${v4()}`);

    // dosyayı yükleme
    const url = await uploadBytes(storageRef, image)
      // yüklenme bittiğinde url'e erişme
      .then((response) => getDownloadURL(response.ref));

    // fonksiyonun çağrıldığı yere url'i gönderme
    return url;
  };

  // tweet'i atma
  const handleSubmit = async (e) => {
    e.preventDefault();

    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // todo fotoğrafı'n urlini veritanını ekle
    if (!textContent && !imageContent) {
      toast.info("Tweet içeriği ekleyin");
      return;
    }

    setIsLoading(true);

    // medyayı yükleme
    const imageUrl = await uploadImage(imageContent);

    // tweet'i kolleksiyona ekleme
    await addDoc(collectionRef, {
      textContent,
      imageContent: imageUrl,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    setIsLoading(false);

    // formu temizle
    e.target[0].value = "";
    e.target[1].value = null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
      />
      <div className="w-full ">
        <input
          className="w-full bg-transparent my-2 outline-none text-normal  md:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />
        <div className="flex justify-between items-center">
          <label
            htmlFor="picture"
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
          >
            <BsCardImage />

            <input className="hidden" id="picture" type="file" />
          </label>

          <button
            disabled={isLoading}
            className="bg-blue-600 flex items-center px-4 py-2 rounded-full transition hover:bg-blue-800"
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
