import { useParams } from "react-router-dom";

type ProductRouteParams = {
    id: string;
};

export function ProductDetail() {
    const { id } = useParams<ProductRouteParams>();
    return <div>Product: {id}</div>;
}

export default ProductDetail;
