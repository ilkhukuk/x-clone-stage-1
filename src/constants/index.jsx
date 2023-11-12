import {BiHomeCircle} from "react-icons/bi";
import {AiOutlineBell, AiOutlineMail} from "react-icons/ai";
import {CiViewList} from "react-icons/ci";
import {BsBookmark} from "react-icons/bs";
import {AiOutlineCheckCircle} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";
import {PiDotsThreeCircle} from "react-icons/pi";

export const navSections = [
  {
    title: "Anasayfa",
    icon: <BiHomeCircle />,
  },
  {
    title: "Bildirimler",
    icon: <AiOutlineBell />,
  },
  {
    title: "Mesajlar",
    icon: <AiOutlineMail />,
  },
  {
    title: "Listeler",
    icon: <CiViewList />,
  },
  {
    title: "Yer İşaretleri",
    icon: <BsBookmark />,
  },
  {
    title: "Onaylanmış",
    icon: <AiOutlineCheckCircle />,
  },
  {
    title: "Profil",
    icon: <CgProfile />,
  },
  {
    title: "Daha Fazla",
    icon: <PiDotsThreeCircle />,
  },
];
