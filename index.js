const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const config = require('./webpack.config.dev')

const app = express()
const compiler = webpack(config)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)

/**
 * handle fallback for HTML5 history API
 */

app.use(require('connect-history-api-fallback')())

/**
 * serve webpack bundle output
 */

app.use(devMiddleware)

/**
 * enable hot reload and compile error display
 */

app.use(hotMiddleware)

const port = 4000

app.listen(port, function () {
  const url = `http://localhost:${port}`
  console.log(`Dev server running at ${url}`)
  opn(url)
})
