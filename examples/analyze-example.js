const axios = require('axios');

const sampleData = {
    nfts: [
        {
            id: 1,
            name: "Cool Ape #1",
            attributes: {
                background: "blue",
                fur: "golden",
                eyes: "laser",
                mouth: "smile"
            }
        },
        {
            id: 2,
            name: "Cool Ape #2",
            attributes: {
                background: "red",
                fur: "brown",
                eyes: "normal",
                mouth: "grin"
            }
        },
        {
            id: 3,
            name: "Cool Ape #3",
            attributes: {
                background: "blue",
                fur: "golden",
                eyes: "normal",
                mouth: "smile"
            }
        }
    ]
};

async function analyzeCollection() {
    try {
        console.log('Analyzing NFT collection...');
        
        const response = await axios.post('http://localhost:3000/analyze', sampleData);
        
        console.log('\n=== Analysis Results ===');
        console.log(`Collection: ${response.data.collection}`);
        console.log(`Total NFTs: ${response.data.size}\n`);
        
        response.data.nfts.forEach(nft => {
            console.log(`Rank #${nft.rank} - ${nft.name}`);
            console.log(`Rarity Score: ${nft.rarityScore.toFixed(4)}`);
            console.log(`Attributes: ${JSON.stringify(nft.attributes)}\n`);
        });
        
    } catch (error) {
        console.error('Error analyzing collection:', error.message);
    }
}

analyzeCollection();