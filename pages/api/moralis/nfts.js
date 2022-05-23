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
            const ownedNFTs = await Moralis.Web3API.account.getNFTs({address:query.address, chain:'rinkeby'})
            const structuredData = ownedNFTs.result.map((nftData,ind) =>{
                console.log(JSON.parse(nftData.metadata))
                const metadata = JSON.parse(nftData.metadata)
                const imageIPFT = metadata.image.split('').slice(7).join('')

                console.log('sliced:',imageIPFT, ' prev: ',metadata.image)
                const imageUrl = `https://cryptozon.infura-ipfs.io/ipfs/${imageIPFT}`
                console.log(imageUrl)
                return {
                    assetContractAddress: nftData.token_address,
                    buyoutPrice: null,
                    collectionId: null,
                    createdAt: nftData.synced_at,
                    description: metadata.description,
                    expirationDate: null,
                    hidden: false,
                    id: ind,
                    image: imageUrl,
                    listingId: null,
                    name: metadata.name,
                    owner: nftData.owner_of,
                    tokenId: nftData.token_id,
                    updatedAt: nftData.last_token_uri_sync,
                    uri: nftData.token_uri,
                }
            })
            res.status(200).send({status:"success",data:structuredData})
            break;
        default:
            res.status(500).end();
            break;
    }
}