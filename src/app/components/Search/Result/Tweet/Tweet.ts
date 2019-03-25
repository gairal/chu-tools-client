import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import {
  setCategory,
  setSentiment,
  setVisibility,
} from '@/store/tweet/actions';
import { Sentiment } from '@/store/tweet/types';
import TweetView from './TweetView';

const mapStateToProps = ({ category }: IApplicationState) => ({
  categories: category.categories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheCategory: (i: string, c: string) => dispatch(setCategory(i, c)),
  setTheSentiment: (i: string, s: Sentiment) => dispatch(setSentiment(i, s)),
  setTheVisibility: (i: string, v: boolean) => dispatch(setVisibility(i, v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetView);
