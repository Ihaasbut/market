export type CartItem = {
    id: number;
    count: number;
    title: string;
    image: string;
    price: number;
    discountPercentage: number;
};

export type CartState = {
    itemsById: CartItem[];
};
