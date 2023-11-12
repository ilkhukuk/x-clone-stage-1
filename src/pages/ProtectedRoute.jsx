import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {auth} from "../firebase/config";
import {onAuthStateChanged} from "firebase/auth";

const ProtectedRoute = () => {
  // kullanıcnın yetkisi var mı state'i
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    // aktif oturumdaki değişkliği izler
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  // kullanıcnı yetkisi yoksa logine yönlendir
  if (isAuth === false) return <Navigate to={"/"} replace />;

  //   kulalnıcın yetkisi varsa alt route'u göster
  return <Outlet />;
};

export default ProtectedRoute;
