import * as React from 'react';

import { ICategory } from '@/store/category/types';

interface IProps {
  categories: ICategory[];
}
type AllProps = IProps;

const Category: React.SFC<AllProps> = ({ categories }) => {
  return (
    <select className="mt-2">
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
