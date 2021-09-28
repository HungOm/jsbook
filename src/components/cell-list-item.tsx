import {Cell} from '../state';
import CodeCell from '../components/code-cell';
import TextEditor from '../components/text-editor';

interface CellListItemProps{
    cell:Cell
}
const CellListItem: React.FC<CellListItemProps> = ({cell})=>{
    let child:JSX.Element;
    if(cell.type==='code'){
        child = <CodeCell/>
    }else{
        child = <TextEditor/>
    }
    return <div>{child}</div>

};

export default CellListItem;