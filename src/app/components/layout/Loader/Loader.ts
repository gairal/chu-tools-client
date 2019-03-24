import { connect } from 'react-redux';

import { IApplicationState } from '@/store';
import LoaderView from './LoaderView';

const mapStateToProps = ({ search }: IApplicationState) => ({
  loading: search.loading,
});

export default connect(mapStateToProps)(LoaderView);
