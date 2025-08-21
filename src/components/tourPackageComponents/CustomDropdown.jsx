'use client';

import { useState } from 'react';
import styles from './CustomDropdown.module.scss';
import { Check } from 'lucide-react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CustomDropdown = ({ label, options = [], icon: IconComponent, isDate }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(isDate ? label : options[0]);
  const [tempRange, setTempRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [confirmedRange, setConfirmedRange] = useState(null);
  const [datePreset, setDatePreset] = useState('Set up');

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  const handlePresetClick = (preset) => {
    setDatePreset(preset);
    // Optionally implement auto-date range setting based on preset
  };

  const handleApply = () => {
    setConfirmedRange(tempRange);
    const { startDate, endDate } = tempRange[0];
    const formatted = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    setSelected(formatted);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.toggle}>
        {IconComponent && (
          <IconComponent
            className={styles.icon}
            size={16}
          />
        )}
        <span>{selected}</span>
        <span className={styles.arrow}>▼</span>
      </button>

      {/* Options Dropdown */}
      {open && !isDate && (
        <div className={styles.menu}>
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(option)}
              className={`${styles.option} ${selected === option ? styles.selected : ''}`}
            >
              {selected === option && <Check className={styles.checkmark} size={16} />}
              {option}
            </div>
          ))}
        </div>
      )}

      {/* Date Range Dropdown */}
      {open && isDate && (
        <div className={styles.dateContainer}>
          <div className={styles.dateOptions}>
            {['Today', 'This week', 'This month', 'This year', 'Set up'].map((item, idx) => (
              <label
                key={idx}
                className={`${styles.dateOption} ${datePreset === item ? styles.active : ''}`}
              >
                <input
                  type="radio"
                  name="range"
                  checked={datePreset === item}
                  onChange={() => handlePresetClick(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <div className={styles.calendar}>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setTempRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={tempRange}
              rangeColors={['#367C2D']}
            />
            <div className={styles.dateActions}>
              <span className={styles.dates}>
                {tempRange[0].startDate.toLocaleDateString()} -{' '}
                {tempRange[0].endDate.toLocaleDateString()}
              </span>
              <div className={styles.buttons}>
                <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
                <button className={styles.apply} onClick={handleApply}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
