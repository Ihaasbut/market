export type FavoriteItem = {
    id: number;
    title: string;
    image: string;
};

export type FavoriteState = {
    items: FavoriteItem[];
};
