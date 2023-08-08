import Logo from '../../components/UI/Logo/Logo';
import styles from './SignUp.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useState, useCallback } from 'react'
import Select from '../../components/UI/Select/Select';


interface Iform {
  name: string;
  secondName: string;
  age: string;
  place: string;
  phone: string;
  sex: string;
}

const SignUp = () => {
  const [data, setData] = useState<Iform>(
    {
      name: '',
      secondName: '',
      age: '',
      place: '',
      phone: '',
      sex: 'мужской',
    }
  )

  const onChangeAge = useCallback((value: string) => {
    const result = value.replace(/\D/g, '')
    if (result.length > 4) return
    setData(prevData => ({
      ...prevData,
      age: result
    }));
  }, [])

  const onChangeNumber = useCallback((value: string) => {
    setData(prevData => ({
      ...prevData,
      phone: value
    }));
  }, [])

  const onChangeSex = useCallback((value: string) => {
    setData(prevData => ({
      ...prevData,
      sex: value
    }));
  }, [])

  console.log(data)
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <div>
            <TextBorder text='записаться' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />

            <Bubble className={styles.signup_bubble}>
              <Input light placeholder='Имя' />
              <Input light placeholder='Фамилия' />
              <Input light placeholder='Возраст' onChange={onChangeAge} value={data.age} />
              <Input light placeholder='Регион' />
              <Input light placeholder='+7' value={data.phone} phone onChange={onChangeNumber}/>

              <Select options={[{text: 'Мужской', value: 'мужской'}, {text: 'Женский', value: 'женский'}]} value={data.sex} onChange={onChangeSex}/>

              <Button text='записаться' theme={ThemeButton.RED} className={styles.btn} />
            </Bubble>


          </div>
          <div className={styles.block}></div>
        </div>
      </div>
    </>
  )
};

export default SignUp
