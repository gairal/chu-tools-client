import { connect } from 'react-redux';

import { IApplicationState } from '@/store';
import ResultView from './ResultView';

const mapStateToProps = ({ search }: IApplicationState) => ({
  loading: search.loading,
  tweets: search.tweets,
});

export default connect(mapStateToProps)(ResultView);
