import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";

async function Run() {
    const patToken = getInput("organization-token");
    const apiBaseUrl = getInput("api-url");

    console.log(`hello world avec comme arg cette api url -> ${apiBaseUrl}`);
}

(async () => await Run())();