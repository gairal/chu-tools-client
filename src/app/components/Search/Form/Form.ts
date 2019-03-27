import moment from 'moment';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import FormView from '@/components/Search/Form/FormView';
import { IApplicationState } from '@/store';
import { loadTweets, tweetsFlush, tweetsLoad } from '@/store/tweet/actions';

const mapStateToProps = ({ tweet }: IApplicationState) => ({
  loading: tweet.loading,
  tweets: tweet.tweets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  flush: () => dispatch(tweetsFlush()),
  load: () => dispatch(tweetsLoad()),
  request: (term: string, start: moment.Moment, end: moment.Moment) =>
    dispatch(
      loadTweets(term, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormView);
