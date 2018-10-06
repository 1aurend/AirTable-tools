import React from 'react';
import ReactDOM from 'react-dom';
import './css/skeleton.css';
import registerServiceWorker from './registerServiceWorker';
import RecordList from './components/record-list';

const App = ({title}) => {
  return (
    <div className="container">
      <h2>
        {title}
      </h2>
      <RecordList />
    </div>
  )
}


ReactDOM.render(<App title={"Katie's AirTable Wizard"} />, document.getElementById('root'));
registerServiceWorker();
