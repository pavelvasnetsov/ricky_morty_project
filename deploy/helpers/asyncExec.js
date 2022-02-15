const { stderr } = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const asyncExec = async command => {
    try {
        const { stdout, stderr } = await exec(command);

        return {
            stdout: stdout || null,
            stderr: stderr || null,
        };
    } catch (e) {
        throw e;
    }
};

exports.asyncExec = asyncExec;
