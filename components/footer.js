import classNames from "classnames";
import Link from "next/link";
import { links, pages } from "../constants";

export default function Footer() {
    return (
        <footer className="mt-12 py-8 bg-footer text-text-secondary origin-top-left transition-all ease-out">
            <div className="container relative grid grid-cols-4 gap-8">
                <div
                    className={classNames(
                        "col-span-4 pb-8 border-b border-b-border-light",
                        "sm:col-span-2 sm:p-0 sm:border-none"
                    )}
                >
                    <p className="text-center sm:text-left">
                        © 2022 by{" "}
                        <span className="font-medium">
                            Shri Krishna Pranami Vishwa Parishad
                        </span>
                        , Delhi. All rights reserved.
                    </p>
                    <div
                        className={classNames("flex mt-6 gap-4", "sm:flex-col")}
                    >
                        <dl className="grow">
                            <dt className="italic">Inspiration</dt>
                            <dd className="font-medium">
                                Shri Mohan Priyacharyaji Maharaj
                            </dd>
                        </dl>
                        <dl className="grow">
                            <dt className="italic">Designed by</dt>
                            <dd className="font-medium">
                                Tilak Ratna Shastri, Jamnagar
                            </dd>
                            <dd className="font-medium">
                                Prakash Sharma, Delhi
                            </dd>
                        </dl>
                    </div>
                </div>
                <div className={classNames("col-span-2", "sm:col-span-1")}>
                    {pages.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={classNames(
                                "flex relative w-fit mb-2 hover:after:w-full",
                                "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-text-secondary after:transition-all"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className={classNames("col-span-2", "sm:col-span-1")}>
                    {links.map((item, index) => (
                        <dl key={index} className="mb-4">
                            <dt className="italic">{item.name}</dt>
                            <dd className="font-medium">
                                <Link key={index} href={item.href}>
                                    {item.label}
                                </Link>
                            </dd>
                        </dl>
                    ))}
                </div>
                <div className="radial-brand absolute h-[250px] left-0 right-1/4 -top-24 -z-10"></div>
                <div className="radial-brand-secondary absolute h-[250px] left-1/4 right-0 -top-28 -z-10"></div>
            </div>
        </footer>
    );
}
