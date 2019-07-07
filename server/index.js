const Express = require('express');
const Cors = require('cors');
const BodyParser = require('body-parser');
const db = require('./db')
const app = Express();

app.use(Cors());
app.use(BodyParser.json());

const auth = require('./routes/auth')
app.use('/auth',auth)
const geolocation = require('./routes/api/geolocation')
app.use('/api/geolocation',geolocation)
const search = require('./routes/api/search')
app.use('/api/search',search)
const tasks = require('./routes/api/tasks')
app.use('/api/tasks',tasks)
const test = require('./routes/api/test')
app.use('/api/test',test)

const port = process.env.PORT || 3000;

app.use(Express.static(__dirname + '/public/'))
app.get(/.*/, (req,res)=> res.sendFile(__dirname + '/public/index.html'))

db.connect((err)=>{
  if (err) {
    return console.log(err);
    process.exit(1)
  } else {
    app.listen(port, (err) => {
      if (err) {
          return console.log('something bad happened', err)
      }
      console.log(`server is listening on ${port}`)
    })
  }
  })