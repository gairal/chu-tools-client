import * as React from 'react';

import { IPost } from '@/store/types';

interface IProps {
  loading: boolean;
  save: (tweets: IPost[]) => void;
  tweets: IPost[];
}

const SaveButton: React.SFC<IProps> = ({ loading, save, tweets }) => {
  const handleSave = () => {
    const filteredTweets = tweets.filter(t => !!t.sentiment);
    save(filteredTweets);
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
