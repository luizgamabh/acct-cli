import { Command, flags } from '@oclif/command';
import dotfiles from '@acct/handlers/generate/dotfiles';

export default class DotFiles extends Command {
  static description = 'Generate project dotfiles.';

  static flags = {
    help: flags.help({ char: 'h' }),
    force: flags.boolean({
      char: 'f',
      description: 'forces rewriting existing files',
    }),
    interactive: flags.boolean({
      char: 'i',
      description: 'Interactive mode',
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
    const { flags } = this.parse(DotFiles);
    await dotfiles(this)(flags);
    this.exit();
  }
}
