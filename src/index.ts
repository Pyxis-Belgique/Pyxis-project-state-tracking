import {getInput} from "@actions/core";

async function Run() {
    const patToken = getInput("organization-token");
    const apiBaseUrl = getInput("api-url");

    console.log(`hello world avec comme arg cette api url -> ${apiBaseUrl}`);
}

(async () => await Run())();