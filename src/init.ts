import { Context, StorageObject, Connection, ContextWallet, ContextDocument, Version } from '@contextprotocol/sdk';
import { StorageArweave} from '@contextprotocol/arweave';
import * as dotenv from "dotenv";
dotenv.config();


/**
 * Main function to register a new name in a context.
 * 
 * This function initializes a new context with the TESTNET network and a specified RPC provider URL.
 * It then connects to a wallet using a private key.
 * After connecting to the wallet, it initializes a document from the 'context'.
 * 
 * Finally, it registers a new name in the context, deposits tokens, and logs the result.
 * 
 * @async
 * @function
 * @throws {Error} Will throw an error if the wallet cannot be connected, the document cannot be initialized, or the name cannot be registered.
 */
async function main() {

    console.log({
        irysPrivateKey: process.env.IRYS_PRIVATEKEY,
        irysRpcProviderUrl: process.env.RPC_PROVIDER
    });
    const storage: StorageObject = new StorageArweave({
        irysPrivateKey: process.env.IRYS_PRIVATEKEY,
        irysRpcProviderUrl: process.env.RPC_PROVIDER
    });

    const context: Context = new Context({
        storage,
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIVATE_KEY);
    

    // Finally, context registers the name (level1) and deposit tokens
    const newName = process.env.NAME || 'testname';
    const doc: ContextDocument = await context.init(newName, wallet);
    // Prepare the document. First action : write
    doc.write({ name: 'Ethereum Blockchain' });

    // Save: commit.
    let res:any = await doc.commit('First Commit for etherum');    
    console.log(`Arweave transaction : ${res}`);

    // Update Version: commit.
    res = await doc.push(Version.MAJOR);
    console.log(`Version : ${res.version.major}.${res.version.minor}.${res.version.patch}`);
    console.log(`https://testrpc.ctx.xyz/${newName}`);
}

main().catch((error) => { console.error(error); });  
