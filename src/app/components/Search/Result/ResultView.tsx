import * as React from 'react';

import Posts from '@/components/Search/Result/Posts';
import SaveForm from '@/components/Search/Result/SaveForm';
import { loadMorePosts } from '@/store/post/actions';
import { ISentiment } from '@/store/sentiment/types';
import { IPost } from '@/store/types';

interface IPropsFromState {
  saved: string[];
  posts: IPost[];
  loading?: boolean;
  sentiments: ISentiment[];
  title?: string;
}

interface IPropsFromDispatch {
  loadMore: typeof loadMorePosts;
}

interface IOrderedPosts {
  unordered: IPost[];
  [key: string]: IPost[];
}

type AllProps = IPropsFromState & IPropsFromDispatch;

const ResultView: React.SFC<AllProps> = ({
  saved,
  posts,
  sentiments,
  loadMore,
}) => {
  const sentimentLabels = sentiments.map(s => s.label);

  const orderedPosts: IOrderedPosts = posts
    .filter(t => !saved.includes(t.id))
    .reduce(
      (acc: IOrderedPosts, t) => {
        if (!t.sentiment) {
          acc.unordered.push(t);
        } else if (sentimentLabels.includes(t.sentiment)) {
          if (!acc[t.sentiment]) {
            acc[t.sentiment] = [];
          }

          acc[t.sentiment].push(t);
        }
        return acc;
      },
      {
        unordered: [],
      },
    );

  const shouldSave = Object.keys(orderedPosts).length > 1;

  return (
    <div className="flex flex-col-reverse md:flex-row h-full flex-no-grow flex-no-shrink">
      <Posts
        posts={orderedPosts.unordered}
        loadMore={loadMore}
        className="tweets__unordered"
      />
      <div className="shadow-sm flex-1 w-0 flex flex-col w-full p-2">
        {shouldSave && <SaveForm />}
        <div className="hidden md:flex overflow-x-auto flex-1">
          {sentiments.map(s => (
            <Posts
              key={s.id}
              posts={orderedPosts[s.label] || []}
              sentiment={s}
              style={{ flex: '0 0 25vw' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultView;
