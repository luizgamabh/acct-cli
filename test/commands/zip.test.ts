import {expect, test} from '@oclif/test'

describe.skip('zip', () => {
  test
  .stdout()
  .command(['zip', '--dryRun'])
  .it('runs zip --dryRun', ctx => {
    expect(ctx.stdout).to.contain('Writing')
  })

  test
  .stdout()
  .command(['zip', '--name', 'test-file', '--dryRun'])
  .it('runs zip --name test-file --dryRun', ctx => {
    expect(ctx.stdout).to.contain('Writing')
  })

  test
  .stdout()
  .command(['zip', '--name', 'test-file', '--dryRun'])
  .it('runs zip --name test-file --dryRun', ctx => {
    expect(ctx.stdout).to.contain('Rewriting')
  })
})
