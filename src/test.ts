import { Context, StorageObject, Connection }
    from '@contextprotocol/sdk';
import { StorageArweave} from '@contextprotocol/arweave';
import chalk from "chalk";
import * as dotenv from "dotenv";
dotenv.config();

async function showInfo(context: Context, storage: StorageObject, name: string) {
    // Test 1 : Clone Data from Mumbai and arweave. No Wallet.
    
    const document = await context.clone(name, { storage });
    console.log(chalk.blue('\n Document : ') + chalk.blue.bold(name));
    console.log(chalk.grey('\n - Name : ') + chalk.green(document.info.name));
    console.log(chalk.grey('\n - Path : ') + chalk.green(document.info.path));
    console.log(chalk.grey('\n - Registered : ') + (document.info.registeredName ? chalk.green('Yes') : chalk.red('No')));
    console.log(chalk.grey('\n - Pushed : ') + (document.info.registeredPath ? chalk.green('Yes') : chalk.red('No')));
    if (document.info.registeredPath) {
        console.log(chalk.grey('\n - Version : ') + chalk.green(document.info.version?.str));
    }
    // console.log(document.info);
    /* if (document.info.registeredName) {
        if (document.info.registeredPath) {
            console.log(document.data);
        } else console.log(`${name} has no data`);
    } else console.log(`${name} is not registered`); */
}
// Main : Test context.
async function main() {

    const storage: StorageObject = new StorageArweave({
        irysPrivateKey: process.env.IRYS_PRIVATEKEY,
        irysRpcProviderUrl: process.env.RPC_PROVIDER
    });

    const context: Context = new Context({
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    // Test 1 : Clone Data from Mumbai and arweave. No Wallet.
    // await showInfo(context, storage, 'context');
    // await showInfo(context, storage, 'core');
    await showInfo(context, storage, 'core/organization');
    await showInfo(context, storage, 'core/organization?version=1.0.0');
}

main().catch((error) => { console.error(error); });  
