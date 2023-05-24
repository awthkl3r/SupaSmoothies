import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navigation from "./components/Navigation"


// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
