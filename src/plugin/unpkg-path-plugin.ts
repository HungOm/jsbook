import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
 
const fileCache = localforage.createInstance({
  name:'filecache'
});

// test 
// (async ()=>{
//   await fileCache.setItem('color','red');
//   const color = await fileCache.getItem('color');
//   console.log(color)

// })()
export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if(args.path === 'index.js'){
          return { path: args.path, namespace: 'a' };
        
        }

        if (args.path.includes('./')||args.path.includes('../')){
          return {
            namespace:'a',
            path:new URL(args.path,'https://unpkg.com'+args.resolveDir+'/').href,
          }
        }
        return {
          namespace:'a',
          path:`https://unpkg.com/${args.path}`,
        }
        
        // else if(args.path==='tiny-test-pkg'){
        //   return {
        //     path:'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
        //     namespace:'a',
        //   };
  
        // }
      
       
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
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
    },
  };
};
