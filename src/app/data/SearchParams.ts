import { ISearchParams } from '@/store/tweet/types';
import Persistable from './Persistable';

export default class SearchParams extends Persistable<ISearchParams> {
  constructor() {
    super('CHOOLS_SEARCH_PARAMS');
  }
}
