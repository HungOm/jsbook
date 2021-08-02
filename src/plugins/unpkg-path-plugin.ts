
import * as esbuild from 'esbuild-wasm';


// test 
// (async ()=>{
//   await fileCache.setItem('color','red');
//   const color = await fileCache.getItem('color');
//   console.log(color)

// })()
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({filter:/^(index\.js$)/},()=>{
        // this one only find index and return so no need to be async 
        return {path:'index.js',namespace:'a'};
      })

      build.onResolve({filter:/^\.+\//},(args:any)=>{
      // this regex will find paths with ./ or ../ 
        return {
          namespace:'a',
          path:new URL(args.path,'https://unpkg.com'+args.resolveDir+'/').href,
        }

      })
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // this one find any file that match the regex do other jobs like parsing url at the asyncronously 
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

    },
  };
};
