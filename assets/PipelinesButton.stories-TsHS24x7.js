import{a,j as s}from"./jsx-runtime-5gPUkPQy.js";import"./index-DogsOklH.js";const i=e=>a("button",{className:"aonic-button",onClick:e.onClick,children:[e.label," Pipelines Button"]}),t=i,m={component:t},o={render:e=>s(t,{...e,label:"Hello",onClick:()=>{alert("Hello from Turborepo!")}}),name:"Pipelines Button",args:{label:"Hello"}};var n,r,l;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: props => <PipelinesButton {...props} label="Hello" onClick={(): void => {
    // eslint-disable-next-line no-alert -- alert for demo
    alert('Hello from Turborepo!');
  }} />,
  name: 'Pipelines Button',
  args: {
    label: 'Hello'
  }
}`,...(l=(r=o.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const u=["Primary"];export{o as Primary,u as __namedExportsOrder,m as default};
