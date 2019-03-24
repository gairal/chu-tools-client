import { connect } from 'react-redux';

import { IApplicationState } from '@/store';
import LoaderView from './LoaderView';

const mapStateToProps = ({ tweet }: IApplicationState) => ({
  loading: tweet.loading,
});

export default connect(mapStateToProps)(LoaderView);
