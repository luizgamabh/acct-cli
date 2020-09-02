import { exec } from 'child_process'
import { FlagsInterface } from '../../interfaces/flags.interface'
import Command from '@oclif/command';
// import * as fs from 'fs';
// import { callbackify } from 'util';

const zip = (command: Command) => async (flags: FlagsInterface) => {
    const { name, force, dryRun } = flags || {}
    if (dryRun) {
        if (force) {
            command.log('Rewriting')
        } else {
            command.log('Writing')
        }
        return
    }
    exec(name ? `bash -c "ztag() { mkdir -p ./.releases/; echo "Generating...\`pwd\`/.releases/${name}.zip"; git archive HEAD --format=zip --prefix="$wd" --output="./.releases/${name}.zip" && echo "Done!"; }; ztag` : `bash -c "ztag() { mkdir -p ./.releases/; wd=$(basename \`pwd\`); tag=$(git describe --tags --abbrev=0); echo "Generating...\`pwd\`/.releases/$wd-$tag"; git archive $tag --format=zip --prefix="$wd" --output="./.releases/$wd-$tag.zip" && echo "Done!"; }; ztag` , (error: any, stdout: string, stderr: string) => { if (error) { command.log(`error: ${error.message}`); return; } if (stderr) { command.log(`stderr: ${stderr}`); return; } command.log(`${stdout}`); })
};

export default zip