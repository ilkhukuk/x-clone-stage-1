import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import Feed from "./pages/Feed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {/*
         * Feed sayfasını korumalaı belirledik
         * Sadece yetkili kullanıcılar girebilecek
         */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
