import { useTypedSelector } from "./useTypeSelector";

export const useCulmulativeCode =(cellId:string)=>{

    return useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);
    
        const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom'
        
        var show = (value)=>{
                  if(typeof value === 'object'){
                      const root = document.querySelector('#root');
                      if(value.$$typeof && value.props){
                          _ReactDOM.render(value,root);
                      }else{
                          document.querySelector('#root').innerHTML =JSON.stringify(value);
    
                      }
                  }else{
                      document.querySelector('#root').innerHTML =value;
    
    
                  }
    
              }`;
        const showFuncNoOp = "var show = ()=>{}";
        const culmulativeCode = [];
        for (let c of orderedCells) {
          if (c.type === "code") {
            if (c.id === cellId) {
              culmulativeCode.push(showFunc);
            } else {
              culmulativeCode.push(showFuncNoOp);
            }
            culmulativeCode.push(c.content);
          }
          if (c.id == cellId) {
            break;
          }
        }
    
        return culmulativeCode;
      }).join('\n');
    


}