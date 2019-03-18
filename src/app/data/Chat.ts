import { IMessage } from '@/store/chat/types';
import Persistable from './Persistable';

export default class Chat extends Persistable<IMessage> {
  constructor(idToken: string) {
    super('VC_DIALOG', idToken);
  }
}
