---
id: istio
title: Install Istio
sidebar_label: Install Istio
slug: /istio
---

### 1. Install cli `istioctl`

Download & extract prebuilt version for sepecific OS:

- OSX: `istioctl-osx` - [Download Here](https://github.com/thedemodrive/keyfactor-integration-guidelines/releases/download/1.0.0/istioctl-osx.zip)
- Linux: `istioctl-linux-amd64` - [Download Here](https://github.com/thedemodrive/keyfactor-integration-guidelines/releases/download/1.0.0/istioctl-linux-amd64.zip)
- Windows: `istioctl-win.exe` - [Download Here](https://github.com/thedemodrive/keyfactor-integration-guidelines/releases/download/1.0.0/istioctl-win.exe.zip)

Extract and add `istioctl` client to your path (Linux or macOS or Windows):

> All of packages are included at the following URL: [Click Here](https://github.com/thedemodrive/keyfactor-integration-guidelines/releases/tag/1.0.0)

### 2. Install Istio

After installed Keyfactor Kubernetes Proxy (at step: [Get Start > Install](/docs/install)).
Keyfactor Kubernetes Proxy will automatically provisioning TLS Client Certificates for Istio by creating a Kubernetes Secret (default name: `custom-ca-tls`) within namespace `istio-system`

> Note: Please return [this step](/docs/install#3-install-finished) to get more detail

Update `manifests/istio-config.yaml` by using printed values on step [Get Start > Install](/docs/install#3-install-finished))

> Note: `manifests/istio-config.yaml` is extracted from [install step](/docs/install#1-download-and-extract-bundle)

```yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  namespace: istio-system
spec:
  hub: thedemodrive
  tag: 1.8-keyfactor
  # Path to directory contains Istio's charts
  installPackagePath: "manifests/charts"
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
      address: <REPLACE_ADDRESS>:<REPLACE_PORT>
      # timeout for forward CSR requests from Istiod to External CA
      # Default: 20s
      requestTimeout: 20s
      # Default TLS mode is MUTUAL, It's require to specific TLS client certificate files.
      # According sistiodSide = true, TLS files could be mounted from Kubernetes Secret
      # configurable via values.pilot.secretVolumes
      tlsSettings:
        mode: MUTUAL # Supported values: DISABLE, MUTUAL
        clientCertificate: "/etc/istio/<REPLACE_SECRET_NAME>/client-cert.pem"
        privateKey: "/etc/istio/<REPLACE_SECRET_NAME>/client-key.pem"
        caCertificates: "/etc/istio/<REPLACE_SECRET_NAME>/cacert.pem"
        sni: <REPLACE_ADDRESS>
        subjectAltNames: []
```

Install istio via `istioclt`

```bash
istioctl install -f manifests/istio-config.yaml
```
