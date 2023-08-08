import Logo from '../../components/UI/Logo/Logo';
import styles from './Secret.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import classNames from 'classnames';
import NavBar from '../../components/NavBarLayout/NavBarLayout';


const Secret = () => {



  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <div>
            <TextBorder text='Твой секрет долголетия' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />

            <Bubble className={styles.info_bubble}>
              <p className={styles.info_text}>
                <span className={styles.info_bold}> Твой секрет долголетия: </span>Добавь в жизнь побольше движения и спорта! Твой потенциал – долгие, счастливые годы.
              </p>

              <p className={styles.info_text}>
                <span className={styles.info_bold}> Потенциальные проблемы: </span> Кишечник, гинекология, проблемы с кожей.
              </p>

              <p className={styles.info_text}>
                <span className={styles.info_bold}> Рекомендуем:*   </span>
              </p>

              <div className={styles.recommendations}>
                <p className={classNames(styles.info_text, styles.recommendations_text)}>
                  1. Записаться на Чек Ап здоровья
                </p>

                <Button text='записаться' theme={ThemeButton.RED} className={styles.btn} outlineClass={styles.btn_outline} />
              </div>

              <div className={styles.recommendations}>
                <p className={classNames(styles.info_text, styles.recommendations_text)}>
                  2. Записаться к гинекологу
                </p>

                <Button text='записаться' theme={ThemeButton.RED} className={styles.btn} outlineClass={styles.btn_outline} />
              </div>

              <div className={styles.recommendations}>
                <p className={classNames(styles.info_text, styles.recommendations_text)}>
                  3. Записаться к специалисту индустрии красоты
                </p>

                <Button text='записаться' theme={ThemeButton.RED} className={styles.btn} outlineClass={styles.btn_outline} />
              </div>

            </Bubble>

            <p className={styles.warning}>*не является медицинской рекомендацией, требуется консультация специалиста</p>

          </div>
          <div className={styles.block}></div>
        </div>
      </div>
    </>
  )
};

export default Secret
