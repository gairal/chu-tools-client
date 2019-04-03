import moment from 'moment';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import FormView from '@/components/Search/Form/FormView';
import { IApplicationState } from '@/store';
import { loadPosts, postsFlush } from '@/store/post/actions';
import { PostType } from '@/store/types';

const mapStateToProps = ({ post }: IApplicationState) => ({
  currentSearch: post.currentSearch,
  hasLoaded: post.hasLoaded,
  loading: post.loading,
  posts: post.posts,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  flush: () => dispatch(postsFlush()),
  request: (
    q: string,
    start: moment.Moment,
    end: moment.Moment,
    type: PostType,
  ) =>
    dispatch(
      loadPosts(q, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), type),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormView);
