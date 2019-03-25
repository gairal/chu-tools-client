import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import {
  setCategory,
  setSentiment,
  setVisibility,
} from '@/store/tweet/actions';
import TweetView from './TweetView';

const mapStateToProps = ({ category, sentiment }: IApplicationState) => ({
  categories: category.categories,
  sentiments: sentiment.sentiments,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheCategory: (i: string, c: string) => dispatch(setCategory(i, c)),
  setTheSentiment: (i: string, s: string) => dispatch(setSentiment(i, s)),
  setTheVisibility: (i: string, v: boolean) => dispatch(setVisibility(i, v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetView);
