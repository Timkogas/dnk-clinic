import Bubble from '../../components/Bubble/Bubble';
import TestItem from '../../components/TestItem/TestItem';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Test.module.scss'

interface Iquestion {
  question: string;
  answer: {
    text: string;
    value: number;
  }
}
const questions = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]

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
          <TextBorder text='ваш пол' theme={ThemeTextBorder.GREENBLUE} className={styles.bubble_title} center={true}/>
          <Bubble>'asdasd''asdasd''asdasd''asdasd' 'asdasd' 'asdasd''asdasd''asdasd''asdasd''asdasd''asdasd''asdasd' v'asdasd''asdasd' 'asdasd''asdasd''asdasd''asdasd''asdasd''asdasd''asdasd'</Bubble>
        </div>
      </div>
    </div>
  )
};

export default Test
