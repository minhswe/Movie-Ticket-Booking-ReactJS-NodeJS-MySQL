import React from "react";

const FormatReleaseDate = (releaseDate) => {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sepr",
        "Oct",
        "Nov",
        "Dec",
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
