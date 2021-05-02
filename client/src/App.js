import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Projects from "./components/projects/Projects";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ProjectState from "./context/projects/projectState";
import TaskState from "./context/tasks/taskState";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/auth/authState";
import authToken from "./config/authToken";

//check if token
const token = localStorage.getItem("token");
if (token) {
  authToken(token);
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#F21B3F", //Red Munsell
            light: "#CC2936", //Madder Lake
          },
          secondary: {
            main: "#70cfff", //Light Sky Blue
            light: "#008DD5", //Green Blue Crayola
          },
          delete: {
            main: "#EF4050", //Red Salsa
            light: "#D01121", //Lava
          },
          text: {
            main: "#000000", //Black
            light: "#FFFFFF", //White
          },
          complete: {
            main: "#21A179", //Green Munsell
            light: "#1A936F", //Illuminating Emerald
          },
          incomplete: {
            main: "#DB324D", //Amaranth
            light: "#A62639", //Crimsom UA
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProjectState>
        <TaskState>
          <AlertState>
            <AuthState>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/projects" component={Projects} />
                </Switch>
              </BrowserRouter>
            </AuthState>
          </AlertState>
        </TaskState>
      </ProjectState>
    </ThemeProvider>
  );
}

export default App;
