import * as React from 'react';

import { ICategory } from '@/store/category/types';
import { setCategory } from '@/store/tweet/actions';

interface IProps {
  categories: ICategory[];
  id: string;
  setTheCategory: typeof setCategory;
}
type AllProps = IProps;

const Category: React.SFC<AllProps> = ({ categories, id, setTheCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheCategory(id, e.target.value);
  };

  return (
    <select className="mt-2" onChange={handleChange}>
      <option value="">category</option>
      {categories.map(c => (
        <option key={c.label} value={c.label}>
          {c.label}
        </option>
      ))}
    </select>
  );
};

export default Category;
