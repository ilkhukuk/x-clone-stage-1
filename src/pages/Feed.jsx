import Nav from "./../components/Nav";
import Main from "./../components/Main";
import Aside from "./../components/Aside";
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import {auth} from "../firebase/config";

const Feed = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    // firebase'den aktif kullanıcn verisini aldık
    // state'e aktardık
    onAuthStateChanged(auth, (res) => {
      setUser(res);
    });
  }, []);

  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
