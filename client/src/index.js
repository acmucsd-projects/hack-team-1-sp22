import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// pages
import CreateRoom from "./Pages/CreateRoom/CreateRoom";
import JoinRoom from "./Pages/JoinRoom/JoinRoom";
import QuestionQueue from "./Pages/QuestionQueue/QuestionQueue";


const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/create-room" element={<CreateRoom/>} />

      <Route path="/" element={<JoinRoom/>} />

      <Route path="/room" element={<QuestionQueue/>} />

    </Routes>
  </BrowserRouter>
);