import { Command } from '@oclif/command';
import { join } from 'path';
import * as chalk from 'chalk';
import * as ora from 'ora';

import { notification } from '../../../utils/notification';
import { FlagsInterface } from '../../../interfaces/flags.interface';
import scaffold from '../../../utils/scaffold';

const dotfiles = (command: Command) => async (flags: FlagsInterface) => {
  const { dryRun } = flags;

  if (dryRun) {
    command.log(
      `${chalk.green('Simulation mode, no files created or changed.')}`
    );
  }

  const spinner = ora('Generating files').start();

  const inDir = join(__dirname, '../../../templates/dotfiles');
  const outDir = process.cwd();
  await scaffold(inDir, outDir)
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

export default dotfiles;
