import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GrClose, GrMenu } from "react-icons/gr";
import { pages } from "../constants";

export default function Header() {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        const menu = document.getElementById("menu-dropdown");
        if (open) {
            menu.setAttribute("style", "max-height: 0px");
            setOpen(false);
            return;
        }
        menu.setAttribute("style", `max-height: ${menu.scrollHeight + 16}px`);
        setOpen(true);
    };

    return (
        <header className="min-h-14 flex mb-4 bg-bg-primary shadow-lg origin-bottom-left transition-all ease-out">
            <div
                className={classNames(
                    "container w-full py-2 flex z-50",
                    "flex-col",
                    "lg:flex-row lg:justify-between"
                )}
            >
                <div className="flex justify-between items-center">
                    <Link className="shrink-0" href="/">
                        <Image
                            src="/images/logo.png"
                            alt="Pranami Vishwa Logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                    <div
                        className="lg:hidden cursor-pointer"
                        onClick={toggleMenu}
                    >
                        {open ? <GrClose /> : <GrMenu />}
                    </div>
                </div>

                <div
                    id="menu-dropdown"
                    className={classNames(
                        "flex flex-col h-fit max-h-0 overflow-hidden transition-all border-border-dark",
                        "lg:flex-row lg:max-h-full lg:mt-0 lg:pb-0 lg:border-none",
                        open
                            ? "mt-3 pt-1 border-t border-t-border-dark"
                            : "border-none"
                    )}
                >
                    {pages.map((item, index) => {
                        const isCurrentPage = item.href === router.pathname;

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={classNames(
                                    "lg:px-3 items-center rounded-md transition-all py-2 px-1",
                                    {
                                        "cursor-pointer lg:hover:bg-hover-light":
                                            !isCurrentPage,
                                    },
                                    {
                                        "text-brand font-medium": isCurrentPage,
                                    }
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
