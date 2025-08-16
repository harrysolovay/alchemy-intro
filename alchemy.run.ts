import alchemy from "alchemy"
import {Worker} from "alchemy/cloudflare"

const app = await alchemy("my-app")

const worker = await Worker("my-worker", {
  entrypoint: "./worker.ts",
})

const {url} = worker
console.log({url})

await app.finalize()