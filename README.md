# conntest

`conntest` is short for _"connection test"_.

Reproduces an issue I'm seeing with Node.js in Docker.  The client connection gets reset periodically (once every 6 minutes 30 seconds) when the client is running in Docker on WSL 2.

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
