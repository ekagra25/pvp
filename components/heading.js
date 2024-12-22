import classNames from "classnames";
import React from "react";

export default function Heading(props) {
    React.createElement(props.as || "h1", {
        className: "pl-2 border-l-4 border-l-brand"
    })
    
    return (
        <div className={classNames("flex w-full justify-center gap-3", "lg:flex-col")}>
            {links.map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    className="w-10 lg:w-12 rounded-full shadow-md cursor-pointer"
                >
                    <Image src={item.src} alt={item.alt} className="z-10" />
                </a>
            ))}
        </div>
    );
}
