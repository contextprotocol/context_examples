import { Context, StorageObject, Connection, ContextWallet, Version }
    from '@contextprotocol/sdk';
import { StorageArweave} from '@contextprotocol/arweave';

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

    const storage: StorageObject = new StorageArweave({
        irysPrivateKey: process.env.IRYS_PRIVATEKEY,
        irysRpcProviderUrl: process.env.RPC_PROVIDER
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
        const document = await context.clone(`startup/${startupSschemas[i].name}`, { storage, wallet });
        console.log(document.info);
        if (document.info.registeredName && !document.info.registeredPath) {
            console.log(`startup/${startupSschemas[i].name} - First commit...`);
            await document.write(startupSschemas[i].schema);
            await document.commit('First commit');
            console.log('Pushing changes 1.0.0...');
            await document.push(Version.MAJOR);
        } else console.log('Already registered');
    };
}

main().catch((error) => { console.error(error); });  
