// import { ReviewPanel } from "@/widgets/ReviewPanel";
import { useState } from "react";
import { CallbackSection } from "@/widgets/CallbackSection";
import { Button } from "@/shared/ui/Button";
import { Select } from "@/shared/ui/Select";



// export function Test() {
//     return <ReviewPanel />;
// }

const testsOptions = [
    {
        id: 1,
        name: "Рейтингу",
    },
    {
        id: 2,
        name: "Популярности",
    },
    {
        id: 3,
        name: "Цене",
    },
];

const testsOptions2 = [
    {
        id: 1,
        name: "Рейтингу",
    },
    {
        id: 2,
        name: "Популярности",
    },
    {
        id: 3,
        name: "Цене",
    },
];

const testsOptions3 = [
    {
        id: 1,
        name: "Рейтингу",
    },
    {
        id: 2,
        name: "Популярности",
    },
    {
        id: 3,
        name: "Цене",
    },
];

export function Test() {
    const [activeOption, setActiveOption] = useState(testsOptions[0].name);
    const [activeOption2, setActiveOption2] = useState(testsOptions2[0].name);
    const [activeOption3, setActiveOption3] = useState(testsOptions3[0].name);

    const handleChange = (value: string) => {
        console.log(value);
        setActiveOption(value);
    };
    const handleChange2 = (value: string) => {
        console.log(value);
        setActiveOption2(value);
    };
    const handleChange3 = (value: string) => {
        console.log(value);
        setActiveOption3(value);
    };
    return (
        <div>
            <Button variant="fill"> Отправить </Button>
            <Button variant="outside"> Перейти </Button>
            <Button variant="filter"> Сбросить фильтры </Button>

            <Select
                options={testsOptions}
                activeOption={activeOption}
                onChange={handleChange}
                variant="cartOrder"
                label="Выберите отделение"
            />

            <Select
                options={testsOptions2}
                activeOption={activeOption2}
                onChange={handleChange2}
                variant="cardProduct"
            />

            <Select
                options={testsOptions3}
                activeOption={activeOption3}
                onChange={handleChange3}
                variant="cardFilter"
            />

            <CallbackSection />
        </div>
    );
}
