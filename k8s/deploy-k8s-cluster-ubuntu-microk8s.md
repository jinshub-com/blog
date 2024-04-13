# Deploying a Kubernetes Cluster on Ubuntu using MicroK8s

Kubernetes (K8s) is an open-source platform for automating deployment, scaling, and operations of application containers across clusters of hosts. Deploying a Kubernetes cluster can be a complex task, but with the help of MicroK8s, it can be done quickly and easily. MicroK8s is a lightweight, fast, and simple Kubernetes cluster that can be installed on any machine. In this blog post, we will cover how to deploy a high-availability Kubernetes cluster on three Ubuntu 22.04 virtual machines using MicroK8s.

## Prerequisites

Before we begin, make sure you have the following prerequisites:

- Three Ubuntu 22.04 virtual machines with at least 2GB of RAM and 2 CPUs each.
- SSH access to all three virtual machines.
- A user account with sudo privileges on each virtual machine.
- A static IP address for each virtual machine.

If you haven't already set up the virtual machines, you can follow the steps in this blog post to create them: [Install Ubuntu Server](https://ubuntu.com/tutorials/install-ubuntu-server).

## Install MicroK8s on All Three Virtual Machines

To install MicroK8s on all three virtual machines, follow these steps:

1. Install MicroK8s using the snap package manager:

	```bash
	sudo snap install microk8s --classic --channel=1.29
	```
2. Join the `microk8s` group to avoid using `sudo` for `microk8s` commands:

	```bash
	sudo usermod -a -G microk8s $USER
	sudo mkdir -p ~/.kube
	sudo chown -f -R $USER ~/.kube
	su - $USER
	```
3. Check the status of the MicroK8s cluster:

	```bash
	microk8s status --wait-ready
	```

For more detailed instructions on installing MicroK8s, you can refer to the official documentation: [Get started](https://microk8s.io/docs/getting-started).

## Deploy a High-Availability Kubernetes Cluster

To deploy a high-availability Kubernetes cluster using MicroK8s, at least three nodes are required. In this example, we will use three Ubuntu 22.04 virtual machines. Follow these steps to deploy the cluster:

1. On the first virtual machine, initialize the cluster:

	```bash
	microk8s add-node
	```
2. Copy the join command from the output of the previous command. for example:
	```text
	From the node you wish to join to this cluster, run the following:
	microk8s join 192.168.1.230:25000/92b2db237428470dc4fcfc4ebbd9dc81/2c0cb3284b05

	Use the '--worker' flag to join a node as a worker not running the control plane, eg:
	microk8s join 192.168.1.230:25000/92b2db237428470dc4fcfc4ebbd9dc81/2c0cb3284b05 --worker

	If the node you are adding is not reachable through the default interface you can use one of the following:
	microk8s join 192.168.1.230:25000/92b2db237428470dc4fcfc4ebbd9dc81/2c0cb3284b05
	```
3. On the second virtual machine, join the cluster by running the join command from the first virtual machine. Note: do not add the `--worker` flag to the join command as we want this node to be part of the control plane and make the cluster highly available.
4. Once the second node has joined the cluster, go back to the first virtual machine and add the third node by running the `microk8s add-node` command again.
5. Repeat the join process for the third virtual machine.
6. Set failure domains for the three nodes by running the following commands:

	on the first virtual machine:
	```bash
	echo "failure-domain=1" > /var/snap/microk8s/current/args/ha-conf
	microk8s.stop
	microk8s.start
	```
	on the second virtual machine:
	```bash
	echo "failure-domain=2" > /var/snap/microk8s/current/args/ha-conf
	microk8s.stop
	microk8s.start
	```
	on the third virtual machine:
	```bash
	echo "failure-domain=3" > /var/snap/microk8s/current/args/ha-conf
	microk8s.stop
	microk8s.start
	```
7. Verify that all nodes are part of the cluster by running the following command on the first virtual machine:

	```bash
	microk8s kubectl get nodes
	```
	you should see output similar to this:
	```text
	NAME          STATUS   ROLES    AGE   VERSION
	ubuntu-vm-1   Ready    <none>   2m    v1.29.0
	ubuntu-vm-2   Ready    <none>   1m    v1.29.0
	ubuntu-vm-3   Ready    <none>   1m    v1.29.0
	```
8. Verify that the cluster is highly available by running the following command on the first virtual machine:

	```bash
	microk8s status
	```
	you should see output similar to this:
	```text
	microk8s is running
	high-availability: yes
		datastore master nodes: 192.168.1.4:19001 192.168.1.5:19001 192.168.1.6:19001
		datastore standby nodes: none
	addons:
		...
	```

Congratulations! You have successfully deployed a high-availability Kubernetes cluster on three Ubuntu 22.04 virtual machines using MicroK8s. You can now start deploying and managing your containerized applications on the cluster.

For more information on deploying a high-availability Kubernetes cluster using MicroK8s, you can refer to the official documentation: [High Availability (HA)](https://microk8s.io/docs/high-availability).

## Enabling Dashboard

To enable the Kubernetes dashboard, run the following command on the first virtual machine:

```bash
microk8s enable dashboard
```

Before accessing the dashboard, you need to get the token to log in. Run the following command to get the token:

```bash
microk8s kubectl describe secret -n kube-system microk8s-dashboard-token
```

Then run the following command to forward the dashboard port to your local machine:

```bash
microk8s kubectl port-forward -n kube-system --address 0.0.0.0 service/kubernetes-dashboard 10443:443
```

Note: we added `--address 0.0.0.0` to allow access to the dashboard from any IP address. Make sure to secure the dashboard access by restricting the IP addresses that can access it.

Now you can access the Kubernetes dashboard by opening a web browser and navigating to `https://<first-vm-ip>:10443`. Use the token you obtained earlier to log in.

For more information on the Kubernetes dashboard, you can refer to the official documentation: [Addon: dashboard](https://microk8s.io/docs/addon-dashboard).

## Conclusion

In this blog post, we covered how to deploy a high-availability Kubernetes cluster on three Ubuntu 22.04 virtual machines using MicroK8s. We also enabled the Kubernetes dashboard to help you manage and monitor your cluster. With this setup, you can start deploying and managing your containerized applications on the Kubernetes cluster.