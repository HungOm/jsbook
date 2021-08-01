import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name:'filecache'
  });
  
 

export const fetchPlugin = (inputCode: string)=>{
    return {
        name:'fetch-plugin',
        setup(build: esbuild.PluginBuild){
             
      build.onLoad({ filter: /.*/ }, async (args: any) => { 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        } 

        //check to see if we have already fetched this file 
        // and if it is in the cache 
        const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        // if it is , return it immediately 
        if(cacheResult){
          return cacheResult;
        }

        const {data,request} = await axios.get(args.path);
        //store response in cache
        const result:esbuild.OnLoadResult =  {
          loader:'jsx',
          contents:data,
          resolveDir: new URL('./', request.responseURL).pathname
        }

        await fileCache.setItem(args.path,result)
        return result;
      });

        }
    }
}