import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./HomePage/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Following from "./following/Following.jsx";
import Profile from "./profile/Profile.jsx";
import Search from "./search/Search.jsx";
import Settings from "./settings/Settings.jsx";
import Create from "./create/Create.jsx";
import CreateNew from "./create/CreateNew.jsx";
import Play from "./play/Play.jsx";
import Alone from "./play/Alone.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/search/:topic" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create" element={<Create />} />
          <Route path="/createNew" element={<CreateNew />} />
          <Route path="/editQuiz" element={<CreateNew type={true} />} />
          <Route path="/play/:id" element={<Play />} />
          <Route path="/playQuiz/:id" element={<Alone />} />
          <Route
            path="/playQuiz/friends/:partyId"
            element={<Alone multi={true} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
