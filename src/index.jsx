import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import reportWebVitals from "./reportWebVitals";
import Mensajes from "./lang/es-ES.json";
import { IntlProvider } from "react-intl";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale="es" messages={Mensajes}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
