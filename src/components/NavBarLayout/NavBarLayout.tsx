import { Outlet } from 'react-router-dom';
import styles from './NavBarLayout.module.scss'

import home from '../../assets/images/icon-home.svg'
import doctors from '../../assets/images/icon-doctors.svg'
import file from '../../assets/images/icon-file.svg'
import info from '../../assets/images/icon-info.svg'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import mobx from '../../store/mobx';

const NavBarLayout = () => {
  const index = mobx.getRoute().indexOf('/doctors');
  const doctor = index !== -1 && mobx.getRoute().slice(9);

  return (
    <>
      <Outlet />

      <div className={styles.NavBar}>
        <div className={styles.content}>
          { mobx.isODR() ?
          <>
            <span onClick={() => mobx.setRoute('/')} className={ classNames(styles.inactive, styles.link) }>
              <img src={home} alt='icon' className={styles.icon} />
              Главная
            </span>
            <span onClick={() => mobx.setRoute('/doctors')} className={ mobx.getRoute() === '/doctors' || doctor ? styles.link : classNames(styles.inactive, styles.link) }>
              <img src={doctors} alt='icon' className={styles.icon} />
              Врачи
            </span>
            <span onClick={() => mobx.setRoute('/signup')} className={ mobx.getRoute() === '/signup' ? styles.link : classNames(styles.inactive, styles.link) }>
              <img src={file} alt='icon' className={styles.icon} />
              Записаться
            </span>
            <span onClick={() => mobx.setRoute('/info')} className={ mobx.getRoute() === '/info' ? styles.link : classNames(styles.inactive, styles.link) }>
              <img src={info} alt='icon' className={styles.icon} />
              <span className={styles.link_text}>
                Информация
              </span>
            </span>
          </>
          :
          <>
            <NavLink to='/' className={({ isActive }) => (isActive ||  window.location.href.includes('secret') ? styles.link : classNames(styles.inactive, styles.link) )}>
              <img src={home} alt='icon' className={styles.icon} />
              Главная
            </NavLink>
            <NavLink to='/doctors' className={({ isActive }) => (isActive ||  window.location.href.includes('secret')  ? styles.link : classNames(styles.inactive, styles.link) )}>
              <img src={doctors} alt='icon' className={styles.icon} />
              Врачи
            </NavLink>
            <NavLink to='/signup' className={({ isActive }) => (isActive ||  window.location.href.includes('secret')  ? styles.link : classNames(styles.inactive, styles.link) )}>
              <img src={file} alt='icon' className={styles.icon} />
              Записаться
            </NavLink>
            <NavLink to='/info' className={({ isActive }) => (isActive ||  window.location.href.includes('secret')  ? styles.link : classNames(styles.inactive, styles.link) )}>
              <img src={info} alt='icon' className={styles.icon} />
              <span className={styles.link_text}>
                Информация
              </span>
            </NavLink>
          </>
          }
        </div>
      </div>
    </>

  )
};

export default NavBarLayout
