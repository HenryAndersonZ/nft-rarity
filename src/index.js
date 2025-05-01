const express = require('express');
const path = require('path');
const RarityCalculator = require('./rarity');
const { NFT, Collection } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/analyze', (req, res) => {
    try {
        const { nfts } = req.body;
        
        if (!nfts || !Array.isArray(nfts)) {
            return res.status(400).json({ error: 'Invalid NFT data' });
        }

        const collection = new Collection('Analysis Collection');
        
        nfts.forEach(nftData => {
            const nft = new NFT(nftData.id, nftData.name, nftData.attributes);
            collection.addNFT(nft);
        });

        const calculator = new RarityCalculator(collection.getNFTs());
        calculator.calculateTraitFrequency();

        collection.getNFTs().forEach(nft => {
            const rarityScore = calculator.calculateTraitRarity(nft);
            nft.setRarityScore(rarityScore);
        });

        collection.sortByRarity();

        res.json({
            collection: collection.name,
            size: collection.size,
            nfts: collection.getNFTs()
        });
    } catch (error) {
        res.status(500).json({ error: 'Analysis failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});