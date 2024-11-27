# Example: JavaScript Streams

Example code for different ways to utilize HTTP streams in JavaScript.

## The Stream

There's a simple process in [1-logger.js](./1-logger.js) that simply appends a JSON string to a file `logfile.log` every second.

We'll use this as our imaginary service that pipes out data.

Run it:

```bash
node 1-logger.js
```

## The Upstream

The backend server that "calls the service" is a Node.js http server in [2-upstream-server.js](./2-upstream-server.js) that's simply using `node:child_process.spawn` to run `tail -f logfile.log` and piping that out on the response.

In a real server maybe the request would execute a shell command to an LLM, and you'd pipe back the output, not waiting until it finishes.

Run it:

```bash
node 2-upstream-server.js
```

## The Load Balancer

TODO: using Cloudflare as a middleman / proxy to prevent exposing your upstream.

There's a stub code in [3-cloudflare-tunnel.js](./3-cloudflare-tunnel.js) that's untested but should basically be correct.

## The Browser

> [!NOTE]
> To run this locally, I'm using [http-server](https://www.npmjs.com/package/http-server) with a special pass-through command which is currently pointed at the upstream.

Inside the [index.html](./4-browser/index.html) the request is a stream, which simply prepends them to the `<body>` as the chunks come in.

(Each chunk is one **or more** JSON lines, because in the request setup it may end up being several chunks stacked in one http frame. For a setup like this, once the http connection etc is established, it will typically settle to one line per chunk.)

Run it:

```bash
npm start
```
