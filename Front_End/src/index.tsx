import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './components/React-Alert-Template/index'
import "./index.css";
import App from "./App";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '100px',
  containerStyle: {
    zIndex: 100
  },
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
  </AlertProvider>,
  document.getElementById("root")
);
