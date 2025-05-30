import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home.jsx';
import LoginForm from './pages/LoginForm.jsx';
import SignupForm from './pages/SignupForm.jsx';
import ToiletDetail from './pages/ToiletDetail.jsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/toilet/1" element={<ToiletDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
