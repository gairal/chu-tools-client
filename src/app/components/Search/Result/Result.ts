import { connect } from 'react-redux';

import { IApplicationState } from '@/store';
import ResultView from './ResultView';

const mapStateToProps = ({ tweet }: IApplicationState) => ({
  loading: tweet.loading,
  tweets: tweet.tweets,
});

export default connect(mapStateToProps)(ResultView);
