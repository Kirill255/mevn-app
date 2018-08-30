module.exports = {
  port: 3000,
  dbURL: "mongodb://localhost/mevn-app",
  dbOptions: {
    useNewUrlParser: true,
    // keepAlive: true, // is true by default since mongoose 5.2.0.
    reconnectTries: Number.MAX_VALUE,
    promiseLibrary: require('bluebird')
  }
}
