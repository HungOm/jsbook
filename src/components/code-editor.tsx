import './code-editor.css';
import './syntax.css';
import {useRef} from 'react';
import MonacoEditor,{EditorDidMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';


interface CodeEditorProps{
    initialValue:string;
    onChange(value:string):void;
}
const CodeEditor:React.FC<CodeEditorProps> = ({onChange,initialValue}) =>{
    const editorRef =useRef<any>();

    const onEditorDidMount:EditorDidMount = (getValue,MonacoEditor)=>{
        editorRef.current = MonacoEditor;
        
        // console.log(getValue())
        MonacoEditor.onDidChangeModelContent(()=>{
            // console.log(getValue());
            onChange(getValue());

        });

        MonacoEditor.getModel()?.updateOptions({tabSize:2})
        const highlighter = new Highlighter(
            // this line will ignore typecheck on the line that follows 
            //@ts-ignore
            window.monaco, //accessing monaco object
            codeShift,
            MonacoEditor

        );
        highlighter.highLightOnDidChangeModelContent(
            // empty fuction to stop console.log() mess 

            ()=>{},
            ()=>{},
            undefined,
            ()=>{}
        );
    }
    const onFormatClick=()=>{
    //get current value from editor
    const unformated = editorRef.current.getModel().getValue();

    //format that value 
    const formated = prettier.format(unformated,{
        parser:'babel',
        plugins:[parser],
        useTabs:false,
        semi:true,
        singleQuote:true
    }).replace(/\n$/,'');
    // replace the extra new line added by prettier 

    //set the formatted value back in the editor

    editorRef.current.setValue(formated);
}
    return( 
    <div className="editor-wrapper">
        <button 
        className="button button-format is-primary is-small" 
        onClick={onFormatClick}>
            Format
            </button>

    <MonacoEditor
    editorDidMount={onEditorDidMount}
    value={initialValue}
    theme="dark" 
    language="javascript" 
    height="100%" 
    options={{
        wordWrap:'on',
        minimap:{enabled:false},
        showUnused:false,
        folding:false,
        lineNumbersMinChars:3,
        fontSize:16,
        scrollBeyondLastLine:false,
        automaticLayout:true
    }}/>

    </div>)
};

export default CodeEditor;