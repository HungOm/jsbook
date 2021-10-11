import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/useTypeSelector'
// import { debug } from 'console';
import './code-cell.css';
interface CodeCellProps {
    cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    // const [input, setInput] = useState('');
    // const [code, setCode] = useState('');
    // const [err,setErr] = useState('');
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cell.content)
            return;
        }
        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content)
        }, 700);
        return () => {
            // clear the timer every time useEffect will be invoke to avoid execution on every input after 1 0r any defined sec 
            clearTimeout(timer);
        }
        //eslint-disable-nextline  react-hooks/exhaustive-deps
    }, [cell.content, cell.id, createBundle])
    return (
        <Resizable direction="vertical">
            <div style={{ height: 'calc(100% - 15px)', display: "flex", flexDirection: 'row' }}>
                {/* for vertical resize control, add another resizable  */}
                <Resizable direction="horizontal">
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <div className="progress-wrapper">
                    {
                        !bundle || bundle.loading
                            ? (
                                <div className="progress-cover">
                                    <progress className="progress is-small is-primary" max="100">
                                        loading...
                                    </progress>
                                </div>
                            ) : (
                                <Preview code={bundle.code} err={bundle.err} />
                            )
                    }
                </div>
            </div>
        </Resizable>
    );
};
export default CodeCell;