const createTestCafe = require('testcafe');
let runner           = null;
let testcafe         = null;
const exitHappy = () => { process.exit() };

const settings = {
    // browsers: ['chrome', 'firefox', 'ie'], //expected "default" setting.
    browsers:['chrome'],
    fixture: ['tests/fixture.js'],
    settings: {
        // http://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#run
        selectorTimeout: 30000, //millseconds
        assertionTimeout: 60000,
        speed: 0.5
    }
};

const rejected = er => {
    console.log('********************************************');
    console.log('Error: ', er);
    console.log('Death Impending');
    console.log('********************************************');
    testcafe.close()
        .then( exitHappy );
};

createTestCafe('localhost', 1337)
    .then(tc => {
        testcafe = tc;
        runner   = testcafe.createRunner();

        return runner
            .src(settings.fixture)
            .browsers(settings.browsers)
            .run(settings.settings);
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        var p = testcafe.close();
        return p;
    })
    .then(exitHappy) //We're waiting for the promise returned by close to resolve.
    .catch(rejected);
