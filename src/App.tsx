import { useState } from "react";

import "./App.css";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

interface SelectAllCheckboxProps {
  options: string[];
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      {label}
    </label>
  );
};

const SelectAllCheckbox: React.FC<SelectAllCheckboxProps> = ({ options }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
    [key: string]: boolean;
  }>(
    options.reduce((acc, option) => {
      acc[option] = false;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const newSelectedCheckboxes = { ...selectedCheckboxes };
    for (const option of options) {
      newSelectedCheckboxes[option] = checked;
    }
    setSelectedCheckboxes(newSelectedCheckboxes);
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const newSelectedCheckboxes = { ...selectedCheckboxes, [option]: checked };
    setSelectedCheckboxes(newSelectedCheckboxes);

    const allOptionsChecked = options.every(
      (option) => newSelectedCheckboxes[option]
    );
    setSelectAll(allOptionsChecked);
  };

  return (
    <div className="checkbox-container">
      <Checkbox
        label="Select All"
        isChecked={selectAll}
        onChange={handleSelectAll}
      />
      {options.map((option, index) => (
        <Checkbox
          key={index}
          label={option}
          isChecked={selectedCheckboxes[option]}
          onChange={(checked) => handleCheckboxChange(option, checked)}
        />
      ))}
    </div>
  );
};

function App() {
  const options: string[] = ["India", "USA", "France"];

  return (
    <>
      <SelectAllCheckbox options={options} />
    </>
  );
}

export default App;
