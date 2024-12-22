import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { RiCloseCircleLine, RiCloseFill } from "react-icons/ri";
import { theme } from "../tailwind.config";

export default function Toast({ type, message }) {
    const ref = useRef();
    const id = uuidv4();
    // console.log("file: toast.js → line 8 → Toast → id", id)

    useEffect(() => {
        const thisElem = ref.current;

        thisElem.style.bottom = `-${thisElem.clientHeight}px`;
        thisElem.style.opacity = 1;

        setTimeout(() => {
            thisElem.style.bottom = "16px";
        }, 500);

        // setTimeout(() => {
        //     thisElem.style.bottom = `-${thisElem.clientHeight}px`;

        //     setTimeout(() => {
        //         thisElem.remove();
        //     }, 500);
        // }, 5500);
    }, []);

    return (
        <div
            ref={ref}
            id={id}
            className="toast fixed left-1/2 -translate-x-1/2 flex gap-1 items-center bg-[transparent] z-10 transition-all"
            style={{ opacity: 0 }}
        >
            <span className="inline-flex p-3 pl-3.5 bg-success rounded-l-full rounded-r shadow-md">
                <FaCheck color={theme.colors.white} />
            </span>
            {/* <span className="bg-success">
                <FaCheck color={theme.colors.white} />
            </span> */}
            {/* <FaCheckCircle color={theme.colors.success} /> */}
            <p className="relative m-0 px-4 py-2 bg-bg-success shadow-md whitespace-nowrap">
                {message}
                <span className="bg-success"></span>
            </p>
            {/* {message} */}
            {/* <RiCloseCircleLine size="1.25rem" color={theme.colors["text-secondary"]} /> */}
            <span className="inline-flex p-2 pr-2.5 bg-bg-success rounded-r-full shadow-md">
                <RiCloseFill color={theme.colors["text-secondary"]} size="1.5rem" />
            </span>
            {/* <span className="bg-success"></span> */}
        </div>
    );
}
