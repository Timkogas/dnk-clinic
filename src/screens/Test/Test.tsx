import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Bubble from '../../components/Bubble/Bubble';
import TestItem from '../../components/TestItem/TestItem';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import CheckBox from '../../components/UI/CheckBox/CheckBox';
import Input from '../../components/UI/Input/Input';
import Logo from '../../components/UI/Logo/Logo';
import { AppDispatch, AppState } from '../../store/store';
import { Iquestion } from '../../types/interface';
import styles from './Test.module.scss'
import { useCallback } from 'react'
import { minusStep, plusStep } from '../../store/test/test.slice';

const Test = () => {

  const { questions, step } = useSelector((state: AppState) => state.test, shallowEqual)
  const dispatch: AppDispatch = useDispatch()


  const onNextClick = useCallback(() => {
    dispatch(plusStep())
  }, [dispatch])

  const onBackClick = useCallback(() => {
    dispatch(minusStep())
  }, [dispatch])


  return (
    <div className={styles.bg}>
      <div className={styles.screen}>
        <div>
          <Logo subtitle={true} />

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
            <TextBorder text={questions[step].question} theme={ThemeTextBorder.GREENBLUE} className={styles.bubble_title} center />
            <Bubble className={questions[step].first ? styles.bubble_first : styles.bubble_second}>
              {questions[step].first ?
                <Input />
                :
                <CheckBox options={questions[step].options!} />
              }
            </Bubble>
            <div className={styles.btns}>
              {questions[step].first ?
                null
                :
                <Button theme={ThemeButton.BLUE} text='Назад' onClick={onBackClick} />
              }
              <Button theme={ThemeButton.RED} text={questions.length - 1 === step ? 'Завершить' : 'Далее'} onClick={onNextClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Test
