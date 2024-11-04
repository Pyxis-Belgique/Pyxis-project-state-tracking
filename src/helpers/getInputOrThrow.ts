import {getInput} from "@actions/core";

export const getInputOrThrow = (name: string): string => {
    if (name === undefined || name === null || name === "")
        throw new Error(`Argument cannot be empty`);

    const value = getInput(name);

    if (value === undefined || value === null || value === "")
        throw new Error(`Input required: ${name}`);

    return value;
}