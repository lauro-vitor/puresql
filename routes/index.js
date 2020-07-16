module.exports = app => {
    require('./user')(app);
    require('./persons')(app);
}
