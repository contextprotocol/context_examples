import { Context, Connection, ContextWallet } from '@contextprotocol/sdk';
import * as dotenv from "dotenv";
dotenv.config();

// Main : Test context.
async function main(ctxName: string) {
    const context: Context = new Context({
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    const wallet: ContextWallet = new ContextWallet(context, process.env.OWNER_PRIVKEY);

    // Write first commit.
    console.log(`Registering ${ctxName} ...`);
        const ctx = await context.clone('context', { wallet });
        const hash = await context.init(ctxName, "0xBD2d27bb5A8D4b2D918c142198714b6e858E77fe", 10, ctx);
    console.log('Result:' + hash);
}

main(process.argv[2]).catch((error) => { console.error(error); }); 
