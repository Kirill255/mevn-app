const mongoose = require('mongoose');

var debug = require('debug')('server:mongoose');

const config = require('../config')

mongoose.set('debug', true);
// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true); // на данный момент нужна эта настройка
mongoose.Promise = require('bluebird');

mongoose.connect(config.dbURL, config.dbOptions)
// .then(() => console.log('Mongoose successful connection'))
// .catch((err) => console.error("Mongoose starting error: ", err));

mongoose.connection.on('error', error => { debug('Mongoose error: ' + error.name) }) //не использовать одновременно с catch
mongoose.connection.on('connected', () => { debug('Mongoose connected') })
mongoose.connection.on('reconnected', () => { debug('Mongoose reconnected') })
mongoose.connection.on('disconnected', () => { debug('Mongoose disconnected') })


module.exports = mongoose;


// https://stackoverflow.com/questions/22786374/queries-hang-when-using-mongoose-createconnection-vs-mongoose-connect
