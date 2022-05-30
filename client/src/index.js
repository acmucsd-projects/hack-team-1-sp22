import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// pages
import CreateRoom from "./Pages/CreateRoom/CreateRoom";
import JoinRoom from "./Pages/JoinRoom/JoinRoom";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CreateRoom/>} />
      <Route path="/" element={<JoinRoom/>} />
    </Routes>
  </BrowserRouter>
);