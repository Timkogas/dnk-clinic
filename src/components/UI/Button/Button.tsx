import { memo, type ButtonHTMLAttributes, type FC } from 'react'

import styles from './Button.module.scss'
import classNames from 'classnames';

import fingerIcon from '../../../assets/images/finger.png'

export enum ThemeButton {
  RED = 'red',
  BLUE = 'blue'
}

type ButtonProps = {
  className?: string;
  theme: ThemeButton,
  text: string,
  outlineClass?: string,
  finger?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = props => {
  let {
    className,
    theme,
    text,
    outlineClass,
    disabled,
    finger,
    ...otherProps
  } = props
  
  let outlineStyle
  let frontStyle
  if (theme === ThemeButton.RED) {
    frontStyle = styles.red_front
    outlineStyle = styles.red_outline
  } else if (theme === ThemeButton.BLUE) {
    frontStyle = styles.blue_front
    outlineStyle = styles.blue_outline
  }

  if (finger) {
    return (
      <div className={classNames(styles.button, styles.pulse)}>
        <button
          className={classNames(styles.button, [className, styles[theme]], {[styles.disabled]: disabled })}
          disabled={disabled}
          {...otherProps}
        >
          <img className={styles.finger} src={fingerIcon} />
          <div className={classNames(styles.text, {[styles.disabled]: disabled})}>
          {text}
            <div className={classNames(frontStyle, {[styles.disabled]: disabled})}>
              {text}
            </div>
            <div className={classNames(outlineStyle, outlineClass, {[styles.disabled]: disabled})} >
              {text}
            </div>
          </div>
        </button>
      </div>
    )
  } else {
    return (
      <button
        className={classNames(styles.button, [className, styles[theme]], {[styles.disabled]: disabled })}
        disabled={disabled}
        {...otherProps}
      >
        <div className={classNames(styles.text, {[styles.disabled]: disabled})}>
        {text}
          <div className={classNames(frontStyle, {[styles.disabled]: disabled})}>
            {text}
          </div>
          <div className={classNames(outlineStyle, outlineClass, {[styles.disabled]: disabled})} >
            {text}
          </div>
        </div>
      </button>
    )
  }


};

export default memo(Button)