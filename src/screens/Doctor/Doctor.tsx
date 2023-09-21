import Logo from '../../components/UI/Logo/Logo';
import styles from './Doctor.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import { useCallback, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store/store';
import { getDoctor } from '../../store/doctors/doctors.slice';
import { setCommentDoctor } from '../../store/user/user.slice';


const Doctor = () => {
  const params = useParams()
  const navigate = useNavigate();
  const { currentDoctor } = useSelector((state: AppState) => state.doctors, shallowEqual)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getDoctor(Number(params.id)))
  }, [dispatch, params])

  const onSignUp = useCallback(() => {
    dispatch(setCommentDoctor(currentDoctor.category + ' ' + currentDoctor.name))
    navigate("/signup");
  }, [navigate, dispatch, currentDoctor])

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <Bubble className={styles.info_bubble}>
            <div className={styles.first_block}>
              <Bubble className={styles.bubble_img_wrapper}>
                <img src={currentDoctor.img} alt='doctor' className={styles.bubble_img} />
              </Bubble>
              <div className={styles.name_block}>
                {currentDoctor.prof.map((el, i) => {
                  return (
                    <TextBorder key={i} text={el} center theme={ThemeTextBorder.RED} className={styles.title} outlineClass={styles.title_outline} />
                  )
                })}
                <p className={styles.name}>{currentDoctor.name}</p>
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

          </Bubble>

          <div className={styles.block}></div>
        </div >
      </div >
    </>
  )
};

export default Doctor
