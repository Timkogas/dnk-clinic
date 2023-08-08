import classNames from 'classnames';
import styles from './Select.module.scss';
import { FC, memo, useState } from 'react';
import dropDown from '../../../assets/images/select-dropdown.svg'
import dropDownActive from '../../../assets/images/select-dropdown-active.svg'

interface Option {
  text: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  doctors?: boolean
}

const Select: FC<SelectProps> = ({
  options,
  className,
  value,
  onChange,
  doctors,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(styles.select, className)}
      tabIndex={0}
      onClick={toggleDropdown}
    >
      {doctors ? value === '' ? <p className={styles.placeholder}>Поиск специалиста</p> : value : value}

      {/* Render dropdown options only if the dropdown is open */}
      {isOpen && (
        <div className={classNames(styles.options, {[styles.doctors_options]: doctors})}>
          {options.map((option,i) => (
            <div
              key={i}
              className={styles.option}
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
      {doctors ? null : <img src={isOpen ? dropDownActive : dropDown} alt='' className={classNames(styles.dropDown)}/>}
    </div>
  );
};

export default memo(Select);