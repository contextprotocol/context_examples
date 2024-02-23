import { Context, StorageObject, Connection, ContextWallet }
    from '@contextprotocol/sdk';
import { StorageArweave} from '@contextprotocol/arweave';
import chalk from "chalk";
import * as dotenv from "dotenv";
dotenv.config();

async function showInfo(context: Context, storage: StorageObject, name: string) {
    // Test 1 : Clone Data from Mumbai and arweave. No Wallet.
    
    const document = await context.clone(name, { storage });
    
    console.log(chalk.blue('\n Document : ') + chalk.blue.bold(name));
    console.log(chalk.grey(' - Name : ') + chalk.green(document.info.name));
    console.log(chalk.grey(' - Path : ') + chalk.green(document.info.path));
    if (document.info.registeredPath) {
        console.log(chalk.grey(' - Version : ') + chalk.green(document.info.version?.str));
    }
    console.log(chalk.grey(' - Registered : ') + (document.info.registeredName ? chalk.green('Yes') : chalk.red('No')));
    console.log(chalk.grey(' - Pushed : ') + (document.info.registeredPath ? chalk.green('Yes') : chalk.red('No')));
    console.log(chalk.grey(' - Balance : ') + chalk.green(await document.balanceOf() + ' CTX'));

    await document.readNameInfo();
    console.log(chalk.grey(' - Owner : ') + chalk.green(document.info.owner));
    console.log(chalk.grey(' - Editor : ') + chalk.green(document.info.editor));
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

    const wallet: ContextWallet = new ContextWallet(context, "0xc922cf151a2b013fe170d9b0229ab0e979016aa79f39bffa99885fb62e9233d1");
    console.log('Wallet Address : ' + wallet.address);

    // Test 1 : Clone Data from Mumbai and arweave. No Wallet.
    await showInfo(context, storage, 'tsbot8');
    // await showInfo(context, storage, 'core');
    // await showInfo(context, storage, 'core/organization');
    // await showInfo(context, storage, 'core/organization?version=1.0.0');
}

main().catch((error) => { console.error(error); });  

0x3793f1a0f99a3b1fdebb228bc513880ea10ab82b
0x3793f1a0f99a3b1fdebb228bc513880ea10ab82b