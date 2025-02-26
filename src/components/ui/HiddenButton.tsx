import { useState } from "react";
import { createPortal } from 'react-dom';

import { MenuPage } from "../pages/MenuPage";
import useLongPress from "../../hooks/useLongPress";

export default function HiddenButton() {
    const [showMenu, setShowMenu] = useState(false);
    const longPress = useLongPress(() => {
        setShowMenu(true);
    }, 1000);
    return (
        <>
            {showMenu && createPortal(<MenuPage onClose={() => setShowMenu(false)} />, document.body)}
            <div {...longPress} className="fixed top-0 right-0 z-10 w-[300px] h-[300px] bg-transparent">

            </div>
        </>
    );
}