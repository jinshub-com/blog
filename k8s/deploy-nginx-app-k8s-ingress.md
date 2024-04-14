# How to Deploy Nginx App on a Kubernetes Cluster with Ingress

In this tutorial, we will deploy a simple web application on a Kubernetes cluster using Ingress. Ingress is an API object that manages external access to services within a Kubernetes cluster. It provides HTTP and HTTPS routing to services based on hostnames and paths.

Specifically, we will deploy a sample web application called "hello-nginx" that serves a "Welcome to nginx" page using the Nginx image. We will expose this application to the outside world using an Ingress resource.

## Prerequisites

Before you begin, you should have the following:

- A Kubernetes cluster up and running. If you don't have one, you can follow our guide on [Deploying a Kubernetes Cluster on Ubuntu using MicroK8s](./deploy-k8s-cluster-ubuntu-microk8s.md).
- Ingress enabled on your Kubernetes cluster. If you haven't enabled it yet, you can do so by running the following command:

  ```bash
  microk8s enable ingress
  ```
  For Kubernetes clusters running on other platforms, you can refer to the official documentation for enabling Ingress: [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).

Note: In this tutorial, we are using the version `v1.29.2` of MicroK8s. The commands and configurations may vary depending on the version you are using.

## Deploying the Nginx Web Application within a Namespace

1. Create a namespace for the application:

   ```bash
   microk8s kubectl create namespace sample-namespace
   ```
   This command creates a new namespace named `sample-namespace` where we will deploy the Nginx web application.
2. Create a new file named `hello-nginx.yaml` and open it in a text editor:

   ```bash
   vi hello-nginx.yaml
   ```
3. Add the following content to the file:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: hello-nginx
     namespace: sample-namespace
     labels:
       app: hello-nginx
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: hello-nginx
     template:
       metadata:
         labels:
           app: hello-nginx
       spec:
         containers:
         - name: hello-nginx
           image: nginx:1.25.4
           ports:
           - containerPort: 80
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: hello-nginx-service
     namespace: sample-namespace
   spec:
     selector:
       app: hello-nginx
     ports:
       - protocol: TCP
         port: 80
         targetPort: 80
   ---
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: hello-nginx-ingress
     namespace: sample-namespace
   spec:
     rules:
     - host: hello-nginx.local
       http:
         paths:
         - path: /
           pathType: Prefix
           backend:
             service:
               name: hello-nginx-service
               port:
                 number: 80
   ```
   This YAML file defines a Deployment, a Service, and an Ingress resource for the Nginx web application. The Deployment creates a single replica of the Nginx container, the Service exposes the Nginx container within the cluster, and the Ingress resource routes external traffic to the Nginx Service based on the hostname `hello-nginx.local`.
4. Apply the configuration to the Kubernetes cluster:

   ```bash
   microk8s kubectl apply -f hello-nginx.yaml
   ```
   The resources will be created within the `sample-namespace` namespace.
5. Setup `/etc/hosts` file to map the hostname `hello-nginx.local` to the IP address of the cluster. Open the `/etc/hosts` file in a text editor:

   ```bash
   sudo vi /etc/hosts
   ```
   Add the following line at the end of the file:

   ```text
   <cluster-ip> hello-nginx.local
   ```
   Replace `<cluster-ip>` with the IP address of your Kubernetes cluster. You can get the internal IP address by running the following command:

   ```bash
   microk8s kubectl get nodes -o wide
   ```
   Or if you are using a different Kubernetes setup, you can use the IP address of the node where the Ingress controller is running.
6. Access the Nginx web application by opening a web browser and navigating to `http://hello-nginx.local`. You should see the "Welcome to nginx" page served by the Nginx container.

## What's Next?

You have successfully deployed a simple Nginx web application on a Kubernetes cluster using Ingress. You can now explore more advanced features of Ingress, such as TLS termination, path-based routing, and load balancing. You can also setup the DNS resolution for your hostname to make it accessible from any machine without modifying the `/etc/hosts` file.

## List the Resources

To list the resources created in the `sample-namespace` namespace, you can run the following command:

```bash
microk8s kubectl get all -n sample-namespace
```

## Deleting the Resources

To clean up the resources created in this tutorial, you can run the following command:

```bash
microk8s kubectl delete namespace sample-namespace
```
This command will delete the `sample-namespace` namespace along with all the resources created within it.

## Conclusion

In this tutorial, you have learned how to deploy a simple Nginx web application on a Kubernetes cluster using Ingress. Ingress provides a flexible and configurable way to route external traffic to services within the cluster based on hostnames and paths. You can now explore more advanced features of Ingress and deploy more complex applications on your Kubernetes cluster.
