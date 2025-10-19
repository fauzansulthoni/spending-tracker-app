import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import store from "./store/store.ts";
import { ThemeContextProvider } from "./theme/ThemeContextProvider.tsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </BrowserRouter>
);
