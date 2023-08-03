import logo from '../../../assets/images/logo.png'
import styles from './Logo.module.scss'

export const Logo = () => {

  return (
    <>
      <img src={logo} alt='logo' className={styles.img} />

    </>
  )
};

export default Logo
