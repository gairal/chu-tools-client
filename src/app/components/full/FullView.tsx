import { IPost } from '@/store/types';
import * as React from 'react';

interface IFullviewProps {
  post: IPost;
}

type AllProps = IFullviewProps;

const SearchView: React.SFC<AllProps> = () => {
  return <div className="">HELLO</div>;
};

export default SearchView;
