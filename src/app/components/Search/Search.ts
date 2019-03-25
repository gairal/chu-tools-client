import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SearchView from '@/components/Search/SearchView';
import { IApplicationState } from '@/store';
import { requestCategories } from '@/store/category/actions';
import { requestSheets } from '@/store/sheet/actions';

const mapStateToProps = ({ tweet }: IApplicationState) => ({
  loading: tweet.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCategories: () => dispatch(requestCategories()),
  getSheets: () => dispatch(requestSheets()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchView);
