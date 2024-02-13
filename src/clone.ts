import { Context, StorageObject, Connection, ContextWallet, ContextDocument }
    from '../src/';
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

    const storage: StorageObject = new StorageArweave({
        irysPrivateKey: process.env.IRYS_PRIVATEKEY,
        irysRpcProviderUrl: process.env.RPC_PROVIDER
    });

    const context: Context = new Context({
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    // Test 1 : Clone Data from Mumbai and arweave. No Wallet.
    let doc: ContextDocument = await context.clone('jesac', { storage });
    // Test 2 : Clone Data from Mumbai and arweave. No Storage Object (RPC).
    
    let doc: ContextDocument = await context.clone('jesac');
    

    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIVATE_KEY);

    // Finally, context registers the name (level1) and deposit tokens
    doc = await context.clone('jesac', { wallet, storage });
    console.log(doc.data);
    console.log(doc.schemas);

    /*const plots: ContextDocument = await context.clone('jesac/plots', { wallet, storage });
    console.log(plots.data);
    console.log(plots.schemas);
    */

    // Prepare the document. First action : write
    
    // doc.write({ name: 'Ethereum Blockchain' });

    // Save: commit.
    // let res:any = await doc.commit(`First Commit for ${newName}`);
    // console.log(`Arweave transaction : ${res}`);

    // Update Version: commit.
    // res = await doc.push(Version.MAJOR);
    // console.log(`Version : ${res.version.major}.${res.version.minor}.${res.version.patch}`);
    // console.log(`https://testrpc.ctx.xyz/${newName}`);
}

main().catch((error) => { console.error(error); });  
