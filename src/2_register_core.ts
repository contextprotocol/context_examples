import { Context, StorageObject, Connection, ContextWallet, Version }
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
    const ctx = await context.clone('context', { storage, wallet });

    // Write first commit.
    const hash = await context.init('context',wallet.address, 5, ctx);
    console.log('Result:' + hash);
}

main().catch((error) => { console.error(error); });  
