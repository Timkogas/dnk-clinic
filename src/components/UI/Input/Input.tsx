import classNames from 'classnames'
import styles from './Input.module.scss'
import {
  type InputHTMLAttributes, 
  type FC, 
  memo, 
  useRef
} from 'react'
import { useHref } from 'react-router-dom'
import { IMaskInput } from 'react-imask';


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  light?: boolean
  phone?: boolean
}


const Input: FC<InputProps> = props => {
  const {
    className,
    value,
    onChange,
    light,
    phone,
    ...otherProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  const ref = useRef(null);
  const inputRef = useRef(null);

  return (
    <>
      {phone ?
        <IMaskInput
          mask={'+{7} (000) 000 00-00'}
          radix="."
          value={value}
          unmask={true}
          ref={ref}
          inputRef={inputRef}
          onAccept={
            (value, mask) => onChange?.(value)
          }
          placeholder='+7'
          className={classNames(styles.input, { [styles.light]: light })}
        /> :
        <input
          value={value}
          onChange={onChangeHandler}
          className={classNames(styles.input, { [styles.light]: light })}
          {...otherProps}
        />}

    </>
  )
};

export default memo(Input)
