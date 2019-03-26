import moment from 'moment';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import FormView from '@/components/Search/Form/FormView';
import { IApplicationState } from '@/store';
import { requestSend, tweetsFlush, tweetsLoad } from '@/store/tweet/actions';

const mapStateToProps = ({ tweet }: IApplicationState) => ({
  loading: tweet.loading,
  tweets: tweet.tweets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  flush: () => dispatch(tweetsFlush()),
  load: () => dispatch(tweetsLoad()),
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
