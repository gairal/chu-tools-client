import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { loadMorePosts } from '@/store/post/actions';
import ResultView from './ResultView';

const mapStateToProps = ({ post, sentiment }: IApplicationState) => ({
  loading: post.loading,
  posts: post.posts,
  saved: post.saved,
  sentiments: sentiment.sentiments,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadMore: () => dispatch(loadMorePosts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultView);
