import { FC, useState, memo } from 'react';
import styles from './CheckBox.module.scss';
import classNames from 'classnames';

interface Option {
  text: string;
  value: number;
}

interface CheckboxProps {
  options: Option[];
  selectedValue: number | null
  onChange?: (value: number) => void;
}

const CheckBox: FC<CheckboxProps> = ({ options, onChange, selectedValue }) => {
  
  const handleOptionChange = (value: number) => {
    onChange?.(value);
  };

  return (
    <div className={styles.checkbox_wrapper}>
      {options.map(({ text, value }) => (
        <label key={value} className={styles.option}>
          <input
            className={classNames(styles.checkbox, styles['checkbox-custom'])}
            type="radio"
            value={value}
            checked={selectedValue === value}
            onChange={() => handleOptionChange(value)}
          />
          {text}
        </label>
      ))}
    </div>
  );
};

export default memo(CheckBox);