import { Context, StorageObject, Connection, ContextWallet }
    from '@contextprotocol/sdk';
import { StorageArweave} from '@contextprotocol/arweave';
import * as dotenv from "dotenv";
dotenv.config();

// Main : Test context.
async function main(ctxName: string) {
    const context: Context = new Context({
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    const storage: StorageObject = new StorageArweave({
        irysPrivateKey: process.env.IRYS_PRIVATEKEY,
        irysRpcProviderUrl: process.env.RPC_PROVIDER
    });
    const wallet: ContextWallet = new ContextWallet(context, process.env.OWNER_PRIVKEY);

    const walletTo: ContextWallet = new ContextWallet(context, "0xc922cf151a2b013fe170d9b0229ab0e979016aa79f39bffa99885fb62e9233d1");
    console.log(walletTo.address);
    console.log(walletTo.privateKey);

    // Write first commit.
    console.log(`Registering ${ctxName} ...`);
        const ctx = await context.clone('context', { storage, wallet });
        const hash = await context.init(ctxName, walletTo.address, 10, ctx);
    console.log('Result:' + hash);
}

main(process.argv[2]).catch((error) => { console.error(error); }); 
