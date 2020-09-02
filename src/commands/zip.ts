import {Command, flags} from '@oclif/command'
import zip from '../handlers/zip/zip.handler'

export default class Zip extends Command {
  static description = 'Generate project zip file into .releases directory based on latest tag'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'file name'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f', description: 'forces rewriting existing file with same name'}),
    // Dry run
    dryRun: flags.boolean({char: 'd', description: 'simulates action, do not generate or modify any file in project'})
  }

  async run() {
    const {flags} = this.parse(Zip)

    return await zip(this)(flags)
  }
}
