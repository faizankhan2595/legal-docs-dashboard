(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[23],{441:function(e,t,a){"use strict";a.r(t);var n,r=a(15),s=a(0),i=a(67),o=a(35),c=a(421),u=a(448),l=a(437),d=a(442),h=a(369),m=a(65),f=a(424),p=a(47),g=a(40),j=a(403),b=a(155),x=a.n(b),v=a(21),O=a(3),y=n||(n={});y.Pop="POP",y.Push="PUSH",y.Replace="REPLACE";var w=function(e){return e};function k(e){e.preventDefault(),e.returnValue=""}function P(){var e=[];return{get length(){return e.length},push:function(t){return e.push(t),function(){e=e.filter((function(e){return e!==t}))}},call:function(t){e.forEach((function(e){return e&&e(t)}))}}}function N(){return Math.random().toString(36).substr(2,8)}function F(e){var t=e.pathname,a=e.search;return(void 0===t?"/":t)+(void 0===a?"":a)+(void 0===(e=e.hash)?"":e)}function E(e){var t={};if(e){var a=e.indexOf("#");0<=a&&(t.hash=e.substr(a),e=e.substr(0,a)),0<=(a=e.indexOf("?"))&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}var S=function(e){function t(){var e=o.location,t=c.state||{};return[t.idx,w({pathname:e.pathname,search:e.search,hash:e.hash,state:t.usr||null,key:t.key||"default"})]}function a(e){return"string"===typeof e?e:F(e)}function r(e,t){return void 0===t&&(t=null),w(Object(O.a)({pathname:h.pathname,hash:"",search:""},"string"===typeof e?E(e):e,{state:t,key:N()}))}function s(e){l=e,e=t(),d=e[0],h=e[1],m.call({action:l,location:h})}function i(e){c.go(e)}void 0===e&&(e={});var o=void 0===(e=e.window)?document.defaultView:e,c=o.history,u=null;o.addEventListener("popstate",(function(){if(u)f.call(u),u=null;else{var e=n.Pop,a=t(),r=a[0];if(a=a[1],f.length){if(null!=r){var o=d-r;o&&(u={action:e,location:a,retry:function(){i(-1*o)}},i(o))}}else s(e)}}));var l=n.Pop,d=(e=t())[0],h=e[1],m=P(),f=P();return null==d&&(d=0,c.replaceState(Object(O.a)({},c.state,{idx:d}),"")),{get action(){return l},get location(){return h},createHref:a,push:function e(t,i){var u=n.Push,l=r(t,i);if(!f.length||(f.call({action:u,location:l,retry:function(){e(t,i)}}),0)){var h=[{usr:l.state,key:l.key,idx:d+1},a(l)];l=h[0],h=h[1];try{c.pushState(l,"",h)}catch(m){o.location.assign(h)}s(u)}},replace:function e(t,i){var o=n.Replace,u=r(t,i);f.length&&(f.call({action:o,location:u,retry:function(){e(t,i)}}),1)||(u=[{usr:u.state,key:u.key,idx:d},a(u)],c.replaceState(u[0],"",u[1]),s(o))},go:i,back:function(){i(-1)},forward:function(){i(1)},listen:function(e){return m.push(e)},block:function(e){var t=f.push(e);return 1===f.length&&o.addEventListener("beforeunload",k),function(){t(),f.length||o.removeEventListener("beforeunload",k)}}}}(),I=a(31),L=a(231),q=x.a.create({baseURL:v.b,timeout:6e4}),M="/auth/login";q.interceptors.request.use((function(e){var t=localStorage.getItem(I.b);return t&&(e.headers.authorization=t),t||e.headers["public-request"]||(S.push(M),window.location.reload()),e}),(function(e){L.a.error({message:"Error"}),Promise.reject(e)})),q.interceptors.response.use((function(e){return e.data}),(function(e){var t={message:""};return 400!==e.response.status&&403!==e.response.status||(t.message="Authentication Fail",t.description="Please login again",localStorage.removeItem(I.b),S.push(M),window.location.reload()),404===e.response.status&&(t.message="Not Found"),500===e.response.status&&(t.message="Internal Server Error"),508===e.response.status&&(t.message="Time Out"),L.a.error(t),Promise.reject(e)}));var R=q,A={login:function(e){return R({url:"/posts",method:"post",headers:{"public-request":"true"},data:e})},signUp:function(e){return R({url:"/auth/signup",method:"post",headers:{"public-request":"true"},data:e})}},T=A,U=a(4),C={email:[{required:!0,message:"Please input your email address"},{type:"email",message:"Please enter a validate email!"}],password:[{required:!0,message:"Please input your password"}],confirm:[{required:!0,message:"Please confirm your password!"},function(e){var t=e.getFieldValue;return{validator:function(e,a){return a&&t("password")!==a?Promise.reject("Passwords do not match!"):Promise.resolve()}}}]},V={showAuthMessage:p.c,hideAuthMessage:p.b,showLoading:p.d,authenticated:p.a},z=Object(o.b)((function(e){var t=e.auth;return{loading:t.loading,message:t.message,showMessage:t.showMessage,token:t.token,redirect:t.redirect}}),V)((function(e){var t=e.showLoading,a=e.token,n=e.loading,r=e.redirect,o=e.message,b=e.showMessage,x=e.hideAuthMessage,v=e.authenticated,O=e.allowRedirect,y=l.a.useForm(),w=Object(i.a)(y,1)[0],k=Object(g.g)();return Object(s.useEffect)((function(){null!==a&&O&&k.push(r),b&&setTimeout((function(){x()}),3e3)})),Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)(j.a.div,{initial:{opacity:0,marginBottom:0},animate:{opacity:b?1:0,marginBottom:b?20:0},children:Object(U.jsx)(d.a,{type:"error",showIcon:!0,message:o})}),Object(U.jsxs)(l.a,{form:w,layout:"vertical",name:"register-form",onFinish:function(){w.validateFields().then((function(e){t();T.signUp(e).then((function(e){v("fakeToken")})).then((function(e){Object(p.c)(e)}))})).catch((function(e){console.log("Validate Failed:",e)}))},children:[Object(U.jsx)(l.a.Item,{name:"email",label:"Email",rules:C.email,hasFeedback:!0,children:Object(U.jsx)(h.a,{prefix:Object(U.jsx)(c.a,{className:"text-primary"})})}),Object(U.jsx)(l.a.Item,{name:"password",label:"Password",rules:C.password,hasFeedback:!0,children:Object(U.jsx)(h.a.Password,{prefix:Object(U.jsx)(u.a,{className:"text-primary"})})}),Object(U.jsx)(l.a.Item,{name:"confirm",label:"ConfirmPassword",rules:C.confirm,hasFeedback:!0,children:Object(U.jsx)(h.a.Password,{prefix:Object(U.jsx)(u.a,{className:"text-primary"})})}),Object(U.jsx)(l.a.Item,{children:Object(U.jsx)(m.a,{type:"primary",htmlType:"submit",block:!0,loading:n,children:"Sign Up"})}),Object(U.jsx)(f.a,{children:Object(U.jsx)("span",{className:"text-muted font-size-base font-weight-normal",children:"or"})}),Object(U.jsx)("div",{className:"d-flex justify-content-center",children:Object(U.jsx)(m.a,{onClick:function(){return k.push("/auth/login")},className:"mr-2 w-100",disabled:n,children:"Login"})})]})]})})),B=a(397),H=a(398),J=a(436),D={backgroundImage:"url(/img/others/img-17.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover"};t.default=function(e){var t=Object(o.c)((function(e){return e.theme.currentTheme}));return Object(U.jsx)("div",{className:"h-100",style:D,children:Object(U.jsx)("div",{className:"container d-flex flex-column justify-content-center h-100",children:Object(U.jsx)(B.a,{justify:"center",children:Object(U.jsx)(H.a,{xs:20,sm:20,md:20,lg:7,children:Object(U.jsx)(J.a,{children:Object(U.jsxs)("div",{className:"my-2",children:[Object(U.jsxs)("div",{className:"text-center",children:[Object(U.jsx)("img",{className:"img-fluid",src:"/img/".concat("light"===t?"logo.png":"logo-white.png"),alt:""}),Object(U.jsx)("p",{className:"text-muted",children:"Create a new account:"})]}),Object(U.jsx)(B.a,{justify:"center",children:Object(U.jsx)(H.a,{xs:24,sm:24,md:20,lg:20,children:Object(U.jsx)(z,Object(r.a)({},e))})})]})})})})})})}}}]);
//# sourceMappingURL=23.afb9748e.chunk.js.map