import React, { useState } from 'react';
import CounterIncrementer from '../components/CounterIncrementer';

export default function CounterIncrementerContainer() {
  const [count, setCount] = useState(0);
  return (
    <CounterIncrementer count={count} onClick={() => setCount(count + 1)} />
  );
}
