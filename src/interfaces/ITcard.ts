interface ImageUris {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
}

interface Card {
    name: string;
    id: string;
    rarity: string;
    image_uris: ImageUris;
    cmc: number;
    type_line: string;
    oracle_text: string;
    color_identity: string[];
    keywords?: string[];
    flavor_text?: string;
}

export default Card;