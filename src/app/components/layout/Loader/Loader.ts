import { connect } from 'react-redux';

import { IApplicationState } from '@/store';
import LoaderView from './LoaderView';

const mapStateToProps = ({
  post,
  sheet,
  sentiment,
  category,
}: IApplicationState) => ({
  categoryLoading: category.loading,
  postLoading: post.loading,
  sentimentLoading: sentiment.loading,
  sheetLoading: sheet.loading,
});

export default connect(mapStateToProps)(LoaderView);
