---
id: install
title: Install
sidebar_label: Install
slug: /install
---

### 1. Download and extract bundle

- Download bundle at: [**Click here to download release bundle **](https://github.com/thedemodrive/keyfactor-istio/releases/download/keyfactor-v2-beta/keyfactor-v2-beta.zip)
- Extract to `./keyfactor`

### 2. Create a Kubernetes Secret contains Keyfactor's credentials

- Create or Update file `./keyfactor/credentials.yaml`

```YAML
# Endpoint of Keyfactor Platform
endPoint: ""

# Name of certificate authorization for enroll Istio's Workload Certificate
caName: ""

# Using for authentication header: "Basic ...."
authToken: ""

# API path for enroll new certificate from Keyfactor
enrollPath: ""

# Certificate Template for enroll Istio's Workload Certificate: Default is Istio
caTemplate: "Istio"

# ApiKey from Api Setting, for enroll Istio's Workload Certificate
appKey: ""

# ApiKey for auto provisioning TLS server / client certificates
provisioningAppKey: ""

# CA Template for auto provisioning TLS server / client certificates
provisioningTemplate: "Istio"
```

- Create kubernetes secrets name `keyfactor-credentials` with above file

```bash
kubectl create namespace keyfactor
kubectl create secret generic keyfactor-credentials -n keyfactor --from-file credentials.yaml
```

### 3. Install Keyfactor Kubernetes Proxy via Helm 3

- Update helm's values at `./keyfactor/helm-values.yaml`

```Yaml
# Number of replication for Keyfactor-Proxy
replicaCount: 1
keyfactor:
  # Name of kubernetes secret contains credentials.yaml
  secretName: keyfactor-credentials
  # Config name mapping Keyfactor's Custom Metadata, turn off field by remove field
  # Pattern: [Istio Metadata Field] : [Keyfactor Metadata Name]
  # Supported Istio's Metadata: ClusterID, ServiceName, PodName, PodIP, PodNamespace, TrustDomain
  metadataMapping:
    ClusterID: Cluster
    ServiceName: Service
    PodName: PodName
    PodIP: PodIP
    PodNamespace: PodNamespace
    TrustDomain: TrustDomain # Value Example: cluster.local
  # Enable auto provisioning TLS's client certificates
  # Using for secure connection between Istio <> Keyfactor K8S Agent
  enableAutoProvisioningIstioCert: true
  istioNamespace: istio-system # Namespace to install Istio
  istioSecretName: custom-ca-tls # Name of secret contains TLS Client Certs
```

- Install via Helm command

```bash
helm install keyfactor-k8s -n keyfactor ./keyfactor/release/keyfactor-k8s-0.0.1.tgz -f helm-values.yaml --wait
```

### 3. Install finished

Keyfactor K8S Proxy will auto provisioning TLS Client Certificates for Istio Integrating. The following values are used at Istio Integration:

- Namespace to install Istio: `istioNamespace: istio-system `
- Name of secret contains TLS Client Certs: `istioSecretName: custom-ca-tls`

Install finished screenshot:
![Finised](https://github.com/thedemodrive/keyfactor-istio/raw/master/img/Helm%20Result.png "Finished")
