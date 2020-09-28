import { Command } from '@oclif/command';
import { join } from 'path';
import { promisify } from 'util';
import * as copyCb from 'copy-template-dir';
import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as ora from 'ora';
import notification from '@acct/utils/notification';
import { FlagsInterface } from '@acct/interfaces/flags.interface';

import { promptMetadata } from './prompt';

const copy = promisify(copyCb);

const metadata = (command: Command) => async (flags: FlagsInterface) => {
  const { dryRun } = flags;

  if (dryRun) {
    command.log(
      `${chalk.green('Simulation mode, no files created or changed.')}`
    );
  }

  const replacements = await inquirer.prompt(promptMetadata);

  replacements.projectTitleAsJson = replacements.projectTitle.replace(
    /[\r\n\f]+/gm,
    ' '
  );

  replacements.shortDescriptionEnUsAsJson = replacements.shortDescriptionEnUs.replace(
    /[\r\n\f]+/gm,
    ' '
  );

  replacements.fullDescriptionEnUsAsJson = replacements.fullDescriptionEnUs.replace(
    /[\r\n\f]+/gm,
    ' '
  );

  replacements.featuresEnUsAsJson = `"${replacements.featuresEnUs
    .replace(/^(\s*-\s*|\s*$[\r\n\f\s\t])/gm, '')
    .split(/[\r\n]+/m)
    .filter((line: string) => Boolean(line.trim()))
    .join(
      `",
    "`
    )}"`;

  const spinner = ora('Generating files').start();

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

export default metadata;
