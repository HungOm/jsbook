import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';


const TextEditor: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        // if click element in side editor - should not revert back to review mode but only if click outside of editor it should rever back to review mode 

        // it use react's react to use dom across different state 
        const listener = (event: MouseEvent) => {
            if (ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)) {
                return;

            }
            setEditing(false);
        }
        document.addEventListener('click', listener, { capture: true })
        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }
    }, [])

    if (editing) {
        return (
            <div ref={ref}>
                <MDEditor />
            </div>
        );

    }
    return (
        <div onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={"# Header"} />
        </div>
    );


};

export default TextEditor;