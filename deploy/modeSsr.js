const { asyncExec } = require('./helpers/asyncExec');
const { script } = require('./config');
const { getCurrentConfig } = require('./helpers/getCurrentConfig');

exports.ssrModeDeploy = async () => {

    const pm2 = require('pm2-promise');
    const currentConfig = await getCurrentConfig();

    await pm2.connect();

    try {
        for (let p of await pm2.list()) {
            if (p.name === currentConfig.name) {
                await pm2.stop(currentConfig.name);
                await pm2.delete(currentConfig.name);
                console.log('stopping');
            }
        }
    } catch (e) {
        console.error(e);
    }

    if (!currentConfig.isProd) {
        try {
            const result = await asyncExec(`npx nuxt build`);
            console.log(result.stdout || result.stderr);
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    }

    try {
        await pm2.start({
            name: currentConfig.name,
            exec_mode: currentConfig.exec_mode,
            instances: currentConfig.instances,
            script: script,
            args: `start --port ${currentConfig.port}`,
        });
        console.log(
            `Process started at http://localhost:${currentConfig.port}`,
        );
    } catch (e) {
        console.error(e);
    }

    await pm2.disconnect();
    process.exit();
};
