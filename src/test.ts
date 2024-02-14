import { Context, StorageObject, Connection, ContextWallet, ContextDocument }
    from '@contextprotocol/sdk';
import { StorageArweave} from '@contextprotocol/arweave';
import * as dotenv from "dotenv";
dotenv.config();

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
    console.log('\n CONTEXT')
    let document = await context.clone('context', { storage });
    if (document.info.registeredName) {
        if (document.info.registeredPath) {
            console.log(document.data);
        } else console.log('context has no data');
    } else console.log('context is not registered');

    // Test 1 : Clone Data from Mumbai and arweave. No Wallet.
    console.log('\n CORE')
    document = await context.clone('core', { storage });
    if (document.info.registeredName) {
        if (document.info.registeredPath) {
            console.log(document.data);
        } else console.log('context has no data');
    } else console.log('core is not registered');

}

main().catch((error) => { console.error(error); });  
