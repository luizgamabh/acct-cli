import { Command, flags } from '@oclif/command';
import metadata from '../handlers/generate/metadata.handler';

export default class Generate extends Command {
  static description = 'ACCT scaffold command';

  static flags = {
    help: flags.help({ char: 'h' }),
    force: flags.boolean({
      char: 'f',
      description: 'forces rewriting existing files',
    }),
    dryRun: flags.boolean({
      char: 'd',
      description:
        'simulates action, do not generate or modify any file in project',
    }),
    noValidate: flags.boolean({
      description: 'Ignore errors, used for testing purposes',
      hidden: true,
    }),
  };

  static args = [
    {
      name: 'what',
      options: ['metadata', 'dotfiles', 'gitlab-ci'],
      required: true,
      description: 'Kind of structure to be generated',
    },
  ];

  async run() {
    const { args, flags } = this.parse(Generate);

    switch (args.what) {
      case 'metadata':
        await metadata(this)(flags);
        break;
      default:
        this.log('Invalid argument. Use -h to get available options.');
    }

    this.exit();
  }
}
