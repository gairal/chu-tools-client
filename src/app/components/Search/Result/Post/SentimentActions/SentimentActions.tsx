import * as React from 'react';

import { setSentiment } from '@/store/post/actions';
import { ISentiment } from '@/store/sentiment/types';

interface ISentimentButtonProps {
  color: string;
  label: string;
  icon: string;
  isPlaceholder?: boolean;
  setASentiment?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SentimentButton: React.SFC<ISentimentButtonProps> = ({
  color,
  label,
  icon,
  isPlaceholder = false,
  setASentiment,
}) => (
  <button
    type="button"
    className={`p-1 m-2 w-full ${
      isPlaceholder
        ? `border border-${color}-500`
        : `bg-${color}-500 hover:bg-${color}-600`
    }`}
    data-sentiment={label}
    title={label}
    onClick={setASentiment}
  >
    <i className={`fas fa-${icon}`} />
  </button>
);

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

  return (
    <div className="flex justify-between">
      {sentiments.length
        ? sentiments.map(s => (
            <SentimentButton
              key={s.id}
              color={s.color}
              label={s.label}
              icon={s.icon}
              setASentiment={setASentiment}
            />
          ))
        : [...Array(5)].map((_, i) => (
            <SentimentButton
              key={i}
              isPlaceholder={true}
              color="grey"
              label="placholder"
              icon="dizzy"
            />
          ))}
    </div>
  );
};

export default SentimentActions;
