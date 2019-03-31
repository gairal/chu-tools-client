import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SaveFormView from '@/components/Search/Result/SaveForm/SaveFormView';
import { IApplicationState } from '@/store';
import { saveSend } from '@/store/sheet/actions';
import { IPost } from '@/store/types';

const mapStateToProps = ({ post, sheet }: IApplicationState) => ({
  loading: post.loading,
  posts: post.posts,
  sheets: sheet.sheets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  save: (sheetId: string, posts: IPost[]) => dispatch(saveSend(sheetId, posts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveFormView);
