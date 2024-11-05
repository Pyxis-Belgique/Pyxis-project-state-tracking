import {getInputOrThrow} from "./helpers/getInputOrThrow";
import {getOctokit} from "@actions/github";
import {setFailed} from "@actions/core";
import {projectItemQuery} from "./graphql-schemas/queries/projectItemQuery";
import {projectItemResponse} from "./graphql-schemas/responses/projectItemResponse";


export async function Run() {
    const githubPatToken = getInputOrThrow("organization-token");
    const apiToken = getInputOrThrow("api-token");
    const apiBaseUrl = getInputOrThrow("api-url");

    const octokit = getOctokit(githubPatToken)

    try {
        const result = await octokit.graphql<projectItemResponse>(projectItemQuery, {
            projectItemId: "PVTI_lADOCyNzbs4ArXwDzgUZUCk"
        });

        console.log("[SUCCESS]: GraphQL Data:", result);
        console.log(result.node.fieldValues.nodes);
    } catch (error) {
        console.error("GraphQL request failed", error);

        setFailed("GraphQL request failed")
    }
}

if (!process.env.JEST_WORKER_ID)
    (async () => await Run())();
