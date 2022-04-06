import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './utils/GlobalStore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Acknowledgements from './pages/Acknowledgements';
import PlayerView from './components/PlayerView';

function App() {
    return (
        <div className="App container">
            <Provider store={store}>
                <Router>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path='/temporary_play' element={<PlayerView />} />
                            <Route path='/acknowledgements' element={<Acknowledgements />} />
                        </Routes>
                    </main>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
