import { join } from 'path';
import * as copyCb from 'copy-template-dir';
import { Command } from '@oclif/command';
import { FlagsInterface } from '../../interfaces/flags.interface';
import * as chalk from 'chalk';
import { promisify } from 'util';
import * as inquirer from 'inquirer';

const copy = promisify(copyCb);

const metadata = (command: Command) => async (flags: FlagsInterface) => {
  const { name, dryRun } = flags;

  if (dryRun) {
    command.log(
      `${chalk.green('Simulation mode, no files created or changed.')}`
    );
  }

  const vars = await inquirer.prompt([
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

  // FIXME: Quebrar em linhas
  vars.featuresEnUsAsArray = vars.featuresEnUs;

  const inDir = join(__dirname, '../../templates/metadata');

  const outDir = process.cwd();

  command.log(inDir, outDir);

  // command.log(prompt);

  command.log(name);

  await copy(inDir, outDir, vars)
    .then((response: any) => {
      command.log(chalk.greenBright('Response'));
      command.log(response);
    })
    .catch((error: any) => {
      command.log(chalk.redBright('Error'));
      command.log(error);
    });

  command.exit();
};

export default metadata;
