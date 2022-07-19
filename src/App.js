
import './App.css';
import Home from './components/Home';
// import CategoryList from './pages/CategoryList';
import { Routes, Route } from "react-router"
// import Product from './pages/Product';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path = "/" element={<CategoryList />}/>
        <Route path = "/:id" element={<Product/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
