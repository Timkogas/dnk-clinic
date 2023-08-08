import Start from "./screens/Start/Start";
import { Route, Routes } from 'react-router-dom';
import Test from "./screens/Test/Test";
import Result from "./screens/Result/Result";
import Secret from "./screens/Secret/Secret";
import NavBarLayout from "./components/NavBarLayout/NavBarLayout";
import SignUp from "./screens/SignUp/SignUp";
import Info from "./screens/Info/Info";


function App() {
  return (
    <Routes>

      <Route path='/' element={<Start />} />
      <Route path='/test' element={<Test />} />
      <Route path='/result' element={<Result />} />

      <Route element={<NavBarLayout />}>
        <Route path='/secret' element={<Secret />} />
        <Route path='/doctors' element={<>doctors</>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/info' element={<Info/>} />
      </Route>

    </Routes>
  );
}

export default App;
