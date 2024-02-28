import { Context, Connection, Version, ContextWallet, StorageGreenfield } from '@contextprotocol/sdk';
import * as dotenv from "dotenv";
dotenv.config();

// Main : Test context.
async function main() {
    if (!process.env.BOT_ADDRESS) {
        console.log('Please set BOT_ADDRESS in .env');
        process.exit(1);
    }

    const context: Context = new Context({
        connection: Connection.MUMBAI,
        rpcProviderUrl: process.env.RPC_PROVIDER
    });

    const storage = new StorageGreenfield({
        connection: Connection.MUMBAI,
        bnbAddress: process.env.BNB_ADDRESS,
        bnbPrivateKey: process.env.BNB_PRIVKEY,
        bucketId: process.env.BNB_BUCKETID
    });

    const wallet: ContextWallet = new ContextWallet(context, process.env.OWNER_PRIVKEY);
    const walletBot: ContextWallet = new ContextWallet(context, process.env.BOT_PRIVKEY);

    // Register ctx_bot.
    console.log(`Registering ctx_bot and send 10k $CTX...`);
    const ctx = await context.clone('context', { wallet });
    await context.init('ctx_bot', process.env.BOT_ADDRESS as `0x{string}`, 10000, ctx);

    // Write first commit.
    const document = await context.clone('ctx_bot', { storage, wallet: walletBot });
    console.log('Registered name:', document.info);
    if (document.info.registeredName) {
        console.log('First commit...');
        // await document.install('core/project');
        await document.write({name: 'Context Protocol Telegram Bot'});
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

}

main().catch((error) => { console.error(error); }); 
