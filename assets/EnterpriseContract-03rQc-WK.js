import{a as e,j as c}from"./jsx-runtime-KzWSGvcx.js";import{r as o}from"./index-DogsOklH.js";import{w as xt,u as H,a as vt,b as Et,d as St,F as M,c as P,S as R,f as D,I as Tt,h as bt,j as Ot,T as Nt,k as wt,l as Ft,m as Lt,n as jt,o as K,p as Dt,N as zt}from"./StatusFilter-pEYA_ko8.js";import{_ as y,n as h,q as Q,r as ot,s as It,t as p,g as at,e as z,h as E,u as At,T as Mt,d as Pt,f as j,B as $,i as k}from"./data-bInZInU_.js";const Z=t=>!!(t&&!isNaN(t)),l={card:"pf-v5-c-card",descriptionList:"pf-v5-c-description-list",descriptionListDescription:"pf-v5-c-description-list__description",descriptionListGroup:"pf-v5-c-description-list__group",descriptionListTerm:"pf-v5-c-description-list__term",descriptionListTermIcon:"pf-v5-c-description-list__term-icon",descriptionListText:"pf-v5-c-description-list__text",modifiers:{inlineGrid:"pf-m-inline-grid",autoColumnWidths:"pf-m-auto-column-widths",autoFit:"pf-m-auto-fit",compact:"pf-m-compact",fluid:"pf-m-fluid",fillColumns:"pf-m-fill-columns",displayLg:"pf-m-display-lg",display_2xl:"pf-m-display-2xl",helpText:"pf-m-help-text","1Col":"pf-m-1-col","2Col":"pf-m-2-col","3Col":"pf-m-3-col",horizontal:"pf-m-horizontal",vertical:"pf-m-vertical","1ColOnSm":"pf-m-1-col-on-sm","2ColOnSm":"pf-m-2-col-on-sm","3ColOnSm":"pf-m-3-col-on-sm",horizontalOnSm:"pf-m-horizontal-on-sm",verticalOnSm:"pf-m-vertical-on-sm","1ColOnMd":"pf-m-1-col-on-md","2ColOnMd":"pf-m-2-col-on-md","3ColOnMd":"pf-m-3-col-on-md",horizontalOnMd:"pf-m-horizontal-on-md",verticalOnMd:"pf-m-vertical-on-md","1ColOnLg":"pf-m-1-col-on-lg","2ColOnLg":"pf-m-2-col-on-lg","3ColOnLg":"pf-m-3-col-on-lg",horizontalOnLg:"pf-m-horizontal-on-lg",verticalOnLg:"pf-m-vertical-on-lg","1ColOnXl":"pf-m-1-col-on-xl","2ColOnXl":"pf-m-2-col-on-xl","3ColOnXl":"pf-m-3-col-on-xl",horizontalOnXl:"pf-m-horizontal-on-xl",verticalOnXl:"pf-m-vertical-on-xl","1ColOn_2xl":"pf-m-1-col-on-2xl","2ColOn_2xl":"pf-m-2-col-on-2xl","3ColOn_2xl":"pf-m-3-col-on-2xl",horizontalOn_2xl:"pf-m-horizontal-on-2xl",verticalOn_2xl:"pf-m-vertical-on-2xl"}},tt=(t,i)=>{const n=i;return Object.keys(n||{}).reduce((r,s)=>s==="default"?Object.assign(Object.assign({},r),{[t]:n[s]}):Object.assign(Object.assign({},r),{[`${t}-on-${s}`]:n[s]}),{})},lt=t=>{var{className:i="",children:n=null,isHorizontal:r=!1,isAutoColumnWidths:s,isAutoFit:a,isInlineGrid:d,isCompact:_,isFluid:g,isFillColumns:x,displaySize:C="default",columnModifier:m,autoFitMinModifier:T,termWidth:v,horizontalTermWidthModifier:b,orientation:L,style:f}=t,A=y(t,["className","children","isHorizontal","isAutoColumnWidths","isAutoFit","isInlineGrid","isCompact","isFluid","isFillColumns","displaySize","columnModifier","autoFitMinModifier","termWidth","horizontalTermWidthModifier","orientation","style"]);return a&&T&&(f=Object.assign(Object.assign({},f),tt("--pf-v5-c-description-list--GridTemplateColumns--min",T))),v&&(f=Object.assign(Object.assign({},f),{"--pf-v5-c-description-list__term--width":v})),r&&b&&(f=Object.assign(Object.assign({},f),tt("--pf-v5-c-description-list--m-horizontal__term--width",b))),o.createElement("dl",Object.assign({className:h(l.descriptionList,(r||g)&&l.modifiers.horizontal,s&&l.modifiers.autoColumnWidths,a&&l.modifiers.autoFit,Q(m,l),Q(L,l),d&&l.modifiers.inlineGrid,_&&l.modifiers.compact,g&&l.modifiers.fluid,x&&l.modifiers.fillColumns,C==="lg"&&l.modifiers.displayLg,C==="2xl"&&l.modifiers.display_2xl,i),style:f},A),n)};lt.displayName="DescriptionList";const O=t=>{var{children:i=null,className:n}=t,r=y(t,["children","className"]);return o.createElement("dd",Object.assign({className:h(l.descriptionListDescription,n)},r),o.createElement("div",{className:h(l.descriptionListText)},i))};O.displayName="DescriptionListDescription";const N=t=>{var{className:i,children:n}=t,r=y(t,["className","children"]);return o.createElement("div",Object.assign({className:h(l.descriptionListGroup,i)},r),n)};N.displayName="DescriptionListGroup";const w=t=>{var{children:i,className:n,icon:r}=t,s=y(t,["children","className","icon"]);return o.createElement("dt",Object.assign({className:h(l.descriptionListTerm,n)},s),r?o.createElement("span",{className:h(l.descriptionListTermIcon)},r):null,o.createElement("span",{className:h(l.descriptionListText)},i))};w.displayName="DescriptionListTerm";const et={modifiers:{helpText:"pf-m-help-text"},timestamp:"pf-v5-c-timestamp"};var nt;(function(t){t.full="full",t.long="long",t.medium="medium",t.short="short"})(nt||(nt={}));var U;(function(t){t.default="default",t.custom="custom"})(U||(U={}));const ct=t=>{var{children:i,className:n,customFormat:r,date:s,dateFormat:a,displaySuffix:d="",is12Hour:_,locale:g,shouldDisplayUTC:x,timeFormat:C,tooltip:m}=t,T=y(t,["children","className","customFormat","date","dateFormat","displaySuffix","is12Hour","locale","shouldDisplayUTC","timeFormat","tooltip"]);const[v,b]=o.useState(()=>{const u=new Date(s);return Z(u)?u:new Date});o.useEffect(()=>{const u=new Date(s);Z(u)&&u.toString()!==new Date(v).toString()?b(u):s||b(new Date)},[s]);const L=C&&!r,f=Object.assign(Object.assign(Object.assign({},a&&!r&&{dateStyle:a}),r&&Object.assign({},r)),_!==void 0&&{hour12:_}),A=new Date(v).toLocaleString(g,Object.assign(Object.assign({},f),L&&{timeStyle:C})),ut=C!=="short"?"medium":"short",ft=u=>new Date(u).toUTCString().slice(0,-3),ht=new Date(ft(v)).toLocaleString(g,Object.assign(Object.assign({},f),L&&{timeStyle:ut})),gt=C==="full"?"Coordinated Universal Time":"UTC",Y=u=>`${ht} ${u||gt}`,Ct=x?Y(d):`${A}${d?" "+d:""}`,{dateTime:yt}=T,_t=y(T,["dateTime"]),J=o.createElement("span",Object.assign({className:h(et.timestamp,m&&et.modifiers.helpText,n)},m&&{tabIndex:0},_t),o.createElement("time",{className:"pf-v5-c-timestamp__text",dateTime:yt||new Date(v).toISOString()},i||Ct));return m?o.createElement(ot,Object.assign({content:m.variant===U.default?Y(m.suffix):m.content},m.tooltipProps),J):J};ct.displayName="Timestamp";const F={dirRtl:"pf-v5-m-dir-rtl",truncate:"pf-v5-c-truncate",truncateEnd:"pf-v5-c-truncate__end",truncateStart:"pf-v5-c-truncate__start"};var S;(function(t){t.start="start",t.end="end",t.middle="middle"})(S||(S={}));const Rt={start:F.truncateEnd,end:F.truncateStart},it=12,rt=(t,i)=>[t.slice(0,t.length-i),t.slice(-i)],dt=t=>{var{className:i,position:n="end",tooltipPosition:r="top",trailingNumChars:s=7,content:a}=t,d=y(t,["className","position","tooltipPosition","trailingNumChars","content"]);return o.createElement(ot,{position:r,content:a},o.createElement("span",Object.assign({className:h(F.truncate,i)},d),(n===S.end||n===S.start)&&o.createElement("span",{className:Rt[n]},a,n===S.start&&o.createElement(o.Fragment,null,"‎")),n===S.middle&&a.slice(0,a.length-s).length>it&&o.createElement(o.Fragment,null,o.createElement("span",{className:F.truncateStart},rt(a,s)[0]),o.createElement("span",{className:F.truncateEnd},rt(a,s)[1])),n===S.middle&&a.slice(0,a.length-s).length<=it&&a))};dt.displayName="Truncate";const pt=t=>{var{children:i=null}=t,n=y(t,["children"]);return o.createElement("div",Object.assign({},n,{className:h(It.tableExpandableRowContent)}),i)};pt.displayName="ExpandableRowContent";const I=o.createContext(null),$t=xt(({enterpriseContractPolicies:t,children:i})=>{const{state:{nameFilter:n,statusFilters:r}}=H(),s=o.useMemo(()=>t==null?void 0:t.filter(a=>(!n||a.title.toLowerCase().indexOf(n.toLowerCase())!==-1)&&(!r.length||r.includes(a.status))),[t,n,r]);return e(I.Provider,{value:{enterpriseContractPolicies:t,filteredECResults:s},children:e("div",{"data-testid":"enterprise-contract",children:i})})}),kt=$t,X=()=>{const t=o.useContext(I);if(t===null)throw new Error("useEnterpriseContractContext must be within a EnterpriseContractContextProvider");return t};try{I.displayName="EnterpriseContractContext",I.__docgenInfo={description:"",displayName:"EnterpriseContractContext",props:{enterpriseContractPolicies:{defaultValue:null,description:"",name:"enterpriseContractPolicies",required:!0,type:{name:"EnterpriseContractPolicy[]"}}}}}catch{}const mt=t=>{var n;const i={[p.successes]:0,[p.warnings]:0,[p.failed]:0};return(n=Array.isArray(t)?t:[])==null?void 0:n.reduce((r,s)=>(r[s.status]?r[s.status]+=1:r[s.status]=1,r),i)},st=[p.successes,p.warnings,p.failed],Jt=t=>t.reduce((i,{status:n})=>(st.indexOf(n)||0)>st.indexOf(i)?n:i,""),W=()=>{const{enterpriseContractPolicies:t}=X(),i=o.useMemo(()=>mt(t),[t]);return c(vt,{style:{width:"250px",marginBottom:"var(--pf-v5-global--spacer--sm)"},isCompact:!0,children:[e(Et,{children:"Summary"}),e(St,{children:c(M,{justifyContent:{default:"justifyContentSpaceBetween"},children:[c(M,{direction:{default:"column"},children:[e(P,{children:e(R,{text:D(p.failed),count:i[p.failed]})}),e(P,{children:e(R,{text:D(p.warnings),count:i[p.warnings]})})]}),e(M,{direction:{default:"column"},children:e(P,{children:e(R,{text:D(p.successes),count:i[p.successes]})})})]})})]})},Ut=W;try{W.displayName="EnterpriseContractSummary",W.__docgenInfo={description:"",displayName:"EnterpriseContractSummary",props:{}}}catch{}const B=({data:t,rowIndex:i})=>{var s;const[n,r]=o.useState(!1);return c(at,{isExpanded:n,"data-testid":"row",children:[c(z,{"data-testid":`ec-row-${i}`,children:[e(E,{"data-testid":`ec-row-expand-${i}`,expand:{rowIndex:i,isExpanded:n,onToggle:()=>r(a=>!a)}}),e(E,{children:t.title??"-"}),e(E,{"data-testid":"rule-status",children:D(t.status)}),e(E,{children:t.msg?e(dt,{content:t.msg}):"-"})]}),c(z,{isExpanded:n,"data-testid":`ec-row-expanded-${i}`,children:[e(E,{}),e(E,{colSpan:4,children:e(pt,{children:c(lt,{isAutoColumnWidths:!0,columnModifier:{default:"3Col"},children:[c(N,{children:[e(w,{children:"Rule Description"}),e(O,{children:t.description??"-"})]}),(s=t==null?void 0:t.collection)!=null&&s.length?c(N,{children:[e(w,{children:"Collection"}),e(O,{children:e("a",{href:"https://enterprisecontract.dev/docs/ec-policies/release_policy.html#_available_rule_collections",children:t.collection.join(", ")})})]}):null,t.solution?c(N,{children:[e(w,{children:"Solution"}),e(O,{children:t.solution})]}):null,t.timestamp?c(N,{children:[e(w,{children:"Effective from"}),c(O,{children:[e(Tt,{iconSize:"sm",children:e(At.GlobeAmericasIcon,{})})," ",e(ct,{date:new Date(t.timestamp),dateFormat:"medium",timeFormat:"short",is12Hour:!0})]})]}):null]})})})]})]})};try{B.displayName="EnterpriseContractRow",B.__docgenInfo={description:"",displayName:"EnterpriseContractRow",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"EnterpriseContractPolicy"}},rowIndex:{defaultValue:null,description:"",name:"rowIndex",required:!0,type:{name:"number"}}}}}catch{}const Wt=["","title","status","msg"],G=()=>{const[t,i]=o.useState(2),[n,r]=o.useState("asc"),{filteredECResults:s}=X(),{onClearAllFilters:a}=H(),d=o.useMemo(()=>s==null?void 0:s.sort(bt(Wt[t],n)),[n,t,s]),_=g=>({sortBy:{index:t,direction:n},onSort:(x,C,m)=>{i(C),r(m)},columnIndex:g});return c(Mt,{variant:"compact","data-testid":"ec-policy-table",children:[e(Pt,{children:c(z,{children:[e(j,{width:10}),e(j,{width:30,sort:_(1),children:"Rules"}),e(j,{width:10,sort:_(2),children:"Status"}),e(j,{width:30,children:"Message"})]})}),(d==null?void 0:d.length)>0?d==null?void 0:d.map((g,x)=>e(B,{rowIndex:x,data:g},x)):e(at,{children:e(z,{children:e(E,{colSpan:8,children:e(Ot,{onClearAllFilters:a})})})})]})};try{G.displayName="EnterpriseContractTable",G.__docgenInfo={description:"",displayName:"EnterpriseContractTable",props:{}}}catch{}const Bt=()=>e(Nt,{style:{marginBottom:"var(--pf-v5-global--spacer--sm)"},children:c(wt,{component:Ft.p,children:["Enterprise Contract is a set of tools for verifying the provenance of application snapshots and validating them against a clearly defined policy.",e("br",{}),"The Enterprise Contract policy is defined using the"," ",e($,{variant:"link",isInline:!0,iconPosition:"right",icon:e(k.ExternalLinkAltIcon,{style:{fontSize:"var(--pf-v5-global--icon--FontSize--sm)"}}),component:t=>e("a",{...t,href:"https://www.openpolicyagent.org/docs/latest/policy-language/",target:"_blank",rel:"noreferrer"}),children:"rego policy language"})," ","and is described here in"," ",c($,{variant:"link",style:{padding:0},icon:e(k.ExternalLinkAltIcon,{style:{fontSize:"var(--pf-v5-global--icon--FontSize--sm)"}}),iconPosition:"right",component:t=>e("a",{...t,href:"https://enterprisecontract.dev/docs/ec-policies/index.html",target:"_blank",rel:"noreferrer","aria-label":"Release policy"}),children:["Release Policy"," "]})," ","and"," ",e($,{variant:"link",style:{padding:0},icon:e(k.ExternalLinkAltIcon,{style:{fontSize:"var(--pf-v5-global--icon--FontSize--sm)"}}),iconPosition:"right",children:"Pipeline Policy"})]})}),Gt=Bt,V=()=>{const{filteredECResults:t}=X(),{state:{nameFilter:i},dispatch:{updateNameFilter:n},onClearAllFilters:r}=H(),s=mt(t);return e(Lt,{className:"pf-m-toggle-group-container",clearAllFilters:r,children:c(jt,{children:[e(K,{children:e(Dt,{data:s})}),e(K,{widths:{default:"300px"},className:"pf-v5-u-ml-0",children:e(zt,{filter:i,updateFilter:n,placeholder:"Search",ariaLabel:"rule search filter"})})]})})},Vt=V;try{V.displayName="EnterpriseContractToolbar",V.__docgenInfo={description:"",displayName:"EnterpriseContractToolbar",props:{}}}catch{}const q=({enterpriseContractPolicies:t})=>c(kt,{"data-testid":"enterprise-contract",enterpriseContractPolicies:t,children:[e(Gt,{}),e(Ut,{}),e(Vt,{}),e(G,{})]}),Kt=q;try{q.displayName="EnterpriseContract",q.__docgenInfo={description:"",displayName:"EnterpriseContract",props:{enterpriseContractPolicies:{defaultValue:null,description:"",name:"enterpriseContractPolicies",required:!0,type:{name:"EnterpriseContractPolicy[]"}}}}}catch{}export{Kt as E,Jt as g};