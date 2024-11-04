import React from "react";

const FormatReleaseDate = (releaseDate) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    if (!releaseDate) return null;

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        const monthText = monthNames[parseInt(month) - 1];
        return `${day} - ${monthText} - ${year}`
    };
    return <span>{formatDate(releaseDate)}</span>;
};

export default FormatReleaseDate;
