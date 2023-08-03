import { memo, type FC } from 'react'

import styles from './TextBorder.module.scss'
import classNames from 'classnames';

export enum ThemeTextBorder {
  RED = 'red',
  GREENBLUE = 'greenblue'
}

type TextBorderProps = {
  className?: string;
  theme: ThemeTextBorder,
  text: string,
  center?: boolean,
}

const TextBorder: FC<TextBorderProps> = props => {
  let {
    className,
    theme,
    text,
    center
  } = props

  let outlineStyle
  let frontStyle

  if (theme === ThemeTextBorder.RED) {
    frontStyle = styles.red_front
    outlineStyle = styles.red_outline
  } else if (theme === ThemeTextBorder.GREENBLUE) {
    frontStyle = styles.greenblue_front
    outlineStyle = styles.greenblue_outline
  }

  return (
    <div className={classNames(styles.text, className, {[styles.center_text]: center})}>
      {text}
      <div className={classNames(frontStyle, {[styles.center_border]: center})}>
        {text}
      </div>
      <div className={classNames(outlineStyle, {[styles.center_border]: center})} >
        {text}
      </div>
    </div>
  )
};

export default memo(TextBorder)