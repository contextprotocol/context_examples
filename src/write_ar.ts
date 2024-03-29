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

    // Write first commit.
    const document = await context.clone('events1', { storage, wallet });
    if (document.info.registeredName) {
        console.log('First commit...');
        await document.install('core/project');
        await document.write({name: 'Events Test'});
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');
    

}

main().catch((error) => { console.error(error); });  
