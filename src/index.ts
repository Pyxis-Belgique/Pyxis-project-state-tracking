import {getInputOrThrow} from "./helpers/getInputOrThrow";
import {context, getOctokit} from "@actions/github";
import {setFailed} from "@actions/core";


export async function Run() {
    const githubPatToken = getInputOrThrow("organization-token");
    const apiToken = getInputOrThrow("api-token");
    const apiBaseUrl = getInputOrThrow("api-url");

    const octokit = getOctokit(githubPatToken)
    const query = `
        query($projectItemId: ID!) {
            node(id: $projectItemId) {
                ... on ProjectV2Item {
                    id
                    content {
                        __typename
                        ... on Issue {
                            id
                            number
                            title
                            body
                            url
                            state
                            createdAt
                            updatedAt
                            closedAt
                            author {
                                login
                            }
                            assignees(first: 10) {
                                nodes {
                                    login
                                }
                            }
                            labels(first: 10) {
                                nodes {
                                    name
                                }
                            }
                            milestone {
                                title
                                dueOn
                            }
                            comments(first: 10) {
                                nodes {
                                    body
                                    author {
                                        login
                                    }
                                    createdAt
                                }
                            }
                        }
                        ... on PullRequest {
                            id
                            number
                            title
                            body
                            url
                            state
                            createdAt
                            updatedAt
                            closedAt
                            mergedAt
                            author {
                                login
                            }
                            assignees(first: 10) {
                                nodes {
                                    login
                                }
                            }
                            labels(first: 10) {
                                nodes {
                                    name
                                }
                            }
                            milestone {
                                title
                                dueOn
                            }
                            comments(first: 10) {
                                nodes {
                                    body
                                    author {
                                        login
                                    }
                                    createdAt
                                }
                            }
                        }
                        ... on DraftIssue {
                            title
                            body
                        }
                    }
                    fieldValues(first: 20) {
                        nodes {
                            ... on ProjectV2ItemFieldTextValue {
                                text
                                field {
                                    ... on ProjectV2FieldCommon {
                                        name
                                    }
                                }
                            }
                            ... on ProjectV2ItemFieldDateValue {
                                date
                                field {
                                    ... on ProjectV2FieldCommon {
                                        name
                                    }
                                }
                            }
                            ... on ProjectV2ItemFieldSingleSelectValue {
                                name
                                field {
                                    ... on ProjectV2FieldCommon {
                                        name
                                    }
                                }
                            }
                            ... on ProjectV2ItemFieldNumberValue {
                                number
                                field {
                                    ... on ProjectV2FieldCommon {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const result = await octokit.graphql(query, {
            projectItemId: "PVTI_lADOCyNzbs4ArXwDzgUZUCk"
        });

        console.log("[SUCCESS]: GraphQL Data:", result);

    } catch (error) {
        console.error("GraphQL request failed", error);

        setFailed("GraphQL request failed")
    }
}

if (!process.env.JEST_WORKER_ID)
    (async () => await Run())();
