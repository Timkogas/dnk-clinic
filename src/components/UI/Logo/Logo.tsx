import { FC, memo } from 'react';
import logo from '../../../assets/images/logo.png'
import styles from './Logo.module.scss'

type LogoProps = {
  subtitle?: boolean
} 

const  Logo: FC<LogoProps> = props => {
  let {
    subtitle
  } = props

  return (
    <div className={styles.block}>
      <img src={logo} alt='logo' className={styles.img} />
      {subtitle ? <span className={styles.subtitle}>Узнай секрет своего долголетия</span> : null}
    </div>
  )
};

export default memo(Logo)
