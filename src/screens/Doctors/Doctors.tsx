import Logo from '../../components/UI/Logo/Logo';
import styles from './Doctors.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Select from '../../components/UI/Select/Select';
import { useState, useCallback, useMemo } from 'react';
import doctorImg from '../../assets/images/doctors/1.png'
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';

const options = [
  { text: 'Терапевт', value: 'Терапевт' },
  { text: 'Акушер-гинеколог', value: 'Акушер-гинеколог' },
  { text: 'Акушер-гинеколог', value: 'Акушер-гинеколог' },
  { text: 'Акушер-гинеколог', value: 'Акушер-гинеколог' },
  { text: 'Акушер-гинеколог', value: 'Акушер-гинеколог' },
  { text: 'Акушер-гинеколог', value: 'Акушер-гинеколог' },
  { text: 'Акушер-гинеколог', value: 'Акушер-гинеколог' },
  { text: 'Акушер-гинеколог', value: 'Акушер-гинеколог' },
  { text: 'Акушер-гинеколог', value: 'Акушер-гинеколог' },
]

const Doctors = () => {

  const [type, setType] = useState<string>('')
  const onChange = useCallback((value: string) => {
    setType(value);
  }, [])

  const list = useMemo(() => {
    if (type === 'Терапевт') {
      return [
        { name: 'Иванова Ивана Ивановна', img: doctorImg },
        { name: 'Иванова Ивана Ивановна', img: doctorImg },
        { name: 'Иванова Ивана Ивановна', img: doctorImg },
        { name: 'Иванова Ивана Ивановна', img: doctorImg },
      ]
    } else if (type === 'Акушер-гинеколог') {
      return [
        { name: 'Иванова Ивана Ивановна', img: doctorImg },
        { name: 'Иванова Ивана Ивановна', img: doctorImg }
      ]
    }
  }, [type])

  const navigate = useNavigate();

  const onMore = useCallback(() => {
    navigate("/doctors/1");
  }, [navigate])

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.screen}>
          <Logo subtitle />

          <TextBorder text='Запишись к специалисту' center theme={ThemeTextBorder.GREENBLUE} className={styles.title} outlineClass={styles.title_outline} />
          <div>
            <Select options={options} value={type} onChange={onChange} doctors className={styles.select_doctors} />
            <Bubble className={styles.info_bubble}>

              {type !== '' ?

                <>
                  <p className={styles.subtitle}>{type}</p>
                  <div className={styles.list}>
                    {list?.map((element, i) => {
                      return (
                        <Bubble className={styles.bubble_card} key={i}>
                          <Bubble className={styles.bubble_img_wrapper}>
                            <img src={element.img} alt='doctor' className={styles.bubble_img} />
                          </Bubble>
                          <p className={styles.name}>{element.name}</p>
                          <Button theme={ThemeButton.RED} text='Подробнее' className={styles.btn} onClick={onMore} />
                        </Bubble>
                      )
                    })}
                  </div>
                </>
                :
                <>
                  <p className={styles.subtitle}>Терапевт</p>
                  <div className={styles.list}>
                    <Bubble className={styles.bubble_card}>
                      <Bubble className={styles.bubble_img_wrapper}>
                        <img src={doctorImg} alt='doctor' className={styles.bubble_img} />
                      </Bubble>
                      <p className={styles.name}>Иванова Ивана Ивановна</p>
                      <Button theme={ThemeButton.RED} text='Подробнее' className={styles.btn} onClick={onMore} />
                    </Bubble>

                    <Bubble className={styles.bubble_card}>
                      <Bubble className={styles.bubble_img_wrapper}>
                        <img src={doctorImg} alt='doctor' className={styles.bubble_img} />
                      </Bubble>
                      <p className={styles.name}>Иванова Ивана Ивановна</p>
                      <Button theme={ThemeButton.RED} text='Подробнее' className={styles.btn} onClick={onMore} />
                    </Bubble>
                    <div>

                    </div>
                  </div>

                  <p className={styles.subtitle}>Акушер-гинеколог</p>
                  <div className={styles.list}>
                    <Bubble className={styles.bubble_card}>
                      <Bubble className={styles.bubble_img_wrapper}>
                        <img src={doctorImg} alt='doctor' className={styles.bubble_img} />
                      </Bubble>
                      <p className={styles.name}>Иванова Ивана Ивановна</p>
                      <Button theme={ThemeButton.RED} text='Подробнее' className={styles.btn} onClick={onMore} />
                    </Bubble>

                    <Bubble className={styles.bubble_card}>
                      <Bubble className={styles.bubble_img_wrapper}>
                        <img src={doctorImg} alt='doctor' className={styles.bubble_img} />
                      </Bubble>
                      <p className={styles.name}>Иванова Ивана Ивановна</p>
                      <Button theme={ThemeButton.RED} text='Подробнее' className={styles.btn} onClick={onMore} />
                    </Bubble>
                    <div>

                    </div>
                  </div>
                </>

              }

            </Bubble>


          </div>

          <div className={styles.block}></div>
        </div>
      </div>
    </>
  )
};

export default Doctors
