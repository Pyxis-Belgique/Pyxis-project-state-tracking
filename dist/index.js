"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
async function Run() {
    const patToken = (0, core_1.getInput)("organization-token");
    const apiBaseUrl = (0, core_1.getInput)("api-url");
    console.log(`hello world avec comme arg cette api url -> ${apiBaseUrl}`);
}
(async () => await Run())();
