import express from 'express'

const app = express()
const port = 1360

app.get('/auth_redirect', (rea, res) => {
  res.send('Successful')
})

app.listen(port)
