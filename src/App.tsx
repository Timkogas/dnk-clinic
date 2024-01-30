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
import { useEffect, useState } from "react";
import bridge from "@vkontakte/vk-bridge";
import Modal from "./components/UI/Modal/Modal";
import Button, { ThemeButton } from "./components/UI/Button/Button";
import { observer } from 'mobx-react-lite';
import mobx from "./store/mobx";

export default observer(() => {
  let navigate: any = useNavigate();
  if (mobx.isODR()) navigate = mobx.setRoute.bind(mobx);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsVisible(true)
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

  const getStateRoute = () => {
    const index = mobx.getRoute().indexOf('/doctors');
    if (index !== -1 && mobx.getRoute().slice(9)) return <Doctor />
    if (mobx.getRoute() === '/test') return <Test />
    if (mobx.getRoute() === '/result') return <Result />
    if (mobx.getRoute() === '/young') return <Young />
    if (mobx.getRoute() === '/document') return <Document />
    if (mobx.getRoute() === '/secret') return <Secret />
    if (mobx.getRoute() === '/doctors') return <Doctors />
    if (mobx.getRoute() === '/signup') return <SignUp />
    if (mobx.getRoute() === '/info') return <Info />
    return <Start />
  }

  const getStateNavbar = () => {
    const routes = ['/secret', '/doctors', '/signup', '/info'];
    const index = mobx.getRoute().indexOf('/doctors');
    if (index !== -1 && mobx.getRoute().slice(9)) routes.push(mobx.getRoute());
    return routes.find(route => route === mobx.getRoute()) && <NavBarLayout />
  }

  return (
    <>
      <Modal onClose={() => { setIsVisible(false) }} isOpen={isVisible}>
        <p style={{ fontFamily: 'CeraRoundPro-Medium', fontSize: '16px', color: '#fff', marginBottom: '20px' }}>
          Потеряно соединение с интернетом!<br />Нажмите 'ок', только после того, как восстановите сеть.
        </p>
        <Button text='ок' theme={ThemeButton.BLUE} onClick={() => { setIsVisible(false) }} />
      </Modal>

      { mobx.isODR() ? 
      <>
        { getStateRoute() }
        { getStateNavbar() }
      </>
      :
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
        <Route path='*' element={<Start />} />

      </Routes>
      }
    </>
  );
})