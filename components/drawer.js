import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";

export default function Drawer({ children }) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const drawer = document.getElementById("side-drawer");
        const drawerToggle = document.getElementById("side-drawer-toggle");

        if (open) {
            drawer.style.left = 0;
            drawerToggle.style.left = `${drawer.clientWidth}px`;
            document.body.classList.add("overflow-hidden");
            document
                .getElementById("home")
                .classList.add("scale-95", "blur-sm");
            document
                .getElementsByTagName("header")[0]
                .classList.add("scale-95", "blur-sm");
            document
                .getElementsByTagName("footer")[0]
                .classList.add("scale-95", "blur-sm");
            return;
        }

        drawer.style.left = `-${drawer.clientWidth}px`;
        drawerToggle.style.left = 0;
        document.body.classList.remove("overflow-hidden");
        document.getElementById("home").classList.remove("scale-95", "blur-sm");
        document
            .getElementsByTagName("header")[0]
            .classList.remove("scale-95", "blur-sm");
        document
            .getElementsByTagName("footer")[0]
            .classList.remove("scale-95", "blur-sm");
    }, [open]);

    return (
        <div className="relative md:hidden z-50">
            <div
                id="side-drawer"
                className={
                    "fixed top-0 bottom-0 p-5 z-10 bg-white overflow-scroll transition-all ease-out"
                }
            >
                {children}
            </div>
            <div
                id="side-drawer-toggle"
                className="inline-flex items-center gap-2 fixed bottom-2 left-0 px-2 py-1 z-10 rounded-r-full shadow-md text-white bg-gradient-to-r from-brand to-brand-secondary transition-all ease-out"
                onClick={toggleDrawer}
            >
                {!open && (
                    <span className="whitespace-nowrap overflow-hidden">
                        Events & announcements
                    </span>
                )}
                <FaChevronCircleRight
                    size="1.25rem"
                    className={classNames("grow transition-all ease-out", {
                        "-rotate-180": open,
                    })}
                />
            </div>
            {open && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-0"
                    onClick={toggleDrawer}
                ></div>
            )}
        </div>
    );
}
