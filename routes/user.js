
module.exports = app => {
    const any1 = () => {
        console.log("i am any1");
    }
    const any2 = () => {
        console.log('i am any 2');
    }
    return([
        any1,
        any2
    ]);
}
module.exports = {};