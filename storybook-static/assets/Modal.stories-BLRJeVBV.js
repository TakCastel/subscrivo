import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as c}from"./index-GiUgBvb1.js";import{M as d}from"./Modal-jGAm4gdw.js";import{B as n}from"./Button-DsnxW2UV.js";import"./index-IWjC0Ui5.js";import"./proxy-Cm3FBkwj.js";import"./cn-C0Y9tLwQ.js";const b={title:"UI/Modal",component:d},r={render:()=>{const[i,t]=c.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>t(!0),children:"Ouvrir"}),e.jsx(d,{isOpen:i,onClose:()=>t(!1),children:e.jsxs("div",{className:"bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800",children:[e.jsx("h3",{className:"text-lg font-bold mb-2",children:"Modal Story"}),e.jsx("p",{className:"text-sm text-zinc-600 dark:text-zinc-300",children:"Contenu de test."}),e.jsx("div",{className:"mt-4 flex justify-end",children:e.jsx(n,{onClick:()=>t(!1),children:"Fermer"})})]})})]})}};var s,o,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(true);
    return <>\r
        <Button onClick={() => setOpen(true)}>Ouvrir</Button>\r
        <Modal isOpen={open} onClose={() => setOpen(false)}>\r
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">\r
            <h3 className="text-lg font-bold mb-2">Modal Story</h3>\r
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Contenu de test.</p>\r
            <div className="mt-4 flex justify-end">\r
              <Button onClick={() => setOpen(false)}>Fermer</Button>\r
            </div>\r
          </div>\r
        </Modal>\r
      </>;
  }
}`,...(a=(o=r.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const j=["Basic"];export{r as Basic,j as __namedExportsOrder,b as default};
