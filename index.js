const app = require('./src/server')

// basic HTTP server via express
const port = 3000

app.listen(port, err => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`Ready on http://localhost:${port}`)
})
