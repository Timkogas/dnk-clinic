import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Result.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import Modal from '../../components/UI/Modal/Modal';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store/store';
import bridge from '@vkontakte/vk-bridge';
import classNames from 'classnames';
import { archetypeUser } from '../../store/user/user.slice';
import { Iresult } from '../../results';

import paris from '../../assets/images/paris.png'
import parisPC from '../../assets/images/paris-pc.png'


const Result = () => {

  const { answers } = useSelector((state: AppState) => state.test, shallowEqual)
  const { user, archetype, archetypeEmpty } = useSelector((state: AppState) => state.user, shallowEqual)

  const dispatch: AppDispatch = useDispatch()

  const [modal, setModal] = useState<boolean>(false)
  const [PC, setPC] = useState<boolean>(false)

  let img
  let archetypeUse: Iresult
 
  if (archetype) {
    archetypeUse = archetype
    img = PC ? process.env.REACT_APP_API_URL + 'public/results/' + archetypeUse.imgPc + '.png' : process.env.REACT_APP_API_URL + 'public/results/' + archetypeUse.img + '.png'
  } else {
    archetypeUse = archetypeEmpty
    img = PC ? parisPC : paris
  }

  const [isTrimmed, setIsTrimmed] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const { current } = textRef;
      if (current.scrollHeight === current.offsetHeight) {
        setIsTrimmed(true);
      }
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      dispatch(archetypeUser({ uid: user.id.toString(), answers: answers }))
    }
  }, [user.id, answers, dispatch]);


  const handleShowMore = () => {
    if (textRef.current) {
      setIsTrimmed(true);
    }
  };

  const onClose =() => {
    setModal(false)
  }
  const navigate = useNavigate()
  useEffect(() => {
    const onCloseModal = () => {
      setModal(false)
    }

    const onBack = () => {
      if (modal) {
        onCloseModal()
      } else {
        navigate('/')
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 800) {
        setPC(true)
      } else {
        setPC(false)
      }
    };

    window.addEventListener("popstate", onBack);
    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("popstate", onBack);
    };
  }, [navigate, modal])

  const onOpen = useCallback(() => {
    setModal(true)
    window.history.pushState({}, '', null);
  }, [])

  const onNext = useCallback(() => {
    navigate('/secret')
  }, [navigate])

  const onRepeat = useCallback(() => {
    navigate('/test')
  }, [navigate])


  const onWall = () => {
    if (archetypeUse) {
      const name = archetypeUse.name.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
      const message = `Мой архетип здоровья: ${name} \n\n ${archetypeUse.description} \n Это мой архетип здоровья. Узнай свой секрет долголетия здесь:`;
      bridge.send('VKWebAppShowWallPostBox', {
        message: message,
        attachments: `${archetypeUse.postUrl}, https://vk.com/app51725961`
      }).catch(() => console.log('error'))
    }
  }

  const onStory = () => {
    if (archetypeUse) {
      bridge.send('VKWebAppShowStoryBox', {
        background_type: 'image',
        url: archetypeUse.storyUrl,
        attachment: {
          text: 'open',
          type: 'url',
          url: 'https://vk.com/app51725961',
        },
      }).catch(() => console.log('error'))
    }
  }

  return (
    <>

      <Modal isOpen={modal} onClose={onClose}>
        <TextBorder text='поделится результатом' center theme={ThemeTextBorder.GREENBLUE} outlineClass={styles.modal_title_outline} className={styles.modal_title} />
        <div className={styles.modal_btns}>
          <Button theme={ThemeButton.BLUE} text='в сторис' className={styles.modal_btn} onClick={onStory} />
          <Button theme={ThemeButton.BLUE} text='на стену' className={styles.modal_btn} onClick={onWall} />
        </div>
      </Modal>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />
          <div className={styles.block}>
            <TextBorder text='твой архетип здоровья' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />
            {archetypeUse ?
              <>
                <div className={styles.img_block}>
                  <img
                    alt='result'
                    src={img}
                    className={styles.img}
                  />
                  <div className={styles.name_block}>
                    <TextBorder text={archetypeUse.name} theme={ThemeTextBorder.GREENBLUE} className={styles.name} />
                  </div>
                </div>
                <Bubble className={classNames(styles.info_bubble, { [styles.info_bubble_expanded]: isTrimmed })}>
                  <div
                    className={classNames(styles.info_wrapper, { [styles.info_bubble_expanded]: isTrimmed })}
                    ref={textRef}
                  >
                    <p className={styles.info}>
                      {archetypeUse.description}
                    </p>
                  </div>
                  {!isTrimmed ?
                    <span
                      className={styles.link}
                      onClick={handleShowMore}
                    >
                      Узнать больше
                    </span> : null
                  }
                </Bubble>
              </> : null}
          </div>
          <div className={styles.btns}>
            <Button theme={ThemeButton.RED} text='узнать свой секрет долголетия' onClick={onNext} />
            <div className={styles.btns_second}>
              <Button theme={ThemeButton.BLUE} text='поделиться' onClick={onOpen} />
              <Button theme={ThemeButton.BLUE} text='пройти заново' onClick={onRepeat} />
            </div>

          </div>
        </div>
      </div>
    </>
  )
};

export default Result
