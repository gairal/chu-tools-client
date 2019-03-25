import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { setSentiment, setVisibility } from '@/store/tweet/actions';
import { Sentiment } from '@/store/tweet/types';
import TweetView from './TweetView';

const mapStateToProps = ({ category }: IApplicationState) => ({
  categories: category.categories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheSentiment: (i: number, s: Sentiment) => dispatch(setSentiment(i, s)),
  setTheVisibility: (i: number, v: boolean) => dispatch(setVisibility(i, v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetView);
