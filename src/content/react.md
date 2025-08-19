# React Cheatsheet

## Components

```jsx
// Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow Function Component
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

// Component with destructuring
const Welcome = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
    </div>
  );
};

// Component with default props
const Welcome = ({ name = "Guest", age = 18 }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
    </div>
  );
};
```

## JSX

```jsx
// Basic JSX
const element = <h1>Hello, World!</h1>;

// JSX with expressions
const name = "John";
const element = <h1>Hello, {name}!</h1>;

// JSX with attributes
const element = <img src="image.jpg" alt="Description" />;

// JSX with children
const element = (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// Conditional rendering
const isLoggedIn = true;
const element = (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in</h1>}
  </div>
);

// List rendering
const items = ["Apple", "Banana", "Orange"];
const list = (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
```

## Hooks

### useState

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

// Multiple state variables
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

### useEffect

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // Run on every render
  useEffect(() => {
    console.log('Component rendered');
  });
  
  // Run only on mount
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  // Run when userId changes
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Cleanup function
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (!user) return <div>Loading...</div>;
  
  return <div>{user.name}</div>;
}
```

### useContext

```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={theme}
    >
      Current theme: {theme}
    </button>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### useRef

```jsx
import { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}

// useRef for previous value
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}
```

### useReducer

```jsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
  );
}
```

## Event Handling

```jsx
function Button() {
  const handleClick = (event) => {
    console.log('Button clicked!', event);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted!');
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Event handlers with parameters
function ItemList({ items }) {
  const handleItemClick = (itemId) => {
    console.log('Item clicked:', itemId);
  };
  
  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          onClick={() => handleItemClick(item.id)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

## Props

```jsx
// Passing props
function App() {
  return <Welcome name="John" age={25} />;
}

// Receiving and using props
function Welcome(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>You are {props.age} years old</p>
    </div>
  );
}

// Destructuring props
function Welcome({ name, age, children }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
      {children}
    </div>
  );
}

// Props validation with PropTypes
import PropTypes from 'prop-types';

Welcome.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  children: PropTypes.node
};

Welcome.defaultProps = {
  age: 18
};
```

## State Management

```jsx
// Local state
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// Lifting state up
function Parent() {
  const [sharedState, setSharedState] = useState('');
  
  return (
    <div>
      <ChildA value={sharedState} />
      <ChildB onUpdate={setSharedState} />
    </div>
  );
}
```

## Lifecycle Methods (Class Components)

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

## Best Practices

```jsx
// Use functional components with hooks
function GoodComponent() {
  const [state, setState] = useState(initialState);
  return <div>Content</div>;
}

// Avoid class components (legacy)
class BadComponent extends React.Component {
  // Don't use this pattern
}

// Use proper key props for lists
function GoodList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Avoid using index as key
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li> // Bad!
      ))}
    </ul>
  );
}

// Use callback refs for cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);

// Avoid inline functions in render
function GoodComponent() {
  const handleClick = useCallback(() => {
    // Handle click
  }, []);
  
  return <button onClick={handleClick}>Click</button>;
}
```
