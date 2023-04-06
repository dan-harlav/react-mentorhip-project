import './App.css';
import Products from './components/Products';

  const App = () => {

    return (
        <div className="app">
            <h1 className="app-title">My First React App</h1>
            <Products/>
        </div>
    );
  }

  export default App;