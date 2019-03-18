import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { setSentiment } from '@/store/search/actions';
import { sentiment } from '@/store/search/types';
import ResultView from './ResultView';

const mapStateToProps = ({ search }: IApplicationState) => ({
  loading: search.loading,
  tweets: search.tweets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheSentiment: (i: number, s: sentiment) => dispatch(setSentiment(i, s)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultView);
