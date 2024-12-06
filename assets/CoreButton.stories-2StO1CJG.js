import{a}from"./jsx-runtime-Cxo6Vr6b.js";import"./index-BBkUAzwr.js";const t=e=>a("button",{className:"aonic-button",onClick:e.onClick,children:e.label}),m={component:t},o={render:e=>a(t,{...e,label:"Hello",onClick:()=>{alert("Hello from Turborepo!")}}),name:"Core Button",args:{label:"Hello"}};var r,n,l;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: props => <Button {...props} label="Hello" onClick={(): void => {
    // eslint-disable-next-line no-alert -- alert for demo
    alert('Hello from Turborepo!');
  }} />,
  name: 'Core Button',
  args: {
    label: 'Hello'
  }
}`,...(l=(n=o.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const i=["Primary"];export{o as Primary,i as __namedExportsOrder,m as default};
