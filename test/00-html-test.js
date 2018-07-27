var test = require('tape')
var tiny = require('tiny-json-http')
var arc = require('@architect/workflows')
// TODO hrm, why isn't arc passing .arc-env vars to test runner?
var port = (process.env.PORT) ? process.env.PORT : 3333

test('env', t=> {
  t.plan(1)
  t.ok(arc.sandbox, 'arc.sandbox')
})

let end
test('arc.sandbox.start', t=> {
  t.plan(1)
  arc.sandbox.start((_end)=> {
    end = _end
    t.ok(true, 'opened')
  })
})

test('get /en/getting-started/introduction', t=> {
  t.plan(1)
  tiny.get({
    url: `http://localhost:${port}/en/getting-started/introduction`
  },
  function win(err, result) {
    if (err) {
      t.fail(err, err)
    }
    else {
      t.ok(true, 'got result')
    }
    console.log(err)
  })
})

test('arc.sandbox.end', t=> {
  t.plan(1)
  end()
  t.ok(true, 'closed')
})
