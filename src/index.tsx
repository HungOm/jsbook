import * as esbuild from 'esbuild-wasm'
import { useState,useEffect,useRef } from 'react';
import ReactDom from 'react-dom';
import {unpkgPathPlugin} from './plugin/unpkg-path-plugin';
import { fetchPlugin } from './plugin/fetch-plugin';

const App = ()=>{
    const ref = useRef<any>()
    const [input ,setInput]=useState('');
    const [code,setCode]= useState('');
    const startService = async()=>{
        ref.current = await esbuild.startService({
            worker:true,
            wasmURL:'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
        })
        // console.log(service)
    }   

    useEffect(()=>{
        startService();
    },[])



    const onClick =async ()=>{
        // console.log(input);
        if(!ref.current){
            return;
        }
    //    const result =  await ref.current.transform(input,{
    //         loader:'jsx',
    //         target:'es2015'
    //     });
    const result = await ref.current.build({
        entryPoints:['index.js'],
        bundle:true,
        write:false,
        plugins:[unpkgPathPlugin(),fetchPlugin(input)],
        define:{
            'process.env.NODE_ENV':'"production"',
            global:'window',
            //without global -> browser will not know the variable window
        }
    })
        setCode(result.outputFiles[0].text);
        eval(result.outputFiles[0].text);
 
    }
    return <div>
        <textarea value={input} onChange={e=>setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>

{code}


</pre>
    </div>;

};

ReactDom.render(<App/>,document.querySelector('#root'));