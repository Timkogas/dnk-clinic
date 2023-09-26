import Logo from '../../components/UI/Logo/Logo';
import styles from './Doctor.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import { useCallback, useEffect, useState, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store/store';
import { setCommentDoctor } from '../../store/user/user.slice';
import { doctorGetOne, resetCurrentDoctor } from '../../store/doctors/doctors.slice';
import Modal from '../../components/UI/Modal/Modal';


const Doctor = () => {
  const params = useParams()
  const navigate = useNavigate();
  const { currentDoctor } = useSelector((state: AppState) => state.doctors, shallowEqual)
  const [modal, setModal] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (params.id) {
      dispatch(doctorGetOne(params.id))
    }
    return () => {
      dispatch(resetCurrentDoctor())
    }
  }, [dispatch, params])

  const onSignUp = useCallback(() => {
    dispatch(setCommentDoctor(currentDoctor.category + ' ' + currentDoctor.name))
    navigate("/signup");
  }, [navigate, dispatch, currentDoctor])

  const onClose = () => {
    setModal(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    const onCloseModal = () => {
      setModal(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }

    const onBack = () => {
      if (modal) {
        onCloseModal()
      } else {
        navigate('/doctors')
      }
    }

    window.addEventListener("popstate", onBack);

    return () => {
      window.removeEventListener("popstate", onBack);
    };
  }, [navigate, modal])

  const onVideo = () => {
    window.history.pushState({}, '', null);
    setModal(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const videoSource = process.env.REACT_APP_API_URL + 'public/doctorsVideo/IvanI.mp4';

  return (
    <>

      <Modal isOpen={modal} onClose={onClose} className={styles.modal_video}>
        <video ref={videoRef} controls className={styles.video}>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>

      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <Bubble className={styles.info_bubble}>
            {currentDoctor._id ? <>
              <div className={styles.first_block}>
                <Bubble className={styles.bubble_img_wrapper}>
                  <img src={process.env.REACT_APP_API_URL + 'public/doctorsImg/' + currentDoctor.img + '.png'} alt='doctor' className={styles.bubble_img} />
                </Bubble>
                <div className={styles.name_block}>
                  {currentDoctor.prof.map((el, i) => {
                    return (
                      <TextBorder key={i} text={el} center theme={ThemeTextBorder.RED} className={styles.title} outlineClass={styles.title_outline} />
                    )
                  })}
                  <p className={styles.name}>{currentDoctor.name}</p>
                  <Button theme={ThemeButton.BLUE} text='Видео' className={styles.video_btn} onClick={onVideo} />
                </div>
              </div>

              <div className={styles.second_block}>
                <div className={styles.text_block}>

                  {currentDoctor?.mainInfo?.length > 0 ?
                    <>

                      <p className={styles.subtitle}>
                        {currentDoctor.mainInfo.map((el, i) => {
                          return (<React.Fragment key={i}>{el}<br /></React.Fragment>)
                        })}
                      </p>
                      <br />
                    </>

                    : null}




                  {Object.entries(currentDoctor.info).map((el, i) => {
                    return (<React.Fragment key={i}>
                      <p className={styles.subtitle}>
                        {el[0]}
                      </p>
                      <ul className={styles.list}>
                        {el[1].map((item, i) => {
                          return (<li key={i} className={styles.item}>{item}</li>)
                        })}
                      </ul>
                    </React.Fragment>)
                  })}

                </div>
                <Button theme={ThemeButton.RED} text='записаться' onClick={onSignUp} className={styles.btn} />
              </div>
            </> : <></>}

          </Bubble>

          <div className={styles.block}></div>
        </div >
      </div >
    </>
  )
};

export default Doctor
