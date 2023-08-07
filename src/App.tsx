import Start from "./screens/Start/Start";
import { Route, Routes } from 'react-router-dom';
import Test from "./screens/Test/Test";
import Result from "./screens/Result/Result";
import Secret from "./screens/Secret/Secret";


function App() {
  return (
    <Routes>

        <Route path='/' element={<Start />} />
        <Route path='/test' element={<Test />} />
        <Route path='/result' element={<Result />} />

        <Route path='/secret' element={<Secret />} />

    </Routes>
  );
}

export default App;
