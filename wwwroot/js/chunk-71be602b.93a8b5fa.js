(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71be602b"],{"0368":function(t,e,i){"use strict";var n=i("e1ea"),a=i.n(n);a.a},"0937":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("outline-button",t._g(t._b({staticClass:"flat-button"},"outline-button",t.$attrs,!1),t.$listeners),[t._t("default")],2)},a=[],s=i("8926"),o={name:"flat-button",components:{OutlineButton:s["a"]}},r=o,l=(i("a4b4"),i("2877")),u=Object(l["a"])(r,n,a,!1,null,"59e9ab68",null);u.options.__file="FlatButton.vue";e["a"]=u.exports},"18ca":function(t,e,i){"use strict";var n=i("5fe2"),a=i.n(n);a.a},"1fc4":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",t._g({staticClass:"floating-action-button"},t.listeners),[t._t("prepend"),t.icon?i("base-icon",[t._v(t._s(t.icon))]):t._e(),t._t("default")],2)},a=[],s={name:"floating-action-button",props:{icon:String,to:[Object,String]},computed:{listeners(){const t={...this.$listeners};if(this.$props.to){const e=this.$router;t["click"]=(()=>e.push(this.$props.to))}return t}}},o=s,r=(i("18ca"),i("2877")),l=Object(r["a"])(o,n,a,!1,null,"cdaff7d2",null);l.options.__file="FloatingActionButton.vue";e["a"]=l.exports},"2b47":function(t,e,i){"use strict";var n=i("a46d"),a=i.n(n);a.a},5258:function(t,e,i){},"52d8":function(t,e,i){"use strict";var n=i("dc51"),a=i.n(n);a.a},"5fe2":function(t,e,i){},8675:function(t,e,i){},8926:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("base-button",t._g(t._b({staticClass:"outline-button"},"base-button",t.$attrs,!1),t.$listeners),[t._t("default")],2)},a=[],s={name:"outline-button"},o=s,r=(i("f879"),i("2877")),l=Object(r["a"])(o,n,a,!1,null,"5ede32f2",null);l.options.__file="OutlineButton.vue";e["a"]=l.exports},a132:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"toggle input"},[i("input",t._g(t._b({attrs:{type:"checkbox",id:t.id}},"input",t.attrs,!1),t.listeners)),i("label",{attrs:{for:t.id}}),t.label?i("p",{staticClass:"label"},[t._v(t._s(t.label))]):t._e(),t.hint?i("p",{staticClass:"hint"},[t._v(t._s(t.hint))]):t._e()])},a=[];let s=0;var o={name:"toggle-input",inheritAttrs:!1,props:{label:String,hint:String},computed:{listeners(){return{...this.$listeners,change:t=>this.$emit("input",t.target.checked)}},attrs(){const t={...this.$attrs};return t.value&&(t.checked=t.value),t}},created(){this.id=`toggle-input-${s++}`}},r=o,l=(i("2b47"),i("2877")),u=Object(l["a"])(r,n,a,!1,null,"5a56dddc",null);u.options.__file="ToggleInput.vue";e["a"]=u.exports},a46d:function(t,e,i){},a4b4:function(t,e,i){"use strict";var n=i("8675"),a=i.n(n);a.a},aa1e:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("base-card",t._g({staticClass:"keep-card",on:{click:function(e){t.$router.push({name:"keep",params:{id:t.id}})}}},t.$listeners),[i("img",{attrs:{slot:"image",src:t.img},slot:"image"}),i("template",{slot:"content"},[i("p",{staticClass:"title"},[t._v(t._s(t.name))]),i("p",{staticClass:"paragraph"},[t._v(t._s(t._f("truncate")(t.description,50)))])]),i("template",{slot:"actions"},[i("icon-button",{attrs:{title:"Open",icon:"open_in_new"}}),t.user.id?[t.inVault?i("icon-button",{attrs:{title:"Remove from vault",icon:"remove"},on:{click:function(e){e.stopPropagation(),t.removeKeepFromVault(t.id)}}}):i("icon-button",{attrs:{title:"Store in vault",icon:"add"},on:{click:function(e){e.stopPropagation(),t.openDialog()}}}),t.user.id===t.userId&&t.isPrivate?i("icon-button",{attrs:{title:"Delete",icon:"delete"},on:{click:function(e){e.stopPropagation(),t.deleteKeep(t.id)}}}):t._e()]:t._e(),i("icon-button",{attrs:{title:"Share on twitter",iconHTML:t.twitterIcon},on:{click:function(e){return e.stopPropagation(),t.share(e)}}})],2),i("transition",{attrs:{name:"fade"}},[t.dialogOpen?i("form",{ref:"dialog",staticClass:"dialog",on:{click:function(t){t.stopPropagation()},submit:function(e){e.preventDefault(),t.addKeepToVault({vaultId:t.vaultId,keep:t.keep}),t.$refs.dialog.reset(),t.closeDialog()}}},[i("h2",{staticStyle:{"margin-bottom":"0.5rem"}},[t._v("Store keep in vault")]),t.vaults.length?i("select",{directives:[{name:"model",rawName:"v-model",value:t.vaultId,expression:"vaultId"}],staticStyle:{"font-size":"1rem",cursor:"pointer","border-radius":"4px",padding:"0.15rem 0.35rem"},attrs:{required:""},on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.vaultId=e.target.multiple?i:i[0]}}},[i("option",{attrs:{selected:"",disabled:"",value:""}},[t._v("Please select a vault")]),t._l(t.vaults,function(e){return i("option",{key:e.id,domProps:{value:e.id}},[t._v("\n          "+t._s(e.name)+"\n        ")])})],2):t._e(),t.vaults.length?i("outline-button",{staticStyle:{"margin-top":"0.5rem"},attrs:{type:"submit"}},[t._v("Store in vault")]):i("p",[t._v("You need to create a vault first.")])],1):t._e()])],2)},a=[],s=i("2f62"),o=i("b126"),r=i("8926"),l={name:"keep-card",props:{id:{type:Number,required:!0},name:{type:String,required:!0},description:{type:String,required:!0},userId:{type:String,required:!0},img:{type:String,required:!0},isPrivate:{type:Boolean,required:!0},views:{type:Number,required:!0},shares:{type:Number,required:!0},keeps:{type:Number,required:!0},inVault:{type:Boolean,required:!0}},data(){return{dialogOpen:!1,vaultId:"",twitterIcon:'\n        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300.00006 244.18703" height="244.18703" width="300.00006">\n          <g transform="translate(-539.17946,-568.85777)">\n            <path d="m 633.89823,812.04479 c 112.46038,0 173.95627,-93.16765 173.95627,-173.95625 0,-2.64628 -0.0539,-5.28062 -0.1726,-7.90305 11.93799,-8.63016 22.31446,-19.39999 30.49762,-31.65984 -10.95459,4.86937 -22.74358,8.14741 -35.11071,9.62551 12.62341,-7.56929 22.31446,-19.54304 26.88583,-33.81739 -11.81284,7.00307 -24.89517,12.09297 -38.82383,14.84055 -11.15723,-11.88436 -27.04079,-19.31655 -44.62892,-19.31655 -33.76374,0 -61.14426,27.38052 -61.14426,61.13233 0,4.79784 0.5364,9.46458 1.58538,13.94057 -50.81546,-2.55686 -95.87353,-26.88582 -126.02546,-63.87991 -5.25082,9.03545 -8.27852,19.53111 -8.27852,30.73006 0,21.21186 10.79366,39.93837 27.20766,50.89296 -10.03077,-0.30992 -19.45363,-3.06348 -27.69044,-7.64676 -0.009,0.25652 -0.009,0.50661 -0.009,0.78077 0,29.60957 21.07478,54.3319 49.0513,59.93435 -5.13757,1.40062 -10.54335,2.15158 -16.12196,2.15158 -3.93364,0 -7.76596,-0.38716 -11.49099,-1.1026 7.78383,24.2932 30.35457,41.97073 57.11525,42.46543 -20.92578,16.40207 -47.28712,26.17062 -75.93712,26.17062 -4.92898,0 -9.79834,-0.28036 -14.58427,-0.84634 27.05868,17.34379 59.18936,27.46396 93.72193,27.46396"/>\n          </g>\n        </svg>\n      '}},methods:{...Object(s["b"])("keeps",["deleteKeep","shareKeep"]),...Object(s["b"])("vaults",["getVaults","addKeepToVault","removeKeepFromVault"]),openDialog(t){document.body.click(),this.dialogOpen=!0},closeDialog(t){t&&t.target===this.$refs.dialog||(this.dialogOpen=!1,this.vaultId="")},async share(){window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${window.location.origin}/keep/${this.$props.id}`)}`);const t=await this.shareKeep(this.$props.id);t&&(this.keep.shares=t)}},computed:{...Object(s["c"])("vaults",["vaults"]),...Object(s["c"])("auth",["user"]),keep(){return{id:this.$props.id,name:this.$props.name,description:this.$props.description,userId:this.$props.userId,img:this.$props.img,isPrivate:this.$props.isPrivate,views:this.$props.views,shares:this.$props.shares,keeps:this.$props.keeps}}},watch:{dialogOpen(t){t?document.body.addEventListener("click",this.closeDialog):document.body.removeEventListener("click",this.closeDialog)}},components:{IconButton:o["a"],OutlineButton:r["a"]}},u=l,c=(i("0368"),i("2877")),p=Object(c["a"])(u,n,a,!1,null,"f9381e7e",null);p.options.__file="KeepCard.vue";e["a"]=p.exports},b126:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("flat-button",t._g(t._b({staticClass:"icon-button"},"flat-button",t.$attrs,!1),t.$listeners),[t.icon?i("base-icon",[t._v(t._s(t.icon))]):t._e(),t.iconHTML?i("div",{staticClass:"custom-html",domProps:{innerHTML:t._s(t.iconHTML)}}):t._e(),t._t("default")],2)},a=[],s=i("0937"),o={name:"icon-button",props:{icon:{type:String},iconHTML:{type:String}},components:{FlatButton:s["a"]}},r=o,l=(i("e824"),i("2877")),u=Object(l["a"])(r,n,a,!1,null,"0408d754",null);u.options.__file="IconButton.vue";e["a"]=u.exports},d553:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page vault"},[t.vault?[i("h1",{staticClass:"page__title"},[t._v(t._s(t.vault.name))]),i("p",{staticClass:"page__subtitle"},[t._v(t._s(t.vault.description))]),i("section",{staticClass:"keeps"},t._l(t.vault.keeps,function(e){return i("keep-card",t._b({key:e.id,attrs:{inVault:!0}},"keep-card",e,!1))}))]:t._e(),i("transition",{attrs:{name:"fade",mode:"out-in"}},[t.editing?i("form",{key:"form",ref:"editForm",staticClass:"edit-form",on:{submit:function(e){return e.preventDefault(),t.saveEdits(e)}}},[i("h2",{staticStyle:{"margin-bottom":"0.5rem"},attrs:{align:"center"}},[t._v("Edit vault")]),i("base-input",{attrs:{autocomplete:"off",type:"text",name:"name",value:t.modifiedVault.name,label:"Name",placeholder:"Fast cars",hint:"Maximum length is 20 characters.",maxlength:"20"},model:{value:t.modifiedVault.name,callback:function(e){t.$set(t.modifiedVault,"name",e)},expression:"modifiedVault.name"}}),i("base-input",{attrs:{autocomplete:"off",type:"text",name:"description",value:t.modifiedVault.description,label:"Description",placeholder:"A racing car photo.",maxlength:"255"},model:{value:t.modifiedVault.description,callback:function(e){t.$set(t.modifiedVault,"description",e)},expression:"modifiedVault.description"}}),i("div",{staticClass:"actions"},[i("outline-button",{attrs:{type:"submit"}},[t._v("Save")]),i("flat-button",{attrs:{type:"button"},on:{click:function(e){t.cancelEdit()}}},[t._v("Cancel")])],1)],1):i("floating-action-button",{key:"fab",attrs:{icon:"edit"},on:{click:t.openEdit}})],1)],2)},a=[],s=i("2f62"),o=i("aa1e"),r=i("1fc4"),l=i("0937"),u=i("8926"),c=i("a132"),p={name:"Vault",props:{id:{validator:t=>!isNaN(t),required:!0}},data(){return{editing:!1,modifiedVault:{}}},methods:{...Object(s["b"])("vaults",["getVaults","editVault"]),...Object(s["b"])("keeps",["getMyKeeps"]),...Object(s["b"])("snacks",["notify"]),async init(){this.vault||(await this.getVaults(),this.vault||this.$router.push({name:"dashboard"}))},async saveEdits(){this.editing=!1;const t=await this.editVault(this.modifiedVault);t?this.notify({message:"Vault updated!",type:"info"}):(this.notify({message:"Unable to update vault.",type:"error"}),this.modifiedVault={...this.vault})},openEdit(t){document.body.click(),this.modifiedVault={...this.vault},this.editing=!0},cancelEdit(t){t&&traverseUpUntil(t=>"FORM"===t.tagName,t.target)===this.$refs.editForm||(this.editing=!1,this.modifiedKeep={...this.keep})}},computed:{...Object(s["c"])("vaults",["vaults"]),vault(){return this.vaults.find(t=>t.id===parseInt(this.$props.id))}},watch:{"$store.state.auth.user.id"(){this.init()}},mounted(){this.init()},components:{KeepCard:o["a"],FloatingActionButton:r["a"],FlatButton:l["a"],OutlineButton:u["a"],ToggleInput:c["a"]}},d=p,m=(i("52d8"),i("2877")),f=Object(m["a"])(d,n,a,!1,null,"5aa5adc1",null);f.options.__file="Vault.vue";e["default"]=f.exports},dc51:function(t,e,i){},e1ea:function(t,e,i){},e824:function(t,e,i){"use strict";var n=i("5258"),a=i.n(n);a.a},f795:function(t,e,i){},f879:function(t,e,i){"use strict";var n=i("f795"),a=i.n(n);a.a}}]);
//# sourceMappingURL=chunk-71be602b.93a8b5fa.js.map