module.exports = function () {
    this.test('lajos 1', function (promise) {
        console.log('executing Lajos 1');
        setTimeout(promise.resolve.bind(promise), 10);
    });
    this.test('lajos 2', function (promise) {
        console.log('executing Lajos 2');
        setTimeout(promise.resolve.bind(promise), 10);
    });
    this.test('lajos 3', function (promise) {
        console.log('executing Lajos 3');
        setTimeout(promise.resolve.bind(promise), 10);
    });
    this.test('lajos 4', function (promise) {
        console.log('executing Lajos 4');
        setTimeout(promise.resolve.bind(promise), 10);
    });
    this.test('lajos 5', function (promise) {
        console.log('executing Lajos 5');
        setTimeout(promise.resolve.bind(promise), 10);
    });
    this.test('lajos 6', function (promise) {
        console.log('executing Lajos 6');
        setTimeout(promise.resolve.bind(promise), 10);
    });
    this.test('lajos 7', function (promise) {
        console.log('executing Lajos 7');
        setTimeout(promise.resolve.bind(promise), 10);
    });
};