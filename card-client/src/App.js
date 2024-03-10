import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Cards from "./cards/components/Cards";
import CardPage from "./cards/pages/CardPage";
import Layout from "./layout/Layout";
import AboutPage from "./pages/AboutPage";
import Router from "./routes/Router";
import FatherComponent from "./sandbox/propTypes/FatherComponent";
import Counter from "./sandbox/stateHook/Counter";
import MyDetails from "./sandbox/stateHook/MyDetails";
import Todo from "./sandbox/stateHook/Todo";
import ThemeProvider from "./providers/ThemeProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import UserProvider from "./users/providers/UserProvider";
import {SearchbarProvider} from "./providers/SearchbarContext";
import { LikeProvider } from "./providers/LikeContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <SearchbarProvider>
          <LikeProvider>
            <SnackbarProvider>
              <ThemeProvider>
                <UserProvider>
                  <Layout>
                    <Router />
                  </Layout>
                </UserProvider>
              </ThemeProvider>
            </SnackbarProvider>
          </LikeProvider>
        </SearchbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
