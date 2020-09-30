---
id: istio-sample
title: Istio Examples
sidebar_label: Istio Examples
slug: /istio/samples
---

### Setup example Microservices

Deploy Book-Info microservice example of Istio ([references](https://istio.io/docs/examples/bookinfo/))
![Book Info Sample](https://istio.io/latest/docs/examples/bookinfo/withistio.svg)

Turn on Istio auto-inject for namespace **default**

```bash
kubectl label namespace default istio-injection=enabled
```

Deploy an example of istio ([Book-Info](https://istio.io/docs/examples/bookinfo/))

```bash
kubectl apply -f ./samples/bookinfo/platform/kube/bookinfo.yaml
```

Configure a gateway for the Book-Info sample

```bash
kubectl apply -f ./samples/bookinfo/networking/bookinfo-gateway.yaml
```

Configure mTLS destination rules

```bash
kubectl apply -f ./samples/bookinfo/networking/destination-rule-all-mtls.yaml
```

Lock down mutual TLS for the entire mesh

```bash
kubectl apply -f ./samples/peer-authentication.yaml
```

### HOW TO VERIFY THE TRAFFIC IS USING MUTUAL TLS ENCRYPTION

Lock down mutual TLS for the entire mesh

```bash
kubectl apply -f ./samples/peer-authentication.yaml
```

Create the namespace "insidemesh" and deploy a sleep container **with sidecars**

```bash
kubectl create ns insidemesh
kubectl label namespace insidemesh istio-injection=enabled
kubectl apply -f ./samples/sleep/sleep.yaml -n insidemesh
```

---

Verify the setup by sending an http request (using curl command) from sleep pod (namespace: insidemesh) to productpage.default:9080:

1. To check if the certificate get from productpage.default is issued by KeyfactorCA

```bash
kubectl exec $(kubectl get pod -l app=sleep -n insidemesh -o jsonpath={.items..metadata.name}) -c sleep -n insidemesh -- openssl s_client -showcerts -connect productpage.default:9080
```

2. Request using curl

```bash
kubectl exec $(kubectl get pod -l app=sleep -n insidemesh -o jsonpath={.items..metadata.name}) -c sleep -n insidemesh -- curl http://productpage.default:9080 -s -o /dev/null -w "sleep.insidemesh to http://productpage.default:9080: -> HTTP_STATUS: %{http_code}\n"
```

> Note: every workload **deployed with sidecar** can access Book Info services (HTTP_STATUS = 200)

Create another namespace "outsidemesh" and deploy a sleep container **without a sidecar**

```bash
kubectl create ns outsidemesh
kubectl apply -f samples/sleep/sleep.yaml -n outsidemesh
```

---

Verify the setup by sending an http request (using curl command) from sleep pod (namespace: outsidemesh) to productpage.default:9080:

```bash
kubectl exec $(kubectl get pod -l app=sleep -n outsidemesh -o jsonpath={.items..metadata.name}) -c sleep -n outsidemesh -- curl http://productpage.default:9080 -s -o /dev/null -w "sleep.outsidemesh to http://productpage.default:9080: -> HTTP_STATUS: %{http_code}\n"
```

> Note: every workload **deployed without sidecar** cannot access Book Info services (HTTP_STATUS = 000)
