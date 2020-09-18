import * as chalk from 'chalk';
import { NotificationColorEnum } from '../enums/notification-color.enum';

const _notify = (
  message: string | null,
  prefix = '',
  colorBg: NotificationColorEnum
) => {
  if (typeof message !== 'string') return undefined;
  const msg = message.replace(/^(warning:\s*)?(.+)/gi, `${prefix}$2`);
  const len = msg.length + 6;
  const spacing = new Array(len).fill(' ').join('');
  return chalk[colorBg](
    chalk.black(`\n${spacing}\n   ${msg}   \n${spacing}\n`)
  );
};

const notification = {
  warn(message: string) {
    return _notify(message, 'Warning: ', NotificationColorEnum.warning);
  },

  error(message: string) {
    return _notify(message, 'Error: ', NotificationColorEnum.error);
  },

  success(message: string) {
    return _notify(message, 'Success: ', NotificationColorEnum.success);
  },
};

export default notification;
