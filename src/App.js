import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Header from "./components/Header.js";
import { AuthProvider } from './components/AuthContext';
import Footer from './components/Footer';


function App() {
  return (
    <>
    <AuthProvider>
        <Router basename={process.env.PUBLIC_URL}>
            <div>
                <div>
                    <Header />
                </div>
                <Footer />
            </div>
        </Router>
    </AuthProvider>
    </>
  );
}

export default App;
