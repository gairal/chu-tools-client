import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SaveFormView from '@/components/Search/Result/SaveForm/SaveFormView';
import { IApplicationState } from '@/store';
import { saveSend } from '@/store/sheet/actions';
import { IOrderedTweetIds } from '@/store/tweet/types';

const mapStateToProps = ({ tweet }: IApplicationState) => ({
  loading: tweet.loading,
  tweets: tweet.tweets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  save: (sheetId: string, ids: IOrderedTweetIds) =>
    dispatch(saveSend(sheetId, ids)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveFormView);
