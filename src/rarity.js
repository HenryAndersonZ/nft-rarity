const _ = require('lodash');

class RarityCalculator {
    constructor(nfts) {
        this.nfts = nfts;
        this.traitFrequency = {};
    }

    calculateTraitFrequency() {
        const frequency = {};
        
        this.nfts.forEach(nft => {
            Object.keys(nft.attributes).forEach(trait => {
                const value = nft.attributes[trait];
                if (!frequency[trait]) {
                    frequency[trait] = {};
                }
                frequency[trait][value] = (frequency[trait][value] || 0) + 1;
            });
        });
        
        this.traitFrequency = frequency;
        return frequency;
    }

    calculateStatisticalRarity(nft) {
        let rarityScore = 1;
        
        Object.keys(nft.attributes).forEach(trait => {
            const value = nft.attributes[trait];
            if (!this.traitFrequency[trait] || !this.traitFrequency[trait][value]) {
                throw new Error(`Missing trait frequency data for ${trait}: ${value}`);
            }
            const frequency = this.traitFrequency[trait][value];
            const probability = frequency / this.nfts.length;
            rarityScore *= probability;
        });
        
        return rarityScore;
    }

    calculateTraitRarity(nft) {
        let rarityScore = 0;
        
        Object.keys(nft.attributes).forEach(trait => {
            const value = nft.attributes[trait];
            if (!this.traitFrequency[trait] || !this.traitFrequency[trait][value]) {
                throw new Error(`Missing trait frequency data for ${trait}: ${value}`);
            }
            const frequency = this.traitFrequency[trait][value];
            const traitScore = 1 / (frequency / this.nfts.length);
            rarityScore += traitScore;
        });
        
        return rarityScore;
    }
}

module.exports = RarityCalculator;