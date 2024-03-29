import { Context, StorageObject, StorageGreenfield, Connection, ContextWallet, Version }
    from '@contextprotocol/sdk';
import * as dotenv from "dotenv";
dotenv.config();

// Main : Test context.
async function main() {
    const context: Context = new Context({
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    const storage: StorageObject = new StorageGreenfield({
        connection: Connection.MUMBAI,
        bnbAddress: process.env.BNB_ADDRESS,
        bnbPrivateKey: process.env.BNB_PRIVKEY,
        bucketId: process.env.BNB_BUCKETID
    });
    const wallet: ContextWallet = new ContextWallet(context, process.env.OWNER_PRIVKEY);

    // Write first commit.
    const document = await context.clone('context', { storage, wallet });
    console.log('Registered name:', document.info);
    if (document.info.registeredName) {
        console.log('First commit...');
        // await document.install('core/project');
        await document.write({name: 'Context Protocol'});
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');
    

}

main().catch((error) => { console.error(error); });  
