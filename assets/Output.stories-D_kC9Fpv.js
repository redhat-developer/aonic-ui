import{_ as E,n as r,o as de,p as oe,B as ue,A as pe,C as me,b as Z,a as ee,m as ae,c as te}from"./data-sQbVW7wR.js";import{j as V,a as i,F as be}from"./jsx-runtime-Cxo6Vr6b.js";import{r as t}from"./index-BBkUAzwr.js";import{C as se,s as u,a as ge,b as Ce,F as he,c as w,d as ve,i as fe,g as Ne,e as ye}from"./StatusFilter-Dqpbgr7V.js";import{g as Re,a as Se,A as Oe}from"./AdvancedClusterSecurity-Ccjcos5V.js";import{g as Ae,E as Ee}from"./EnterpriseContract-CSaKQlGw.js";import{R as ke}from"./ResultsList-pcZKtq55.js";import"./identity-_yWDbbU3.js";import"./keysIn-Ooincfhd.js";import"./isPlainObject-QAIs_Avh.js";import"./index-PqR-_bA4.js";const ne=s=>{var{children:n,className:l}=s,a=E(s,["children","className"]);return t.createElement(se.Consumer,null,({isExpanded:e})=>e?t.createElement("div",Object.assign({className:r(u.cardExpandableContent,l)},a),n):null)};ne.displayName="CardExpandableContent";const le=s=>{var{children:n,className:l}=s,a=E(s,["children","className"]);return t.createElement("div",Object.assign({className:r(u.cardHeaderMain,l)},a),n)};le.displayName="CardHeaderMain";const re=s=>{var{children:n,className:l,hasNoOffset:a=!1}=s,e=E(s,["children","className","hasNoOffset"]);return t.createElement("div",Object.assign({className:r(u.cardActions,a&&u.modifiers.noOffset,l)},e),n)};re.displayName="CardActions";const ie=s=>{var{children:n,className:l}=s,a=E(s,["children","className"]);return t.createElement("div",Object.assign({className:r(u.cardSelectableActions,l)},a),n)};ie.displayName="CardSelectableActions";const N={modifiers:{standalone:"pf-m-standalone",disabled:"pf-m-disabled"},radio:"pf-v6-c-radio",radioBody:"pf-v6-c-radio__body",radioDescription:"pf-v6-c-radio__description",radioInput:"pf-v6-c-radio__input",radioLabel:"pf-v6-c-radio__label"};class A extends t.Component{constructor(n){super(n),this.handleChange=l=>{this.props.onChange(l,l.currentTarget.checked)},!n.label&&!n["aria-label"]&&console.error("Radio:","Radio requires an aria-label to be specified"),this.state={ouiaStateId:de(A.displayName)}}render(){const n=this.props,{"aria-label":l,checked:a,className:e,inputClassName:h,defaultChecked:d,isLabelWrapped:m,labelPosition:o="end",isChecked:y,isDisabled:v,isValid:R,label:c,onChange:b,description:_,body:f,ouiaId:k,ouiaSafe:F=!0,component:p}=n,S=E(n,["aria-label","checked","className","inputClassName","defaultChecked","isLabelWrapped","labelPosition","isChecked","isDisabled","isValid","label","onChange","description","body","ouiaId","ouiaSafe","component"]);S.id||console.error("Radio:","id is required to make input accessible");const L=t.createElement("input",Object.assign({},S,{className:r(N.radioInput,h),type:"radio",onChange:this.handleChange,"aria-invalid":!R,disabled:v,checked:a||y},a===void 0&&{defaultChecked:d},!c&&{"aria-label":l},oe(A.displayName,k!==void 0?k:this.state.ouiaStateId,F))),g=m&&!p||p==="label",q=g?"span":"label",T=c?t.createElement(q,{className:r(N.radioLabel,v&&N.modifiers.disabled),htmlFor:g?void 0:S.id},c):null,C=p??(g?"label":"div");return t.createElement(C,{className:r(N.radio,!c&&N.modifiers.standalone,e),htmlFor:g?S.id:void 0},o==="start"?t.createElement(t.Fragment,null,T,L):t.createElement(t.Fragment,null,L,T),_&&t.createElement("span",{className:r(N.radioDescription)},_),f&&t.createElement("span",{className:r(N.radioBody)},f))}}A.displayName="Radio";A.defaultProps={className:"",isDisabled:!1,isValid:!0,onChange:()=>{}};const ce=s=>{var{children:n,className:l,actions:a,selectableActions:e,id:h,onExpand:d,toggleButtonProps:m,isToggleRightAligned:o}=s,y=E(s,["children","className","actions","selectableActions","id","onExpand","toggleButtonProps","isToggleRightAligned"]);const v=t.useId();return t.createElement(se.Consumer,null,({cardId:R,isClickable:c,isSelectable:b,isSelected:_,isDisabled:f})=>{const k=t.createElement("div",{className:r(u.cardHeaderToggle)},t.createElement(ue,Object.assign({variant:"plain",type:"button",onClick:C=>{d(C,R)}},m,{icon:t.createElement("span",{className:r(u.cardHeaderToggleIcon)},t.createElement(pe,{"aria-hidden":"true"}))}))),F=c&&!b||b&&!c;a!=null&&a.actions&&F&&console.error(`Card: ${c?"Clickable":"Selectable"} only cards should not contain any other actions. If you wish to include additional actions, use a clickable and selectable card.`);const p=c&&!b;(p||b)&&!(e!=null&&e.selectableActionAriaLabel)&&!(e!=null&&e.selectableActionAriaLabelledby)&&console.error(`Card: ${p?"Clickable-only cards":"Cards with a selectable input"} must have either the selectableActions.selectableActionAriaLabel or selectableActions.selectableActionAriaLabelledby prop passed in order to provide an accessible name to the clickable element.`);const S=(e==null?void 0:e.variant)==="single"?A:me,L=()=>{var C,O;return Object.assign({className:r("pf-m-standalone"),inputClassName:r((e==null?void 0:e.isHidden)&&"pf-v6-screen-reader"),label:t.createElement(t.Fragment,null),"aria-label":e.selectableActionAriaLabel,"aria-labelledby":e.selectableActionAriaLabelledby,id:(C=e.selectableActionId)!==null&&C!==void 0?C:`card-selectable-${v}`,name:e.name,isDisabled:f,onChange:e.onChange,isChecked:(O=e.isChecked)!==null&&O!==void 0?O:_},e.selectableActionProps)},g=(e==null?void 0:e.to)!==void 0,q=g?"a":"button",T=()=>{const O=Object.assign({className:r("pf-v6-c-card__clickable-action",f&&g&&u.modifiers.disabled,(e==null?void 0:e.isHidden)&&"pf-v6-screen-reader"),id:e.selectableActionId,"aria-label":e.selectableActionAriaLabel,"aria-labelledby":e.selectableActionAriaLabelledby},e.selectableActionProps);return g?Object.assign(Object.assign(Object.assign(Object.assign({},O),{href:e.to}),f&&{tabIndex:-1,"aria-disabled":!0}),e.isExternalLink&&{target:"_blank"}):Object.assign(Object.assign({},O),{type:"button",disabled:f,onClick:e.onClickAction})};return t.createElement("div",Object.assign({className:r(u.cardHeader,o&&u.modifiers.toggleRight,l),id:h},y),d&&!o&&k,(a||e&&(c||b))&&t.createElement(re,{className:a==null?void 0:a.className,hasNoOffset:(a==null?void 0:a.hasNoOffset)||(e==null?void 0:e.hasNoOffset)},a==null?void 0:a.actions,e&&(c||b)&&t.createElement(ie,{className:e==null?void 0:e.className},b&&t.createElement(S,Object.assign({},L())),p&&t.createElement(q,Object.assign({},T())))),n&&t.createElement(le,null,n),d&&o&&k)})};ce.displayName="CardHeader";const I=({title:s,badge:n,isOpen:l,children:a})=>{var m;const[e,h]=t.useState(l??!1),d=(m=s==null?void 0:s.replace(/\//g,"-"))==null?void 0:m.toLowerCase();return V(ge,{id:d,isExpanded:e,isPlain:!0,children:[i(ce,{onExpand:()=>h(o=>!o),isToggleRightAligned:!1,toggleButtonProps:{id:`${d}-toggle-button`,"aria-label":s,"aria-labelledby":`${d}-toggle-button`,"aria-expanded":e},children:i(Ce,{id:`{${d}-title}`,children:V(he,{gap:{default:"gapSm"},children:[i(w,{"data-testid":"card-title",children:s}),i(w,{"data-testid":"card-badge",children:n})]})})}),i(ne,{children:i(ve,{children:a})})]})};try{I.displayName="OutputCard",I.__docgenInfo={description:"",displayName:"OutputCard",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}},badge:{defaultValue:null,description:"",name:"badge",required:!1,type:{name:"ReactNode"}}}}}catch{}const H=({enterpriseContractPolicies:s=[],acsImageCheckResults:n={},acsImageScanResult:l={},acsDeploymentCheckResults:a={},results:e,pipelineRunName:h,pipelineRunStatus:d})=>{const m=Re(l)||Se(n,a),o=(s==null?void 0:s.length)>0,y=[l,n,a].filter(c=>!fe(c)).length>0,v=!o&&!y,R=()=>i(ke,{results:e,pipelineRunName:h,pipelineRunStatus:d});return V(be,{children:[o&&i(I,{title:"Enterprise Contract",badge:Ne(Ae(s)),isOpen:!0,children:i(Ee,{enterpriseContractPolicies:s})}),y&&i(I,{title:"Advanced Cluster Security",badge:ye(m),isOpen:!o,children:i(Oe,{acsImageScanResult:l,acsImageCheckResults:n,acsDeploymentCheckResults:a})}),e.length>0&&v?i(R,{"data-testid":"ec"}):e.length>0?i(I,{"data-testid":"results-card",title:"Others",isOpen:v,children:i(R,{})}):null]})};try{H.displayName="Output",H.__docgenInfo={description:"Output component supports EC, ACS policy reports and pipelinerun results.",displayName:"Output",props:{enterpriseContractPolicies:{defaultValue:{value:"[]"},description:"",name:"enterpriseContractPolicies",required:!1,type:{name:"EnterpriseContractPolicy[]"}},acsImageScanResult:{defaultValue:{value:"{} as ACSImageScanResult"},description:"",name:"acsImageScanResult",required:!1,type:{name:"ACSImageScanResult"}},acsImageCheckResults:{defaultValue:{value:"{} as ACSCheckResults"},description:"",name:"acsImageCheckResults",required:!1,type:{name:"ACSCheckResults"}},acsDeploymentCheckResults:{defaultValue:{value:"{} as ACSCheckResults"},description:"",name:"acsDeploymentCheckResults",required:!1,type:{name:"ACSCheckResults"}},results:{defaultValue:null,description:"",name:"results",required:!0,type:{name:"{ name: string; value: string; }[]"}},pipelineRunName:{defaultValue:null,description:"",name:"pipelineRunName",required:!0,type:{name:"string"}},pipelineRunStatus:{defaultValue:null,description:"",name:"pipelineRunStatus",required:!0,type:{name:"enum",value:[{value:'"Succeeded"'},{value:'"Failed"'},{value:'"Running"'},{value:'"In Progress"'},{value:'"FailedToStart"'},{value:'"Starting"'},{value:'"WithoutStatusConditions"'},{value:'"PR needs merge"'},{value:'"Skipped"'},{value:'"Cancelled"'},{value:'"Cancelling"'},{value:'"Pending"'},{value:'"Idle"'},{value:'"Test Warnings"'},{value:'"Test Failures"'},{value:'"Unknown"'}]}}}}}catch{}const He={title:"Pipelines/Output",component:H,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{pipelineRunStatus:{control:"select",options:["Failed","Succeeded"]}}},j={args:{acsImageScanResult:Z,acsImageCheckResults:ee,enterpriseContractPolicies:ae,acsDeploymentCheckResults:te,results:[{name:"result-1",value:"value"}],pipelineRunName:"pipelineRunName",pipelineRunStatus:"Succeeded"},parameters:{}},x={args:{enterpriseContractPolicies:ae,results:[{name:"result-1",value:"value"}],pipelineRunName:"pipelineRunName",pipelineRunStatus:"Succeeded"},parameters:{}},P={args:{acsImageScanResult:Z,acsImageCheckResults:ee,acsDeploymentCheckResults:te,results:[{name:"result-1",value:"value"}],pipelineRunName:"pipelineRunName",pipelineRunStatus:"Succeeded"},parameters:{}},D={args:{results:[{name:"result-1",value:"value"}],pipelineRunName:"pipelineRunName",pipelineRunStatus:"Succeeded"},parameters:{}};var B,$,U;j.parameters={...j.parameters,docs:{...(B=j.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(U=($=j.parameters)==null?void 0:$.docs)==null?void 0:U.source}}};var W,M,z;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(z=(M=x.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};var G,J,K;P.parameters={...P.parameters,docs:{...(G=P.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(K=(J=P.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;D.parameters={...D.parameters,docs:{...(Q=D.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    results: [{
      name: 'result-1',
      value: 'value'
    }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded'
  },
  parameters: {}
}`,...(Y=(X=D.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const we=["OutputTab","OutputTabEC","OutputTabACS","OutputTabResults"];export{j as OutputTab,P as OutputTabACS,x as OutputTabEC,D as OutputTabResults,we as __namedExportsOrder,He as default};