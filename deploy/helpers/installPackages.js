const { asyncExec } = require('./asyncExec');

exports.installPackages = async () => {
    try {
        const result = await asyncExec(`npm install`);
        console.log(result.stdout || result.stderr);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
