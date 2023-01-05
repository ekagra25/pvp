import classNames from "classnames";
import {
    add,
    endOfMonth,
    getDay,
    getDaysInMonth,
    getMonth,
    format,
    isAfter,
    isBefore,
    isSameDay,
    setMonth,
    startOfMonth,
} from "date-fns";
import { useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { theme } from "../tailwind.config";
import Select from "./select";

const now = Date.now();

const selectOptions = [
    { label: "January", value: 0 },
    { label: "February", value: 1 },
    { label: "March", value: 2 },
    { label: "April", value: 3 },
    { label: "May", value: 4 },
    { label: "June", value: 5 },
    { label: "July", value: 6 },
    { label: "August", value: 7 },
    { label: "September", value: 8 },
    { label: "October", value: 9 },
    { label: "November", value: 10 },
    { label: "December", value: 11 },
];

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState(now);

    const getTableBody = () => {
        const start = startOfMonth(selectedDate);
        const end = endOfMonth(selectedDate);
        const firstDay = getDay(start);
        const lastDay = getDay(end);
        const totalDays = getDaysInMonth(selectedDate);
        const result = [];
        let temp = [];
        let i = firstDay === 0 ? -6 : -(firstDay - 1);
        let j = lastDay === 0 ? totalDays : totalDays + (7 - lastDay);
        while (i <= j) {
            temp.push(add(start, { days: i }));
            if (temp.length === 7) {
                result.push(temp);
                temp = [];
            }
            i++;
        }

        return result.map((week) => (
            <tr className="flex justify-between mb-3">
                {week.map((date) => (
                    <td
                        className="inline-bloxk relative w-full aspect-square pb-1.5"
                        onClick={changeSelectedDate("date", date)}
                    >
                        {isSameDay(date, start) ||
                        (isAfter(date, start) && isBefore(date, end)) ? (
                            <span
                                className={classNames(
                                    "inline-flex w-full max-w-[32px] aspect-square justify-center items-center",
                                    {
                                        "bg-brand text-white rounded-full":
                                            isSameDay(date, selectedDate),
                                    },
                                    "after:content-[''] after:absolute after:bottom-0 after:inline-block after:w-1 after:h-1 after:bg-brand-lightest after:rounded"
                                )}
                            >
                                {format(date, "d")}
                            </span>
                        ) : null}
                    </td>
                ))}
            </tr>
        ));
    };

    const changeSelectedDate = (type, value) => (e) => {
        setSelectedDate((selectedDate) => {
            let newSelectedDate = selectedDate;
            switch (type) {
                case "date": {
                    return value;
                }
                case "month": {
                    if (value === "prev") {
                        return add(selectedDate, { months: -1 });
                    }
                    if (value === "next") {
                        return add(selectedDate, { months: 1 });
                    }
                    return setMonth(selectedDate, value);
                }
            }
            return newSelectedDate;
        });
    };

    const changeMonth = (val) => {
        changeSelectedDate("month", val.value)();
    };

    return (
        <>
            <div className="inline-flex w-full justify-between items-center gap-2 mb-3">
                <FaChevronCircleLeft
                    className="flex-shrink-0"
                    color={theme.colors.brand}
                    size={"1.25rem"}
                    onClick={changeSelectedDate("month", "prev")}
                />
                <div className="inline-flex items-center gap-1 overflow-x-clip">
                    <Select
                        options={selectOptions}
                        value={getMonth(selectedDate)}
                        onChange={changeMonth}
                        className={"mr-1 rounded-full max-w-full"}
                    />
                    <span>{format(selectedDate, "yyyy")}</span>
                </div>
                <FaChevronCircleRight
                    className="flex-shrink-0"
                    color={theme.colors.brand}
                    size={"1.25rem"}
                    onClick={changeSelectedDate("month", "next")}
                />
            </div>
            <table className="w-full text-center">
                <thead className="w-full">
                    <tr className="flex justify-between mb-2">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                            <th className="w-full aspect-square inline-flex justify-center items-center">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="w-full text-sm 2xl:text-base">
                    {getTableBody()}
                </tbody>
            </table>
            <div className="pt-2 text-center border-t border-border-light">
                No events
            </div>
        </>
    );
}
