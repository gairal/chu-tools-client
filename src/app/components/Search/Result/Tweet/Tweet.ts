import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setSentiment, setVisibility } from '@/store/search/actions';
import { Sentiment } from '@/store/search/types';
import TweetView from './TweetView';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheSentiment: (i: number, s: Sentiment) => dispatch(setSentiment(i, s)),
  setTheVisibility: (i: number, v: boolean) => dispatch(setVisibility(i, v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetView);
