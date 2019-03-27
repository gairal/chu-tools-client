import { connect } from 'react-redux';

import { IApplicationState } from '@/store';
import LoaderView from './LoaderView';

const mapStateToProps = ({
  tweet,
  sheet,
  sentiment,
  category,
}: IApplicationState) => ({
  categoryLoading: category.loading,
  sentimentLoading: sentiment.loading,
  sheetLoading: sheet.loading,
  tweetLoading: tweet.loading,
});

export default connect(mapStateToProps)(LoaderView);
