import Logo from '../../components/UI/Logo/Logo';
import styles from './SignUp.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useState, useCallback, useEffect } from 'react'
import Select from '../../components/UI/Select/Select';
import { AppState } from '../../store/store';
import { shallowEqual, useSelector } from 'react-redux';
import { calculateAge } from '../../helpers';
import bridge from '@vkontakte/vk-bridge';

interface Iform {
  name: string;
  secondName: string;
  age: string;
  place: string;
  phone: string;
  sex: string;
}

const SignUp = () => {

  const { user } = useSelector((state: AppState) => state.user, shallowEqual)

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

  useEffect(() => {
    bridge.send('VKWebAppGetPhoneNumber')
      .then((data) => {
        if (data.phone_number) {
          setData(prevData => ({
            ...prevData,
            phone: data.phone_number.toString()
          }));
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }, [])

  useEffect(() => {
    setData({
      name: user?.first_name ? user?.first_name : '',
      secondName: user?.last_name ? user?.last_name : '',
      age: user.bdate ? user.bdate?.length > 6 ? calculateAge(user.bdate).toString() : '' : '',
      place: user?.city?.title ? user?.city?.title : '',
      phone: '',
      sex: user.sex ? user.sex === 1 ? 'женский' : 'мужской' : 'мужской',
    })
  }, [user])

  const onChangeAge = useCallback((value: string) => {
    const result = value.replace(/\D/g, '')
    if (result.length > 3) return
    setData(prevData => ({
      ...prevData,
      age: result
    }));
  }, [])

  const onChangeFirstName = useCallback((value: string) => {
    setData(prevData => ({
      ...prevData,
      name: value
    }));
  }, [])

  const onChangeSecondName = useCallback((value: string) => {
    setData(prevData => ({
      ...prevData,
      secondName: value
    }));
  }, [])

  const onChangePlace = useCallback((value: string) => {
    setData(prevData => ({
      ...prevData,
      place: value
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

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <div>
            <TextBorder text='записаться' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />

            <Bubble className={styles.signup_bubble}>
              <Input light placeholder='Имя' onChange={onChangeFirstName} value={data.name} className={styles.input} />
              <Input light placeholder='Фамилия' onChange={onChangeSecondName} value={data.secondName} className={styles.input} />
              <Input light placeholder='Возраст' onChange={onChangeAge} value={data.age} className={styles.input} />
              <Input light placeholder='Регион' onChange={onChangePlace} value={data.place} className={styles.input} />
              <Input light placeholder='+7' value={data.phone} phone onChange={onChangeNumber} className={styles.input} />

              <Select options={[{ text: 'Мужской', value: 'мужской' }, { text: 'Женский', value: 'женский' }]} value={data.sex} onChange={onChangeSex} className={styles.input} />

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
