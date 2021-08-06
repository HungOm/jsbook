import './resizeable.css';
import { ResizableBox,ResizableBoxProps } from "react-resizable";
interface ResizableProps{
    direction:'horizontal'|'vertical';
}
const Resizable:React.FC<ResizableProps> = ({direction,children}) =>{
    let ResizableProps:ResizableBoxProps;

    if (direction==="horizontal"){
        ResizableProps={
            className:'resize-horizontal',
            minConstraints:[window.innerWidth*0.2,Infinity],
            maxConstraints:[window.innerWidth * 0.75,Infinity], 
            height:Infinity, 
            width:window.innerWidth*0.75, 
            resizeHandles:['e']

        }
    }else{
        ResizableProps={
            minConstraints:[Infinity,24],
            maxConstraints:[Infinity,window.innerHeight*0.9], 
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