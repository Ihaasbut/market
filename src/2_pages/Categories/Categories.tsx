import { ProductCategories } from "@/entities/products/ProductCategories";
import { useGetCategoriesQuery } from "@/shared/api/api";

export function Categories() {
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategoriesQuery({isFull: false});

    if (!categories) {
        return;
    }
    if (categoriesLoading) {
        return <div className="container">грузится</div>;
    }

    if (categoriesError || !categories) {
        return null;
    }
    return (
        <div className="container">
            <ProductCategories
                categories={categories.categories}
                isFull={categories.isFull}
            />
        </div>
    );
}
