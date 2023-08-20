
import { useEffect } from 'react';
import './App.css';
import Form from './components/form';
import PreLoader from './animations/preLoader'
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
      alert("Right Click Deactivated Due to Copyright Issues.")
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    document.title = "Taskly"
    console.warn(`You sneaky developer \n  what are you doing here?`)
  })


  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<PreLoader />}></Route>
        </Routes>
        <Routes>
          <Route path='home' element={<Form />}></Route>
        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;
