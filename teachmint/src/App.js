import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersonCard } from "./components/PersonCard/PersonCard";
import { PostCard } from "./components/PostCard/PostCard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonCard />}></Route>
          <Route path="/user/:id" element={<PostCard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
