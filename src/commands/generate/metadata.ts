import { Command, flags } from '@oclif/command';
import metadata from '../../handlers/generate/metadata';

export default class Metadata extends Command {
  static description = 'Generate VTEX Store metadata. (interactive)';

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

  static args = [];

  async run() {
    const { flags } = this.parse(Metadata);
    await metadata(this)(flags);
    this.exit();
  }
}
