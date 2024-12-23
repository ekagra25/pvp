import classNames from "classnames";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Select({ options, value, onChange, className }) {
    const [dropdown, setDropdown] = useState(false);

    const handleChange = (val) => {
        onChange(val);
        setDropdown(false);
    };

    return (
        <div className="relative flex justify-center min-w-[100px] shrink overflow-x-clip">
            <span
                className={classNames(
                    "inline-flex justify-center items-center px-2 border border-border-dark",
                    { "bg-brand text-white": dropdown },
                    className
                )}
                onClick={() => setDropdown(!dropdown)}
            >
                <span className="overflow-hidden text-ellipsis">
                    {
                        options.filter((option) => option.value === value)[0]
                            .label
                    }
                </span>
                <FaChevronDown
                    size={12}
                    className={classNames(
                        "shrink-0 ml-1 mt-0.5 transition-all",
                        { "rotate-180": dropdown }
                    )}
                />
            </span>
            {dropdown && (
                <ul className="absolute top-full backdrop-blur-md z-10 rounded-lg bg-brand-light bg-opacity-20 border border-white text-sm">
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            onClick={() => handleChange(option)}
                            className={classNames("py-1 px-3", {
                                "border-b border-white":
                                    index !== options.length - 1,
                            })}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
