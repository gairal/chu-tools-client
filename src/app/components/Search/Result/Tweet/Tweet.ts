import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setSentiment } from '@/store/search/actions';
import { sentiment } from '@/store/search/types';
import TweetView from './TweetView';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheSentiment: (i: number, s: sentiment) => dispatch(setSentiment(i, s)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetView);
