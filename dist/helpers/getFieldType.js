"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldType = void 0;
const getFieldType = (elt) => {
    if ("text" in elt)
        return "text";
    if ("date" in elt)
        return "date";
    if ("name" in elt)
        return "singleSelect";
    if ("number" in elt)
        return "number";
    return "unknown";
};
exports.getFieldType = getFieldType;
