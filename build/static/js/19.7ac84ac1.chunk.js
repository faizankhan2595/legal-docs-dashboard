(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[19],{384:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"b",(function(){return s}));var n="http://127.0.0.1:3501/api/",s="http://127.0.0.1:3501/"},426:function(e,a,t){"use strict";t.r(a);var n=t(175),s=t(15),c=t(67),l=t(0),r=t(439),j=t(230),i=t(397),d=t(398),m=t(436),h=t(65),o=t(369),b=t(155),u=t.n(b),x=t(384),O=t(4),p=r.a.Title;a.default=function(){var e=Object(l.useState)({id:-1,user_id:-1,name:"",last_name:"",company_name:"",phone_number:"",address:"",address_line_2:"",city:"",state:"",country:"",profile_pic:"",email:""}),a=Object(c.a)(e,2),t=a[0],r=a[1];Object(l.useEffect)((function(){!function(){var e=x.a+"get-profile";u.a.post(e,{},{}).then((function(e){r(e.data)}))}()}),[]);var b=function(e){r(Object(s.a)(Object(s.a)({},t),{},Object(n.a)({},e.target.name,e.target.value)))};return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(i.a,{gutter:16,children:Object(O.jsx)(d.a,{xs:24,sm:24,md:24,lg:24,children:Object(O.jsx)(m.a,{title:"Your Profile",extra:Object(O.jsx)(h.a,{className:"mt-4",type:"primary",onClick:function(){var e=x.a+"save-profile",a=Object(s.a)({},t);u.a.post(e,a,{}).then((function(e){j.b.success("Profile Updated!")}))},children:"Save"}),children:Object(O.jsxs)(i.a,{gutter:[16,16],children:[Object(O.jsxs)(d.a,{xs:24,sm:24,md:24,lg:12,children:[Object(O.jsx)(p,{level:4,children:"First Name"}),Object(O.jsx)(o.a,{name:"name",placeholder:"First Name",value:t.name,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,sm:24,md:24,lg:12,children:[Object(O.jsx)(p,{level:4,children:"Last Name"}),Object(O.jsx)(o.a,{name:"last_name",placeholder:"Last Name",value:t.last_name,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,sm:24,md:24,lg:12,children:[Object(O.jsx)(p,{level:4,children:"Email"}),Object(O.jsx)(o.a,{name:"email",placeholder:"Email",value:t.email,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,sm:24,md:24,lg:12,children:[Object(O.jsx)(p,{level:4,children:"Phone number"}),Object(O.jsx)(o.a,{name:"phone_number",placeholder:"Phone number",value:t.phone_number,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,children:[Object(O.jsx)(p,{level:4,children:"Address"}),Object(O.jsx)(o.a,{name:"address",placeholder:"Address",value:t.address,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,children:[Object(O.jsx)(p,{level:4,children:"Appartment/Suite#"}),Object(O.jsx)(o.a,{name:"address_line_2",placeholder:"Appartment/Suite#",value:t.address_line_2,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,sm:24,md:24,lg:12,children:[Object(O.jsx)(p,{level:4,children:"City"}),Object(O.jsx)(o.a,{name:"city",placeholder:"City",value:t.city,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,sm:24,md:24,lg:12,children:[Object(O.jsx)(p,{level:4,children:"State"}),Object(O.jsx)(o.a,{name:"state",placeholder:"State",value:t.state,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,sm:24,md:24,lg:12,className:"mb-3",children:[Object(O.jsx)(p,{level:4,children:"Zip Code"}),Object(O.jsx)(o.a,{name:"country",placeholder:"Zip Code",value:t.country,onChange:b})]}),Object(O.jsxs)(d.a,{xs:24,sm:24,md:24,lg:12,className:"mb-3",children:[Object(O.jsx)(p,{level:4,children:"Country"}),Object(O.jsx)(o.a,{name:"country",placeholder:"Country",value:t.country,onChange:b})]})]})})})})})}}}]);
//# sourceMappingURL=19.7ac84ac1.chunk.js.map