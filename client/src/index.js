import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// pages
import CreateRoom from "./Pages/CreateRoom/CreateRoom";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CreateRoom/>} />
    </Routes>
  </BrowserRouter>
);