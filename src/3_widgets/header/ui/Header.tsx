import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

type HeaderProps = {
    onLogout?: () => void;
};

export function Header({ onLogout }: HeaderProps) {
    return (
        <>
            <HeaderDesktop onLogout={onLogout} />
            <HeaderMobile onLogout={onLogout} />
        </>
    );
}

