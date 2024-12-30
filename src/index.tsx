import ReactDOM from "react-dom/client";
import App from "./App";
import StateProvider from "./providers/StateProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persister } from "./flux/store";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { MessageProvider } from "utils";

// @ts-ignore
const appRoot = ReactDOM.createRoot(document.getElementById("root"));

appRoot.render(
  <StateProvider>
    <PersistGate persistor={persister}>
      <BrowserRouter>
        <MessageProvider>
          <App />
        </MessageProvider>
      </BrowserRouter>
    </PersistGate>
  </StateProvider>
);
