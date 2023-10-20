import Start from "./screens/Start/Start";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Test from "./screens/Test/Test";
import Result from "./screens/Result/Result";
import Secret from "./screens/Secret/Secret";
import NavBarLayout from "./components/NavBarLayout/NavBarLayout";
import SignUp from "./screens/SignUp/SignUp";
import Info from "./screens/Info/Info";
import Doctors from "./screens/Doctors/Doctors";
import Doctor from "./screens/Doctor/Doctor";
import Young from "./screens/Young/Young";
import Document from "./screens/Document/Document";
import { useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOffline = () => {
      alert("Потеряно соединение с интернетом!\nНажмите 'ок', только после того как восстановите сеть.");
    };

    const handleOnline = () => {
      navigate("/");
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [navigate])

  useEffect(() => {
    bridge.send("VKWebAppSetViewSettings", {
      status_bar_style: "dark",
      action_bar_color: "#00ffff",
    });
  }, [])

  return (
    <Routes>

      <Route path='/' element={<Start />} />
      <Route path='/test' element={<Test />} />
      <Route path='/result' element={<Result />} />
      <Route path='/young' element={<Young />} />
      <Route path='/document' element={<Document />} />
      <Route element={<NavBarLayout />}>
        <Route path='/secret' element={<Secret />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:id' element={<Doctor />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/info' element={<Info />} />
      </Route>

    </Routes>
  );
}

export default App;
