import { FC, ReactNode, memo } from 'react';
import styles from './TestItem.module.scss'
import classNames from 'classnames';

type TestItemProps = {
  active?: boolean;
  children?: ReactNode
}

const TestItem: FC<TestItemProps> = props => {

  let {
    active,
    children
  } = props

  return (
    <div className={classNames(styles.item, {[styles.active]: active})}>
      {children}
    </div>
  )
};

export default memo(TestItem)
