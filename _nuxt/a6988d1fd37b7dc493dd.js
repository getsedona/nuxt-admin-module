(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{252:function(e,t,n){"use strict";n(62),n(17),n(15),n(12),n(44),n(20);var r=n(2),o=n(8),c=n(34);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var h,d,f={name:"TheHeader",computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(c.c)("auth",["loggedIn"])),methods:{login:(d=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("auth/login");case 2:location.reload();case 3:case"end":return e.stop()}}),e,this)}))),function(){return d.apply(this,arguments)}),logOut:(h=Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("auth/logOut");case 2:return e.next=4,this.$store.dispatch("admin/unload");case 4:case"end":return e.stop()}}),e,this)}))),function(){return h.apply(this,arguments)})}},v=n(25),component=Object(v.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"scene  header"},[n("div",{staticClass:"header__wrap"},[n("div",{staticClass:"header__list"},[n("div",{staticClass:"header__fold"},[n("ul",{staticClass:"header__menu"},[n("li",[n("nuxt-link",{attrs:{to:{path:"/",query:{loggedIn:e.loggedIn}}}},[e._v("\n              Example Site\n            ")])],1)])]),e._v(" "),n("div",{staticClass:"header__collapse"},[n("nav",{staticClass:"header__nav"},[n("ul",{staticClass:"header__menu"},[n("li",[n("nuxt-link",{attrs:{to:{path:"/blog",query:{loggedIn:e.loggedIn}}}},[e._v("\n                Blog\n              ")])],1),e._v(" "),n("li",[n("nuxt-link",{attrs:{to:{path:"/contact",query:{loggedIn:e.loggedIn}}}},[e._v("\n                Contacts\n              ")])],1),e._v(" "),e.loggedIn?n("li",[n("a",{attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.logOut(t)}}},[e._v("\n                Logout\n              ")])]):e._e(),e._v(" "),e.loggedIn?e._e():n("li",[n("a",{attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.login(t)}}},[e._v("\n                Login\n              ")])])])])])])])])}),[],!1,null,null,null);t.a=component.exports},391:function(e,t,n){"use strict";n.r(t);n(20);var r,o=n(2),c={name:"HomePage",components:{TheHeader:n(252).a},fetch:(r=Object(o.a)(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.store,e.next=3,n.dispatch("page/load",{slug:"index"});case 3:case"end":return e.stop()}}),e)}))),function(e){return r.apply(this,arguments)}),computed:{page:function(){return this.$store.getters["page/bySlug"]("index")}}},l=n(25),component=Object(l.a)(c,(function(){var e=this.$createElement,t=this._self._c||e;return t("main",{staticClass:"main"},[t("the-header"),this._v(" "),t("the-blocks",{attrs:{blocks:this.page.content||[]}})],1)}),[],!1,null,null,null);t.default=component.exports}}]);