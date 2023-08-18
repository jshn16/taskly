
import { useEffect } from 'react';
import './App.css';
import Form from './components/form';



function App() {

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => { 
    document.title="Taskly"
    console.warn(`You sneaky developer \n  what are you doing here?`)
  }) 


  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
