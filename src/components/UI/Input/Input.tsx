import styles from './Input.module.scss'
import {
  type InputHTMLAttributes, memo, type FC
} from 'react'
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
}


const Input: FC<InputProps> = props => {
  const {
    className,
    value,
    onChange,
    placeholder,
    ...otherProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <input
      value={value}
      onChange={onChangeHandler}
      className={styles.input}
      {...otherProps}
    />
  )
};

export default memo(Input)
