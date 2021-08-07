import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output);
        }, 700);
        return () => {
            // clear the timer every time useEffect will be invoke to avoid execution on every input after 1 0r any defined sec 
            clearTimeout(timer);
        }
    }, [input])
    return (
        <Resizable direction="vertical">
            <div style={{ height: '100%', display: "flex", flexDirection: 'row' }}>
                {/* for vertical resize control, add another resizable  */}
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue="const a = 1;"
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                {/* <pre>{code}</pre> */}
                <Preview code={code} />
            </div>
        </Resizable>
    );
};
export default CodeCell;