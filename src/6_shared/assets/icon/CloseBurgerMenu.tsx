type CloseBurgerMenu = {
    onToggle: () => void;
};

function CloseBurgerMenu({ onToggle }: CloseBurgerMenu) {
    return (
        <svg
            onClick={onToggle}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
        >
            <path
                d="M17 1L1 17M17 17L1 1L17 17Z"
                stroke="#161C24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default CloseBurgerMenu;
