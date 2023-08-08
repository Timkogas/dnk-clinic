import { Outlet } from 'react-router-dom';
import styles from './NavBarLayout.module.scss'

import home from '../../assets/images/icon-home.svg'
import doctors from '../../assets/images/icon-doctors.svg'
import file from '../../assets/images/icon-file.svg'
import info from '../../assets/images/icon-info.svg'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const NavBarLayout = () => {
  const allActive = window.location.href.includes('secret')
  return (
    <>
      <Outlet />

      <div className={styles.NavBar}>
        <div className={styles.content}>

          <NavLink to='/' className={({ isActive }) => (isActive || allActive ? styles.link : classNames(styles.inactive, styles.link) )}>
            <img src={home} alt='icon' className={styles.icon} />
            Главная
          </NavLink>

          <NavLink to='/doctors' className={({ isActive }) => (isActive || allActive  ? styles.link : classNames(styles.inactive, styles.link) )}>
            <img src={doctors} alt='icon' className={styles.icon} />
            Врачи
          </NavLink>

          <NavLink to='/signup' className={({ isActive }) => (isActive || allActive  ? styles.link : classNames(styles.inactive, styles.link) )}>
            <img src={file} alt='icon' className={styles.icon} />
            Записаться
          </NavLink>

          <NavLink to='/info' className={({ isActive }) => (isActive || allActive  ? styles.link : classNames(styles.inactive, styles.link) )}>
            <img src={info} alt='icon' className={styles.icon} />
            <span className={styles.link_text}>
              Информация о клинике
            </span>
          </NavLink>

        </div>
      </div>
    </>

  )
};

export default NavBarLayout
