import './App.css';
import Header from './components/header/Header';
import AddItems from './components/addItems/AddItems';
import Save from './components/save/Save';
import Lists from './components/lists/Lists';
import React, { useState } from 'react'
import { getLSList } from './utils/utils';

function App() {

  const [list, setList] = useState(getLSList || []);

  return (
    <div className="App">
      <div className='addSection flexCenter'>
        <Header list={list} />
        <AddItems list={list} setList={setList} />
        <Save list={list} />
      </div>
      <div>
        <Lists list={list} setList={setList} />
      </div>
    </div>
  );
}

export default App;
