import { useNavigate } from 'react-router-dom';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Start.module.scss'
import { useCallback } from 'react';


const Start = () => {
  const navigate = useNavigate();

  const onStart = useCallback(() => {
    navigate("/test");
  }, [navigate])

  return (
    <div className={styles.screen}>
      <Logo />
      <div className={styles.btns}>
        <Button theme={ThemeButton.RED} text='узнать свой секрет' className={styles.btn_first} onClick={onStart}/>
        <Button theme={ThemeButton.RED} text='записаться' />
      </div>
    </div>
  )
};

export default Start
