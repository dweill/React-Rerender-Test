import { useState } from 'react';
import './App.css';
import CounterIncrementer from './components/CounterIncrementer';
import TextExample from './components/TextExample';
import CounterIncrementerContainer from './containers/CounterIncrementerContainer';

function App() {
  const [count, setCount] = useState(0);
  const rerenderAll = true; // change me to test the effect;

  return (
    <>
      {rerenderAll ? (
        <CounterIncrementer count={count} onClick={() => setCount(count + 1)} />
      ) : (
        <CounterIncrementerContainer />
      )}
      <TextExample />
    </>
  );
}

export default App;
