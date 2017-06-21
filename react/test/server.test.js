import test from 'ava'

test.todo('/robots.txt')
test.todo('/favicon.ico')
test.todo('/interview')
test.todo('/profiles')
test.todo('/?p or /?page_id')
test.todo('/profiles/:slug')
test.todo('/pages/:slug')
test.todo('/')
test.todo('404')
test.todo('x-forwarded-proto')
