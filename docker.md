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
All containers are connected to default network bridge named docker0. Using this bridge, any container can communicate using any other contrainer using their ip address. DNS resolution using container name is available for user-created-networks only.

- Create Network: `docker network create --driver bridge <network-name>`
- Run container on network: `docker run --network <network-name> -itd <container>`
- Connect container to network: `docker network connect [OPTIONS] NETWORK CONTAINER`

# Remove
1. Remove image: `docker rmi <image-name+>
2. Remove containers: `docker container prune`
3. Remove dangling images: `docker rmi $(docker images -f "dangling=true" -q)`

# Misc
1. See running containers: `docker ps`
1. Exposed Port Binding: use -P flag during `run`
