import { useEffect, useRef, useState } from "react";

import { HEADER_NAV_LINKS } from "./headerNavLinks";

type useHookProps = {
    onToggle?: () => void;
};

export const useNavLinks = ({ onToggle }: useHookProps) => {
    const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false);
    const catalogRef = useRef<HTMLDivElement>(null);
    const NAV_LINKS = HEADER_NAV_LINKS;

    const handleLinkClick = () => {
        if (onToggle) {
            setTimeout(onToggle, 300);
        }
    };

    const onOpen = () => {
        setIsOpenCatalog((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                catalogRef.current &&
                !catalogRef.current.contains(event.target as Node)
            ) {
                setIsOpenCatalog(false);
            }
        };

        if (isOpenCatalog) {
            document.addEventListener("click", handleClickOutside);
            return () =>
                document.removeEventListener("click", handleClickOutside);
        }
    }, [isOpenCatalog]);

    return { handleLinkClick, onOpen, isOpenCatalog, catalogRef, NAV_LINKS };
};
