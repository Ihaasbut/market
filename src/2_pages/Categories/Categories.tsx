import { ProductCategories } from "@/entities/products/ProductCategories";
import { useGetCategoriesQuery } from "@/shared/api/api";
import { ScreenBlue } from "@/shared/ui/ScreenBlue/ScreenBlue";

export function Categories() {
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategoriesQuery({ isFull: false });


    if (categoriesLoading) {
        return <ScreenBlue />;
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
