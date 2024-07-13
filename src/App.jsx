import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home';
import RegisterForm from '../src/components/RegisterForm';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import Task from './components/Task';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/task/:id" element={<Task/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}


export default App
