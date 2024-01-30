import { useNavigate } from 'react-router-dom';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Start.module.scss'
import { useCallback, useEffect } from 'react';

import bubble from '../../assets/images/start-bubble.png'
import { AppDispatch, AppState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { checkUser, getVKUser } from '../../store/user/user.slice';
import mobx from '../../store/mobx';


const Start = () => {
  let navigate: any = useNavigate();
  if (mobx.isODR()) navigate = mobx.setRoute.bind(mobx);

  const dispatch: AppDispatch = useDispatch()
  const { user, archetype } = useSelector((state: AppState) => state.user, shallowEqual)

  useEffect(() => {
    dispatch(getVKUser())
  }, [dispatch])

  useEffect(() => {
    if (user.id) {
      dispatch(checkUser(user))
    }
  }, [dispatch, user])

  const onStart = useCallback(() => {
    if (archetype?.name) {
      navigate("/result");
    } else {
      navigate("/test");
    }
  }, [navigate, archetype])

  const onSignUp = useCallback(() => {
    navigate("/signup");
  }, [navigate])

  const onDocument = useCallback(() => {
    navigate("/document");
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
          <Button theme={ThemeButton.RED} text='записаться' className={styles.btn_second} onClick={onSignUp} />
          <p className={styles.document}>
            Продолжая пользоваться приложением, вы соглашаетесь с обработкой персональных данных и <span onClick={onDocument} className={styles.document_link}>политикой конфиденциальности</span>.
          </p>
        </div>
      </div>
    </>
  )
};

export default Start
