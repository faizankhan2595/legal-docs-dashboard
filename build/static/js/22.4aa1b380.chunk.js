(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[22],{420:function(e,t,a){"use strict";a.r(t);var s=a(15),r=a(0),n=a(64),o=a(34),c=a(221),i=a(398),l=a(65),d=a(414),m=a(410),u=a(356),j=a(395),h=a(423),g=a(46),b=a(38),p=a(385),x=a(104),f=a(103),O=a.n(f),w=a(3),v=function(e){var t=Object(b.g)(),a=Object(r.useState)(!1),s=Object(n.a)(a,2),o=s[0],g=s[1],f=e.hideAuthMessage,v=e.extra,y=e.loading,I=e.showMessage,S=e.message,k=e.token,N=e.redirect,P=e.allowRedirect;Object(r.useEffect)((function(){null!==k&&P&&t.push(N),I&&setTimeout((function(){f()}),3e3)})),Object(r.useEffect)((function(){var e=localStorage.getItem("token"),a=localStorage.getItem("role");e&&(0===+a?t.push(["/admin/home"]):t.push(["/client/home"]))}),[t]);var M=Object(w.jsxs)("div",{children:[Object(w.jsx)(i.a,{children:Object(w.jsx)("span",{className:"text-muted font-size-base font-weight-normal",children:"or"})}),Object(w.jsx)("div",{className:"d-flex justify-content-center",children:Object(w.jsx)(l.a,{onClick:function(){return t.push("/auth/forgot-password")},className:"mr-2 w-100",disabled:y,children:"Forget Password"})})]});return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(p.a.div,{initial:{opacity:0,marginBottom:0},animate:{opacity:I?1:0,marginBottom:I?20:0},children:Object(w.jsx)(d.a,{type:"error",showIcon:!0,message:S})}),Object(w.jsxs)(m.a,{layout:"vertical",name:"login-form",onFinish:function(e){var a=x.a+"login",s={email:e.email,password:e.password};O.a.post(a,s,{}).then((function(e){g(!1),O.a.defaults.headers.common.Authorization="Bearer "+e.data.token.token,c.b.success("Logged In Successfully!"),localStorage.setItem("token",e.data.token.token),localStorage.setItem("id",e.data.user.id),localStorage.setItem("email",e.data.user.email),localStorage.setItem("name",e.data.user.name),localStorage.setItem("role",e.data.user.role),localStorage.setItem("status",e.data.user.status),localStorage.setItem("avatarURL",e.data.user.avatarURL),0===+e.data.user.role?(t.push("/admin/home"),window.location.reload()):(t.push("/client/home"),window.location.reload())})).catch((function(e){if(e.response)if(e.response.data){if("Invalid credentials"===e.response.data)return c.b.error("Invalid credentials!"),!1;e.response.data.error?c.b.error(e.response.data.error):c.b.error("Something went wrong!")}else c.b.error("Something went wrong!");else c.b.error("Something went wrong!")}))},children:[Object(w.jsx)(m.a.Item,{name:"email",label:"Email",rules:[{required:!0,message:"Please input your email"},{type:"email",message:"Please enter a validate email!"}],children:Object(w.jsx)(u.a,{prefix:Object(w.jsx)(j.a,{className:"text-primary"})})}),Object(w.jsx)(m.a.Item,{name:"password",label:Object(w.jsx)("div",{className:"d-flex justify-content-between w-100 align-items-center",children:Object(w.jsx)("span",{children:"Password"})}),rules:[{required:!0,message:"Please input your password"}],children:Object(w.jsx)(u.a.Password,{prefix:Object(w.jsx)(h.a,{className:"text-primary"})})}),Object(w.jsx)(m.a.Item,{children:Object(w.jsx)(l.a,{type:"primary",htmlType:"submit",block:!0,loading:o,children:"Sign In"})}),M,v]})]})};v.defaultProps={otherSignIn:!0,showForgetPassword:!1};var y={showAuthMessage:g.c,showLoading:g.d,hideAuthMessage:g.b,authenticated:g.a},I=Object(o.b)((function(e){var t=e.auth;return{loading:t.loading,message:t.message,showMessage:t.showMessage,token:t.token,redirect:t.redirect}}),y)(v),S=a(382),k=a(383),N=a(409),P={backgroundImage:"url(/img/others/img-17.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover"},M=function(e){var t=Object(o.c)((function(e){return e.theme.currentTheme})),a=Object(b.g)();return Object(r.useEffect)((function(){var e=localStorage.getItem("token"),t=+localStorage.getItem("role");e&&(0===t?a.push("/admin/home"):a.push("/client/home"))}),[]),Object(w.jsx)("div",{className:"h-100",style:P,children:Object(w.jsx)("div",{className:"container d-flex flex-column justify-content-center h-100",children:Object(w.jsx)(S.a,{justify:"center",children:Object(w.jsx)(k.a,{xs:20,sm:20,md:20,lg:7,children:Object(w.jsx)(N.a,{children:Object(w.jsxs)("div",{className:"my-4",children:[Object(w.jsxs)("div",{className:"text-center",children:[Object(w.jsx)("img",{className:"img-fluid",src:"/img/".concat("light"===t?"logo.png":"logo-white.png"),alt:""}),Object(w.jsxs)("p",{children:["Don't have an account yet? ",Object(w.jsx)("a",{href:"/auth/register",children:"Sign Up"})]})]}),Object(w.jsx)(S.a,{justify:"center",children:Object(w.jsx)(k.a,{xs:24,sm:24,md:20,lg:20,children:Object(w.jsx)(I,Object(s.a)({},e))})})]})})})})})})};t.default=function(){return Object(w.jsx)(M,{allowRedirect:!0})}}}]);
//# sourceMappingURL=22.4aa1b380.chunk.js.map