---
id: install
title: Install
sidebar_label: Install
slug: /install
---

### 1. Download and extract bundle

Download following bundles:

- **manifests.zip** ([_Download Here_](https://github.com/thedemodrive/keyfactor-integration-guidelines/releases/download/1.0.0/manifests.zip))
  A bundle constains manifest and sample configurations - This bundle requires extract

- **keyfactor-kubernetes-1.0.0.tgz** ([_Download Here_](https://github.com/thedemodrive/keyfactor-integration-guidelines/releases/download/1.0.0/keyfactor-kubernetes-1.0.0.tgz))
  A Helm chart to deploy Keyfactor Kubernetes Proxy

### 2. Create a Kubernetes Secret contains Keyfactor's credentials

- Create or update file at `manifests/credentials.yaml`

```yaml
# Endpoint of Keyfactor Platform
endPoint: ""

# Name of certificate authorization for enroll Istio's Workload Certificate
caName: ""

# Using for authentication header: "Basic ...."
authToken: "Basic <REPLACE>"

# API path for enroll new certificate from Keyfactor
enrollPath: "KeyfactorAPI/Enrollment/CSR"

# Certificate Template for enroll Istio's Workload Certificate: Default is Istio
caTemplate: "Istio"

# ApiKey from Api Setting, for enroll Istio's Workload Certificate
appKey: ""

# ApiKey for auto provisioning TLS server / client certificates
# Keyfactor Kubernetes Proxy need 2 API Client:
# 1. For enroll Istio's Workload Certificate - using template Istio
# 2. For enroll Keyfactor Kubernetes Proxy's Server/Client Certificate - using template K8SProxy
provisioningAppKey: ""

# CA Template for auto provisioning TLS server / client certificates
provisioningTemplate: "K8SProxy"
```

- Create a Kubernetes Secret with name `keyfactor-credentials` with above file

```bash
kubectl create namespace keyfactor
kubectl create secret generic keyfactor-credentials -n keyfactor --from-file credentials.yaml
```

### 3. Install Keyfactor Kubernetes Proxy via Helm 3

- Custom helm's values at `manifests/keyfactor-config.yaml`

```yaml
# Number of replication for Keyfactor-Proxy
replicaCount: 1

image:
  repository: thedemodrive/keyfactor-proxy
  tag: 1.0.0
  pullPolicy: IfNotPresent

keyfactor:
  environment: Production
  # Disable mTLS protocol for gRPC Server of Keyfactor-Kubernetes-Proxy - For testing only
  disableMTLS: false
  # Istio need some Client TLS Certificates to connect to Keyfactor-Kubernetes-Proxy gRPC server (mTLS protocol)
  # On this flag is setted to true, Keyfactor-Kubernetes-Proxy will automatically provisioning a Kubernetes Secret
  # which contains TLS Client Certs to enable mTLS between Istio <> Keyfactor K8S Proxy
  enableAutoProvisioningIstioCert: true
  # Namespace of Istio Deployment
  istioNamespace: istio-system
  # Name of kubernetes secret contains TLS Client Certs is used within Istio Config
  istioSecretName: custom-ca-tls

  # Name of kubernetes secret contains credentials.yaml
  secretName: "keyfactor-credentials"
  # Config name mapping Keyfactor's Custom Metadata, turn off field by remove item
  # Config pattern: [Istio Field Name] : [Keyfactor Metadata Name]
  # Supported Istio's Metadata: ClusterID, ServiceName, PodName, PodIP, PodNamespace, TrustDomain
  metadataMapping:
    ClusterID: Cluster
    ServiceName: Service
    PodName: PodName
    PodIP: PodIP
    PodNamespace: PodNamespace
    TrustDomain: TrustDomain # Value Example: cluster.local
```

- Install via Helm command

```bash
helm install keyfactor-k8s -n keyfactor keyfactor-kubernetes-1.0.0.tgz -f keyfactor-config.yaml --wait
```

### 3. Install finished

Keyfactor K8S Proxy will auto provisioning TLS Client Certificates for Istio Integrating. The following values are used at Istio Integration:

- <REPLACE_ADDRESS>
- <REPLACE_PORT>
- <REPLACE_SECRET_NAME>

Install finished screenshot:
![Finised](/img/finished.png "Finished")
