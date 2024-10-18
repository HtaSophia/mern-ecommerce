import { Toaster } from "react-hot-toast";
import Routes from "./routes";

function App() {
    return (
        <div className="min-h-screen bg-slate-100 overflow-hidden">
            <Routes />
            <Toaster position="bottom-right" />
        </div>
    );
}

export default App;
