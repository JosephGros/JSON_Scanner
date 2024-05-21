export interface Card {
    qty: number;
    name: string;
    categories: string[];
    prices: {
      ck: number;
      ckFoil: number;
      tcg: number;
      tcgFoil: number;
      mtgo: number;
      mtgoFoil: number;
      cm: number;
      cmFoil: number;
    };
    set: string;
    superTypes: string[];
    subTypes: string[];
    saltScore: number;
    cmc: number;
  }
  
  export interface PreconStructure {
    [key: string]: {
      [key: string]: {
        [key: string]: {
          [key: string]: Card[];
        };
      };
    };
  }  