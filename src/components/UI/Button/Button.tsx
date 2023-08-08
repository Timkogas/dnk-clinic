import { memo, type ButtonHTMLAttributes, type FC } from 'react'

import styles from './Button.module.scss'
import classNames from 'classnames';

export enum ThemeButton {
  RED = 'red',
  BLUE = 'blue'
}

type ButtonProps = {
  className?: string;
  theme: ThemeButton,
  text: string,
  outlineClass?: string,
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = props => {
  let {
    className,
    theme,
    text,
    outlineClass,
    disabled,
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


  return (
    <button
      className={classNames(styles.button, [className, styles[theme]], {[styles.disabled]: disabled})}
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
};

export default memo(Button)