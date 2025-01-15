export function formatDate(date) {
    const d = new Date(date);

    const datePart = d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const timePart = d.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return `${datePart} at ${timePart}`;
}

export function dateDaysAgo(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
}

export function setTimeToLastMinute(date) {
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
    return date;
}
