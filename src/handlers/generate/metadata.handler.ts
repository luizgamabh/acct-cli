import { join } from 'path';
import * as copyCb from 'copy-template-dir';
import { Command } from '@oclif/command';
import { FlagsInterface } from '../../interfaces/flags.interface';
import * as chalk from 'chalk';
import { promisify } from 'util';
import * as inquirer from 'inquirer';
import notification from '../../utils/notification';

const copy = promisify(copyCb);

const metadata = (command: Command) => async (flags: FlagsInterface) => {
  const { dryRun } = flags;

  if (dryRun) {
    command.log(
      `${chalk.green('Simulation mode, no files created or changed.')}`
    );
  }

  const replacements = await inquirer.prompt([
    {
      name: 'projectTitle',
      type: 'input',
      message: 'App title:',
    },
    {
      name: 'shortDescriptionEnUs',
      type: 'input',
      message: 'Short description (en-US):',
    },
    {
      name: 'fullDescriptionEnUs',
      type: 'editor',
      message: 'Full description (en-US):',
    },
    {
      name: 'featuresEnUs',
      type: 'editor',
      message: 'Features (en-US):',
    },
    {
      name: 'appVTexStore',
      type: 'input',
      message: 'App url on vtex store',
      suffix: ' https://vtex.io/docs/app/{app}',
      transformer(input) {
        return input.replace(/.*\/\s*([\w._-]+).*/g, '$1');
      },
    },
  ]);

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

  const inDir = join(__dirname, '../../templates/metadata');
  const outDir = process.cwd();
  await copy(inDir, outDir, replacements)
    .then(() => {
      command.log(notification.success('Files generated'));
    })
    .catch((error: any) => {
      command.log(notification.error('Could not generate files'));
      command.log(error);
    });

  command.exit();
};

export default metadata;
