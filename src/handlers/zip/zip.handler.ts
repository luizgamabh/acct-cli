import * as shell from 'shelljs';
import * as path from 'path';
import * as chalk from 'chalk';
import Command from '@oclif/command';

import { FlagsInterface } from '../../interfaces/flags.interface';

const zip = (command: Command) => async (flags: FlagsInterface) => {
  const { name, force, dryRun, noValidate } = flags || {};

  if (dryRun) {
    command.log(
      `${chalk.green('Simulation mode, no files created or changed.')}`
    );
  }

  if (force) {
    command.log('Forced update enabled');
  }

  let fileName = name ? name.replace('.zip', '') : '';

  const checkGit = shell.exec('git status', { silent: true });

  if (checkGit.code !== 0) {
    if (!(dryRun && noValidate)) {
      command.log(`${chalk.red('Not a git repository')}`);
      return;
    }
  }

  const checkTag = shell.exec('git describe --tags --abbrev=0', {
    silent: true,
  });

  if (checkTag.code !== 0) {
    if (!(dryRun && noValidate)) {
      command.log(`Tag not found`);
      return;
    }
  }

  const { stdout = '' } = checkTag;
  const version = stdout.replace(/[\r\n\s\t\f]/gi, '');

  if (!version) {
    if (!(dryRun && noValidate)) {
      command.log(`Tag not found`);
      return;
    }
  }

  const pwd = shell.pwd().stdout;
  const dirName = pwd.replace(/.*[\\/]/gi, '');

  fileName =
    fileName ||
    `${dirName}-${
      version ? version : dryRun && noValidate ? 'v1.0.0.test' : ''
    }`;

  const releasesDirectoryExists = shell.test('-d', path.join(pwd, '.releases'));

  if (!releasesDirectoryExists) {
    command.log('Generating .releases directory');
    if (!dryRun) {
      shell.mkdir('-p', '.releases');
    }
  }

  const fileExists = shell.test(
    '-f',
    path.join(pwd, '.releases', `${fileName}.zip`)
  );

  if (fileExists) {
    if (!force) {
      command.log('File already generated!');
      return;
    }
    command.log('Rewriting existing file...');
  }

  if (!dryRun) {
    const generateCommand = shell.exec(
      `git archive ${version} --format=zip --prefix="${dirName}" --output="./.releases/${fileName}.zip"`,
      { silent: true }
    );

    if (generateCommand.code !== 0) {
      command.log('We have an error generating file.');
      command.log(generateCommand.stderr);
      return;
    }
  }

  command.log(
    `File .releases/${fileName}.zip ${fileExists ? 're' : ''}generated`
  );

  command.exit();
};

export default zip;
