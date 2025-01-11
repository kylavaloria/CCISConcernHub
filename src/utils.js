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
