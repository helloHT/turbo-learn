import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { add } from 'math-helpers';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
      result: add(1, 9),
    };
  }
}
