(function(e){function t(t){for(var a,o,i=t[0],c=t[1],l=t[2],d=0,v=[];d<i.length;d++)o=i[d],s[o]&&v.push(s[o][0]),s[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(v.length)v.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],a=!0,i=1;i<r.length;i++){var c=r[i];0!==s[c]&&(a=!1)}a&&(n.splice(t--,1),e=o(o.s=r[0]))}return e}var a={},s={app:0},n=[];function o(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=a,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(r,a,function(t){return e[t]}.bind(null,a));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;n.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var a=r("64a9"),s=r.n(a);s.a},"221b":function(e,t,r){},"2d0e":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var a=r("2b0e"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"d-flex flex-column h-100",attrs:{id:"app"}},[r("Header"),r("div",{staticClass:"content"},[r("router-view")],1),r("Footer")],1)},n=[],o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("nav",{staticClass:"navbar navbar-default navbar-fixed-top"},[r("div",{staticClass:"container"},[r("div",{staticClass:"navbar-header"},[r("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"home"}}},[r("i",{staticClass:"material-icons app-icon"},[e._v("devices")]),r("span",{staticClass:"navbar-brand-title"},[e._v("MapTracker")])])],1),r("div",[r("ul",{staticClass:"nav navbar-nav navbar-right"},[r("li",[r("router-link",{directives:[{name:"show",rawName:"v-show",value:e.isLoggedIn(),expression:"isLoggedIn()"}],staticClass:"navbar-brand",attrs:{to:{name:"servers"}}},[r("button",{directives:[{name:"show",rawName:"v-show",value:e.isLoggedIn(),expression:"isLoggedIn()"}],staticClass:"btn btn-info log"},[e._v("Servers\n                        ")])]),r("button",{directives:[{name:"show",rawName:"v-show",value:e.isLoggedIn(),expression:"isLoggedIn()"}],staticClass:"btn btn-danger",on:{click:function(t){return e.handleLogout()}}},[r("span",[e._v("Log Out")]),r("i",{staticClass:"material-icons btn-icon"},[e._v("power_settings_new")])]),r("button",{directives:[{name:"show",rawName:"v-show",value:!e.isLoggedIn(),expression:"!isLoggedIn()"}],staticClass:"btn btn-info",on:{click:function(t){return e.handleLogin()}}},[r("span",[e._v("Log In")]),r("i",{staticClass:"material-icons btn-icon"},[e._v("exit_to_app")])])],1)])])])])},i=[],c=(r("a481"),r("3b2b"),r("04e1")),l=r.n(c),u=r("b0af"),d=r("8c4f"),v="id_token",p="access_token",f="GjsboAdaiwadAAWUU5TJuwF1okG7fHRJ",m="dev-puobt7a0.auth0.com",h="https://maptracker.dev/callback",b="openid email",g="https://api.maptracker.dev/",_=new u["a"].WebAuth({clientID:f,domain:m});function C(){_.authorize({responseType:"token id_token",redirectUri:h,audience:g,scope:b})}var w=new d["a"]({mode:"history"});function y(){P(),j(),w.go("/")}function k(e,t,r){A()?r():r({path:"/",query:{redirect:e.fullPath}})}function S(){return localStorage.getItem(v)}function x(){return localStorage.getItem(p)}function P(){localStorage.removeItem(v)}function j(){localStorage.removeItem(p)}function I(e){var t=RegExp("[#&]"+e+"=([^&]*)").exec(window.location.hash);return t&&decodeURIComponent(t[1].replace(/\+/g," "))}function O(){var e=I("access_token");localStorage.setItem(p,e)}function M(){var e=I("id_token");localStorage.setItem(v,e)}function A(){var e=S();return null!=e&&(!!e&&!$(e))}function L(e){var t=l()(e);if(!t.exp)return null;var r=new Date(0);return r.setUTCSeconds(t.exp),r}function $(e){var t=L(e);return t<new Date}var T={name:"Header",methods:{handleLogin:function(){C()},handleLogout:function(){y()},isLoggedIn:function(){return A()}}},E=T,N=(r("9b0b"),r("2877")),W=Object(N["a"])(E,o,i,!1,null,"0d584aa8",null),D=W.exports,F=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("footer",{staticClass:"footer py-4 bg-dark text-white-50"},[r("div",{staticClass:"container"},[r("router-link",{staticClass:"logo-font",attrs:{to:{name:"home",params:{}}}},[e._v("\n            MapTracker\n        ")]),e._v("is a dedicated game server map rotation tracker.\n        "),r("span",{staticClass:"attribution"},[e._v("A project by\n    "),r("a",{attrs:{rel:"noopener noreferrer",target:"blank",href:"https://www.galaco.me"}},[e._v("\n      Galaco")]),e._v(" © "),r("span",{attrs:{id:"footer-year"}},[e._v(e._s(this.currentYear))]),e._v(".\n  ")])],1)])},H=[],G={name:"Footer",data:function(){return{currentYear:(new Date).getFullYear()}}},U=G,V=(r("cb80"),Object(N["a"])(U,F,H,!1,null,"85057218",null)),z=V.exports,B={name:"app",components:{Header:D,Footer:z}},J=B,R=(r("034f"),Object(N["a"])(J,s,n,!1,null,null,null)),Y=R.exports,q=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("div",{staticClass:"section-1 font-weight-light mt-4 text-white"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[e._m(0),r("div",{staticClass:"col-sm-4 offset-sm-1"},[r("video",{attrs:{src:"#",poster:"#",controls:"",muted:""},domProps:{muted:!0}},[r("img",{attrs:{src:"fallback.jpg",alt:"How does MapTracker work?"}})])])])])]),e._m(1),e._m(2)])},K=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"col-sm-5 offset-sm-1 strapline"},[r("h4",[e._v("MapTracker")]),r("p",[e._v("MapTracker is a near-realtime notification tool for watching map rotations on dedicated video game servers.")]),r("p",[e._v("Receive notifications on your device when servers you like switch to a map you enjoy.")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"section-2"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-sm-4 offset-sm-1"},[r("i",{staticClass:"material-icons heart"},[e._v("favorite_border")]),r("p",[e._v("Never miss a map again! Play only the maps you love, in the places you love.")]),r("p",[e._v("Near-realtime notifications pushed to your device when your favourite games servers switch to maps you love.")])]),r("div",{staticClass:"col-sm-4 offset-sm-2"},[r("i",{staticClass:"material-icons games"},[e._v("games")]),r("p",[e._v("All popular Source Engine games are supported, including Counterstrike: Global Offensive, Garry's Mod, Counterstrike: Source")]),r("p",[e._v("Is your favorite game not supported? Please make a request and we'll endeavour to add it to our service.")])])])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"section-3"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row header"},[r("div",{staticClass:"col-sm-10 offset-sm-1"},[r("h4",[e._v("Pricing")]),r("p",[e._v("This is a one-map hobby project, but is expensive to keep running. By supporting this project with a small yearly fee, you can keep this project running, and you'll receive plenty of benefits.")]),r("b",[e._v("All money received will go towards hosting costs.")])])]),r("div",{staticClass:"row"},[r("div",{staticClass:"col-sm-5 offset-sm-1 tier-free"},[r("h5",{staticClass:"tier-header"},[r("i",{staticClass:"material-icons person"},[e._v("person_outline")]),e._v("Free")]),r("ul",[r("li",[e._v("Monitor up to 3 game servers concurrently")]),r("li",[e._v("Watch for up to 3 specific map/level names across watched game servers")])])]),r("div",{staticClass:"col-sm-5 tier-donator"},[r("h5",{staticClass:"tier-header"},[r("i",{staticClass:"material-icons star"},[e._v("star_border")]),e._v("Donator (coming soon...)")]),r("ul",[r("li",[e._v("Monitor up to 100 game servers concurrently")]),r("li",[e._v("Watch for up to 100 specific map/level names across watched game servers")]),r("li",[e._v("Wildcard map/level name support")])])])])])])}],Q={name:"Home"},X=Q,Z=(r("ad69"),Object(N["a"])(X,q,K,!1,null,"0c9ee628",null)),ee=Z.exports,te=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span")},re=[],ae={name:"Callback",mounted:function(){this.$nextTick(function(){O(),M(),window.location.href="/servers"})}},se=ae,ne=Object(N["a"])(se,te,re,!1,null,null,null),oe=ne.exports,ie=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"container server-list"},[e._m(0),0===e.serversCount?r("div",{staticClass:"row"},[r("div",{staticClass:"col-sm-12 table-row-placeholder"},[e._v("You have not added any servers yet.")])]):e._e(),r("div",{staticClass:"row"},e._l(e.servers,function(t,a){return r("div",{key:a,staticClass:"server card col-sm-4"},[r("img",{staticClass:"card-img-top",attrs:{src:"#",alt:"#"}}),r("div",{staticClass:"card-body"},[r("h5",{staticClass:"card-title"},[e._v(e._s(t.name))]),r("p",{staticClass:"card-subtitle mb-2 text-muted"},[e._v(e._s(t.ip_address)+":"+e._s(t.port))]),r("p",{staticClass:"card-text"},[e._v(e._s(t.current_map))]),r("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(r){return e.deleteServer(t)}}},[e._v("Delete")])])])}),0),r("div",{staticClass:"row controls"},[r("div",{staticClass:"col-sm-12"},[r("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.showAddServerModal}},[e._v("Add Server\n                ")])])])]),r("AddServerModal",{directives:[{name:"show",rawName:"v-show",value:e.isModalVisible,expression:"isModalVisible"}],on:{close:e.closeAddServerModal}})],1)},ce=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row header"},[r("div",{staticClass:"col-sm-12"},[r("h3",[e._v("Watched Servers")])])])}],le=r("cebc"),ue=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"modal-fade"}},[r("div",{staticClass:"modal",attrs:{tabindex:"-1",role:"dialog"}},[r("div",{staticClass:"modal-dialog"},[r("div",{staticClass:"modal-content"},[r("header",{staticClass:"modal-header",attrs:{id:"addServerModalTitle"}},[e._t("header",[r("h5",{staticClass:"modal-title"},[e._v("Add server")]),r("button",{staticClass:"btn btn-danger btn-close",attrs:{type:"button","aria-label":"Close modal"},on:{click:e.close}},[e._v("x")])])],2),r("section",{staticClass:"modal-body",attrs:{id:"modalDescription"}},[e._t("body",[r("form",{attrs:{method:"POST"}},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"addserver_ip"}},[e._v("Server IP Address:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.serverIP,expression:"serverIP"}],staticClass:"form-control",attrs:{type:"text",name:"ip",id:"addserver_ip",placeholder:"Server ip (e.g. 127.0.0.1)"},domProps:{value:e.serverIP},on:{input:function(t){t.target.composing||(e.serverIP=t.target.value)}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"addserver_port"}},[e._v("Server port (optional):")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.serverPort,expression:"serverPort"}],staticClass:"form-control",attrs:{type:"number",name:"port",id:"addserver_port",placeholder:"Server port (e.g. 27015)"},domProps:{value:e.serverPort},on:{input:function(t){t.target.composing||(e.serverPort=t.target.value)}}})])])])],2),r("footer",{staticClass:"modal-footer"},[e._t("footer",[r("button",{staticClass:"btn btn-primary",attrs:{type:"button","aria-label":"Save modal"},on:{click:e.submit}},[e._v("Save")]),r("button",{staticClass:"btn btn-secondary",attrs:{type:"button","aria-label":"Close modal"},on:{click:e.close}},[e._v("Cancel")])])],2)])])])])},de=[],ve=r("bc3a"),pe=r.n(ve),fe="https://api.maptracker.dev";function me(){var e="".concat(fe,"/api/v1/servers/list");return pe.a.get(e,{headers:{Authorization:"Bearer ".concat(x())}})}function he(e,t){var r="".concat(fe,"/api/v1/servers/add"),a={ip:e,port:t};return pe.a.put(r,a,{headers:{Authorization:"Bearer ".concat(x())}}).then(function(e){return e.data})}function be(e,t){var r="".concat(fe,"/api/v1/servers/remove");return pe.a.delete(r,{headers:{Authorization:"Bearer ".concat(x())},data:{ip:e,port:t}}).then(function(e){return e.data})}var ge={name:"modal",data:function(){return{serverIP:"",serverPort:0}},methods:{close:function(){this.$emit("close")},submit:function(){var e=this;he(this.serverIP,this.serverPort).then(function(){e.$toasted.show("Now watching server ".concat(e.serverIP,":").concat(e.serverPort),{position:"top-center",duration:5e3,fullWidth:!0,fitToScreen:!0,type:"success"}),e.close()}).catch(function(t){e.$toasted.show("An error occurred: ".concat(t.message),{position:"top-center",duration:5e3,fullWidth:!0,fitToScreen:!0,type:"error"})})}}},_e=ge,Ce=(r("db7a"),Object(N["a"])(_e,ue,de,!1,null,null,null)),we=Ce.exports,ye="serversFetch",ke="deleteServer",Se=r("2f62"),xe={name:"Servers",components:{AddServerModal:we},data:function(){return{isModalVisible:!1}},methods:{getPrivateServers:function(){var e=this;this.$store.dispatch(ye).catch(function(t){e.$toasted.show("An error occurred: ".concat(t.message),{position:"top-center",duration:5e3,fullWidth:!0,fitToScreen:!0,type:"error"})})},showAddServerModal:function(){this.isModalVisible=!0},closeAddServerModal:function(){this.isModalVisible=!1},deleteServer:function(e){var t=this;this.$store.dispatch(ke,e).then(function(){t.getPrivateServers()}).catch(function(e){t.$toasted.show("An error occurred: ".concat(e.message),{position:"top-center",duration:5e3,fullWidth:!0,fitToScreen:!0,type:"error"})})}},mounted:function(){this.getPrivateServers(),setInterval(function(){this.getPrivateServers()}.bind(this),15e3)},computed:Object(le["a"])({},Object(Se["b"])(["servers","serversCount"]))},Pe=xe,je=(r("b693"),Object(N["a"])(Pe,ie,ce,!1,null,"4b7a72dc",null)),Ie=je.exports;a["a"].use(d["a"]);var Oe,Me,Ae=new d["a"]({mode:"history",routes:[{name:"home",path:"/",component:ee},{name:"callback",path:"/callback",component:oe},{name:"servers",path:"/servers",component:Ie,beforeEnter:k}]}),Le=r("bd86"),$e="setLoaded",Te="setLoading",Ee={servers:[],isLoading:!0,serversCount:0},Ne={servers:function(e){return e.servers},serversCount:function(e){return e.serversCount},isLoading:function(e){return e.isLoading}},We=(Oe={},Object(Le["a"])(Oe,ye,function(e){var t=e.commit;return t(Te),me().then(function(e){var r=e.data;t($e,r.body)}).catch(function(){})}),Object(Le["a"])(Oe,ke,function(e,t){var r=e.commit;return r(Te),be(t.ip_address,t.port).then(function(e){var t=e.data;r($e,t.body)}).catch(function(){})}),Oe),De=(Me={},Object(Le["a"])(Me,Te,function(e){e.isLoading=!0}),Object(Le["a"])(Me,$e,function(e,t){e.servers=t,e.serversCount=t.length,e.isLoading=!1}),Me),Fe={state:Ee,getters:Ne,actions:We,mutations:De};a["a"].use(Se["a"]);var He=new Se["a"].Store({modules:{servers:Fe}}),Ge=r("a65d"),Ue=r.n(Ge);a["a"].use(Ue.a),a["a"].config.productionTip=!1,new a["a"]({router:Ae,store:He,render:function(e){return e(Y)}}).$mount("#app")},"586f":function(e,t,r){},"64a9":function(e,t,r){},"9b0b":function(e,t,r){"use strict";var a=r("9e91"),s=r.n(a);s.a},"9e91":function(e,t,r){},ad69:function(e,t,r){"use strict";var a=r("221b"),s=r.n(a);s.a},ad8d:function(e,t,r){},b693:function(e,t,r){"use strict";var a=r("ad8d"),s=r.n(a);s.a},cb80:function(e,t,r){"use strict";var a=r("586f"),s=r.n(a);s.a},db7a:function(e,t,r){"use strict";var a=r("2d0e"),s=r.n(a);s.a}});
//# sourceMappingURL=app.943a7b8f.js.map