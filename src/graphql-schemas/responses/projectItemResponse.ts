// types.ts

export interface projectItemResponse {
    node: {
        id: string;
        content: {
            __typename: string;
            id?: string;
            number?: number;
            title?: string;
            body?: string;
            url?: string;
            state?: string;
            createdAt?: string;
            updatedAt?: string;
            closedAt?: string;
            mergedAt?: string;
            author?: { login: string };
            assignees?: {
                nodes: { login: string }[];
            };
            labels?: {
                nodes: { name: string }[];
            };
            milestone?: {
                title: string;
                dueOn: string;
            };
            comments?: {
                nodes: {
                    body: string;
                    author: { login: string };
                    createdAt: string;
                }[];
            };
        };
        fieldValues: {
            nodes: (
                | {
                text: string;
                field: { name: string };
            }
                | {
                date: string;
                field: { name: string };
            }
                | {
                name: string;
                field: { name: string };
            }
                | {
                number: number;
                field: { name: string };
            }
                )[];
        };
    };
}
