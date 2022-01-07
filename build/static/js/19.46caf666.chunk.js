(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[19],{414:function(e,t,a){"use strict";a.r(t);var s=a(64),c=a(376),n=a(15),r=a(0),l=a.n(r),i=a(409),o=a(356),d=a(221),m=a(357),u=a(396),j=a(408),b=a(65),O=a(380),h=a(381),f=a(407),x=a(411),g=a(354),p=a(392),v=a(415),y=a(420),S=a(116),w=a(148),N=a(104),T=a(103),k=a.n(T),C=a(389),E=a(410),_=a(3),D=i.a.Title,I=i.a.Text,A=function(e){var t=Object(r.useState)(!1),a=Object(s.a)(t,1)[0];return Object(_.jsx)(_.Fragment,{children:Object(_.jsxs)(C.a,{style:{top:20},width:620,title:"Make Payment",visible:e.visible,onOk:function(){e.setOrderStatus("Payment Completed")},okText:"Mark As Paid",onCancel:function(){e.setVisible(!1)},confirmLoading:a,children:[Object(_.jsx)(D,{level:4,children:"Payment Amount"}),Object(_.jsx)(E.a,{readOnly:!0,style:{width:"100%"},min:0,value:e.totalPrice,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}}),Object(_.jsx)("div",{className:"mt-4 mb-3",children:Object(_.jsx)(I,{type:"secondary",children:"Payment gateway will be integrated here..."})})]})})},M=i.a.Title,R=i.a.Text,P=o.a.TextArea;function L(e,t){if("NEW_MESSAGE"===t.type)return e.messages.push(t.message),Object(n.a)({},e);if("ALL_MESSAGES"===t.type){var a=Object(c.a)(t.messages);return e.messages=a,Object(n.a)({},e)}return e}t.default=function(e){var t=Object(r.useState)(!1),a=Object(s.a)(t,2),i=a[0],T=a[1],C=Object(r.useState)(""),E=Object(s.a)(C,2),D=E[0],I=E[1],F=Object(r.useState)("Order Created"),U=Object(s.a)(F,2),G=U[0],q=U[1],z=Object(r.useState)(0),V=Object(s.a)(z,2),Y=V[0],J=V[1],W=Object(r.useState)([]),$=Object(s.a)(W,2),B=$[0],H=$[1],K=Object(r.useState)([]),Q=Object(s.a)(K,2),X=Q[0],Z=Q[1],ee=Object(r.useState)([]),te=Object(s.a)(ee,2),ae=te[0],se=te[1],ce=Object(r.useState)([]),ne=Object(s.a)(ce,2),re=ne[0],le=ne[1],ie=Object(r.useState)([]),oe=Object(s.a)(ie,2),de=oe[0],me=oe[1],ue=Object(r.useReducer)(L,{messages:[]}),je=Object(s.a)(ue,2),be=je[0],Oe=je[1],he=l.a.createRef(),fe=Object(r.useRef)(null);Object(r.useEffect)((function(){ge(e.match.params.id)}),[e.match.params.id]);var xe,ge=function(e){var t=N.a+"get-order",a={id:e};k.a.post(t,a,{}).then((function(e){var t=e.data.form_urls,a=e.data.doc_urls,s=e.data.legalized_urls;H(t),se(a),q(e.data.status),"Document Submitted"===e.data.status&&J(0),"Document Received"===e.data.status&&J(1),"Payment Request Generated"===e.data.status&&J(2),"Payment Completed"===e.data.status&&J(3),"Sent For Attestation"===e.data.status&&J(4),"Attested Documents Uploaded"===e.data.status&&J(5),"Documents Downloaded"===e.data.status&&J(6),"Order Closed"===e.data.status&&J(7);var c=t.map((function(e,t){var a=N.b+e;return{name:"ORDER_FORM_".concat(t+1),status:"done",url:a}})),n=a.map((function(e,t){var a=N.b+e;return{name:"YOUR_DOCUMENT_".concat(t+1),status:"done",url:a}})),r=s.map((function(e,t){var a=N.b+e;return{name:"ATTESTED_DOCUMENT_".concat(t+1),status:"done",url:a}}));Z(c),le(n),me(r),I(e.data.details),Oe({type:"ALL_MESSAGES",messages:e.data.msg_list?e.data.msg_list:[]})})).catch((function(){d.b.error("Something is wrong!")}))},pe={name:"file",action:N.a+"upload-order-docs-clients",onChange:function(e){"done"===e.file.status?d.b.success("".concat(e.file.name," file uploaded successfully")):"error"===e.file.status&&d.b.error("".concat(e.file.name," file upload failed."));var t=Object(c.a)(e.fileList),a=[];t.forEach((function(e){"done"===e.status&&(e.url?a.push(e.url.split(N.b)[1]):a.push(e.response.url))})),H(a),Z(t),"done"===e.file.status&&fe.current.click()},onRemove:function(){setTimeout((function(){fe.current.click()}),500)}},ve={name:"file",action:"".concat(N.a,"upload-order-docs-clients"),onChange:function(e){"done"===e.file.status?d.b.success("".concat(e.file.name," file uploaded successfully")):"error"===e.file.status&&d.b.error("".concat(e.file.name," file upload failed."));var t=Object(c.a)(e.fileList),a=[];t.forEach((function(e){"done"===e.status&&(e.url?a.push(e.url.split(N.b)[1]):a.push(e.response.url))})),se(a),le(t),"done"===e.file.status&&fe.current.click()},onRemove:function(){setTimeout((function(){fe.current.click()}),500)}},ye=function(e){switch(e.msgType){case"text":return Object(_.jsx)("span",{children:e.text});case"image":return Object(_.jsx)("img",{src:e.text,alt:e.text});case"file":return Object(_.jsxs)(w.a,{alignItems:"center",className:"msg-file",children:[Object(_.jsx)(v.a,{className:"font-size-md"}),Object(_.jsx)("span",{className:"ml-2 font-weight-semibold text-link pointer",children:Object(_.jsx)("u",{children:e.text})})]});default:return null}},Se=function(t){if(t.newMsg){var a={avatar:"",from:localStorage.getItem("id"),msgType:"text",text:t.newMsg,time:""};he.current.setFieldsValue({newMsg:""}),Oe({type:"NEW_MESSAGE",message:a});var s=N.a+"send-message-order",n={id:e.match.params.id,newMsgData:a,msgList:Object(c.a)(be.messages)};k.a.post(s,n,{}).then((function(e){})).catch((function(){d.b.error("Something is wrong!")}))}};return Object(_.jsx)(_.Fragment,{children:Object(_.jsxs)(O.a,{gutter:16,children:[Object(_.jsx)(h.a,{xs:24,sm:24,md:24,lg:16,children:Object(_.jsxs)(f.a,{title:"Order#".concat(e.match.params.id),extra:Object(_.jsxs)(_.Fragment,{children:["Payment Request Generated"===G&&Object(_.jsx)(b.a,{type:"primary",className:"mr-2",onClick:function(){window.location.href="https://documentsattestations.com/checkout/?order_id".concat(e.match.params.id,"&token=").concat(localStorage.getItem("token"))},children:"Make Payment"}),Object(_.jsx)(b.a,{className:"d-none",ref:fe,onClick:function(){var t=N.a+"save-order",a={id:e.match.params.id,form_urls:B,doc_urls:ae,details:D};k.a.post(t,a,{}).then((function(t){d.b.success("Order updated successfully!"),ge(e.match.params.id)})).catch((function(){}))},children:"Save Order"})]}),children:[Object(_.jsx)(A,{visible:i,setVisible:function(e){T(e)},setOrderStatus:function(t){var a=N.a+"update-order-status",s={id:e.match.params.id,status:t};k.a.post(a,s,{}).then((function(t){d.b.success("Order updated successfully!"),T(!1),ge(e.match.params.id)}))}}),Object(_.jsx)(u.a,{style:{marginTop:0}}),Object(_.jsxs)(O.a,{gutter:16,className:"mt-4",children:[Object(_.jsxs)(h.a,{xs:24,sm:24,md:24,lg:8,children:[Object(_.jsx)(M,{level:4,className:"mb-4",children:"Order Progress"}),Object(_.jsxs)(x.a,{children:[Object(_.jsx)(x.a.Item,{color:"green",children:"Document Submitted"}),Object(_.jsx)(x.a.Item,{color:Y>=1?"green":"gray",children:"Document Received"}),Object(_.jsx)(x.a.Item,{color:Y>=2?"green":"gray",children:"Payment Request Generated"}),Object(_.jsx)(x.a.Item,{color:Y>=3?"green":"gray",children:"Payment Completed"}),Object(_.jsx)(x.a.Item,{color:Y>=4?"green":"gray",children:"Sent For Attestation"}),Object(_.jsx)(x.a.Item,{color:Y>=5?"green":"gray",children:"Attested Documents Uploaded"}),Object(_.jsx)(x.a.Item,{color:Y>=6?"green":"gray",children:"Documents Downloaded"}),Object(_.jsx)(x.a.Item,{color:Y>=7?"green":"gray",children:"Order Closed"})]})]}),Object(_.jsxs)(h.a,{xs:24,sm:24,md:24,lg:8,children:[Object(_.jsx)(M,{level:4,className:"mb-4",children:"Your Form"}),Object(_.jsx)(g.a,Object(n.a)(Object(n.a)({},pe),{},{fileList:X,children:Object(_.jsxs)(b.a,{children:[Object(_.jsx)(p.a,{})," Upload"]})})),Object(_.jsx)(M,{level:4,className:"mb-4 mt-4",children:"Your Documents"}),Object(_.jsx)(g.a,Object(n.a)(Object(n.a)({},ve),{},{fileList:re,children:Object(_.jsxs)(b.a,{children:[Object(_.jsx)(p.a,{})," Upload"]})}))]}),Object(_.jsxs)(h.a,{xs:24,sm:24,md:24,lg:8,children:[Object(_.jsx)(M,{level:4,className:"mb-4",children:"Attested Documents"}),Object(_.jsx)(g.a,Object(n.a)(Object(n.a)({},{action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",onChange:function(e){e.file,e.fileList},showUploadList:{showRemoveIcon:!1}}),{},{fileList:de}))]})]}),Object(_.jsx)("div",{className:"mb-4",children:Object(_.jsx)(R,{type:"secondary",children:"Please provide other details (if any) that will assist us to escalate your order."})}),Object(_.jsx)(P,{rows:4,value:D,onChange:function(e){return I(e.target.value)}})]})}),Object(_.jsx)(h.a,{xs:24,sm:24,md:24,lg:8,children:Object(_.jsx)(f.a,{title:"Chat with us",children:Object(_.jsx)("div",{className:"chat",children:Object(_.jsx)("div",{className:"chat-content",children:Object(_.jsxs)("div",{className:"chat-content",children:[(be.messages,xe=1,Object(_.jsx)("div",{className:"chat-content-body",children:Object(_.jsx)(S.Scrollbars,{children:be.messages&&be.messages.map((function(e,t){return Object(_.jsxs)("div",{className:"msg ".concat("date"===e.msgType?"datetime":""," ").concat(e.from!==localStorage.getItem("id")?"msg-recipient":e.from===localStorage.getItem("id")?"msg-sent":""),children:[e.avatar?Object(_.jsx)("div",{className:"mr-2",children:Object(_.jsx)(m.a,{src:e.avatar})}):null,e.text?Object(_.jsx)("div",{className:"bubble",children:Object(_.jsx)("div",{className:"bubble-wrapper",children:ye(e)})}):null,"date"===e.msgType?Object(_.jsx)(u.a,{children:e.time}):null]},"msg-".concat(xe,"-").concat(t))}))})})),Object(_.jsx)("div",{className:"chat-content-footer",children:Object(_.jsx)(j.a,{name:"msgInput",ref:he,onFinish:Se,className:"w-100",children:Object(_.jsx)(j.a.Item,{name:"newMsg",className:"mb-0",children:Object(_.jsx)(o.a,{autoComplete:"off",placeholder:"Type a message...",suffix:Object(_.jsx)("div",{className:"d-flex align-items-center",children:Object(_.jsx)(b.a,{shape:"circle",type:"primary",size:"small",onClick:Se,htmlType:"submit",children:Object(_.jsx)(y.a,{})})})})})})})]})})})})})]})})}}}]);
//# sourceMappingURL=19.46caf666.chunk.js.map