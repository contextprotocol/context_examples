import { Context, Connection, ContextWallet, ContextDocument } from '@contextprotocol/sdk';
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
    const context: Context = new Context({
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    // Connect the wallet of a document that is a curator.
    const wallet: ContextWallet = await context.wallet(process.env.PRIVATE_KEY); 
    const fromDoc: ContextDocument = await context.init('context_bot', wallet);

    // Finally, context registers the name (level1) and deposit tokens
    const newName = process.env.NAME || 'testname';
    const ownerAddress = wallet.address;
    const tokens = 3;

    // Names are registered by a curator : context (fromDoc).
    console.log(`Registering ${newName}...`);
    await context.register(newName, ownerAddress, tokens, fromDoc);
    console.log(`${newName} has been registered. Owner is ${ownerAddress} with ${tokens} tokens.`);
}

main().catch((error) => { console.error(error); });  
