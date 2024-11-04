import { getInput } from "@actions/core";
import SpyInstance = jest.SpyInstance;
import { Run } from "../index";

jest.mock("@actions/core");

describe("Run function", () => {
    let getInputSpy: SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        getInputSpy = jest.spyOn(require("@actions/core"), "getInput");
    });

    afterEach(() => {
        getInputSpy.mockRestore();
    });

    test("should get all required inputs", async () => {
        getInputSpy.mockImplementation((inputName) => {
            switch (inputName) {
                case "organization-token":
                    return "fakeOrganizationToken";
                case "api-token":
                    return "fakeApiToken";
                case "api-url":
                    return "https://fakeapi.com";
                default:
                    return "";
            }
        });

        await Run();

        expect(getInput).toHaveBeenCalledWith("organization-token");
        expect(getInput).toHaveBeenCalledWith("api-token");
        expect(getInput).toHaveBeenCalledWith("api-url");
    });

    test("should throw error if organization-token is missing", async () => {
        getInputSpy.mockImplementation((inputName) => {
            if (inputName === "organization-token") return "";
            if (inputName === "api-token") return "fakeApiToken";
            if (inputName === "api-url") return "https://fakeapi.com";
        });

        await expect(Run()).rejects.toThrow("Input required: organization-token");
    });

    test("should throw error if api-token is missing", async () => {
        getInputSpy.mockImplementation((inputName) => {
            if (inputName === "organization-token") return "fakeOrganizationToken";
            if (inputName === "api-token") return "";
            if (inputName === "api-url") return "https://fakeapi.com";
        });

        await expect(Run()).rejects.toThrow("Input required: api-token");
    });

    test("should throw error if api-url is missing", async () => {
        getInputSpy.mockImplementation((inputName) => {
            if (inputName === "organization-token") return "fakeOrganizationToken";
            if (inputName === "api-token") return "fakeApiToken";
            if (inputName === "api-url") return "";
        });

        await expect(Run()).rejects.toThrow("Input required: api-url");
    });
});
