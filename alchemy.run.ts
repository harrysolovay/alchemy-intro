import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";
import { GitHubComment } from "alchemy/github";
import { CloudflareStateStore } from "alchemy/state";
import { env } from "node:process";

// BLAH
const app = await alchemy("my-app", {
  stateStore: (scope) => new CloudflareStateStore(scope),
});

const worker = await Worker("my-worker", {
  entrypoint: "./worker.ts",
  version: app.stage === "prod" ? undefined : app.stage,
});

const { url } = worker;
console.log({ url });

if (env.PULL_REQUEST) {
  await GitHubComment("preview-comment", {
    owner: "harrysolovay",
    repository: "alchemy-intro",
    issueNumber: Number(env.PULL_REQUEST),
    body: `Preview URL: ${url}
    
Built from ${env.GITHUB_SHA!.slice(0, 7)}`
  })
}

await app.finalize();
