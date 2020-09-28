(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{66:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return s})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return o})),a.d(t,"default",(function(){return l}));var r=a(2),n=a(6),c=(a(0),a(75)),s={id:"kubernetes",title:"Keyfactor Certificate Signer",sidebar_label:"Example",slug:"/kubernetes/example"},i={unversionedId:"kubernetes",id:"kubernetes",isDocsHomePage:!1,title:"Keyfactor Certificate Signer",description:"Test Keyfactor Integrate With Kubernetes",source:"@site/docs/kubernetes.md",slug:"/kubernetes/example",permalink:"/keyfactor-integration-guidelines/docs/kubernetes/example",editUrl:"https://github.com/thedemodrive/keyfactor-integration-guidelines/docs/kubernetes.md",version:"current",sidebar_label:"Example",sidebar:"someSidebar",previous:{title:"Istio Examples",permalink:"/keyfactor-integration-guidelines/docs/istio/samples"}},o=[{value:"Test Keyfactor Integrate With Kubernetes",id:"test-keyfactor-integrate-with-kubernetes",children:[]}],b={rightToc:o};function l(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h3",{id:"test-keyfactor-integrate-with-kubernetes"},"Test Keyfactor Integrate With Kubernetes"),Object(c.b)("h4",{id:"1-create-csr-certificate-signing-request"},"1. Create CSR (Certificate Signing Request)"),Object(c.b)("p",null,"The following scripts show how to generate PKI private key and CSR"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"openssl genrsa -out keyfactor.key 2048\nopenssl req -new -key keyfactor.key -out keyfactor.csr\n")),Object(c.b)("h4",{id:"2-create-or-update-file-at-keyfactorcsr-exampleyaml"},"2. Create or update file at ",Object(c.b)("inlineCode",{parentName:"h4"},"./keyfactor/csr-example.yaml")),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-Yaml"}),'apiVersion: certificates.k8s.io/v1beta1\nkind: CertificateSigningRequest\nmetadata:\n  name: <REPLACE_CSR_NAME>\n  annotations:\n    ServiceName: "ServiceName1234" # Example metadata\n    ClusterID: "ClusterID123" # Example metadata\n    TrustDomain: "cluster.local" # Example metadata\n    PodName: "ABC/XYZ" # Example metadata\n    PodNamespace: "Namespace" # Example metadata\n    PodIP: "192.168.3.2" # Example metadata\nspec:\n  request: <REPLACE_CSR_HERE>\n  usages:\n    - client auth\n    - server auth\n  signerName: "keyfactor.com/<REPLACE_ANY_NAME>"\n')),Object(c.b)("h4",{id:"3-submit-csr-to-kubernetes-by-cli"},"3. Submit CSR to Kubernetes by CLI"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-Bash"}),"kubectl apply -f ./csr-example.yaml\n")),Object(c.b)("h4",{id:"4-approve-csr"},"4. Approve CSR"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-Bash"}),"kubectl certificate approve <REPLACE_CSR_NAME>\n")),Object(c.b)("h4",{id:"5-check-csr-status"},"5. Check CSR status"),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-Bash"}),"kubectl get csr\n")),Object(c.b)("p",null,Object(c.b)("img",Object(r.a)({parentName:"p"},{src:"https://github.com/thedemodrive/keyfactor-istio/raw/master/img/CSR%20Status.png",alt:"Example"}))),Object(c.b)("blockquote",null,Object(c.b)("p",{parentName:"blockquote"},"Note: The condition of CSR should be Approved,Issued")),Object(c.b)("ol",{start:6},Object(c.b)("li",{parentName:"ol"},"Show detail signed certificate")),Object(c.b)("pre",null,Object(c.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"kubectl get csr <REPLACE_CSR_NAME> -o=jsonpath='{.status.certificate}'\n")),Object(c.b)("blockquote",null,Object(c.b)("p",{parentName:"blockquote"},"Note: Certificate is encoded by Base64")))}l.isMDXComponent=!0}}]);