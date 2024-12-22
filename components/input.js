import classNames from "classnames";
import { useState } from "react";

export default function Input({ className, methods, name, options, placeholder }) {
    const [focus, setFocus] = useState(false);

    const { getValues, formState, register } = methods;
    const value = getValues(name);
    const error = formState.errors?.[name]?.message;

    return (
        <div
            className={classNames(
                "relative mb-7 w-full h-15 px-2.5 border bg-white rounded-lg transition-all",
                error
                    ? "border-error"
                    : focus
                    ? "border-brand-light"
                    : "border-border-light",
                className
            )}
        >
            <label
                className={classNames(
                    "absolute -translate-y-1/2 text-text-tertiary transition-all",
                    focus || value ? "text-xs top-4" : "top-1/2"
                )}
                htmlFor={name}
            >
                {placeholder}
            </label>
            <input
                {...register(name, { ...options })}
                className="relative h-full w-full pt-4 top-0 bg-[transparent] outline-none z-10"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            {error && (
                <span className="absolute left-0 top-full pt-1 text-xs text-error">
                    {error}
                </span>
            )}
        </div>
    );
}

// export default function Input({
//     className,
//     error,
//     register,
//     name,
//     options,
//     placeholder,
//     value,
//     ...rest
// }) {
//     console.log("file: input.js → line 14 → value", value)
//     const [focus, setFocus] = useState(false);

//     return (
//         <div
//             className={classNames(
//                 "relative mb-7 w-full h-15 px-2.5 border bg-white rounded-lg transition-all",
//                 error
//                     ? "border-error"
//                     : focus
//                     ? "border-brand-light"
//                     : "border-border-light",
//                 className
//             )}
//         >
//             <label
//                 className={classNames(
//                     "absolute -translate-y-1/2 text-text-tertiary transition-all",
//                     focus || value ? "text-xs top-4" : "top-1/2"
//                 )}
//                 htmlFor={name}
//             >
//                 {placeholder}
//             </label>
//             <input
//                 {...register(name, { ...options, onBlur: () => setFocus(false)} )}
//                 // {...rest}
//                 className="relative h-full w-full pt-4 top-0 bg-[transparent] outline-none z-10"
//                 onFocus={() => setFocus(true)}
//             />
//             {error && (
//                 <span className="absolute left-0 top-full pt-1 text-xs text-error">
//                     {error}
//                 </span>
//             )}
//         </div>
//     );
// }
