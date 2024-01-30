import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Bubble from '../../components/Bubble/Bubble';
import TestItem from '../../components/TestItem/TestItem';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import CheckBox from '../../components/UI/CheckBox/CheckBox';
import Input from '../../components/UI/Input/Input';
import Logo from '../../components/UI/Logo/Logo';
import { AppDispatch, AppState } from '../../store/store';
import styles from './Test.module.scss'
import { useCallback, useState, useEffect } from 'react'
import { minusStep, plusStep, resetSteps } from '../../store/test/test.slice';
import { useNavigate } from 'react-router-dom';
import { calculateAge } from '../../helpers';
import bridge from '@vkontakte/vk-bridge';
import mobx from '../../store/mobx';

const Test = () => {
  let navigate: any = useNavigate();
  if (mobx.isODR()) navigate = mobx.setRoute.bind(mobx);

  const { questions, step } = useSelector((state: AppState) => state.test, shallowEqual)
  const { user } = useSelector((state: AppState) => state.user, shallowEqual)

  const dispatch: AppDispatch = useDispatch()

  const [age, setAge] = useState<string>('')
  const [answer, setAnswer] = useState<number | null>(null)
  const [enabledPush, setEnabledPush] = useState<boolean>(false)
  const [showPush, setShowPush] = useState<boolean>(false)


  const first = questions[step].first

  useEffect(() => {
    dispatch(resetSteps())
    bridge.send("VKWebAppGetLaunchParams").then(async (data) => {
      if (data?.vk_are_notifications_enabled !== 1) {
        setEnabledPush(true)
      }
    })
  }, [dispatch])

  useEffect(() => {
    setAge(user.bdate ? user.bdate?.length > 6 ? calculateAge(user.bdate).toString() : '' : '',)
  }, [user])


  useEffect(() => {

    const onBack = () => {
      if (step > 0) {
        setAnswer(null)
        dispatch(minusStep())

      } else if (step === 0) {
        navigate('/')
      }
    }

    window.addEventListener("popstate", onBack, false);

    return () => window.removeEventListener("popstate", onBack, false);
  }, [step, dispatch, navigate])

  useEffect(() => {
    if (showPush) setAnswer(1)
  }, [showPush])


  const onChangeAnswer = (value: number) => {
    setAnswer(value)
  }

  const onChangeAge = useCallback((value: string) => {
    const min = 1
    const max = 120
    const newValue = Math.max(min, Math.min(max, Number(parseInt(value))));
    if (isNaN(newValue)) {
      setAge('')
    } else {
      setAge(newValue.toString());
    }
  }, [])

  const onNextClick = useCallback(() => {
    const result = first ? age : answer
    if (first && Number(age) < 18) {
      navigate('/young')
    }

    if (step === questions.length - 1 && enabledPush && !showPush) {
      setShowPush(true)
    }

    if (showPush) {
      setAnswer(1)
      if (answer === 1) {
        bridge.send('VKWebAppAllowNotifications')
          .then((data) => {
            if (data.result) {
              navigate('/result')
            }
          }).catch((error) => console.log('error'))
      } else if (answer === 2) {
        navigate('/result')
      }
      return
    }

    setAnswer(null)
    dispatch(plusStep(Number(result)))
    if (step === questions.length - 1 && !enabledPush) navigate('/result')
  }, [dispatch, step, questions, navigate, answer, age, first, enabledPush, showPush])

  const onBackClick = () => {
    setAnswer(null)
    dispatch(minusStep())
  }


  const disabledBtn = (first && (age === '')) || (!first && !answer)

  let btnText = questions.length - 1 === step ? "Далее" : 'Продолжить'
  btnText = questions.length - 1 === step && enabledPush ? "Далее" : 'Продолжить'
  btnText = showPush ? 'Продолжить' : "Далее"
  return (
    <div className={styles.bg}>
      <div className={styles.screen}>
        <div>
          <Logo subtitle />

          <div className={styles.list}>
            {questions.map((item, i) => {
              return (
                <TestItem key={i} active={step + 1 > i}>
                  {i + 1}
                </TestItem>
              )
            })}
          </div>

          <div className={styles.bubble_wrapper}>
            <TextBorder text={showPush ? 'Я согласен получать уведомления, касающиеся моего здоровья' : questions[step].question} theme={ThemeTextBorder.GREENBLUE} className={styles.bubble_title} center outlineClass={styles.bubble_title_outline} />
            <Bubble className={first ? styles.bubble_first : styles.bubble_second}>
              {
                showPush ?
                  <CheckBox options={[{ text: 'Да', value: 1 }, { text: 'Нет', value: 2 }]} onChange={onChangeAnswer} selectedValue={answer} /> :

                  first ?
                    <Input type="number" onChange={onChangeAge} value={age} onWheel={event => event.currentTarget.blur()} />
                    :
                    <CheckBox options={questions[step].options!} onChange={onChangeAnswer} selectedValue={answer} />

              }
            </Bubble>
            <div className={styles.btns}>
              {first ?
                null
                :
                <Button theme={ThemeButton.BLUE} text='Назад' onClick={onBackClick} />
              }
              <Button theme={ThemeButton.RED} text={btnText} onClick={onNextClick} disabled={disabledBtn} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Test
