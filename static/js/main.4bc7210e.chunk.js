(this["webpackJsonppayoneer-task"]=this["webpackJsonppayoneer-task"]||[]).push([[0],{235:function(e,t,a){"use strict";a.r(t);var n,c=a(0),r=a.n(c),i=a(15),o=a.n(i),s=a(9),u=a(36),l=a(6),j=a(20),d=a(40),p=a.n(d),b=a(56),h="https://api.openweathermap.org/data/2.5",f="75f972b80e26f14fe6c920aa6a85ad57",O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=[];for(var a in e)t.push("".concat(a,"=").concat(encodeURIComponent(e[a])));return t.push("appid=".concat(encodeURIComponent(f))),t.join("&")},m=function(){var e=Object(b.a)(p.a.mark((function e(){var t,a,n,c=arguments;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>0&&void 0!==c[0]?c[0]:"Delhi,in",a=O({q:t,cnt:40}),e.next=4,fetch("".concat(h,"/forecast?").concat(a));case 4:if((n=e.sent).ok){e.next=7;break}throw new Error("Unable to fetch forecast");case 7:return e.abrupt("return",n.json());case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=a(12),g=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],v=function(e){return parseInt(e)},y=function(e){var t=e.split(" ")[0].split("-").map(v),a=Object(x.a)(t,3),n=a[0],c=a[1],r=a[2];return"".concat(r," ").concat(g[c-1]," ").concat("".concat(n).slice(-2))},w=Object(u.b)("data/fetchForecast",function(){var e=Object(b.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m(t);case 2:if("200"===(a=e.sent).cod){e.next=5;break}throw new Error("Error in forecast - ".concat(a.cod," - ").concat(a.message));case 5:return e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),k=Object(u.c)({name:"data",initialState:{loading:!0,error:null,forecast:null},extraReducers:(n={},Object(l.a)(n,w.fulfilled,(function(e,t){for(var a=t.payload.list,n={},c=0;c<a.length;c++){var r=y(a[c].dt_txt);n[r]=n[r]||[],n[r].push(a[c])}var i=[];for(var o in n)i.push({day:o,data:n[o]});e.loading=!1,e.forecast=Object(j.a)(Object(j.a)({},t.payload),{},{list:i})})),Object(l.a)(n,w.rejected,(function(e){e.error={message:"Unable to get forecast. Please refresh and try again."}})),n)}),I=function(e){return e.data.loading},S=function(e){return e.data.error},C=function(e){return e.data.forecast},z=k.reducer,M=function(e,t,a){return e>=a?a-1:e<t?t:e},F=function(e,t){return t.count-e.count},N=function(e){return"https://openweathermap.org/img/wn/".concat(e,"@2x.png")},E=Object(u.c)({name:"display",initialState:{unit:"F",pageSize:3,pageIndex:0,active:0},reducers:{switchUnit:function(e,t){e.unit=["F","C"].includes(t.payload)?t.payload:"F"},setPageSize:function(e,t){e.pageSize=Math.min(t.payload,3),e.pageIndex+e.pageSize-1>e.active&&(e.pageIndex=Math.max(0,e.active-e.pageSize+1)),e.active=M(e.active,e.pageIndex,e.pageIndex+e.pageSize)},prevPage:function(e){e.pageIndex=Math.max(0,e.pageIndex-1),e.active=M(e.active,e.pageIndex,e.pageIndex+e.pageSize)},nextPage:function(e,t){e.pageIndex=Math.min(t.payload.length-e.pageSize,e.pageIndex+1),e.active=M(e.active,e.pageIndex,e.pageIndex+e.pageSize)},activate:function(e,t){e.active=M(t.payload,e.pageIndex,e.pageIndex+e.pageSize)}}}),A=E.actions,P=A.switchUnit,D=A.setPageSize,U=A.prevPage,W=A.nextPage,J=A.activate,B=function(e){return e.display.unit},R=function(e){return e.display.pageSize},_=function(e){return e.display.pageIndex},q=function(e){return e.display.active},G={data:z,display:E.reducer},L=Object(u.a)({reducer:G}),T=a(271),X=a(259),$=Object(X.a)({palette:{primary:{light:"#90CAF9",main:"#42A5F5",dark:"#1E88E5"},secondary:{light:"#F48FB1",main:"#EC407A",dark:"#D81B60"}}}),H=a(270),K=a(268),Q=a(272),V=a(261),Y=a(260),Z=a(277),ee=a(262),te=a(274),ae=a(2),ne=Object(Y.a)((function(){return{row:{width:"100%",justifyContent:"space-around"}}})),ce=function(){var e=ne(),t=Object(s.c)(B),a=Object(s.b)();return Object(ae.jsx)(V.a,{item:!0,container:!0,xs:12,md:10,lg:8,children:Object(ae.jsxs)(Z.a,{"aria-label":"unit",name:"weather-unit",value:t,onChange:function(e){a(P(e.target.value))},className:e.row,row:!0,children:[Object(ae.jsx)(ee.a,{value:"F",control:Object(ae.jsx)(te.a,{color:"primary"}),label:"Farenheit"}),Object(ae.jsx)(ee.a,{value:"C",control:Object(ae.jsx)(te.a,{color:"primary"}),label:"Celsius"})]})})},re=a(267),ie=a(62),oe=a(273),se=a(263),ue=a(264),le=function(){var e,t=Object(s.c)(_),a=Object(s.c)(R),n=Object(s.c)(C),c=Object(s.b)(),r=null===n||void 0===n||null===(e=n.list)||void 0===e?void 0:e.length;return Object(ae.jsxs)(V.a,{container:!0,item:!0,children:[r&&t>0&&Object(ae.jsx)(oe.a,{"aria-label":"Previous page",color:"primary",onClick:function(){c(U({length:r}))},children:Object(ae.jsx)(se.a,{fontSize:"large"})}),Object(ae.jsx)(Q.a,{flexGrow:1}),r&&t+a<r&&Object(ae.jsx)(oe.a,{"aria-label":"Next page",color:"primary",onClick:function(){c(W({length:r}))},children:Object(ae.jsx)(ue.a,{fontSize:"large"})})]})},je=a(265),de=a(266),pe=a(278),be=a(237),he=-273.15,fe=function(e){var t=Math.round(e+he);return-0===t?0:t},Oe=function(e){var t=Math.round(9*(e+he)/5+32);return-0===t?0:t},me=Object(Y.a)((function(e){return{root:{padding:e.spacing(1),flexShrink:0,cursor:"pointer"},active:{borderColor:e.palette.primary.main,borderWidth:"3px",borderStyle:"solid"},cardContent:{position:"relative"},weather:{backgroundColor:"#CFD8DC",margin:"4px",width:e.spacing(4),height:e.spacing(4)},avgWeather:{position:"absolute",margin:0,top:e.spacing(2),right:e.spacing(2),width:e.spacing(8),height:e.spacing(8)}}})),xe=function(e){var t=e.day,a=e.data,n=e.active,r=e.onActivate,i=me(),o=Object(s.c)(R),u=Object(s.c)(B),l=Object(c.useState)(0),j=Object(x.a)(l,2),d=j[0],p=j[1],b=Object(c.useMemo)((function(){return a.reduce((function(e,t){return e+t.main.temp}),0)/a.length}),[a]),h=Object(c.useMemo)((function(){var e={};a.forEach((function(t){var a=t.weather[0];e[a.main]=e[a.main]||{count:0,types:{}},e[a.main].count++,e[a.main].types[a.icon]||(e[a.main].types[a.icon]={count:0,weather:a}),e[a.main].types[a.icon].count++}));var t=Object.values(e).sort(F);return Object.values(t[0].types).sort(F)[0].weather}),[a]);return Object(c.useEffect)((function(){p("F"===u?Oe(b):fe(b))}),[b,u]),Object(ae.jsx)(V.a,{item:!0,xs:12/o,className:i.root,onClick:function(){"function"===typeof r&&r()},children:Object(ae.jsx)(je.a,{raised:n,className:n?i.active:"","data-testid":"card",children:Object(ae.jsx)(de.a,{className:i.cardContent,children:Object(ae.jsxs)(Q.a,{width:1,p:1,children:[Object(ae.jsx)(pe.a,{alt:h.description,src:N(h.icon),className:"".concat(i.weather," ").concat(i.avgWeather)}),Object(ae.jsx)(Q.a,{width:1,px:1,pb:1,children:Object(ae.jsxs)(V.a,{container:!0,direction:"column",alignItems:"center",children:[Object(ae.jsx)(be.a,{variant:"subtitle1",children:"Temp"}),Object(ae.jsxs)(be.a,{variant:"h4",children:[d,u]})]})}),Object(ae.jsx)(Q.a,{width:1,px:1,py:1,children:Object(ae.jsxs)(V.a,{container:!0,direction:"column",alignItems:"center",children:[Object(ae.jsx)(be.a,{variant:"subtitle1",children:"Date"}),Object(ae.jsx)(be.a,{variant:"h4",children:t})]})}),Object(ae.jsx)(Q.a,{width:1,px:1,pt:1,children:Object(ae.jsxs)(V.a,{children:[Object(ae.jsx)(V.a,{container:!0,alignItems:"center",justify:"center",children:a.slice(0,Math.floor(a.length/2)).map((function(e,t){return Object(ae.jsx)(pe.a,{alt:e.weather[0].description,src:N(e.weather[0].icon),className:i.weather},"".concat(e.weather[0].id,"-").concat(t))}))}),Object(ae.jsx)(V.a,{container:!0,alignItems:"center",justify:"center",children:a.slice(Math.floor(a.length/2)).map((function(e,t){return Object(ae.jsx)(pe.a,{alt:e.weather[0].description,src:N(e.weather[0].icon),className:i.weather},"".concat(e.weather[0].id,"-").concat(t))}))})]})})]})})})})},ge=Object(Y.a)((function(){return{wrapper:{overflow:"hidden",width:"100%"},cards:{flexWrap:"nowrap",transition:"transform 0.5s cubic-bezier(0.3, -0.5, 0.7, 1.5)"}}})),ve=function(){var e,t=Object(ie.a)(),a=ge(),n=Object(re.a)(t.breakpoints.up("lg")),r=Object(re.a)(t.breakpoints.up("md")),i=Object(re.a)(t.breakpoints.up("sm")),o=Object(s.c)(C),u=Object(s.c)(_),l=Object(s.c)(R),j=Object(s.c)(q),d=Object(s.b)();return Object(c.useEffect)((function(){d(D(n?3:r?2:1))}),[n,r,i,d]),Object(ae.jsxs)(V.a,{container:!0,direction:"column",children:[Object(ae.jsx)(le,{}),Object(ae.jsx)(Q.a,{className:a.wrapper,children:Object(ae.jsx)(V.a,{container:!0,className:a.cards,style:{transform:"translateX(".concat(-100*u/l,"%)")},children:(null===o||void 0===o||null===(e=o.list)||void 0===e?void 0:e.length)&&o.list.map((function(e,t){var a=e.day,n=e.data;return Object(ae.jsx)(xe,{day:a,data:n,active:j===t,onActivate:function(){return function(e){d(J(e))}(t)}},a)}))})})]})},ye=a(238),we=a(110),ke=Object(Y.a)((function(e){var t,a;return{root:(t={},Object(l.a)(t,e.breakpoints.up("xs"),{width:"100%"}),Object(l.a)(t,e.breakpoints.up("md"),{width:"75%"}),t),container:(a={},Object(l.a)(a,e.breakpoints.up("xs"),{height:"25vh"}),Object(l.a)(a,e.breakpoints.up("sm"),{height:"30vh"}),Object(l.a)(a,e.breakpoints.up("md"),{height:"40vh"}),a)}})),Ie=function(){var e=Object(ie.a)(),t=ke(),a=Object(s.c)(C),n=Object(s.c)(B),r=Object(s.c)(q),i=Object(c.useState)(),o=Object(x.a)(i,2),u=o[0],l=o[1],j=Object(c.useMemo)((function(){var e;if(null===a||void 0===a||null===(e=a.list)||void 0===e?void 0:e.length)return a.list[r].data.map((function(e){var t=function(e){var t=e.split(" ")[1].split(":").map(v),a=Object(x.a)(t,2),n=a[0],c=a[1];return n>=12?"".concat(n>12?n-12:n,":").concat("".concat(c).padStart(2,"0")," PM"):"".concat(0===n?"00":n,":").concat("".concat(c).padStart(2,"0")," AM")}(e.dt_txt);return{temp:"F"===n?Oe(e.main.temp):fe(e.main.temp),time:t}}))}),[a,n,r]);return Object(c.useEffect)((function(){j&&l({labels:j.map((function(e){var t=e.temp;return"".concat(t).concat(n)})),datasets:[{data:j.map((function(e){return e.temp}))}]})}),[j,n]),Object(ae.jsx)(Q.a,{py:4,className:t.root,children:Object(ae.jsx)(ye.a,{className:t.container,children:u&&Object(ae.jsx)(we.a,{data:u,options:{maintainAspectRatio:!1,scales:{y:{display:!1},x:{ticks:{font:{size:16}}}},elements:{bar:{backgroundColor:e.palette.primary.main}},plugins:{legend:{display:!1},tooltip:{displayColors:!1,callbacks:{title:function(){return""},label:function(e){var t=j[e.dataIndex],a=t.time,c=t.temp;return"".concat(a," - ").concat(c).concat(n)}}}}}})})})},Se=Object(Y.a)((function(){return{root:{position:"absolute"}}})),Ce=function(){var e=Se(),t=Object(s.c)(I);return Object(ae.jsx)(K.a,{in:!t,timeout:{enter:2e3},children:Object(ae.jsx)(Q.a,{py:2,display:"flex",flexDirection:"column",alignItems:"center",children:Object(ae.jsxs)(V.a,{container:!0,item:!0,direction:"column",alignItems:"center",xs:10,className:e.root,children:[Object(ae.jsx)(ce,{}),Object(ae.jsx)(ve,{}),Object(ae.jsx)(Ie,{})]})})})},ze=a(269),Me=Object(Y.a)((function(){return{root:{height:"100vh",position:"absolute"}}})),Fe=function(){var e=Me(),t=Object(s.c)(I);return Object(ae.jsx)(K.a,{in:t,timeout:{enter:10,exit:1e3},children:Object(ae.jsxs)(V.a,{container:!0,alignItems:"center",justify:"center",direction:"column",className:e.root,children:[Object(ae.jsx)(Q.a,{p:2,children:Object(ae.jsx)(ze.a,{size:60})}),Object(ae.jsx)(be.a,{variant:"h4",children:"Loading..."})]})})},Ne=a(276),Ee=a(275),Ae=function(){var e=Object(s.c)(S),t=Object(c.useState)(!1),a=Object(x.a)(t,2),n=a[0],r=a[1],i=Object(c.useState)(""),o=Object(x.a)(i,2),u=o[0],l=o[1],j=function(){r(!1)};return Object(c.useEffect)((function(){var t;e&&(r(!0),l(null!==(t=e.message)&&void 0!==t?t:"An error occured. Please refresh and try again."))}),[e]),Object(ae.jsx)(Ne.a,{open:n,onClose:j,children:Object(ae.jsx)(Ee.a,{variant:"filled",severity:"error",onClose:j,children:u})})},Pe=function(){var e=Object(s.b)();return Object(c.useEffect)((function(){e(w())}),[e]),Object(ae.jsxs)(ae.Fragment,{children:[Object(ae.jsx)(H.a,{}),Object(ae.jsx)(Fe,{}),Object(ae.jsx)(Ce,{}),Object(ae.jsx)(Ae,{})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(ae.jsx)(r.a.StrictMode,{children:Object(ae.jsx)(s.a,{store:L,children:Object(ae.jsx)(T.a,{theme:$,children:Object(ae.jsx)(Pe,{})})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[235,1,2]]]);
//# sourceMappingURL=main.4bc7210e.chunk.js.map