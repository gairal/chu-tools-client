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
  tweets: IPost[];
}

const SaveForm: React.SFC<IProps> = ({ loading, sheets, save, tweets }) => {
  const [sheetId, setSheetId] = React.useState();

  const saveSheet = (twits: IPost[]) => {
    save(sheetId, twits);
  };

  return (
    <form className="flex p-2">
      <SheetSelector sheets={sheets} setSheetId={setSheetId} />
      <SaveButton loading={loading} save={saveSheet} tweets={tweets} />
    </form>
  );
};

export default SaveForm;
