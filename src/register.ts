import { Context, StorageObject, Connection, ContextWallet }
    from '@contextprotocol/sdk';
import { StorageArweave} from '@contextprotocol/arweave';
import * as dotenv from "dotenv";
dotenv.config();

// Main : Test context.
async function main() {
    const context: Context = new Context({
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    const storage: StorageObject = new StorageArweave({
        irysPrivateKey: process.env.IRYS_PRIVATEKEY,
        irysRpcProviderUrl: process.env.RPC_PROVIDER
    });
    const wallet: ContextWallet = new ContextWallet(context, process.env.OWNER_PRIVKEY);

    // Write first commit.
    console.log('Registering sergifern...');
    const ctx = await context.clone('context', { storage, wallet });
    const hash = await context.init('events1', wallet.address, 10, ctx);
    console.log('Result:' + hash);
}

main().catch((error) => { console.error(error); });  
