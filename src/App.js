import './App.css';
import { useState } from 'react';

const Child = ({text}) => {
  return <div>
    {text}
  </div>
}

function App() {
  const [childText1, setChildText1] = useState("childText-1");
  const childText = "child";

  const generateRandomText = () => (Math.random() + 1).toString(36).substring(7);

  const handleTextChange = () => {
    const newText = generateRandomText();
    setChildText1(newText);
  }

  return (
    <div className="App">
      <div className="App-header">
        <Child text={childText} />
        <Child text={childText1} />
        <button onClick={handleTextChange}>
          Change Text
        </button>
      </div>
    </div>
  );
}

export default App;
