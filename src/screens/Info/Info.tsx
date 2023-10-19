import Logo from '../../components/UI/Logo/Logo';
import styles from './Info.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';

import web from '../../assets/images/icon-web.svg'
import phone from '../../assets/images/icon-phone.svg'

const Info = () => {

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <div>
            <TextBorder className={styles.title} text='Единый контактный центр' theme={ThemeTextBorder.GREENBLUE} center></TextBorder>
            <Bubble className={styles.info_bubble}>
              <div className={styles.info}>
                <img src={phone} alt='icon' className={styles.icon} />
                <div className={styles.numbers}>
                  <p className={styles.info_text}>
                    +7 (351) 214-23-03, г. Челябинск
                  </p>
                  <p className={styles.info_text}>
                    +7 (3519) 21-03-03, г. Магнитогорск
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
                    www.dnk174.ru
                  </a>
                </div>
              </div>
            </Bubble>


          </div>

          <div className={styles.block}></div>
        </div>
      </div>
    </>
  )
};

export default Info
