import{_ as R,n as c,o as ie,p as de,B as ce,A as oe,C as ue,b as X,a as Y,m as Z,c as ee}from"./data-D4XSKuO1.js";import{j as D,a as d,F as pe}from"./jsx-runtime-Cxo6Vr6b.js";import{r as a}from"./index-BBkUAzwr.js";import{C as ae,s as C,a as me,b as ge,F as Ce,c as B,d as he,i as be,g as fe,e as ve}from"./StatusFilter-B_IYX4Do.js";import{g as Ne,a as Re,A as ye}from"./AdvancedClusterSecurity-4lCzNcsB.js";import{g as Se,E as Ee}from"./EnterpriseContract-6qEOMigz.js";import{R as Oe}from"./ResultsList-DtBci1mV.js";import"./identity-_yWDbbU3.js";import"./keysIn-Ooincfhd.js";import"./isPlainObject-QAIs_Avh.js";import"./index-PqR-_bA4.js";const te=s=>{var{children:n,className:l}=s,t=R(s,["children","className"]);return a.createElement(ae.Consumer,null,({isExpanded:e})=>e?a.createElement("div",Object.assign({className:c(C.cardExpandableContent,l)},t),n):null)};te.displayName="CardExpandableContent";const se=s=>{var{children:n,className:l}=s,t=R(s,["children","className"]);return a.createElement("div",Object.assign({className:c(C.cardHeaderMain,l)},t),n)};se.displayName="CardHeaderMain";const ne=s=>{var{children:n,className:l,hasNoOffset:t=!1}=s,e=R(s,["children","className","hasNoOffset"]);return a.createElement("div",Object.assign({className:c(C.cardActions,t&&C.modifiers.noOffset,l)},e),n)};ne.displayName="CardActions";const le=s=>{var{children:n,className:l}=s,t=R(s,["children","className"]);return a.createElement("div",Object.assign({className:c(C.cardSelectableActions,l)},t),n)};le.displayName="CardSelectableActions";const m={modifiers:{standalone:"pf-m-standalone",disabled:"pf-m-disabled"},radio:"pf-v5-c-radio",radioBody:"pf-v5-c-radio__body",radioDescription:"pf-v5-c-radio__description",radioInput:"pf-v5-c-radio__input",radioLabel:"pf-v5-c-radio__label"};class N extends a.Component{constructor(n){super(n),this.handleChange=l=>{this.props.onChange(l,l.currentTarget.checked)},!n.label&&!n["aria-label"]&&console.error("Radio:","Radio requires an aria-label to be specified"),this.state={ouiaStateId:ie(N.displayName)}}render(){const n=this.props,{"aria-label":l,checked:t,className:e,inputClassName:b,defaultChecked:o,isLabelWrapped:g,isLabelBeforeButton:p,isChecked:f,isDisabled:h,isValid:i,label:r,onChange:F,description:O,body:y,ouiaId:A,ouiaSafe:x=!0}=n,v=R(n,["aria-label","checked","className","inputClassName","defaultChecked","isLabelWrapped","isLabelBeforeButton","isChecked","isDisabled","isValid","label","onChange","description","body","ouiaId","ouiaSafe"]);v.id||console.error("Radio:","id is required to make input accessible");const S=a.createElement("input",Object.assign({},v,{className:c(m.radioInput,b),type:"radio",onChange:this.handleChange,"aria-invalid":!i,disabled:h,checked:t||f},t===void 0&&{defaultChecked:o},!r&&{"aria-label":l},de(N.displayName,A!==void 0?A:this.state.ouiaStateId,x)));let u=null;r&&g?u=a.createElement("span",{className:c(m.radioLabel,h&&m.modifiers.disabled)},r):r&&(u=a.createElement("label",{className:c(m.radioLabel,h&&m.modifiers.disabled),htmlFor:v.id},r));const L=O?a.createElement("span",{className:c(m.radioDescription)},O):null,V=y?a.createElement("span",{className:c(m.radioBody)},y):null,q=p?a.createElement(a.Fragment,null,u,S,L,V):a.createElement(a.Fragment,null,S,u,L,V);return g?a.createElement("label",{className:c(m.radio,e),htmlFor:v.id},q):a.createElement("div",{className:c(m.radio,!r&&m.modifiers.standalone,e)},q)}}N.displayName="Radio";N.defaultProps={className:"",isDisabled:!1,isValid:!0,onChange:()=>{}};const re=s=>{var{children:n,className:l,actions:t,selectableActions:e,id:b,onExpand:o,toggleButtonProps:g,isToggleRightAligned:p}=s,f=R(s,["children","className","actions","selectableActions","id","onExpand","toggleButtonProps","isToggleRightAligned"]);return a.createElement(ae.Consumer,null,({cardId:h,isClickable:i,isSelectable:r,isDisabled:F,hasSelectableInput:O})=>{const y=a.createElement("div",{className:c(C.cardHeaderToggle)},a.createElement(ce,Object.assign({variant:"plain",type:"button",onClick:u=>{o(u,h)}},g),a.createElement("span",{className:c(C.cardHeaderToggleIcon)},a.createElement(oe,{"aria-hidden":"true"})))),A=i&&!r||r&&!i,x=O;t!=null&&t.actions&&A&&!x&&console.warn(`${i?"Clickable":"Selectable"} only cards should not contain any other actions. If you wish to include additional actions, use a clickable and selectable card.`);const v=u=>{i&&(e!=null&&e.onClickAction?e.onClickAction(u):e!=null&&e.to&&window.open(e.to,e.isExternalLink?"_blank":"_self"))},S=()=>{const u={className:"pf-m-standalone",inputClassName:i&&!r&&"pf-v5-screen-reader",label:a.createElement(a.Fragment,null),"aria-label":e.selectableActionAriaLabel,"aria-labelledby":e.selectableActionAriaLabelledby,id:e.selectableActionId,name:e.name,isDisabled:F};return i&&!r?Object.assign(Object.assign({},u),{onClick:v}):r?Object.assign(Object.assign({},u),{onChange:e.onChange,isChecked:e.isChecked}):u};return a.createElement("div",Object.assign({className:c(C.cardHeader,p&&C.modifiers.toggleRight,l),id:b},f),o&&!p&&y,(t||e&&(i||r))&&a.createElement(ne,{className:t==null?void 0:t.className,hasNoOffset:(t==null?void 0:t.hasNoOffset)||(e==null?void 0:e.hasNoOffset)},t==null?void 0:t.actions,e&&(i||r)&&a.createElement(le,{className:e==null?void 0:e.className},(e==null?void 0:e.variant)==="single"||i&&!r?a.createElement(N,Object.assign({},S())):a.createElement(ue,Object.assign({},S())))),n&&a.createElement(se,null,n),o&&p&&y)})};re.displayName="CardHeader";const E=({title:s,badge:n,isOpen:l,children:t})=>{var g;const[e,b]=a.useState(l??!1),o=(g=s==null?void 0:s.replace(/\//g,"-"))==null?void 0:g.toLowerCase();return D(me,{id:o,isExpanded:e,children:[d(re,{onExpand:()=>b(p=>!p),isToggleRightAligned:!1,toggleButtonProps:{id:`${o}-toggle-button`,"aria-label":s,"aria-labelledby":`${o}-toggle-button`,"aria-expanded":e},children:d(ge,{id:`{${o}-title}`,children:D(Ce,{gap:{default:"gapSm"},children:[d(B,{"data-testid":"card-title",children:s}),d(B,{"data-testid":"card-badge",children:n})]})})}),d(te,{children:d(he,{children:t})})]})};try{E.displayName="OutputCard",E.__docgenInfo={description:"",displayName:"OutputCard",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}},badge:{defaultValue:null,description:"",name:"badge",required:!1,type:{name:"ReactNode"}}}}}catch{}const j=({enterpriseContractPolicies:s=[],acsImageCheckResults:n={},acsImageScanResult:l={},acsDeploymentCheckResults:t={},results:e,pipelineRunName:b,pipelineRunStatus:o})=>{const g=Ne(l)||Re(n,t),p=(s==null?void 0:s.length)>0,f=[l,n,t].filter(r=>!be(r)).length>0,h=!p&&!f,i=()=>d(Oe,{results:e,pipelineRunName:b,pipelineRunStatus:o});return D(pe,{children:[p&&d(E,{title:"Enterprise Contract",badge:fe(Se(s)),isOpen:!0,children:d(Ee,{enterpriseContractPolicies:s})}),f&&d(E,{title:"Advanced Cluster Security",badge:ve(g),isOpen:!p,children:d(ye,{acsImageScanResult:l,acsImageCheckResults:n,acsDeploymentCheckResults:t})}),e.length>0&&h?d(i,{"data-testid":"ec"}):e.length>0?d(E,{"data-testid":"results-card",title:"Others",isOpen:h,children:d(i,{})}):null]})};try{j.displayName="Output",j.__docgenInfo={description:"Output component supports EC, ACS policy reports and pipelinerun results.",displayName:"Output",props:{enterpriseContractPolicies:{defaultValue:{value:"[]"},description:"",name:"enterpriseContractPolicies",required:!1,type:{name:"EnterpriseContractPolicy[]"}},acsImageScanResult:{defaultValue:{value:"{} as ACSImageScanResult"},description:"",name:"acsImageScanResult",required:!1,type:{name:"ACSImageScanResult"}},acsImageCheckResults:{defaultValue:{value:"{} as ACSCheckResults"},description:"",name:"acsImageCheckResults",required:!1,type:{name:"ACSCheckResults"}},acsDeploymentCheckResults:{defaultValue:{value:"{} as ACSCheckResults"},description:"",name:"acsDeploymentCheckResults",required:!1,type:{name:"ACSCheckResults"}},results:{defaultValue:null,description:"",name:"results",required:!0,type:{name:"{ name: string; value: string; }[]"}},pipelineRunName:{defaultValue:null,description:"",name:"pipelineRunName",required:!0,type:{name:"string"}},pipelineRunStatus:{defaultValue:null,description:"",name:"pipelineRunStatus",required:!0,type:{name:"enum",value:[{value:'"Succeeded"'},{value:'"Failed"'},{value:'"Running"'},{value:'"In Progress"'},{value:'"FailedToStart"'},{value:'"Starting"'},{value:'"WithoutStatusConditions"'},{value:'"PR needs merge"'},{value:'"Skipped"'},{value:'"Cancelled"'},{value:'"Cancelling"'},{value:'"Pending"'},{value:'"Idle"'},{value:'"Test Warnings"'},{value:'"Test Failures"'},{value:'"Unknown"'}]}}}}}catch{}const qe={title:"Pipelines/Output",component:j,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{pipelineRunStatus:{control:"select",options:["Failed","Succeeded"]}}},k={args:{acsImageScanResult:X,acsImageCheckResults:Y,enterpriseContractPolicies:Z,acsDeploymentCheckResults:ee,results:[{name:"result-1",value:"value"}],pipelineRunName:"pipelineRunName",pipelineRunStatus:"Succeeded"},parameters:{}},I={args:{enterpriseContractPolicies:Z,results:[{name:"result-1",value:"value"}],pipelineRunName:"pipelineRunName",pipelineRunStatus:"Succeeded"},parameters:{}},_={args:{acsImageScanResult:X,acsImageCheckResults:Y,acsDeploymentCheckResults:ee,results:[{name:"result-1",value:"value"}],pipelineRunName:"pipelineRunName",pipelineRunStatus:"Succeeded"},parameters:{}},T={args:{results:[{name:"result-1",value:"value"}],pipelineRunName:"pipelineRunName",pipelineRunStatus:"Succeeded"},parameters:{}};var P,w,H;k.parameters={...k.parameters,docs:{...(P=k.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    acsImageScanResult,
    acsImageCheckResults,
    enterpriseContractPolicies: mockEnterpriseContractUIData,
    acsDeploymentCheckResults: acsDeploymentCheck,
    results: [{
      name: 'result-1',
      value: 'value'
    }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded'
  },
  parameters: {}
}`,...(H=(w=k.parameters)==null?void 0:w.docs)==null?void 0:H.source}}};var U,$,W;I.parameters={...I.parameters,docs:{...(U=I.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    enterpriseContractPolicies: mockEnterpriseContractUIData,
    results: [{
      name: 'result-1',
      value: 'value'
    }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded'
  },
  parameters: {}
}`,...(W=($=I.parameters)==null?void 0:$.docs)==null?void 0:W.source}}};var M,z,G;_.parameters={..._.parameters,docs:{...(M=_.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    acsImageScanResult,
    acsImageCheckResults,
    acsDeploymentCheckResults: acsDeploymentCheck,
    results: [{
      name: 'result-1',
      value: 'value'
    }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded'
  },
  parameters: {}
}`,...(G=(z=_.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var J,K,Q;T.parameters={...T.parameters,docs:{...(J=T.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    results: [{
      name: 'result-1',
      value: 'value'
    }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded'
  },
  parameters: {}
}`,...(Q=(K=T.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const Be=["OutputTab","OutputTabEC","OutputTabACS","OutputTabResults"];export{k as OutputTab,_ as OutputTabACS,I as OutputTabEC,T as OutputTabResults,Be as __namedExportsOrder,qe as default};
