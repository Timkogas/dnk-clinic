import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Result.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import Modal from '../../components/UI/Modal/Modal';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store/store';
import { getResult } from '../../store/test/test.slice';
import bridge from '@vkontakte/vk-bridge';
const Result = () => {

  const navigate = useNavigate()
  const { result } = useSelector((state: AppState) => state.test, shallowEqual)
  const dispatch: AppDispatch = useDispatch()

  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getResult())
  }, [dispatch])

  useEffect(() => {
    const onBack = () => {
      if (window.history.length > 15) {
        window.history.go(-16);
      }
    }

    window.addEventListener("popstate", onBack, false);
  }, [dispatch])

  const onClose = useCallback(() => {
    setModal(false)
  }, [])

  useEffect(() => {

    const onBack = () => {
      if (modal) {
        onClose()
      }
    }

    window.addEventListener("popstate", onBack, false);

    return () => window.removeEventListener("popstate", onBack, false);
  }, [navigate, modal, onClose])



  const onOpen = useCallback(() => {
    setModal(true)
    window.history.pushState({}, '', null);
  }, [])

  const onNext = useCallback(() => {
    navigate('/secret')
  }, [navigate])


  const onWall = useCallback(() => {
    const name = result.name.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
    const message = `Мой архетип здоровья: ${name} \n ${result.description}`;
    bridge.send('VKWebAppShowWallPostBox', {
      message: message,
      attachments: 'photo276669821_456262032, https://vk.com/app51725961'
    }).catch(() => console.log('error'))
  }, [result])

  const onStory = useCallback(() => {
    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: 'https://sun9-24.userapi.com/impg/UYm2xyWyscamP0dOxAidIkgy1KrrWqaYWbFvRg/BclWEXCfVs8.jpg?size=640x640&quality=96&sign=08f01cfe465905c57b09b372b4392f3e&type=album',
      attachment: {
        text: 'open',
        type: 'url',
        url: 'https://vk.com/app51725961',
      },
    }).catch(() => console.log('error'))
  }, [])


  return (
    <>
      <Modal isOpen={modal} onClose={onClose}>
        <TextBorder text='поделится результатом' center theme={ThemeTextBorder.GREENBLUE} outlineClass={styles.modal_title_outline} className={styles.modal_title} />
        <div className={styles.modal_btns}>
          <Button theme={ThemeButton.BLUE} text='в сторис' className={styles.modal_btn} onClick={onStory}/>
          <Button theme={ThemeButton.BLUE} text='на стену' className={styles.modal_btn} onClick={onWall} />
        </div>
      </Modal>

      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />
          <div>
            <TextBorder text='твой архетип здоровья' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />
            <div className={styles.img_block}>
              <img alt='result' src={result.img} className={styles.img} />
              <div className={styles.name_block}>
                <TextBorder text={result.name} theme={ThemeTextBorder.GREENBLUE} className={styles.name} />
              </div>
            </div>
            <Bubble className={styles.info_bubble}>
              <p className={styles.info}>{result.description}</p>
            </Bubble>
          </div>
          <div className={styles.btns}>
            <Button theme={ThemeButton.BLUE} text='поделится' onClick={onOpen} />
            <Button theme={ThemeButton.RED} text='узнать свой секрет долголетия' onClick={onNext} />
          </div>
        </div>
      </div>
    </>
  )
};

export default Result
