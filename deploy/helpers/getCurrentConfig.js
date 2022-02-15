const { asyncExec } = require('./asyncExec');
const { branchConfig } = require('../config');

exports.getCurrentConfig = async () => {
    let branch = null;
    try {
        const result = await asyncExec('git branch --show-current');
        branch = result.stdout ? result.stdout : 'prod';
    } catch (e) {
        branch = 'prod';
    }
    branch = branch.trim();
    const currentConfig = branchConfig()[branch];
    if (!currentConfig) {
        console.error('Config is broken');
        process.exit(1);
    }
    return currentConfig;
};
