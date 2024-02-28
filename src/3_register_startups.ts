import { Context, Connection, ContextWallet, Version, StorageGreenfield }
    from '@contextprotocol/sdk';

import startupVenture from "./schemas/startup/venture.json";
import startupInvestor from "./schemas/startup/investor.json";
import startupPeople from "./schemas/startup/people.json";
import startupEcosystem from "./schemas/startup/ecosystem.json";

const startupSschemas = [
    {name: 'venture', schema: startupVenture},
    {name: 'investor', schema: startupInvestor},
    {name: 'people', schema: startupPeople},
    {name: 'ecosystem', schema: startupEcosystem}
]

import * as dotenv from "dotenv";
dotenv.config();

// Main : Test context.
async function main() {
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

    // Write first commit.
    const document = await context.clone(`startup`, { storage, wallet });
    if (!document.info.registeredName) {
        console.log('Registering startup...');
        const ctx = await context.clone('context', { storage, wallet });
        const hash = await context.init('startup',wallet.address, 5, ctx);
        console.log('Result:' + hash);
    }

    // iterate the object startupSschemas and register each schema
    for (let i=0; i < startupSschemas.length; i++) {
        const schema = JSON.parse(JSON.stringify(startupSschemas[i].schema));
        const document = await context.clone(`startup/${startupSschemas[i].name}`, { storage, wallet });
        if (document.info.registeredName && !document.info.registeredPath) {
            console.log(`startup/${startupSschemas[i].name} - First commit...`);
            await document.write(schema);
            await document.commit('First commit');
            console.log('Pushing changes 1.0.0...');
            await document.push(Version.MAJOR);
        } else console.log('Already registered');
    };
}

main().catch((error) => { console.error(error); });  
