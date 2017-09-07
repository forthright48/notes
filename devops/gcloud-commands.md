# gcloud Configuration

```
gcloud init                     # Initiate project and region
gcloud auth list                # Check which users are authenticated on local system
gcloud config list              # Check current config values
gcloud config get-value project # Get config value
```

# gcloud Docker
```
docker build -t gcr.io/${PROJECT_ID}/hello-app:v1 .     # The title of container needs to have project ID
gcloud docker -- push gcr.io/${PROJECT_ID}/hello-app:v1 # How to push to gcr.io
```

# gcloud Compute
```
gcloud compute instances list          # Get list of VM running
```

# gcloud Containers
```
gcloud container clusters create hello-cluster --num-nodes=3 # Create a new cluster with 3 nodes

```

# gcloud Storage
```
gcloud compute disks create --size 200GB mysql-disk
```
