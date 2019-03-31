import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { loadMoreTweets } from '@/store/tweet/actions';
import ResultView from './ResultView';

const mapStateToProps = ({ tweet, sentiment }: IApplicationState) => ({
  loading: tweet.loading,
  posts: tweet.tweets,
  saved: tweet.saved,
  sentiments: sentiment.sentiments,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadMore: () => dispatch(loadMoreTweets()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultView);
