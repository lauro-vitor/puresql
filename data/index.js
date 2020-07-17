
const func1 = async function () {
    await console.log('oi async');
}
const func2 = function() {
    console.log('oi');
}
async function  main(){
    await func1();
    func2();
}
main();