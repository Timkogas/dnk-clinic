import { FC, ReactNode, memo } from 'react';
import styles from'./Bubble.module.scss'
import classNames from 'classnames';

type BubbleProps = {
  className?: string;
  children?: ReactNode
}

const Bubble: FC<BubbleProps> = props => {
  let {
    className,
    children,
  } = props

  return (
    <div className={classNames(styles.bubble, className)}>
      {children}
    </div>
  )
};

export default memo(Bubble)
