import Logo from '../../components/UI/Logo/Logo';
import styles from './Doctors.module.scss'
import Bubble from '../../components/Bubble/Bubble';
import TextBorder, { ThemeTextBorder } from '../../components/TextBorder/TextBorder';
import Select from '../../components/UI/Select/Select';
import { useState, useCallback } from 'react';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { doctors } from '../../doctors';

const options = [
  { text: 'Все врачи', value: '' },
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

  const navigate = useNavigate();

  const onMore = useCallback((id: number) => {
    navigate(`/doctors/${id}`);
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
                  <div className={styles.list}>
                    {doctors?.map((el, i) => {
                      return (
                        <Bubble className={styles.bubble_card} key={el.id}>
                          <Bubble className={styles.bubble_img_wrapper}>
                            <img src={el.img} alt='doctor' className={styles.bubble_img} />
                          </Bubble>
                          <p className={styles.name}>{el.name}</p>
                          <Button theme={ThemeButton.RED} text='Подробнее' className={styles.btn} onClick={() => { onMore(el.id) }} />
                        </Bubble>
                      )
                    })}
                  </div>
                </>
                :
                <>
                  <div className={styles.list}>

                    {doctors?.map((el, i) => {
                      return (
                        <Bubble className={styles.bubble_card} key={el.id}>
                          <Bubble className={styles.bubble_img_wrapper}>
                            <img src={el.img} alt='doctor' className={styles.bubble_img} />
                          </Bubble>
                          <p className={styles.name}>{el.name}</p>
                          <Button theme={ThemeButton.RED} text='Подробнее' className={styles.btn} onClick={() => { onMore(el.id) }} />
                        </Bubble>
                      )
                    })}
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
