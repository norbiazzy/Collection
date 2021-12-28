import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Registration from "./Sing/Registration";
import Login from "./Sing/Login";
import Main from "./Main/Main";


function App() {
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        {/*<Route path='/messages' element={<DialogsContainer/>}/>*/}
        <Route path={'*'} element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;
