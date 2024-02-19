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
    const document = await context.clone('context', { storage, wallet });
    if (document.info.registeredName) {
        console.log('Adding schema...');
        await document.install('core/organization');
        // await document.write({name: 'Context Protocol', url: 'https://www.ctx2.xyz'});
        // await document.commit('First commit');
        console.log('=================');
        console.log(document.actions);
        console.log(document.schemas.get('core/organization'));
        console.log(document.errors);
        if (false) console.log('Pushing changes ...', Version.PATCH);
        // await document.push(Version.PATCH);
    } else console.log('Invalid name');
    

}

main().catch((error) => { console.error(error); });  
