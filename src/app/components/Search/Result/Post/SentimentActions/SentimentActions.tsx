import * as React from 'react';

import { ISentiment } from '@/store/sentiment/types';
import { setSentiment } from '@/store/tweet/actions';

interface IProps {
  id: string;
  sentiments: ISentiment[];
  setTheSentiment: typeof setSentiment;
}
type AllProps = IProps;

const SentimentActions: React.SFC<AllProps> = ({
  id,
  sentiments,
  setTheSentiment,
}) => {
  const setASentiment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setTheSentiment(id, e.currentTarget.dataset.sentiment);
  };

  const defaultActionClassNames = 'p-1 m-2 w-full';

  return (
    <div className="flex justify-between">
      {sentiments.map(s => (
        <button
          className={`${defaultActionClassNames} bg-${s.color} hover:bg-${
            s.color
          }-dark`}
          data-sentiment={s.label}
          key={s.id}
          title={s.label}
          onClick={setASentiment}
        >
          <i className={`fas fa-${s.icon}`} />
        </button>
      ))}
    </div>
  );
};

export default SentimentActions;
