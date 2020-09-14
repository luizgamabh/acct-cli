import { expect, test } from '@oclif/test';

describe('generate command', () => {
  test
    .stdout()
    .command(['generate', 'metadata', '--dryRun'])
    .it('runs generate metadata --dryRun', (ctx) => {
      expect(ctx.stdout).to.contain('Simulation mode');
    });
});
