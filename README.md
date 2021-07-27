# conntest

`conntest` is short for _"connection test"_.

Reproduces an issue I'm seeing with Node.js in Docker.  The client node process exits unceremoniously with no warnings if the socket connection is broken due to the server resetting. This happens only when the client is running in Docker.

## Prerequesites

This assumes a global installation of `nodemon` is available.

```
npm install nodemon -g
```

## cserver

This is the server application that runs on the host.

### Configuration

You'll need to set two environment variables or use an **.env** file.

| Name          | Meaning              | Example value |
|---------------|----------------------|---------------|
| `LISTEN_PORT` | Port to listen on    | `8337`        |
| `LISTEN_ADDR` | Address to listen on | `127.0.0.1`   |

### Build and Run

```
npm install
npm run dev
```

## cclient

This is the client application that runs in Docker, or locally on the host.

The main code is **client.js**, but there is also a minimal version of the client with hardcoded parameters and no dependencies called **min-client.js**.

### Configuration

You'll need to set two environment variables or use an **.env** file.

| Name           | Meaning               | Example value          |
|----------------|-----------------------|------------------------|
| `CONNECT_PORT` | Port to connect to    | `8337`                 |
| `CONNECT_ADDR` | Address to connect to | `host.docker.internal` |

### Build and Run (Locally)

```
npm install
npm run dev
```

### Build and Run (Docker)

```
npm run build
npm run indocker
```

#### Alternate Way to Run Interactively

```
docker run --rm -it --name cclient -e CONNECT_PORT=8337 -e CONNECT_ADDR=host.docker.internal cclient /bin/bash
node client.js
```

## To Reproduce the Bug

1. Build and run the server (`cserver`) on the host.
2. Build and run the client (`cclient`) in Docker, directing it to connect to the server from step 1.
3. Restart the server (by entering `rs`, which directs _nodemon_ to restart the process).

### Expected Results

```txt
E:\Test\conntest\cclient>npm run dev

> cclient@1.0.0 dev E:\Test\conntest\cclient
> nodemon client.js

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.* ..\common\**\*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node client.js`
2021-07-27 19:57:06.805: I am cclient.
2021-07-27 19:57:06.811: connecting...
2021-07-27 19:57:06.814: connected
2021-07-27 19:57:06.815: connect callback
2021-07-27 19:57:08.713: Error: read ECONNRESET
2021-07-27 19:57:08.713: disconnected
2021-07-27 19:57:09.228: connecting...
2021-07-27 19:57:09.230: connected
2021-07-27 19:57:09.230: connect callback
```

In this situation, it correctly raises an `error` event, disconnects and tries again.

### Actual Results

```txt
E:\Test\conntest\cclient>docker run --rm -it --name cclient -e CONNECT_PORT=8337 -e CONNECT_ADDR=host.docker.internal cclient /bin/bash
root@bfcfd76a00e4:/usr/src/cclient# node client.js
2021-07-27 19:58:25.620: I am cclient.
2021-07-27 19:58:25.624: connecting...
2021-07-27 19:58:25.635: connected
2021-07-27 19:58:25.635: connect callback
root@bfcfd76a00e4:/usr/src/cclient#
```

In this situation, the process just **exits**.  There is no error or anything.  If running directly from Docker, the container will exit when the process exits.

You can run with the _alternate way to run interactively_ (by specifying the command `/bin/bash`) and the process will exit without causing the whole container to exit.  (Output of this technique is shown above.)
