if (process.env.EXEC_ENV === 'browser') {
  const browserEnv = require('browser-env')

  browserEnv()

  // our react client needs a div#root element to exist or it will error
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
}
