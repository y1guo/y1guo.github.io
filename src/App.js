import "./app.css";
import Footer from "./footer";
import Navbar from "./navbar";

function App() {
    return (
        <div className="app">
            <Navbar />
            <canvas id="canvas" />
            <Footer />
        </div>
    );
}

export default App;
