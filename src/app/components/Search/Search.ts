import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SearchView from '@/components/Search/SearchView';
import { IApplicationState } from '@/store';
import { requestCategories } from '@/store/category/actions';
import { requestSentiments } from '@/store/sentiment/actions';
import { requestSheets } from '@/store/sheet/actions';
import { requestSaved } from '@/store/tweet/actions';

const mapStateToProps = ({ tweet }: IApplicationState) => ({
  loading: tweet.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  init: () => {
    dispatch(requestSaved());
    dispatch(requestSentiments());
    dispatch(requestSheets());
    dispatch(requestCategories());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchView);
