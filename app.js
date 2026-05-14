const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const classRouter = require('./routes/classes');
const teacherRouter = require('./routes/teachers');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'basic-lms-secret', resave: false, saveUninitialized: true }));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/classes', classRouter);
app.use('/teachers', teacherRouter);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page not found' });
});

console.log('LMS app initialized');
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`LMS running on http://localhost:${PORT}`);
});
