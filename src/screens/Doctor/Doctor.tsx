import Logo from '../../components/UI/Logo/Logo';
import styles from './Doctor.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import doctorImg from '../../assets/images/doctors/1.png'
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';

import { useCallback } from 'react'


const Doctor = () => {
  const navigate = useNavigate();

  const onSignUp = useCallback(() => {
    navigate("/signup");
  }, [navigate])

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <Bubble className={styles.info_bubble}>
            <div className={styles.first_block}>
              <Bubble className={styles.bubble_img_wrapper}>
                <img src={doctorImg} alt='doctor' className={styles.bubble_img} />
              </Bubble>
              <div className={styles.name_block}>
                <TextBorder text='Терапевт' center theme={ThemeTextBorder.RED} className={styles.title} outlineClass={styles.title_outline} />
                <p className={styles.name}>Иванова Ивана Ивановна</p>
              </div>
            </div>

            <div className={styles.second_block}>
              <p>
                Богатый внутренний мир и врожденный интеллект интуитивно управляют организмом и не дают ему пуститься во все тяжкие. Спорт появляется в жизни тогда, когда организм сам приводит тебя в спортзал. При этом стремление к интеллектуальному развитию часто заставляет тебя вести малоподвижный образ жизни.

                <br />
                <br />

                Богатый внутренний мир и врожденный интеллект интуитивно управляют организмом и не дают ему пуститься во все тяжкие. Спорт появляется в жизни тогда, когда организм сам приводит тебя в спортзал. При этом стремление к интеллектуальному развитию часто заставляет тебя вести малоподвижный образ жизни.
              </p>

              <Button theme={ThemeButton.RED} text='записаться' onClick={onSignUp} className={styles.btn} />
            </div>

          </Bubble>

          <div className={styles.block}></div>
        </div>
      </div>
    </>
  )
};

export default Doctor
