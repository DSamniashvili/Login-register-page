import './App.css';
import Header from "./components/general-components/Header";
import Footer from "./components/general-components/Footer";
import AppContextProvider from './contexts/AppContext';
import Container from "./components/Container";

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <Header/>
                <Container/>
                <Footer/>
            </AppContextProvider>
        </div>
    );
}

export default App;
