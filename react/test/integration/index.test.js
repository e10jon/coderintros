import test from 'ava'
import Browser from 'zombie'

test('succeeds', async t => {
  const browser = new Browser()
  await browser.visit('/')
  await t.notThrows(() => browser.assert.status(200))
})
