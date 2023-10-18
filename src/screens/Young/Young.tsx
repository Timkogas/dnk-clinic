import { useNavigate } from 'react-router-dom';
import Bubble from '../../components/Bubble/Bubble';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import Logo from '../../components/UI/Logo/Logo';
import styles from './Young.module.scss'

const Young = () => {
  const navigate = useNavigate()
  const onClick = () => {
    const link = 'https://vk.com/app51759006'
    navigator.clipboard.writeText(link).then(() => { }).catch(() => {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.innerHTML = link;
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);
    });
    navigate('/')
  }
  
  return (
    <div className={styles.bg}>
      <div className={styles.screen}>
        <div>
          <Logo subtitle />


          <div className={styles.bubble_wrapper}>

            <Bubble className={styles.bubble_first}>
              Привет! Твой архетип здоровья еще формируется,
              и многое зависит только от тебя! Береги свое здоровье
              с юных лет! Побольше занимайся спортом, двигайся, будь активным, не пренебрегай полезной едой!
              И мы с удовольствием ждем тебя
              и твою семью на Чек-Ап здоровья! Попроси своих родителей записать вас на прием – отправь маме ссылку.

              <Button theme={ThemeButton.RED} text={'ССЫЛКА НА ЧЕК-АП ЗДОРОВЬЯ'} onClick={onClick} className={styles.btn}/>
            </Bubble>

          </div>
        </div>
      </div>
    </div>
  )
};

export default Young
