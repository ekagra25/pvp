import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { banners } from "../constants";
import { theme } from "../tailwind.config";

let timeoutId = null;
let touchstartX = 0;
let touchendX = 0;

export default function Carousel() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        document.querySelectorAll(".carousel-item").forEach((elem) => {
            elem.style.left = `-${active * 100}%`;
        });
        triggerTimeout();
    }, [active]);

    const triggerTimeout = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            changeActiveItem("next")();
        }, 5000);
    };

    const changeActiveItem = (dir) => () => {
        setActive((active) => {
            let newActive = active;
            switch (dir) {
                case "next": {
                    newActive += 1;
                    if (newActive === banners.length) return 0;
                    break;
                }
                case "prev": {
                    newActive -= 1;
                    if (newActive === -1) return banners.length - 1;
                    break;
                }
                default: {
                    newActive = dir;
                }
            }
            return newActive;
        });
    };

    const touchStart = (e) => {
        touchstartX =
            e.type === "mousedown" ? e.screenX : e.changedTouches[0].screenX;
    };

    const touchEnd = (e) => {
        touchendX =
            e.type === "mouseup" ? e.screenX : e.changedTouches[0].screenX;

        if (touchendX < touchstartX) changeActiveItem("next")();
        if (touchendX > touchstartX) changeActiveItem("prev")();

        touchstartX = 0;
        touchendX = 0;
    };

    return (
        <>
            <div
                className={classNames(
                    "flex relative overflow-hidden mb-3 -mx-4",
                    "sm:rounded-xl md:mx-0"
                )}
                draggable={false}
                onMouseEnter={() => clearTimeout(timeoutId)}
                onMouseLeave={triggerTimeout}
                onMouseDown={touchStart}
                onMouseUp={touchEnd}
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
            >
                {banners.map((item, index) => (
                    <div
                        key={index}
                        className="carousel-item flex relative justify-center min-w-full aspect-video duration-500"
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw 66vw"
                            draggable={false}
                        />
                        <p className="absolute bottom-4 h-fit text-white m-0 px-3 py-1 rounded-full backdrop-blur-2xl">
                            {item.alt}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex w-full justify-center items-center gap-x-5">
                <FaChevronCircleLeft
                    color={theme.colors.brand}
                    size={"1.5rem"}
                    onClick={changeActiveItem("prev")}
                    className="cursor-pointer"
                />
                {banners.map((item, index) => (
                    <span
                        key={index}
                        className={classNames(
                            "inline-block w-3 h-3 rounded-md cursor-pointer",
                            index === active ? "bg-brand" : "bg-hover-light"
                        )}
                        onClick={changeActiveItem(index)}
                    ></span>
                ))}
                <FaChevronCircleRight
                    color={theme.colors.brand}
                    size={"1.5rem"}
                    onClick={changeActiveItem("next")}
                    className="cursor-pointer"
                />
            </div>
        </>
    );
}
