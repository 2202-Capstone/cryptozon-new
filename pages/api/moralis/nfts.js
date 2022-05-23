import { NFTs } from "../../../db";

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
            const proccessNfts = await Promise.all(ownedNFTs.result.map(async (nftData,ind) =>{
                const nftsInDB = await NFTs.findAll({where:{uri:`ipfs://${nftData.token_uri.split('').slice(34).join('')}`}});
                const metadata = JSON.parse(nftData.metadata)
                const imageIPFT = metadata.image.split('').slice(7).join('')
                const imageUrl = `https://cryptozon.infura-ipfs.io/ipfs/${imageIPFT}`
                if(nftsInDB.length>0){
                    console.log('found nft in db using that info')
                }else{
                    const newNft = {
                        owner: query.address,
                        name: metadata.name,
                        description: metadata.description,
                        tokenId: nftData.token_id,
                        image: imageUrl,
                        uri: `ipfs://${nftData.token_uri.split('').slice(34).join('')}`,
                        assetContractAddress: nftData.token_address,
                        listingId: null,
                        buyoutPrice: null,
                        expirationDate: null,
                        hidden: false,
                        collectionId: null,
                        createdAt: nftData.synced_at,
                    }
                    await NFTs.create(newNft);
                    return 'success'
                }
            }))
            console.log(proccessNfts.length," nfts found")
            const ownerNFTs = await NFTs.findAll({ where: { owner: query.address } });
            res.status(200).send({status:"success",data:ownerNFTs})
            break;
        default:
            res.status(500).end();
            break;
    }
}