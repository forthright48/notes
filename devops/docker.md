# Building a docker from dockerfile

Create a Dockerfile

- It cannot be empty
- Must start with "From <something>"

Then build the docker image

- Basic: `docker build .`
- With Title: `docker build -t <title-name> .`

Docker will then create an image

## More Dockerfile Macros
- `WORKDIR <path>`: creates and changes to path
- `COPY <source> <dest>`: copies file from host to container
- `ADD <source> <dest>`: adds file from host to container. Source can be url. zip or tar balls would be unzipped.
- `RUN <cmd>`: creates a new layer
- `CMD [<string>]`

# Docker Network
All containers are connected to default network bridge named docker0. Using this bridge, any container can communicate using any other container using their ip address. DNS resolution using container name is available for user-created-networks only.

- Create Network: `docker network create --driver bridge <network-name>`
- Run container on network: `docker run --network <network-name> -itd <container>`
- Connect container to network: `docker network connect [OPTIONS] NETWORK CONTAINER`

# Docker CLI commands

```
docker images # to view all images
```

# Remove
1. Remove image: `docker rmi <image-name+>`
2. Remove containers: `docker container prune`
3. Remove dangling images: `docker rmi $(docker images -f "dangling=true" -q)`
1. Remove Volume: `docker volume prune` to remove unused volume.

# Exec

1. `docker exec CONTAINER CMD`
1. `dcocker exec -it CONTAINER /bin/bash` to ssh into container.
1. You cannot reattach to a detached exec-process.
1. Docker exec creates a process. Use `ps aux | grep CMD` to find it out and kill it.

# Docker Compose
Writing `docker run` with various flags and then connecting them to networks and doing these all for multiple containers is tiresome. Docker compose makes things easy for us.

`docker-compose` is a python script. Once installed, we need to create a `docker-compose.yml` file. `docker-compose` will work using that config file.

```
pip install --user docker-compose 
docker-compose up     # creates and starts the containers and sets them up accordingly.
docker-compose down   # stops and destroys all containers and networks created during the process. Volumes are not destroyed.
docker-compose down -v # to destroy the volumes.
docker-compose start|stop # stops or starts without destroying the containers.  
```

## env File

We can declare a `.env` file with following format:

```
key=value
```

Then we can use these values in docker-compose as following:

```
...
environment:
  - SOMETHING=${key}
```

# Docker Swarm

Docker Swarm is a **Container Orchestration System**.

# CMD or Entrypoint

Define these parameters so that it is possible to run docker containers without passing any execution parameters, e.g, `docker run nginx`.

Passing execution parameters will override cmd command. It is a bit of hassle to override entrypoint. Better to stick with cmd.

# Misc
1. See running containers: `docker ps`
1. Exposed Port Binding: use -P flag during `run`
