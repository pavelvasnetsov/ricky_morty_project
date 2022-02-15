const { noSsrModeDeploy } = require('./modeNoSsr');
const { ssrModeDeploy } = require('./modeSsr');
const { installPackages } = require('./helpers/installPackages');

const main = async () => {
    await installPackages();
    require('dotenv').config();

    process.env.SSR_MODE === 'true'
        ? await ssrModeDeploy()
        : await noSsrModeDeploy();
};

main();
