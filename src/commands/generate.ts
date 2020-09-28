import { Command, flags } from '@oclif/command';
import notification from '@acct/utils/notification';

export default class Generate extends Command {
  static description = 'ACCT scaffold command';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [];

  async run() {
    this.log(notification.warn('No command passed'));
    this._help();
    this.exit();
  }
}
