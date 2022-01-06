import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Main from "./Main/Main";
import {Provider} from "react-redux";
import RegistrationContainer from "./Sing/RegistrationContainer";
import {store} from "./redux/redux-store";
import LoginContainer from "./Sing/LoginContainer";


function App() {
    return (
        <div className='wrapper'>
            <Provider store={store}>
                <Routes>
                    <Route path='/registration' element={<RegistrationContainer/>}/>
                    <Route path='/login' element={<LoginContainer/>}/>
                    {/*<Route path='/messages' element={<DialogsContainer/>}/>*/}
                    <Route path={'*'} element={<Main/>}/>
                </Routes>
            </Provider>
        </div>
    );
}

export default App;
