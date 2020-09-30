---
id: istio
title: Install Istio
sidebar_label: Install Istio
slug: /istio
---

### 1. Install cli `istioctl`

Download prebuilt version for sepecific OS:

- OSX: `istioctl-osx` - [Download Here](http://ahh.com/123)
- Linux: `istioctl-linux-amd64` - [Download Here](http://ahh.com/123)
- Windows: `istioctl-win.exe` - [Download Here](http://ahh.com/123)

Extract and add `istioctl` client to your path (Linux or macOS or Windows):

### 2. Install Istio

After installed Keyfactor Kubernetes Proxy (at step: [Get Start > Install](/docs/install)).
Keyfactor Kubernetes Proxy will automatically provisioning TLS Client Certificates for Istio by creating a Kubernetes Secret (default name: `custom-ca-tls`) within namespace `istio-system`

> Note: Please return [this step](/docs/install#3-install-finished) to get more detail

Update `./keyfactor/istio-config.yaml` by using printed values on step [Get Start > Install](/docs/install#3-install-finished))

> Note: `./keyfactor/istio-config.yaml` is extracted from [install step](/docs/install#1-download-and-extract-bundle)

```Yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  namespace: istio-system
spec:
  hub: thedemodrive
  tag: keyfactor-v2-beta2
  installPackagePath: "charts"
  profile: "demo"
  values:
    pilot:
      secretVolumes:
        - name: <REPLACE_SECRET_NAME>
          secretName: <REPLACE_SECRET_NAME>
          mountPath: /etc/istio/<REPLACE_SECRET_NAME>
  meshConfig:
    ca:
      # Use istiod_side to specify CA Server integrate to Istiod side or Agent side
      istiodSide: true
      # Address of the CA server implementing the Istio CA gRPC API.
      # Can be IP address or a fully qualified DNS name with port
      # Eg: custom-ca.default.svc.cluster.local:8932, 192.168.23.2:9000
      # If specified, Istio will authorize and forward the CSRs from the workloads to the specified external CA
      # using the Istio CA gRPC API.
      address: <REPLACE_KEYFACTOR_K8S_ADDRESS>:<REPLACE_PORT>
      # timeout for forward CSR requests from Istiod to External CA
      # Default: 30s
      requestTimeout: 30s
      # Default TLS mode is MUTUAL, It's require to specific TLS client certificate files.
      # According sistiodSide = true, TLS files could be mounted from Kubernetes Secret
      # configurable via values.pilot.secretVolumes
      tlsSettings:
        mode: MUTUAL # Supported values: DISABLE, MUTUAL
        clientCertificate: "/etc/istio/<REPLACE_SECRET_NAME>/client-cert.pem"
        privateKey: "/etc/istio/<REPLACE_SECRET_NAME>/client-key.pem"
        caCertificates: "/etc/istio/<REPLACE_SECRET_NAME>/cacert.pem"
        sni: <REPLACE_KEYFACTOR_K8S_ADDRESS>
        subjectAltNames: []
```

Install Istio with `./keyfactor/istio-config.yaml`

```Bash
istioctl install -f ./keyfactor/istio-config.yaml
```
