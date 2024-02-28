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
        bnbPrivateKey: '0xb48d0f9d3dc4c8c8126e5b8f47b67428a0ad925276e620d70fd349a5e613df93',
        bucketId: 'context-bnb-testnet1'
    });
    const wallet: ContextWallet = new ContextWallet(context, process.env.OWNER_PRIVKEY);

    // Write first commit.
    const document = await context.clone('green1', { storage, wallet });
    if (document.info.registeredName) {
        console.log('First commit...');
        await document.install('core/project');
        await document.write({name: 'Events Test BNB 1'});
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');
    

}

main().catch((error) => { console.error(error); });  
