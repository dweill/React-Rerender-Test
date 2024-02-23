import React from 'react';

export default function CounterIncrementer(props) {
  console.log('render: CounterIncrementer');
  return (
    <>
      <div>Count: {props.count}</div>
      <button onClick={props.onClick}>Increment</button>
    </>
  );
}
