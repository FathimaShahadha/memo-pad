export function formatDate(date) {
    return date.toLocaleDateString("en-LK", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });  
}