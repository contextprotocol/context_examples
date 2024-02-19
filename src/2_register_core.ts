// import { Context, StorageObject, Connection, ContextWallet, Version }
//     from '@contextprotocol/sdk';
// import { StorageArweave} from '@contextprotocol/arweave';
import coreHuman from "./schemas/core/human.json";

// import * as coreOrganization from "./schemas/core/organization.json";
// import * as coreAddress from "./schemas/core/address.json";
// import * as coreNotifications from "./schemas/core/notifications.json";
// import * as coreProject from "./schemas/core/project.json";
// import * as coreCommunity from "./schemas/core/community.json";

import * as dotenv from "dotenv";
dotenv.config();

// Main : Test context.
async function main() {
    // const context: Context = new Context({
    //     connection: Connection.MUMBAI,
    //     rpcProviderUrl: process.env.RPC_PROVIDER
    // });

    // const storage: StorageObject = new StorageArweave({
    //     irysPrivateKey: process.env.IRYS_PRIVATEKEY,
    //     irysRpcProviderUrl: process.env.RPC_PROVIDER
    // });
    // const wallet: ContextWallet = new ContextWallet(context, process.env.OWNER_PRIVKEY);

    // Write first commit.
    // console.log('Registering core...');
    // const ctx = await context.clone('context', { storage, wallet });
    // const hash = await context.init('core2',wallet.address, 5, ctx);
    // console.log('Result:' + hash);

    // Write first commit.
    console.log(JSON.parse(JSON.stringify(coreHuman)));
    // let document = await context.clone('core2/human', { storage, wallet });
    // if (document.info.registeredName) {
    //     console.log('core/human - First commit...');
    //     await document.write(coreHuman);
    //     console.log(document.actions);
    //     await document.commit('First commit');
    //     console.log('Pushing changes 1.0.0...');
    //     await document.push(Version.MAJOR);
    // } else console.log('Invalid name');

    /*
    document = await context.clone('core2/organization', { storage, wallet });
    if (document.info.registeredName) {
        console.log('core/organization - First commit...');
        await document.write(coreOrganization);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    document = await context.clone('core2/address', { storage, wallet });
    if (document.info.registeredName) {
        console.log('coe/address - First commit...');
        await document.write(coreAddress);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    document = await context.clone('core/notifications', { storage, wallet });
    if (document.info.registeredName) {
        console.log('core/notifications - First commit...');
        await document.write(coreNotifications);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    document = await context.clone('core/project', { storage, wallet });
    if (document.info.registeredName) {
        console.log('coe/project - First commit...');
        await document.write(coreProject);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');

    document = await context.clone('core/community', { storage, wallet });
    if (document.info.registeredName) {
        console.log('coe/community - First commit...');
        await document.write(coreCommunity);
        await document.commit('First commit');
        console.log('Pushing changes 1.0.0...');
        await document.push(Version.MAJOR);
    } else console.log('Invalid name');
    */
}

main().catch((error) => { console.error(error); });  
