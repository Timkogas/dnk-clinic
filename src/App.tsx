import Start from "./screens/Start/Start";
import { Route, Routes } from 'react-router-dom';
import Test from "./screens/Test/Test";
import Result from "./screens/Result/Result";


function App() {
  return (
    <Routes>

        <Route path='/' element={<Start />} />
        <Route path='/test' element={<Test />} />
        <Route path='/result' element={<Result />} />

    </Routes>
  );
}

export default App;
