import { memo, type ButtonHTMLAttributes, type FC } from 'react'

import styles from './Button.module.scss'
import classNames from 'classnames';

export enum ThemeButton {
  RED = 'red'
}

type ButtonProps = {
  className?: string;
  theme: ThemeButton,
  text: string,
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = props => {
  let {
    className,
    theme,
    text,
    ...otherProps
  } = props
  let outlineStyle
  let frontStyle
  if (theme === ThemeButton.RED) {
    frontStyle = styles.red_front
    outlineStyle = styles.red_outline
  }
  return (
    <button
      className={classNames(styles.button, [className, styles[theme]])}
      {...otherProps}
    >
      <div className={styles.text}>
      {text}
        <div className={classNames(frontStyle)}>
          {text}
        </div>
        <div className={classNames(outlineStyle)} >
          {text}
        </div>
      </div>
    </button>
  )
};

export default memo(Button)