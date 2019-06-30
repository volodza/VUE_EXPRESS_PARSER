const Express = require('express');
const Cors = require('cors');
const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db')
const app = Express();

app.use(Cors());
app.use(BodyParser.json());
app.use(cookieParser())

const auth = require('./routes/auth')
app.use('/auth',auth)

const port = process.env.PORT || 3000;

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