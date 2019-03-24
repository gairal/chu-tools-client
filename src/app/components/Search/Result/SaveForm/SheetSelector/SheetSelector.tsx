import * as React from 'react';

import { ISheet } from '@/store/sheet/types';

interface IProps {
  setSheetId: React.Dispatch<React.SetStateAction<string>>;
  sheets: ISheet[];
}

const SheetSelector: React.SFC<IProps> = ({ sheets, setSheetId }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSheetId(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      {sheets.map(s => (
        <option key={s.id} value={s.id}>
          {s.title}
        </option>
      ))}
    </select>
  );
};

export default SheetSelector;
