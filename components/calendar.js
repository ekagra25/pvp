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
    parseISO,
    isToday,
    isSameMonth,
} from "date-fns";
import { useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { theme } from "../tailwind.config";
import Select from "./select";
import festivals from "../json/festivals.json";

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

    const hasEvents = (date) => {
        return festivals.some(event => {
            const startDate = parseISO(event.startDate);
            const endDate = parseISO(event.endDate);
            return (
                isSameDay(startDate, date) || 
                (isAfter(date, startDate) && isBefore(date, endDate)) ||
                isSameDay(endDate, date)
            );
        });
    };

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
            <tr key={week} className="flex justify-between mb-3">
                {week.map((date) => (
                    <td
                        key={date}
                        className="relative w-full aspect-square pb-1.5"
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
                                        "after:content-[''] after:absolute after:bottom-0 after:inline-block after:w-1 after:h-1 after:bg-brand-lightest after:rounded": 
                                            hasEvents(date)
                                    },
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

    const renderEvent = (event) => {
        const getLocations = (locations) => {
            if (locations[0] === "everywhere") {
                return "All places";
            } else if (locations[locations.length - 1] === "everywhere") {
                const mainLocations = locations.slice(0, -1);
                // Return an array to handle different capitalizations
                return [mainLocations.join(", "), " and all other places"];
            }
            return locations.join(", ");
        };

        const locations = getLocations(event.locations);

        return (
            <div key={event.id} className="relative mb-2.5 ml-2.5">
                <div className="absolute -left-2.5 top-0 w-1 h-full bg-brand rounded-full" />
                <div className="font-medium text-brand capitalize">{event.festival}</div>
                <div className="text-sm">
                    {format(parseISO(event.startDate), "d MMM")}
                    {event.startDate !== event.endDate && 
                        ` - ${format(parseISO(event.endDate), "d MMM")}`}
                </div>
                <div className="text-sm text-text-secondary">
                    {Array.isArray(locations) ? (
                        <>
                            <span className="capitalize">{locations[0]}</span>
                            <span>{locations[1]}</span>
                        </>
                    ) : (
                        <span className="capitalize">{locations}</span>
                    )}
                </div>
            </div>
        );
    };

    const getSelectedDateEvents = () => {
        const selectedDateEvents = festivals.filter(event => {
            const startDate = parseISO(event.startDate);
            const endDate = parseISO(event.endDate);
            return (
                isSameDay(startDate, selectedDate) || 
                (isAfter(selectedDate, startDate) && isBefore(selectedDate, endDate)) ||
                isSameDay(endDate, selectedDate)
            );
        });
        
        if (selectedDateEvents.length === 0) {
            return <div className="text-text-secondary text-center">No events on {format(selectedDate, "d MMMM")}</div>;
        }
        
        return selectedDateEvents.map(renderEvent);
    };

    const getUpcomingEvents = () => {
        const today = new Date();
        const oneMonthFromNow = add(today, { months: 1 });

        const upcomingEvents = festivals.filter(event => {
            const eventDate = parseISO(event.startDate);
            return (
                isAfter(eventDate, today) && 
                isBefore(eventDate, oneMonthFromNow)
            );
        });

        if (upcomingEvents.length === 0) {
            return <div className="text-text-secondary">No upcoming events in the next 30 days</div>;
        }

        // Sort by start date
        upcomingEvents.sort((a, b) => 
            parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()
        );

        return upcomingEvents.map(renderEvent);
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
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                            <th key={index} className="w-full aspect-square inline-flex justify-center items-center">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="w-full text-sm 2xl:text-base">
                    {getTableBody()}
                </tbody>
            </table>
            <div className="w-[70vw] sm:w-full pt-2 border-t border-border-light">
                <div className="mt-1 mb-4">
                    {/* <h3 className="font-medium mb-2">Events on {format(selectedDate, "d MMMM")}</h3> */}
                    {getSelectedDateEvents()}
                </div>
                <div>
                    <h3 className="font-medium mb-2">Upcoming Events</h3>
                    <div className="max-h-60 overflow-y-auto">
                        {getUpcomingEvents()}
                    </div>
                </div>
            </div>
        </>
    );
}
