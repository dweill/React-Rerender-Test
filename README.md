This project was generated using Vite!

# TLDR; All encapsulated components will rerender on any change of state or props

## To run this program

- node v18.6.0 (test other version at your discretion)

1.  clone this repo and cd into it
2.  npm install
3.  npm run dev

to test the different rerender behaviors open your console in the browser and change the value of `rerenderAll` in `App.jsx`. No other code changes should be required.

## Purpose

The Purpose of this repo is to demonstrate the behavior of react components within an encapsulating container when state is changed.

## Background

I asked a question about component design patterns at a local meet up and there was some confusion about what rerenders when state or props update.

```jsx
export default function CounterIncrementer(props) {
  return (
    <>
      <div>Count: {props.count}</div>
      <button onClick={props.onClick}>Increment</button>
    </>
  );
}
```

The above snippet is a view only component that take in two props, a counter variable for display, and an onClick handler for behavior. The view is completely decoupled from any logic. One could infer, what the onClick method will do (increment the count), but the actual click logic is not present.

For our purposes we want to render the CounterIncrementer component above with our TextExample component (below).

```jsx
export default function TextExample() {
  return (
    <div>
      Hast du etwas Zeit für mich? Dann singe ich ein Lied für dich Von 99
      Luftballons Auf ihrem Weg zum Horizont Denkst du vielleicht grad an mich?
      Dann singe ich ein Lied für dich Von 99 Luftballons Und, dass sowas von
      sowas kommt
    </div>
  );
}
```

Our Result should look like this
![Button Counter and 99 Luftballons lyrics](src/assets/figure-1.png 'figure 1')

It would be totally reasonable to encapsulate these components together like below and move on

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CounterIncrementer count={count} onClick={() => setCount(count + 1)} />
      <TextExample />
    </>
  );
}

export default App;
```

## The problem

The above code will rerender bother the CounterIncrementer and the TextExample component on every time the counter incrementer is clicked. The reason is because we have our state update logic in the App component, which render the CounterIncrementer and TextExample, and any state or prop change fully rerenders the component, even if the subcomponents do not rely on state, or props.

## Potential Solution

The way I would suggest one fix this issue of unnecesary rerender (our TextExample component never changes), is to move our count state into a container that wraps only the CounterIncrementer component.

```jsx
export default function CounterIncrementerContainer() {
  const [count, setCount] = useState(0);
  return (
    <CounterIncrementer count={count} onClick={() => setCount(count + 1)} />
  );
}
```

In the above we have a CounterIncrementerContinaer component that has encapsulated the count logic previously found in our App component. This component can be combined in a parent container (App Component) and voila! Identical behavior but without unnecessary rerenders!

```jsx
function App() {
  return (
    <>
      <CounterIncrementerContainer />
      <TextExample />
    </>
  );
}

export default App;
```

## Other potential solutions

A developer could reasonably combine the CounterIncrementerContainer and the CounterIncrementer component into 1 component, but the trade off is that the business logic (incrementing a counter on click) and the view logic (displaying the value of a counter) are tightly coupled, and this makes it more difficult to reuse.

It's possible that a solution involving Context Provider or a state management library like Redux or Mobx could remove the need for a component container, but I did not investigate that as part of this test.
