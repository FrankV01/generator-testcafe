import { Selector } from 'testcafe';

fixture `Start Test codeing Here`
    .page `http://google.com`; //suggest a config.

test('Views Home page', async actions => {
  const body = Selector("#gsr");
  await actions.expect(body.visible);
  return actions;
});

test.skip('disabled test', async t => {
  //await t.click(...)
});
