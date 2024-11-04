import {getInputOrThrow} from "./helpers/getInputOrThrow";

export async function Run() {
    const githubPatToken = getInputOrThrow("organization-token");
    const apiToken = getInputOrThrow("api-token");
    const apiBaseUrl = getInputOrThrow("api-url");
}

if (!process.env.JEST_WORKER_ID)
    (async () => await Run())();
