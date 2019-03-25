import { connect } from 'react-redux';

import { IApplicationState } from '@/store';
import ResultView from './ResultView';

const mapStateToProps = ({ tweet, sentiment }: IApplicationState) => ({
  loading: tweet.loading,
  saved: tweet.saved,
  sentiments: sentiment.sentiments,
  tweets: tweet.tweets,
});

export default connect(mapStateToProps)(ResultView);
