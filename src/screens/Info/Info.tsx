import Logo from '../../components/UI/Logo/Logo';
import styles from './Info.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import classNames from 'classnames';
import NavBar from '../../components/NavBarLayout/NavBarLayout';
import { useNavigate } from 'react-router-dom';

import web from '../../assets/images/icon-web.svg'
import phone from '../../assets/images/icon-phone.svg'

import google from '../../assets/images/google.png'
import apple from '../../assets/images/apple.png'

const Info = () => {

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <div>
            <p className={styles.title}>Единый контактный центр</p>
            <Bubble className={styles.info_bubble}>
              <div className={styles.info}>
                <img src={phone} alt='icon' className={styles.icon} />
                <div className={styles.numbers}>
                  <p className={styles.info_text}>
                    +7 (351) 214-23-03, г. Челябинск
                  </p>
                  <p className={styles.info_text}>
                    +7 (3519) 214-23-03, г. Магнитогорск
                  </p>
                  <p className={styles.info_text}>
                    +7 (7142) 93-15-27, г. Костанай
                  </p>
                </div>
              </div>

              <div className={styles.info}>
                <img src={web} alt='icon' className={styles.icon} />
                <div className={styles.numbers}>
                  <a className={styles.link} href="https://dnk74.ru" target="_blank" rel="noopener noreferrer">
                    www.dnk74.ru
                  </a>
                </div>
              </div>
            </Bubble>


          </div>
          <p className={styles.title}>Скачайте наше приложение</p>
          <div className={styles.markets}>
            <img src={google} alt='google' className={styles.market} />
            <img src={apple} alt='apple' className={styles.market} />
          </div>
          <div className={styles.block}></div>
        </div>
      </div>
    </>
  )
};

export default Info
