"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputOrThrow = void 0;
const core_1 = require("@actions/core");
const getInputOrThrow = (name) => {
    if (name === undefined || name === null || name === "")
        throw new Error(`Argument cannot be empty`);
    const value = (0, core_1.getInput)(name);
    if (value === undefined || value === null || value === "")
        throw new Error(`Input required: ${name}`);
    return value;
};
exports.getInputOrThrow = getInputOrThrow;
