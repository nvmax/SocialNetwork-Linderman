const mongoose = require('mongoose');
// create mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// log mongo queries being executed
mongoose.set('debug', true);

module.exports = mongoose.connection;