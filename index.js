const express = require("express")
// import userRoutes from "./routes/users"
// import postsRoutes from "./routes/posts"
const authRoutes = require("./routes/auth.js")
User = require('./models/user')
bodyParser = require('body-parser')
jsonwebtoken = require("jsonwebtoken")
const mongoose = require('mongoose')
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};
const port = 8080

const app = express()

//app.use('api/users', userRoutes)
//app.use('api/posts', postsRoutes)
//app.use('api/likes', likesRoutes)

const mongoURI = process.env.MONGODB_URI;
mongoose.connect('mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb', option).then(() => {
    console.log("Successfully connected to MongoDB")
}, (err) => {
    console.error("Couldn't connect to MongoDB")
    console.log(err)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

const routes = require('./routes/auth');
routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port, () => {
    console.log('API working')
})

console.log(' RESTful API server started on: ' + port);

module.exports = app;