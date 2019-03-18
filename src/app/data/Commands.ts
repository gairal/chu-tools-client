import { IQuery } from '@/store/commands/types';
import Persistable from './Persistable';

export default class Commands extends Persistable<IQuery> {
  constructor(idToken: string) {
    super('VC_COMMANDS', idToken);
  }
}
