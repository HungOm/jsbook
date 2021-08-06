import './resizeable.css';
import { useEffect,useState } from 'react';
import { ResizableBox,ResizableBoxProps } from "react-resizable";

interface ResizableProps{
    direction:'horizontal'|'vertical';
}
const Resizable:React.FC<ResizableProps> = ({direction,children}) =>{
    let ResizableProps:ResizableBoxProps;
    const [innerHeight,setInnerHeight] = useState(window.innerHeight);
    const [innerWidth,setInnerWidth] = useState(window.innerWidth);
    useEffect(()=>{
        let timer:any;
        const listener = ()=>{
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(()=>{
            // console.log(window.innerWidth,window.innerHeight)
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth)

            },100)

        };
        window.addEventListener('resize',listener)

        return ()=>{window.removeEventListener('resize',listener);}
    
    },[])

    if (direction==="horizontal"){
        ResizableProps={
            className:'resize-horizontal',
            minConstraints:[innerWidth*0.2,Infinity],
            maxConstraints:[innerWidth * 0.75,Infinity], 
            height:Infinity, 
            width:window.innerWidth*0.75, 
            resizeHandles:['e']

        }
    }else{
        ResizableProps={
            minConstraints:[Infinity,24],
            maxConstraints:[Infinity,innerHeight*0.9], 
            height:300, 
            width:Infinity, 
            resizeHandles:['s']

        }
    }
    return (
        <ResizableBox {...ResizableProps}>

        {children}
    </ResizableBox>


    ) 
}
export default Resizable;