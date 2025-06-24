import './App.css';
import { IntlProvider } from 'react-intl';
import detectLanguage from './localizacion/detectarlenguaje';
import Inicio from './pages/inicio';
import RobotList from './pages/robotlist';
import { Route, Routes } from 'react-router-dom';


function App() {
    const { locale, messages } = detectLanguage();

    return (
        <IntlProvider locale={locale} messages={messages}>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/Adopta" element={<RobotList/>}   />
            </Routes>
        </IntlProvider>
    );
}

export default App;