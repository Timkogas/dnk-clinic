import Logo from '../../components/UI/Logo/Logo';
import styles from './Secret.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setCommentSecret } from '../../store/user/user.slice';
import { Iresult } from '../../types/interface';


const Secret = () => {
  const { archetype, archetypeEmpty } = useSelector((state: AppState) => state.user, shallowEqual)
  const dispatch = useDispatch()

  let archetypeUse: Iresult
  if (archetype) {
    archetypeUse = archetype
  } else {
    archetypeUse = archetypeEmpty
  }
  const navigate = useNavigate()

  const onSignUp = (rec: string) => {
    dispatch(setCommentSecret("Секрет долголетия - " + rec))
    navigate('/signup')
  }

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <div>
            <TextBorder text='Твой секрет долголетия' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />
            {archetypeUse ?
              <>
                <Bubble className={styles.info_bubble}>
                  <p className={styles.info_text}>
                    <span className={styles.info_bold}> Твой секрет долголетия: </span> {archetypeUse.secret}
                  </p>

                  <p className={styles.info_text}>
                    <span className={styles.info_bold}> Потенциальные проблемы: </span> {archetypeUse.problems}
                  </p>

                  <p className={styles.info_text}>
                    <span className={styles.info_bold}> Рекомендуем:*   </span>
                  </p>

                  {archetypeUse.recommendations.map((rec, i) => {
                    return (
                      <div className={styles.recommendations} key={i}>
                        <p className={classNames(styles.info_text, styles.recommendations_text)}>
                          {i + 1}. {rec}
                        </p>

                        <Button text='записаться' theme={ThemeButton.RED} className={styles.btn} outlineClass={styles.btn_outline} onClick={() => onSignUp(rec)} />
                      </div>
                    )
                  })}
                </Bubble>

                <p className={styles.warning}>*не является медицинской рекомендацией, требуется консультация специалиста</p>
              </> : null}

          </div>
          <div className={styles.block}></div>
        </div>
      </div>
    </>
  )
};

export default Secret
