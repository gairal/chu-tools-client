import * as React from 'react';

import { requestSend, saveSend } from '@/store/search/actions';
import { ITweet, Sentiment } from '@/store/search/types';

interface IPropsFromState {
  tweets: ITweet[];
  loading: boolean;
}

interface IPropsFromDispatch {
  request: typeof requestSend;
  save: typeof saveSend;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const FormView: React.SFC<AllProps> = ({ request, save, tweets, loading }) => {
  const [keyword, setKeyword] = React.useState('');

  // TODO: REMOVE
  // React.useEffect(() => {
  //   request('group');
  // }, [false]);

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) request(keyword);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSave = () => {
    const orderedTweets = tweets.reduce(
      (twits, tweet) => {
        if (tweet.sentiment === Sentiment.Negative) {
          twits.negative.push(tweet.id);
        } else if (tweet.sentiment === Sentiment.Positive) {
          twits.positive.push(tweet.id);
        } else if (tweet.sentiment === Sentiment.Neutral) {
          twits.neutral.push(tweet.id);
        }

        return twits;
      },
      {
        negative: [],
        neutral: [],
        positive: [],
      },
    );

    save(orderedTweets);
  };

  return (
    <form className="flex justify-between">
      <input
        className="p-2 w-full bg-grey-lighter"
        onChange={handleKeywordChange}
        onKeyUp={keyPress}
        placeholder="keyword"
        type="text"
        value={keyword}
      />
      <button
        type="button"
        className="text-blue"
        onClick={handleSave}
        disabled={loading}
      >
        <i className="fas fa-file-import" />
      </button>
    </form>
  );
};

export default FormView;
