import moment from 'moment';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import FormView from '@/components/Search/Form/FormView';
import { IApplicationState } from '@/store';
import { requestSend } from '@/store/tweet/actions';

const mapStateToProps = ({ tweet }: IApplicationState) => ({
  loading: tweet.loading,
  tweets: tweet.tweets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  request: (
    term: string,
    start: moment.Moment,
    end: moment.Moment,
    count: number,
  ) => dispatch(requestSend(term, start, end, count)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormView);
