import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
// import CodeCell from './components/code-cell';
import { Provider } from 'react-redux';
import { store } from './state'
// import TextEditor from './components/text-editor';
import CellList from './components/cell-list'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList/>
      </div>


    </Provider>

  );
};
ReactDOM.render(<App />, document.querySelector('#root'));
