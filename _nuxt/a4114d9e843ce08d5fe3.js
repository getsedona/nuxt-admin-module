(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{271:function(t,e,n){"use strict";var r={props:{id:{type:String,required:!0}},computed:{route:function(){return this.$route.fullPath}}};n.d(e,"a",(function(){return r}))},272:function(t){t.exports=JSON.parse('{"name":"ad"}')},313:function(t,e,n){"use strict";n.r(e);var r={name:"SuperBlock"},o=n(25),component=Object(o.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  Super B~lock\n")])}),[],!1,null,null,null);e.default=component.exports},314:function(t,e,n){"use strict";n.r(e);var r={name:"TeaserBlock",mixins:[n(271).a],props:{caption:{type:String,default:""},variant:{type:String,default:"red"}}},o=n(25),l=n(323),c=n.n(l),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  Teaser block\n  "),n("br"),t._v(" "),n("b",[t._v("Caption:")]),t._v(" "+t._s(t.caption)+"\n  "),n("br"),t._v(" "),n("b",[t._v("Variant:")]),t._v(" "+t._s(t.variant)+"\n")])}),[],!1,null,null,null);"function"==typeof c.a&&c()(component);e.default=component.exports},315:function(t,e,n){"use strict";n.r(e);var r={name:"TextBlock",mixins:[n(271).a],props:{text:{type:String,default:""}}},o=n(25),l=n(324),c=n.n(l),component=Object(o.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  Text block says: "+this._s(this.text)+"\n")])}),[],!1,null,null,null);"function"==typeof c.a&&c()(component);e.default=component.exports},316:function(t,e,n){"use strict";n.r(e);var r={name:"ImageBlock",mixins:[n(271).a]},o=n(25),l=n(322),c=n.n(l),component=Object(o.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  Image block\n")])}),[],!1,null,null,null);"function"==typeof c.a&&c()(component);e.default=component.exports},322:function(t,e){},323:function(t,e){},324:function(t,e){},372:function(t,e,n){"use strict";n.r(e);var r={name:"FeatureBlock",mixins:[n(271).a],props:{text:{type:String,default:"AA"}}},o=n(25),component=Object(o.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  Feature B~lock\n")])}),[],!1,null,null,null);e.default=component.exports},382:function(t,e,n){var map={"./feature-block":272,"./feature-block.json":272,"./feature-block.vue":372,"./image-block":316,"./image-block.vue":316,"./super-block/super-block":313,"./super-block/super-block.vue":313,"./teaser-block":314,"./teaser-block.vue":314,"./text-block":315,"./text-block.vue":315};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=382}}]);