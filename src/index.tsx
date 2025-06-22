import ReactDOM from "react-dom/client";
import App from "./App";
import StateProvider from "./providers/StateProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persister } from "./flux/store";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { MessageProvider } from "utils";
import QueryProvider from "./providers/QueryProvider";

// @ts-ignore
const appRoot = ReactDOM.createRoot(document.getElementById("root"));

appRoot.render(
  <StateProvider>
    <PersistGate persistor={persister}>
      <BrowserRouter>
        <MessageProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </MessageProvider>
      </BrowserRouter>
    </PersistGate>
  </StateProvider>
);
