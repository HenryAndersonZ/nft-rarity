class NFT {
    constructor(id, name, attributes = {}) {
        this.id = id;
        this.name = name;
        this.attributes = attributes;
        this.rarityScore = 0;
        this.rank = 0;
    }

    setRarityScore(score) {
        this.rarityScore = score;
    }

    setRank(rank) {
        this.rank = rank;
    }
}

class Collection {
    constructor(name, description = '') {
        this.name = name;
        this.description = description;
        this.nfts = [];
        this.size = 0;
    }

    addNFT(nft) {
        this.nfts.push(nft);
        this.size = this.nfts.length;
    }

    getNFTs() {
        return this.nfts;
    }

    sortByRarity() {
        this.nfts.sort((a, b) => b.rarityScore - a.rarityScore);
        this.nfts.forEach((nft, index) => {
            nft.setRank(index + 1);
        });
    }
}

module.exports = { NFT, Collection };