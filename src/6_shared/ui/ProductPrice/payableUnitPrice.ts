/** Final unit price: same math as `ProductPrice` (current / payable amount). */
export function payableUnitPrice(
    price: number,
    discountPercentage: number,
): number {
    return Math.round((discountPercentage * price) / 100 + price);
}
