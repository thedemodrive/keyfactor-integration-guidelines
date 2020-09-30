---
id: kubernetes
title: Keyfactor Certificate Signer
sidebar_label: Example
slug: /kubernetes/example
---

### Test Keyfactor Integrate With Kubernetes

#### 1. Create CSR (Certificate Signing Request)

The following scripts show how to generate PKI private key and CSR

```bash
openssl genrsa -out keyfactor.key 2048
openssl req -new -key keyfactor.key -out keyfactor.csr
```

#### 2. Create or update file at `./keyfactor/csr-example.yaml`

```Yaml
apiVersion: certificates.k8s.io/v1beta1
kind: CertificateSigningRequest
metadata:
  name: <REPLACE_CSR_NAME>
  annotations:
    ServiceName: "ServiceName1234" # Example metadata
    ClusterID: "ClusterID123" # Example metadata
    TrustDomain: "cluster.local" # Example metadata
    PodName: "ABC/XYZ" # Example metadata
    PodNamespace: "Namespace" # Example metadata
    PodIP: "192.168.3.2" # Example metadata
spec:
  request: <REPLACE_CSR_HERE>
  usages:
    - client auth
    - server auth
  signerName: "keyfactor.com/<REPLACE_ANY_NAME>"
```

#### 3. Submit CSR to Kubernetes by CLI

```Bash
kubectl apply -f ./csr-example.yaml
```

#### 4. Approve CSR

```Bash
kubectl certificate approve <REPLACE_CSR_NAME>
```

#### 5. Check CSR status

```Bash
kubectl get csr
```

![Example](https://github.com/thedemodrive/keyfactor-istio/raw/master/img/CSR%20Status.png)

> Note: The condition of CSR should be Approved,Issued

6. Show detail signed certificate

```bash
kubectl get csr <REPLACE_CSR_NAME> -o=jsonpath='{.status.certificate}'
```

> Note: Certificate is encoded by Base64
