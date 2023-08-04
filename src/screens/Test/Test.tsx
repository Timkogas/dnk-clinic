import Bubble from '../../components/Bubble/Bubble';
import TestItem from '../../components/TestItem/TestItem';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import CheckBox from '../../components/UI/CheckBox/CheckBox';
import Input from '../../components/UI/Input/Input';
import Logo from '../../components/UI/Logo/Logo';
import { Iquestion } from '../../types/interface';
import styles from './Test.module.scss'


const questions: Iquestion[] = [
  {
    question: 'Ваш возраст', 
    first: true
  }, 
  {
    question: 'Ваш пол', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Курили ли вы в юности?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Курите ли вы сейчас?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Какова ваша физическая активность?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Профиль вашей деятельности?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Любите ли вы завтрак?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Во сколько вы ели вчера последний раз?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Когда вы последний раз употребляли алкоголь?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Когда последний раз вы проходили профилактический медосмотр? ', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Весы вас пугают?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Вы быстро засыпаете?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  }, 
  {
    question: 'Сколько вы можете работать в течение дня?', 
    options: [{text: 'мужской', value: 1}, {text: 'женский', value: 2}]
  },
]

const Test = () => {

  return (
    <div className={styles.screen}>
      <div>
        <Logo subtitle={true} />
        <div className={styles.list}>
          {questions.map((item, i) => {
            return (
              <TestItem key={i} active={i % 2 === 0}>
                {i + 1}
              </TestItem>
            )
          })}
        </div>
        <div className={styles.bubble_wrapper}>
          <TextBorder text='ваш пол' theme={ThemeTextBorder.GREENBLUE} className={styles.bubble_title} center />
          <Bubble className={styles.bubble_p}>
            {/* <Input /> */}
            <CheckBox options={[{text: 'мужской', value: 1}, {text: 'женский', value: 2}]}/>
          </Bubble>
          <div className={styles.btns}>
            <Button theme={ThemeButton.RED} text='Далее' />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Test
