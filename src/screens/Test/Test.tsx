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

const Test = () => {

  const { questions, step } = useSelector((state: AppState) => state.test, shallowEqual)
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate();

  const [age, setAge] = useState<string>('')
  const [answer, setAnswer] = useState<number | null>(null)

  const first = questions[step].first

  useEffect(() => {
    dispatch(resetSteps())
  }, [dispatch])


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


  const onChangeAnswer = (value: number) => {
    setAnswer(value)
  }

  const onChangeAge = useCallback((value: string) => {
    const result = value.replace(/\D/g, '')
    if (result.length > 4) return
    setAge(result)
  }, [])

  const onNextClick = useCallback(() => {
    window.history.pushState({}, '', null);
    const result = first ? age : answer
    if (first && Number(age) < 18) {
      navigate('/young')
      return
    }

    dispatch(plusStep(Number(result)))
    setAnswer(null)
    if (step === questions.length - 1) navigate('/result')
  }, [dispatch, step, questions, navigate, answer, age, first])

  const onBackClick = () => {
    window.history.go(-1)
  }


  const disabledBtn = (first && (age === '')) || (!first && !answer)

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
            <TextBorder text={questions[step].question} theme={ThemeTextBorder.GREENBLUE} className={styles.bubble_title} center outlineClass={styles.bubble_title_outline} />
            <Bubble className={first ? styles.bubble_first : styles.bubble_second}>
              {first ?
                <Input type='text' onChange={onChangeAge} value={age} />
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
              <Button theme={ThemeButton.RED} text={questions.length - 1 === step ? 'Завершить' : 'Далее'} onClick={onNextClick} disabled={disabledBtn} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Test
