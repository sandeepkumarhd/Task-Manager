import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./app/stote";

export const TASKS_STORAGE_KEY = "app_task";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
