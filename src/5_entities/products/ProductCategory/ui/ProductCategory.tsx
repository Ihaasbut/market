
import { useParams } from "react-router-dom";

type ProductRouteParams = {
    slug: string;
};

export function ProductCategory() {
    const { slug } = useParams<ProductRouteParams>();
    return <div>Category: {slug}</div>;
}

export default ProductCategory;
