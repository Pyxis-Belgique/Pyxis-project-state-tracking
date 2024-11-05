import {getInputOrThrow} from "./helpers/getInputOrThrow";
import {getOctokit} from "@actions/github";
import {setFailed} from "@actions/core";
import {projectItemQuery} from "./graphql-schemas/queries/projectItemQuery";
import {projectItemResponse} from "./graphql-schemas/responses/projectItemResponse";
import {getFieldType} from "./helpers/getFieldType";


export async function Run() {
    const githubPatToken = getInputOrThrow("organization-token");
    const apiToken = getInputOrThrow("api-token");
    const apiBaseUrl = getInputOrThrow("api-url");

    const octokit = getOctokit(githubPatToken)

    try {
        const result = await octokit.graphql<projectItemResponse>(projectItemQuery, {
            projectItemId: "PVTI_lADOCyNzbs4ArXwDzgUZUCk"
        });

        result.node.fieldValues.nodes.forEach(elt => {
            switch (getFieldType(elt)) {
                case "text":
                    console.log(`${(elt as { text: string }).text} | ${elt.field.name}`);
                    break;
                case "name":
                    console.log(`${(elt as { name: string }).name} | ${elt.field.name}`);
                    break
            }
        });

        console.log("---------------")
        console.log(result);
        console.log("---------------")
    } catch (error) {
        setFailed("GraphQL request failed")
    }
}

if (!process.env.JEST_WORKER_ID)
    (async () => await Run())();
