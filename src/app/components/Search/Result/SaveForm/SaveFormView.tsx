import * as React from 'react';

import SaveButton from '@/components/Search/Result/SaveForm/SaveButton';
import SheetSelector from '@/components/Search/Result/SaveForm/SheetSelector';
import { saveSend } from '@/store/sheet/actions';
import { ISheet } from '@/store/sheet/types';
import { IPost } from '@/store/types';

interface IProps {
  loading: boolean;
  save: typeof saveSend;
  sheets: ISheet[];
  posts: IPost[];
}

const SaveForm: React.SFC<IProps> = ({ loading, sheets, save, posts }) => {
  const [sheetId, setSheetId] = React.useState();

  const saveSheet = (localPosts: IPost[]) => {
    save(sheetId, localPosts);
  };

  return (
    <form className="flex p-2">
      <SheetSelector sheets={sheets} setSheetId={setSheetId} />
      <SaveButton loading={loading} save={saveSheet} posts={posts} />
    </form>
  );
};

export default SaveForm;
