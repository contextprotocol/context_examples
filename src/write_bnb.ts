import { Context, StorageObject, Connection, ContextWallet, Version }
    from '@contextprotocol/sdk';
import { StorageGreenfield } from '@contextprotocol/greenfield';
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
        bnbAddress: '0xe882EF71c0A363DE22D19021a0812889B2e1b26C',
        bnbPrivateKey: '',
        bucketId: 'context-bnb-testnet1'
    });
    const wallet: ContextWallet = new ContextWallet(context, '');

    // Write first commit.
    const document = await context.clone('botgreen3', { storage, wallet });
    if (document.info.registeredName) {
        console.log('First commit...');
        // await document.install('core/project');
        await document.write({name: 'This is the BOT Green3'});
        await document.commit('First commit');
        console.log('Pushing changes 1.0.1...');
        await document.push(Version.PATCH);
    } else console.log('Invalid name');
    

}

main().catch((error) => { console.error(error); });  
