import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Menu from "./common/infra/menu/Menu";
import Result from "./detection/result/Result";
import About from "./about/About";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Menu/>
            <Routes>
                <Route path="/" element={<Result/>}/>
                <Route path="/result" element={<Result/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
