import * as React from 'react';

import { ICategory } from '@/store/category/types';
import { setCategory } from '@/store/tweet/actions';
import { IPost } from '@/store/types';

interface IProps {
  categories: ICategory[];
  post: IPost;
  setTheCategory: typeof setCategory;
}
type AllProps = IProps;

const Category: React.SFC<AllProps> = ({
  categories,
  post,
  setTheCategory,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheCategory(post.id, e.target.value);
  };

  return post.sentiment ? (
    <select className="flex-1" onChange={handleChange} value={post.category}>
      <option value="">category</option>
      {categories.map(c => (
        <option key={c.label} value={c.label}>
          {c.label}
        </option>
      ))}
    </select>
  ) : (
    <div className="flex-1" />
  );
};

export default Category;
