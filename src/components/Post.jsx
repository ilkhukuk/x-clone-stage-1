import moment from "moment/moment";
import {BsThreeDots} from "react-icons/bs";
import "moment/locale/tr";
import {auth, db} from "../firebase/config";
import {AiOutlineHeart} from "react-icons/ai";
import {BiMessageRounded} from "react-icons/bi";
import {FaRetweet} from "react-icons/fa";
import {FiShare2} from "react-icons/fi";
import {FcLike} from "react-icons/fc";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {useEffect, useState} from "react";
import Dropdown from "./Dropdown";

const Post = ({tweet}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // kaç gün önce atıldığını hesaplama
  const date = moment(tweet.createdAt?.toDate()).fromNow();

  // kullanının tweet'i beğeniğ beğebnemediğini belirleme
  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);

    setIsLiked(found);
  }, [tweet]);

  // tweet'i siler
  const handleDelete = async () => {
    if (confirm("Tweet'i silmeyi onaylıyor musunuz?")) {
      // silmek istediğimiz belgenin referansını alma
      const docRef = doc(db, "tweets", tweet.id);
      // dökümanı silme
      await deleteDoc(docRef);
    }
  };

  // like atmaya ve geri çekmeye yarar
  const toggleLike = async () => {
    // dökümanın referansını alma
    const docRef = doc(db, "tweets", tweet.id);

    await updateDoc(docRef, {
      likes: isLiked
        ? // dizden aktif kullanıcının id'sini kaldırma
          arrayRemove(auth.currentUser.uid)
        : // diziye tweet'i like'layan kullanıcnın id'sini ekleme
          arrayUnion(auth.currentUser.uid),
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      isEdited: true,
      textContent: e.target[0].value,
    });

    setIsEditMode(false);
  };

  return (
    <div className="flex gap-3 p-3 border-b-[1] border-gray-600">
      <img
        className="w-14 h-14 rounded-full"
        src={tweet.user.photo}
        alt="user_picture"
      />

      <div className="w-full">
        {/* üst kısım > kullanıcı bilgileri */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">@{tweet.user.name}</p>
            <p className="text-gray-400">{date}</p>
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleDelete={handleDelete}
              handleEdit={() => setIsEditMode(true)}
            />
          )}
        </div>
        {/* orta kısım > tweet içeirği */}
        <div className="my-3">
          {isEditMode ? (
            <form onSubmit={handleSave}>
              <input
                className="text-black"
                type="text"
                defaultValue={tweet.textContent}
              />
              <button type="button" onClick={() => setIsEditMode(false)}>
                red
              </button>
              <button type="submit">kayıt</button>
            </form>
          ) : (
            <p>{tweet?.textContent}</p>
          )}
          {/* eğerki fotoğraf varsa onu ekrnaa bas */}
          {tweet.imageContent && (
            <img
              className="w-full object-contain max-h-[300px] mt-3 rounded-lg"
              src={tweet.imageContent}
            />
          )}
        </div>
        {/* alt kısım > etkileşim butonları */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00a2ff6a] ">
            <BiMessageRounded />
            {/* <span>{Math.round(Math.random() * 900)}</span> */}
          </div>
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#1eff0034] ">
            <FaRetweet />
            {/* <span>{Math.round(Math.random() * 900)}</span> */}
          </div>
          <div
            onClick={toggleLike}
            className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#ff26003e] "
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#4a515c3c] ">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
