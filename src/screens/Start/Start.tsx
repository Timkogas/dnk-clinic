import { useNavigate } from 'react-router-dom';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Start.module.scss'
import { useCallback, useEffect } from 'react';

import bubble from '../../assets/images/start-bubble.png'
import { AppDispatch, AppState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { checkUser, getVKUser, pushUser } from '../../store/user/user.slice';
import bridge from '@vkontakte/vk-bridge';
import { setResult } from '../../store/test/test.slice';


const Start = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch()
  const { user, archetype } = useSelector((state: AppState) => state.user, shallowEqual)

  useEffect(()=>{
   dispatch(getVKUser())
   if (user.id) {
    dispatch(checkUser(user.id.toString()))
    bridge.send('VKWebAppAllowNotifications', {}).then((data) => {
      if (data.result) {
        dispatch(pushUser(user.id.toString()))
      }
    })
  }
  }, [dispatch,user.id])

   console.log(archetype, 'arc')
  const onStart = useCallback(() => {
    if (archetype?.name) {
      dispatch(setResult(archetype.name))
      navigate("/result");
    } else {
      navigate("/test");
    }
  }, [navigate, archetype, dispatch])

  const onSignUp = useCallback(() => {
    navigate("/signup");
  }, [navigate])

  return (
    <>

      <div className={styles.screen}>
        <Logo />
        <div className={styles.bubble_block}>
          <img src={bubble} alt='' className={styles.bubble} />
        </div>
        <div className={styles.btns}>
          <Button theme={ThemeButton.RED} text='узнать свой секрет' className={styles.btn_first} onClick={onStart} />
          <Button theme={ThemeButton.RED} text='записаться' onClick={onSignUp} />
        </div>
      </div>
    </>
  )
};

export default Start
