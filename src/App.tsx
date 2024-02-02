import './App.css';
import BoardDisplay from './components/BoardDisplay';
import ModalController from './components/ModalController';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <BoardDisplay />
            <ModalController />
        </div>
    );
}

export default App;
