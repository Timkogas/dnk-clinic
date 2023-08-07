import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Result.module.scss'
import paris from '../../assets/images/results/paris.png'
import Bubble from '../../components/Bubble/Bubble';
import Modal from '../../components/UI/Modal/Modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const [modal, setModal] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {

    const onBack = () => {
      if (modal) {
        onClose()
      }
    }

    window.addEventListener("popstate", onBack, false);

    return () => window.removeEventListener("popstate", onBack, false);
  }, [navigate, modal])


  const onClose = () => {
    setModal(false)
  }

  const onOpen = () => {
    setModal(true)
    window.history.pushState({}, '', null);
  }


  return (
    <>
      <Modal isOpen={modal} onClose={onClose}>
        <TextBorder text='поделится результатом' center theme={ThemeTextBorder.GREENBLUE} outlineClass={styles.modal_title_outline}  className={styles.modal_title}/>

        <div className={styles.modal_share}>
          <TextBorder text='в сторис' center theme={ThemeTextBorder.GREENBLUE} outlineClass={styles.modal_share_outline} className={styles.modal_share_choise}/>
          <TextBorder text='на стену' center theme={ThemeTextBorder.GREENBLUE} outlineClass={styles.modal_share_outline} className={styles.modal_share_choise}/>
        </div>

        <Button theme={ThemeButton.BLUE} text='пройти тест заново' className={styles.modal_btn} />
      </Modal>

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
            <Button theme={ThemeButton.BLUE} text='поделится' onClick={onOpen} />
            <Button theme={ThemeButton.RED} text='узнать свой секрет долголетия' />
          </div>
        </div>
      </div>
    </>
  )
};

export default Result
