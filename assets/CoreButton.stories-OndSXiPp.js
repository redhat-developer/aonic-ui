import{a as t}from"./jsx-runtime-KzWSGvcx.js";import"./index-DogsOklH.js";const s=e=>t("button",{className:"aonic-button",onClick:e.onClick,children:e.label}),a=s,i={component:a},o={render:e=>t(a,{...e,label:"Hello",onClick:()=>{alert("Hello from Turborepo!")}}),name:"Core Button",args:{label:"Hello"}};var r,n,l;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: props => <Button {...props} label="Hello" onClick={(): void => {
    // eslint-disable-next-line no-alert -- alert for demo
    alert('Hello from Turborepo!');
  }} />,
  name: 'Core Button',
  args: {
    label: 'Hello'
  }
}`,...(l=(n=o.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const u=["Primary"];export{o as Primary,u as __namedExportsOrder,i as default};
