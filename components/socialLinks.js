import classNames from "classnames";
import Image from "next/image";
import { links } from "../constants";

export default function SocialLinks() {
    return (
        <div
            className={classNames(
                "flex w-full justify-center gap-3",
                "lg:flex-col"
            )}
        >
            {links.map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    className="w-10 lg:w-12 rounded-full shadow-md cursor-pointer"
                >
                    <Image src={item.src} alt={item.name} className="z-10" />
                </a>
            ))}
        </div>
    );
}
