import * as React from 'react';

import { ICategory } from '@/store/category/types';
import { setCategory } from '@/store/tweet/actions';
import { ITweet } from '@/store/tweet/types';

interface IProps {
  categories: ICategory[];
  tweet: ITweet;
  setTheCategory: typeof setCategory;
}
type AllProps = IProps;

const Category: React.SFC<AllProps> = ({
  categories,
  tweet,
  setTheCategory,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheCategory(tweet.id, e.target.value);
  };

  return tweet.sentiment ? (
    <select className="flex-1" onChange={handleChange} value={tweet.category}>
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
