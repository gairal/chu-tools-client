import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import {
  requestTranslate,
  setCategory,
  setSentiment,
  setVisibility,
} from '@/store/post/actions';
import PostView from './PostView';

const mapStateToProps = ({ category, sentiment }: IApplicationState) => ({
  categories: category.categories,
  sentiments: sentiment.sentiments,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheCategory: (i: string, c: string) => dispatch(setCategory(i, c)),
  setTheSentiment: (i: string, s: string) => dispatch(setSentiment(i, s)),
  setTheVisibility: (i: string, v: boolean) => dispatch(setVisibility(i, v)),
  translate: (id: string, source: string, q: string) =>
    dispatch(requestTranslate(id, source, q)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostView);
