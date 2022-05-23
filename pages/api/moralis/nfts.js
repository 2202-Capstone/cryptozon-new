const axios = require("axios");
const Moralis = require("moralis/node");
//convert to env variables
const serverUrl = "https://mixtowg6gzx7.usemoralis.com:2053/server";
const appId = "rP7p98Lr9FFmhiQEX9GsZoMRlQA6QwHqVvkCdHRI";
const masterKey = "EWj2dIJWjzW7BzqD1Qnv90idnTBjXfbB8eVRJO0k";

export default async function handler(req,res){
    const {method, body, query} = req;
    switch (method) {
        case 'GET':
            console.log(body)
            await Moralis.start({ serverUrl, appId, masterKey });
            const ownedNFTs = await Moralis.Web3API.account.getNFTs({address:body.address, chain:'rinkeby'})
            res.status(200).send(ownedNFTs.result)
            break;
        default:
            res.status(500).end();
            break;
    }
}