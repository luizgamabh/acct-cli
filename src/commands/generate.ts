import {Command, flags} from '@oclif/command'

export default class Generate extends Command {
  static description = 'ACCT scaffold command'
  
  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'file name'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f', description: 'Force rewriting existing file with same name'}),
  }
  
  static args = [{name: 'what'}]
  
  async run() {
    const {args} = this.parse(Generate)
    
    switch(args.what) {
      default:
       this.log('Invalid argument. Use -h to get available options.')
    }
  }
}