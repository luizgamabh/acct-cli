import { Command } from '@oclif/command';
import { join } from 'path';
import { promisify } from 'util';
import * as copyCb from 'copy-template-dir';
import * as chalk from 'chalk';
import * as ora from 'ora';
import { notification } from '@acct/utils/notification';
import { FlagsInterface } from '@acct/interfaces/flags.interface';
import { getReplacements } from './parsers/replacements';

const copy = promisify(copyCb);

export const metadata = (command: Command) => async (flags: FlagsInterface) => {
  const { dryRun } = flags;

  if (dryRun) {
    command.log(
      `${chalk.green('Simulation mode, no files created or changed.')}`
    );
  }

  const spinner = ora('Generating files').start();

  const replacements = await getReplacements();

  const inDir = join(__dirname, '../../templates/metadata');
  const outDir = process.cwd();
  await copy(inDir, outDir, replacements)
    .then(() => {
      spinner.succeed('Success');
      spinner.stop();
    })
    .catch((error: any) => {
      command.log(notification.error('Could not generate files'));
      command.log(error);
    });

  command.exit();
};
