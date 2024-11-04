import { getInputOrThrow } from "../helpers/getInputOrThrow";
import SpyInstance = jest.SpyInstance;

jest.mock("@actions/core");

describe("getInputOrThrow function", () => {
    let getInputSpy: SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        getInputSpy = jest.spyOn(require("@actions/core"), "getInput");
    });

    afterEach(() => {
        getInputSpy.mockRestore();
    });

    test("should return the input value if provided", () => {
        getInputSpy.mockReturnValue("someValue");
        const result = getInputOrThrow("test-input");
        expect(result).toBe("someValue");
    });

    test("should throw error if input is empty", () => {
        getInputSpy.mockReturnValue("");
        expect(() => getInputOrThrow("test-input")).toThrow("Input required: test-input");
    });

    test("should throw error if input is undefined", () => {
        getInputSpy.mockReturnValue(undefined);
        expect(() => getInputOrThrow("test-input")).toThrow("Input required: test-input");
    });

    test("should throw error if input name is missing or invalid", () => {
        expect(() => getInputOrThrow("")).toThrow("Argument cannot be empty");
    });
});
