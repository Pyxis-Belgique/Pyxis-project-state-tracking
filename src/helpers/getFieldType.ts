export const getFieldType = (elt: any): string => {
    if ("text" in elt) return "text";
    if ("date" in elt) return "date";
    if ("name" in elt) return "singleSelect";
    if ("number" in elt) return "number";
    return "unknown";
}