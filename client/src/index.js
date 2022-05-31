import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Provider} from 'react-redux';
import Store from './Redux/Store';

// pages
import CreateRoom from "./Pages/CreateRoom/CreateRoom";
import JoinRoom from "./Pages/JoinRoom/JoinRoom";
import QuestionQueue from "./Pages/QuestionQueue/QuestionQueue";


const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Routes>
        <Route path="/create-room" element={<CreateRoom/>} />

        <Route path="/" element={<JoinRoom/>} />

        <Route path="/room" element={<QuestionQueue/>} />

      </Routes>
    </BrowserRouter>
  </Provider>
);