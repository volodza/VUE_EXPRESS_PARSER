const Express = require('express');
const Cors = require('cors');
const BodyParser = require('body-parser');

const app = Express();
app.use(Cors());
app.use(BodyParser.json());

const auth = require('./routes/auth')
app.use('/auth',auth)

const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`Server started on port ${port}`));