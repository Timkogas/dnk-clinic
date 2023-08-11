import Logo from '../../components/UI/Logo/Logo';
import styles from './Secret.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store/store';
import { shallowEqual, useSelector } from 'react-redux';


const Secret = () => {
  const { result } = useSelector((state: AppState) => state.test, shallowEqual)
  const navigate = useNavigate()

  const onSignUp = () => {
    navigate('/signup')
  }

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <div>
            <TextBorder text='Твой секрет долголетия' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />

            <Bubble className={styles.info_bubble}>
              <p className={styles.info_text}>
                <span className={styles.info_bold}> Твой секрет долголетия: </span> {result.secret}
              </p>

              <p className={styles.info_text}>
                <span className={styles.info_bold}> Потенциальные проблемы: </span> {result.problems}
              </p>

              <p className={styles.info_text}>
                <span className={styles.info_bold}> Рекомендуем:*   </span>
              </p>

              {result.recommendations.map((rec, i) => {
                return (
                  <div className={styles.recommendations} key={i}>
                    <p className={classNames(styles.info_text, styles.recommendations_text)}>
                    {i + 1}. {rec}
                    </p>

                    <Button text='записаться' theme={ThemeButton.RED} className={styles.btn} outlineClass={styles.btn_outline} onClick={onSignUp} />
                  </div>
                )
              })}
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
