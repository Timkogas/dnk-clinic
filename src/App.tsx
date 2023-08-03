import Start from "./screens/Start/Start";
import { Route, Routes } from 'react-router-dom';
import Test from "./screens/Test/Test";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/test' element={<Test/>}/>
    </Routes>
  );
}

export default App;
