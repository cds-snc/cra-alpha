const app = require('./src/server')

// basic HTTP server via express
const port = parseInt(process.env.PORT, 10) || 3000

app.listen(port, err => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`Ready on http://localhost:${port}`)
})
