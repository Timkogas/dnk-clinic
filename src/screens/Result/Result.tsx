import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Result.module.scss'
import paris from '../../assets/images/results/paris.png'
import Bubble from '../../components/Bubble/Bubble';
import classNames from 'classnames';

const Result = () => {

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />
          <div>
            <TextBorder text='твой архетип здоровья' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />
            <div className={styles.img_block}>
              <img alt='result' src={paris} className={styles.img} />
              <div className={styles.name_block}>
                <TextBorder text='Парижанка' theme={ThemeTextBorder.GREENBLUE} className={styles.name} />
              </div>
            </div>
            <Bubble className={styles.info_bubble}>
              <p className={styles.info}>Богатый внутренний мир и врожденный интеллект интуитивно управляют организмом и не дают ему пуститься во все тяжкие. Спорт появляется в жизни тогда, когда организм сам приводит тебя в спортзал.
                При этом стремление к интеллектуальному развитию часто заставляет тебя вести малоподвижный образ жизни.</p>
            </Bubble>
          </div>
          <div className={styles.btns}>
            <Button theme={ThemeButton.BLUE} text='поделится' className={ styles.btn_result} />
            <Button theme={ThemeButton.RED} text='узнать свой секрет долголетия' className={styles.btn_result} />
          </div>
        </div>
      </div>
    </>
  )
};

export default Result
