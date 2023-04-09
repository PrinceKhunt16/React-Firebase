import './App.css';
import Auth from './components/Auth';
import CRUD from './components/CRUD';
import Storage from './components/Storage';

function App() {
  return (
    <div className="app">
      <Auth />
      <CRUD />
      <Storage />
    </div>
  );
}

export default App;