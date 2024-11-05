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

        console.log(result);

        result.node.fieldValues.nodes.forEach(elt => {

            if ("text" in elt)
                console.log(`${elt.text} | ${elt.field.name}`);
            else if ("name" in elt)
                console.log(`${elt.name} | ${elt.field.name}`);
            else if ("date" in elt)
                console.log(`${elt.date} | ${elt.field.name}`);
            else if ("number" in elt)
                console.log(`${elt.number} | ${elt.field.name}`);
            else
                console.log(`unknown`);

        });
    } catch (error) {
        setFailed("GraphQL request failed")
    }
}

if (!process.env.JEST_WORKER_ID)
    (async () => await Run())();
