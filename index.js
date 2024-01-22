var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
let port = 8080
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var app = express();

var highscores = ["0"]

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/highscore', (req, res) => {
    let score = req.query.score
    if (score){
        highscores.push(score)

    }
    console.log(JSON.stringify(score))
    res.json({score:highscores})
  })


app.use(express.static('public'))
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))