// const navLinks = [
//     {
//         link: "/",
//         text: "Home",
//     },
//     {
//         link: "categories",
//         text: "Catalog",
//     },
//     {
//         link: "Wholesale",
//         text: "Wholesale",
//     },
//     {
//         link: "/aboutus",
//         text: "About Us",
//     },
// ];

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export function Header() {
    // const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    // useEffect(() => {
    //     if (isOpenMenu) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "";
    //     }

    //     return () => {
    //         document.body.style.overflow = "";
    //     };
    // }, [isOpenMenu]);

    return (
        <>
            <HeaderDesktop />
            <HeaderMobile />
        </>
    );
}

