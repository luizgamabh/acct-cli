import { expect, test } from '@oclif/test';

describe('zip', () => {
 test
  .stdout()
  .command(['zip', '--dryRun', '--noValidate'])
  .it('runs zip --dryRun', (ctx) => {
   expect(ctx.stdout).to.contain('Simulation mode');
  });

 test
  .stdout()
  .command(['zip', '--force', '--dryRun'])
  .it('runs zip --name test-file --dryRun', (ctx) => {
   expect(ctx.stdout).to.contain('Forced update enabled');
  });

 test
  .stdout()
  .command(['zip', '--dryRun', '--noValidate'])
  .it('runs zip --dryRun to generate .releases directory', (ctx) => {
   expect(ctx.stdout).to.contain('Generating .releases directory');
  });

 test
  .stdout()
  .command(['zip', '--name', 'test-file', '--dryRun', '--noValidate'])
  .it('runs zip --name test-file --dryRun --noValidate', (ctx) => {
   expect(ctx.stdout).to.contain('test-file.zip');
  });
});
