# NFT Rarity Analyzer

A comprehensive tool for analyzing NFT collection rarity and generating rankings using multiple algorithms.

## Features

- **Statistical Rarity**: Calculate rarity based on trait probability
- **Trait Rarity**: Weighted scoring system for individual traits
- **Web Interface**: User-friendly interface for analysis
- **REST API**: Programmatic access to rarity calculations
- **JSON Export**: Export rankings and scores

## Installation

```bash
npm install
cp .env.example .env
```

## Usage

### Start the server
```bash
npm start
```

### Development mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### POST /analyze
Analyze NFT collection rarity

Request body:
```json
{
  "nfts": [
    {
      "id": 1,
      "name": "NFT #1",
      "attributes": {
        "trait1": "value1",
        "trait2": "value2"
      }
    }
  ]
}
```

## Configuration

Environment variables:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode