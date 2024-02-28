import { Context, Connection, ContextWallet, Version, StorageGreenfield }
    from '@contextprotocol/sdk';

import coreHuman from "./schemas/core/human.json";
import * as coreOrganization from "./schemas/core/organization.json";
import * as coreAddress from "./schemas/core/address.json";
import * as coreNotifications from "./schemas/core/notifications.json";
import * as coreProject from "./schemas/core/project.json";
import * as coreCommunity from "./schemas/core/community.json";

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
    console.log('Registering core...');
    const ctx = await context.clone('context', { storage, wallet });
    const hash = await context.init('core',wallet.address, 5, ctx);
    console.log('Result:' + hash);

    // Write first commit.
    let schema = JSON.parse(JSON.stringify(coreHuman));
    let document = await context.clone('core/human', { storage, wallet });
    if (document.info.registeredName) {
        console.log('core/human - First commit...');
        await document.write(schema);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    schema = JSON.parse(JSON.stringify(coreOrganization));
    document = await context.clone('core/organization', { storage, wallet });
    if (document.info.registeredName) {
        console.log('core/organization - First commit...');
        await document.write(schema);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    schema = JSON.parse(JSON.stringify(coreAddress));
    document = await context.clone('core/address', { storage, wallet });
    if (document.info.registeredName) {
        console.log('coe/address - First commit...');
        await document.write(schema);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    schema = JSON.parse(JSON.stringify(coreNotifications));
    document = await context.clone('core/notifications', { storage, wallet });
    if (document.info.registeredName) {
        console.log('core/notifications - First commit...');
        await document.write(schema);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    schema = JSON.parse(JSON.stringify(coreProject));
    document = await context.clone('core/project', { storage, wallet });
    if (document.info.registeredName) {
        console.log('coe/project - First commit...');
        await document.write(schema);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    schema = JSON.parse(JSON.stringify(coreCommunity));
    document = await context.clone('core/community', { storage, wallet });
    if (document.info.registeredName) {
        console.log('coe/community - First commit...');
        await document.write(schema);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');
}

main().catch((error) => { console.error(error); });  
