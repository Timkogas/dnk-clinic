import { FC, ReactNode } from 'react';
import styles from'./Bubble.module.scss'

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
    <div className={styles.bubble}>
      {children}
    </div>
  )
};

export default Bubble
