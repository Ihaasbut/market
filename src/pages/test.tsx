import { ReviewCard } from "@/entities/review";

export function Test() {
    return (
        <ReviewCard
            firstName="artem"
            secondName="luncov"
            rating={1.3}
            date="20 августа, 2021"
            text="Et feugiat eu scelerisque nulla mattis. At et enim dui mauris. Nisi, hendrerit dictum consequat tristique sed. Est ultrices etiam in lorem nulla a.Et feugiat eu scelerisque nulla mattis. At et enim dui mauris. Nisi"
        />
    );
}
