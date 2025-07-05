import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import RoutesComponent from "./routes";
import StoreProvider from "./providers/StoreProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <StoreProvider>
              <Toaster />
              <RoutesComponent />
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
