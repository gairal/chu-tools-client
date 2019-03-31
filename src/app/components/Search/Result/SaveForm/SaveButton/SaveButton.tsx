import * as React from 'react';

import { IPost } from '@/store/types';

interface IProps {
  loading: boolean;
  save: (tweets: IPost[]) => void;
  posts: IPost[];
}

const SaveButton: React.SFC<IProps> = ({ loading, save, posts }) => {
  const handleSave = () => {
    const filteredPosts = posts.filter(p => !!p.sentiment);
    save(filteredPosts);
  };

  return (
    <button
      type="button"
      className="text-blue hover:text-blue-dark px-8"
      onClick={handleSave}
      disabled={loading}
    >
      <i className="fas fa-file-import" />
    </button>
  );
};

export default SaveButton;
