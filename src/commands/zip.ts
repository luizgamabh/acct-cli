import { Command, flags } from '@oclif/command';
import zip from '../handlers/zip/zip.handler';

export default class Zip extends Command {
  static description =
    'Generate project zip file into .releases directory based on latest tag';

  static flags = {
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n', description: 'file name' }),
    force: flags.boolean({
      char: 'f',
      description: 'forces rewriting existing file with same name',
    }),
    interactive: flags.boolean({
      char: 'i',
      description: 'interactive mode',
    }),
    dryRun: flags.boolean({
      char: 'd',
      description:
        'simulates action, do not generate or modify any file in project',
    }),
    noValidate: flags.boolean({
      description: 'Ignore git errors, used for testing purposes',
      hidden: true,
    }),
  };

  async run() {
    const { flags } = this.parse(Zip);
    await zip(this)(flags);
  }
}
