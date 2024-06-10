import FormContainer from "./Components/Form/Form";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Payment from "./Components/Payment/Payment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormContainer />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
