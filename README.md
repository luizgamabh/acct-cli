acct-cli
========

ACCT Toolbelt

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/acct-cli.svg)](https://npmjs.org/package/acct-cli)
[![Downloads/week](https://img.shields.io/npm/dw/acct-cli.svg)](https://npmjs.org/package/acct-cli)
[![License](https://img.shields.io/npm/l/acct-cli.svg)](https://github.com/luizgamabh/acct-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g acct-cli
$ acct COMMAND
running command...
$ acct (-v|--version|version)
acct-cli/0.0.1 win32-x64 node-v14.2.0
$ acct --help [COMMAND]
USAGE
  $ acct COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`acct hello [FILE]`](#acct-hello-file)
* [`acct help [COMMAND]`](#acct-help-command)

## `acct hello [FILE]`

describe the command here

```
USAGE
  $ acct hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ acct hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/luizgamabh/acct-cli/blob/v0.0.1/src\commands\hello.ts)_

## `acct help [COMMAND]`

display help for acct

```
USAGE
  $ acct help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src\commands\help.ts)_
<!-- commandsstop -->
