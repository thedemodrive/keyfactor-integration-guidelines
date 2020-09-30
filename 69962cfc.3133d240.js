(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{60:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return o})),a.d(t,"rightToc",(function(){return c})),a.d(t,"default",(function(){return i}));var s=a(2),n=(a(0),a(75));const l={id:"istio-sample",title:"Istio Examples",sidebar_label:"Istio Examples",slug:"/istio/samples"},o={unversionedId:"istio-sample",id:"istio-sample",isDocsHomePage:!1,title:"Istio Examples",description:"Setup example Microservices",source:"@site/docs/istio-sample.md",slug:"/istio/samples",permalink:"/keyfactor-integration-guidelines/docs/istio/samples",editUrl:"https://github.com/thedemodrive/keyfactor-integration-guidelines/blob/master/docs/istio-sample.md",version:"current",sidebar_label:"Istio Examples",sidebar:"someSidebar",previous:{title:"Install Istio",permalink:"/keyfactor-integration-guidelines/docs/istio"},next:{title:"Keyfactor Certificate Signer",permalink:"/keyfactor-integration-guidelines/docs/kubernetes/example"}},c=[{value:"Setup example Microservices",id:"setup-example-microservices",children:[]},{value:"HOW TO VERIFY THE TRAFFIC IS USING MUTUAL TLS ENCRYPTION",id:"how-to-verify-the-traffic-is-using-mutual-tls-encryption",children:[]}],p={rightToc:c};function i({components:e,...t}){return Object(n.b)("wrapper",Object(s.a)({},p,t,{components:e,mdxType:"MDXLayout"}),Object(n.b)("h3",{id:"setup-example-microservices"},"Setup example Microservices"),Object(n.b)("p",null,"Deploy Book-Info microservice example of Istio (",Object(n.b)("a",Object(s.a)({parentName:"p"},{href:"https://istio.io/docs/examples/bookinfo/"}),"references"),")\n",Object(n.b)("img",Object(s.a)({parentName:"p"},{src:"https://istio.io/latest/docs/examples/bookinfo/withistio.svg",alt:"Book Info Sample"}))),Object(n.b)("p",null,"Turn on Istio auto-inject for namespace ",Object(n.b)("strong",{parentName:"p"},"default")),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl label namespace default istio-injection=enabled\n")),Object(n.b)("p",null,"Deploy an example of istio (",Object(n.b)("a",Object(s.a)({parentName:"p"},{href:"https://istio.io/docs/examples/bookinfo/"}),"Book-Info"),")"),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl apply -f ./samples/bookinfo/platform/kube/bookinfo.yaml\n")),Object(n.b)("p",null,"Configure a gateway for the Book-Info sample"),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl apply -f ./samples/bookinfo/networking/bookinfo-gateway.yaml\n")),Object(n.b)("p",null,"Configure mTLS destination rules"),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl apply -f ./samples/bookinfo/networking/destination-rule-all-mtls.yaml\n")),Object(n.b)("p",null,"Lock down mutual TLS for the entire mesh"),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl apply -f ./samples/peer-authentication.yaml\n")),Object(n.b)("h3",{id:"how-to-verify-the-traffic-is-using-mutual-tls-encryption"},"HOW TO VERIFY THE TRAFFIC IS USING MUTUAL TLS ENCRYPTION"),Object(n.b)("p",null,"Lock down mutual TLS for the entire mesh"),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl apply -f ./samples/peer-authentication.yaml\n")),Object(n.b)("p",null,'Create the namespace "insidemesh" and deploy a sleep container ',Object(n.b)("strong",{parentName:"p"},"with sidecars")),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl create ns insidemesh\nkubectl label namespace insidemesh istio-injection=enabled\nkubectl apply -f ./samples/sleep/sleep.yaml -n insidemesh\n")),Object(n.b)("hr",null),Object(n.b)("p",null,"Verify the setup by sending an http request (using curl command) from sleep pod (namespace: insidemesh) to productpage.default:9080:"),Object(n.b)("ol",null,Object(n.b)("li",{parentName:"ol"},"To check if the certificate get from productpage.default is issued by KeyfactorCA")),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl exec $(kubectl get pod -l app=sleep -n insidemesh -o jsonpath={.items..metadata.name}) -c sleep -n insidemesh -- openssl s_client -showcerts -connect productpage.default:9080\n")),Object(n.b)("ol",{start:2},Object(n.b)("li",{parentName:"ol"},"Request using curl")),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),'kubectl exec $(kubectl get pod -l app=sleep -n insidemesh -o jsonpath={.items..metadata.name}) -c sleep -n insidemesh -- curl http://productpage.default:9080 -s -o /dev/null -w "sleep.insidemesh to http://productpage.default:9080: -> HTTP_STATUS: %{http_code}\\n"\n')),Object(n.b)("blockquote",null,Object(n.b)("p",{parentName:"blockquote"},"Note: every workload ",Object(n.b)("strong",{parentName:"p"},"deployed with sidecar")," can access Book Info services (HTTP_STATUS = 200)")),Object(n.b)("p",null,'Create another namespace "outsidemesh" and deploy a sleep container ',Object(n.b)("strong",{parentName:"p"},"without a sidecar")),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),"kubectl create ns outsidemesh\nkubectl apply -f samples/sleep/sleep.yaml -n outsidemesh\n")),Object(n.b)("hr",null),Object(n.b)("p",null,"Verify the setup by sending an http request (using curl command) from sleep pod (namespace: outsidemesh) to productpage.default:9080:"),Object(n.b)("pre",null,Object(n.b)("code",Object(s.a)({parentName:"pre"},{className:"language-bash"}),'kubectl exec $(kubectl get pod -l app=sleep -n outsidemesh -o jsonpath={.items..metadata.name}) -c sleep -n outsidemesh -- curl http://productpage.default:9080 -s -o /dev/null -w "sleep.outsidemesh to http://productpage.default:9080: -> HTTP_STATUS: %{http_code}\\n"\n')),Object(n.b)("blockquote",null,Object(n.b)("p",{parentName:"blockquote"},"Note: every workload ",Object(n.b)("strong",{parentName:"p"},"deployed without sidecar")," cannot access Book Info services (HTTP_STATUS = 000)")))}i.isMDXComponent=!0}}]);