import { useNavigate } from 'react-router-dom';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Start.module.scss'
import { useCallback } from 'react';

import bubble from '../../assets/images/start-bubble.png'

const Start = () => {
  const navigate = useNavigate();

  const onStart = useCallback(() => {
    navigate("/test");
  }, [navigate])

  const onSignUp = useCallback(() => {
    navigate("/signup");
  }, [navigate])

  return (
    <>

      <div className={styles.screen}>
        <Logo />
        <div className={styles.bubble_block}>
          <img src={bubble} alt='' className={styles.bubble}/>
        </div>
        <div className={styles.btns}>
          <Button theme={ThemeButton.RED} text='узнать свой секрет' className={styles.btn_first} onClick={onStart} />
          <Button theme={ThemeButton.RED} text='записаться' onClick={onSignUp}/>
        </div>
      </div>
    </>
  )
};

export default Start
