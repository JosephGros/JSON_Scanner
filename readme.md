# Magic: The Gathering JSON Scanner

This Node.js application scans a directory of JSON files containing Magic: The Gathering data, organizes the data by year, and updates a main JSON file (`precons.json`) with the contents of each deck. The goal is to maintain a structured and comprehensive collection of preconstructed deck information.

## Overview

Magic: The Gathering is a popular trading card game with a rich history of preconstructed decks, often released as part of special sets or expansions. This application is designed to manage and organize data related to these preconstructed decks.

### Features

- **Directory Scanning:** The application scans a specified directory for JSON files representing preconstructed decks.
- **Data Aggregation:** Aggregates the data from individual JSON files into a central `precons.json` file.
- **Structured Organization:** Organizes the data by year, color, and deck name for easy reference and maintenance.

## Data Structure

The JSON files contain detailed information about each card in the decks, including quantities, names, categories, prices, sets, and other attributes. Below is an example of the data structure found in the JSON files:

### Example Deck JSON

```json
[
  {
    "qty": 1,
    "name": "Arcane Signet",
    "categories": ["Artifact"],
    "prices": {
      "ck": 0.99,
      "ckFoil": 4.49,
      "tcg": 0.38,
      "tcgFoil": 0,
      "mtgo": 0.1,
      "mtgoFoil": 0,
      "cm": 0,
      "cmFoil": 0
    },
    "set": "Warhammer 40,000 Commander",
    "superTypes": [],
    "subTypes": [],
    "saltScore": 0.27,
    "cmc": 2
  },
  {
    "qty": 1,
    "name": "Barren Moor",
    "categories": ["Land"],
    "prices": {
      "ck": 0.39,
      "ckFoil": 0.99,
      "tcg": 0.15,
      "tcgFoil": 0,
      "mtgo": 0.08,
      "mtgoFoil": 0,
      "cm": 0.21,
      "cmFoil": 1.21
    },
    "set": "Warhammer 40,000 Commander",
    "superTypes": [],
    "subTypes": [],
    "saltScore": 0.07,
    "cmc": 0
  },
  {
    "qty": 1,
    "name": "Biotransference",
    "categories": ["Enchantment"],
    "prices": {
      "ck": 5.49,
      "ckFoil": 13.99,
      "tcg": 2.19,
      "tcgFoil": 0,
      "mtgo": 3.36,
      "mtgoFoil": 0,
      "cm": 3.83,
      "cmFoil": 11.6
    },
    "set": "Warhammer 40,000 Commander",
    "superTypes": [],
    "subTypes": [],
    "saltScore": 0.41,
    "cmc": 4
  }
]
```
## Organized Data in `precons.json`

The main `precons.json` file is organized as follows:

```json
{
  "Commander-Precons": {
    "2021": {
      "black": {
        "(C14)---Sworn-to-Darkness": [
          {
            "qty": 1,
            "name": "Arcane Signet",
            "categories": ["Artifact"],
            "prices": {
              "ck": 0.99,
              "ckFoil": 4.49,
              "tcg": 0.38,
              "tcgFoil": 0,
              "mtgo": 0.1,
              "mtgoFoil": 0,
              "cm": 0,
              "cmFoil": 0
            },
            "set": "Warhammer 40,000 Commander",
            "superTypes": [],
            "subTypes": [],
            "saltScore": 0.27,
            "cmc": 2
          }
        ]
      },
      "black-green": {
        "(C15)---Plunder-the-Graves": [
          {
            "qty": 1,
            "name": "Arcane Signet",
            "categories": ["Artifact"],
            "prices": {
              "ck": 0.99,
              "ckFoil": 4.49,
              "tcg": 0.38,
              "tcgFoil": 0,
              "mtgo": 0.1,
              "mtgoFoil": 0,
              "cm": 0,
              "cmFoil": 0
            },
            "set": "Warhammer 40,000 Commander",
            "superTypes": [],
            "subTypes": [],
            "saltScore": 0.27,
            "cmc": 2
          }
        ]
      }
    }
  }
}
```
## Card Structure

Each card in the deck JSON files follows this structure:

```json
{
  "qty": 1,
  "name": "Card Name",
  "categories": ["Category1", "Category2"],
  "prices": {
    "ck": 0.99,
    "ckFoil": 4.49,
    "tcg": 0.38,
    "tcgFoil": 0,
    "mtgo": 0.1,
    "mtgoFoil": 0,
    "cm": 0,
    "cmFoil": 0
  },
  "set": "Set Name",
  "superTypes": ["SuperType1"],
  "subTypes": ["SubType1", "SubType2"],
  "saltScore": 0.27,
  "cmc": 2
}
```
## Directory Structure

The directory structure of the project is organized as follows:

```
MTGVaultAPI
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── src
│ ├── index.ts
│ ├── updatePrecons.ts
│ ├── loadPrecons.ts
│ └── ...
└── dist
└── 📁 data
└── 📁 Commander-Precons
├── 📁 2021
│ ├── 📁 black
│ │ └── (C14)---Sworn-to-Darkness.json
│ ├── 📁 black-green
│ │ ├── (C15)---Plunder-the-Graves.json
│ │ ├── (C21)---Witherbloom-Witchcraft.json
│ │ ├── (CMA)---Plunder-the-Graves.json
│ │ └── (KHC)---Elven-Empire.json
│ ├── 📁 black-red
│ │ ├── (AFC)---Planar-Portal.json
│ │ ├── (C19)---Merciless-Rage.json
│ │ └── (VOC)---Vampiric-Bloodline.json
│ └── ...
├── 📁 2022
│ ├── 📁 black
│ ├── 📁 black-red-green
│ ├── 📁 blue-black
│ └── ...
├── 📁 2023
│ ├── (CMM)---Eldrazi-Unbound.json
│ ├── 📁 blue-black-red
│ ├── 📁 blue-green
│ └── ...
└── 📁 2024
├── 📁 blue-black
├── 📁 blue-black-green
├── 📁 blue-red
└── ...
```

This structure includes TypeScript source files (`src/`), compiled JavaScript files (`dist/`), and the data files (`dist/data/Commander-Precons`) organized by year and color categories.

## Purpose

The MTGVaultAPI project is a TypeScript application designed to scan and organize Magic: The Gathering (MTG) preconstructed deck data into a structured JSON format. It reads deck data from JSON files organized by year and color combinations and stores the data into a central `precons.json` file. The purpose of this application is to provide an organized view of MTG preconstructed deck contents, including card details and associated price data.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.