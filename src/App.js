import { Route, Routes } from "react-router-dom";
import Landing from "./Website/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
    <Route path="/" element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
