import * as React from 'react';

import Post from '@/components/Search/Result/Post';
import { loadMorePosts } from '@/store/post/actions';
import { ISentiment } from '@/store/sentiment/types';
import { IPost } from '@/store/types';

interface IProps {
  className?: string;
  loading?: boolean;
  sentiment?: ISentiment;
  posts: IPost[];
  style?: React.CSSProperties;
  loadMore?: typeof loadMorePosts;
}

type AllProps = IProps;

const PostsView: React.SFC<AllProps> = ({
  posts,
  sentiment,
  style,
  className,
  loadMore,
}) => {
  const infiniteListRef: React.RefObject<HTMLDivElement> = React.useRef(null);

  if (loadMore) {
    React.useEffect(() => {
      infiniteListRef.current.addEventListener('scroll', () => {
        if (
          infiniteListRef.current.scrollTop +
            infiniteListRef.current.clientHeight >=
          infiniteListRef.current.scrollHeight
        ) {
          loadMore();
        }
      });
    }, []);
  }

  return (
    <div
      className={`flex flex-col px-2 h-full overflow-y-auto ${className}`}
      style={style}
      ref={infiniteListRef}
    >
      {sentiment && (
        <h2
          className={`p-2 border-b uppercase text-${
            sentiment.color === 'black' ? 'white' : `${sentiment.color}-500`
          } text-center text-lg`}
        >
          {sentiment.label}
          <i className={`fas fa-${sentiment.icon} ml-2`} />
        </h2>
      )}
      <ul className="list-reset p-2">
        {posts
          .sort((t1, t2) => {
            if (t1.hidden && !t2.hidden) {
              return 1;
            }
            if (!t1.hidden && t2.hidden) {
              return -1;
            }

            return 0;
          })
          .map(t => (
            <Post key={t.id} post={t} />
          ))}
      </ul>
    </div>
  );
};

export default PostsView;
