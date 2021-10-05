import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import {Cell} from '../state'
import {useActions} from '../hooks/use-actions';

interface CodeCellProps{
    cell:Cell;

}
const CodeCell:React.FC<CodeCellProps> = ({cell}) => {
    // const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [err,setErr] = useState('');
    const {updateCell} = useActions();
    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.err)
        }, 700);
        return () => {
            // clear the timer every time useEffect will be invoke to avoid execution on every input after 1 0r any defined sec 
            clearTimeout(timer);
        }
    }, [cell.content])
    return (
        <Resizable direction="vertical">
            <div style={{ height: 'calc(100% - 15px)', display: "flex", flexDirection: 'row' }}>
                {/* for vertical resize control, add another resizable  */}
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) =>updateCell(cell.id,value)}
                    />
                </Resizable>
                {/* <pre>{code}</pre> */}
                <Preview code={code} err={err} />
            </div>
        </Resizable>
    );
};
export default CodeCell;