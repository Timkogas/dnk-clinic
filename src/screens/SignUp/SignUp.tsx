import Logo from '../../components/UI/Logo/Logo';
import styles from './SignUp.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useState, useCallback, useEffect, useRef } from 'react'
import Select from '../../components/UI/Select/Select';
import { AppState } from '../../store/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { calculateAge } from '../../helpers';
import bridge from '@vkontakte/vk-bridge';
import { resetCommentDoctor, resetCommentSecret } from '../../store/user/user.slice';
import classNames from 'classnames';
import { instance } from '../../api/instance';

interface Iform {
  name: string;
  secondName: string;
  age: string;
  place: string;
  phone: string;
  sex: string;
}

const SignUp = () => {
  const { user, commentSecret, commentDoctor } = useSelector((state: AppState) => state.user, shallowEqual)
  const dispatch = useDispatch()
  const [send, setSend] = useState<boolean>(false)
  const [phone, setPhone] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

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
    return () => {
      dispatch(resetCommentDoctor())
      dispatch(resetCommentSecret())
    }
  }, [dispatch])

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
    const min = 1
    const max = 120
    const newValue = Math.max(min, Math.min(max, Number(parseInt(value))));
    if (isNaN(newValue)) {
      setData(prevData => ({
        ...prevData,
        age: ''
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        age: newValue.toString()
      }));
    }
  }, [])

  const onChangeFirstName = useCallback((value: string) => {
    setData(prevData => ({
      ...prevData,
      name: value.replace(/[^a-zA-Zа-яА-Я\s-]/g, '')
    }));
  }, [])

  const onChangeSecondName = useCallback((value: string) => {
    setData(prevData => ({
      ...prevData,
      secondName: value.replace(/[^a-zA-Zа-яА-Я\s-]/g, '')
    }));
  }, [])

  const onChangePlace = useCallback((value: string) => {
    setData(prevData => ({
      ...prevData,
      place: value.replace(/[^a-zA-Zа-яА-Я\s-]/g, '')
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

  const onClick = useCallback(() => {
    instance.post('/user/registration', {
      fields: {
        TITLE: "VK mini apps",
        NAME: data.name,
        LAST_NAME: data.secondName,
        ADDRESS_CITY: data.place,
        PHONE: [{ VALUE: "+" + data.phone, VALUE_TYPE: "WORK" }],
        COMMENTS: `Возраст: ${data.age}. Пол: ${data.sex} \n ${commentSecret !== '' ? commentSecret : commentDoctor}`
      }
    }).then((data) => {
      if (data.data.error) {
        setError(true)
      } else {
        setData({
          name: '',
          secondName: '',
          age: '',
          place: '',
          phone: '',
          sex: 'мужской',
        })
        setSend(true)
      }
    })
      .catch(() => {
        setError(true)
      })
  }, [data, commentSecret, commentDoctor])

  const onClickPhone = () => {
    if (!phone) {
      const inputElement = document.getElementById('phone_input'); // 
      if (inputElement) {
        inputElement.blur();
      }
      setPhone(true)
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
    }
  }

  const onRefresh = () => {
    setError(false)
  }

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <div>
            <TextBorder text='записаться' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />

            <Bubble className={styles.signup_bubble}>
              <Input light placeholder='Имя' onChange={onChangeFirstName} value={data.name} className={styles.input} maxLength={100} />
              <Input light placeholder='Фамилия' onChange={onChangeSecondName} value={data.secondName} className={styles.input} maxLength={100} />
              <Input light placeholder='Возраст' onChange={onChangeAge} value={data.age} className={styles.input} type='number' onWheel={event => event.currentTarget.blur()} />
              <Input light placeholder='Город' onChange={onChangePlace} value={data.place} className={styles.input} maxLength={100} />
              <Input id="phone_input" light onClick={onClickPhone} placeholder='+7' value={data.phone} phone onChange={onChangeNumber} className={styles.input} />

              <Select options={[{ text: 'Мужской', value: 'мужской' }, { text: 'Женский', value: 'женский' }]} value={data.sex} onChange={onChangeSex} className={styles.input} />

              <Button
                text='записаться'
                theme={ThemeButton.RED}
                className={styles.btn}
                onClick={onClick}
                disabled={Object.values(data).some(value => value === '') || data.phone.length !== 11}
              />


              <div className={classNames({ [styles.signup_bubble_send]: send, [styles.signup_bubble_send_inactive]: !send })}>
                <TextBorder text='Спасибо за вашу заявку!' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />
                <p className={classNames(styles.info_text)}>
                  Менеджер свяжется с вами в течение 15 минут!
                </p>
              </div>

              <div className={classNames({ [styles.signup_bubble_send]: error, [styles.signup_bubble_send_inactive]: !error })}>
                <TextBorder text='Ошибка!' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />
                <p className={classNames(styles.info_text)}>
                  Произошла неизвестная ошибка
                  <Button text='Обновить' theme={ThemeButton.RED} className={styles.btn} onClick={onRefresh} />
                </p>
              </div>
            </Bubble>


          </div>
          <div className={styles.block}></div>
        </div>
      </div>
    </>
  )
};

export default SignUp
