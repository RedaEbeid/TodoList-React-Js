import './App.css' // Css Files
import TodoList from './Components/TodoList'; // TodoList Component
import { createTheme, ThemeProvider} from "@mui/material/styles";
import { ToastProvider } from "./Context/ToastContext"; // ToastContext
import TodosContextProvider from "./Context/TodosContext.js"; // TodosContextProvider

const theme = createTheme({
  typography: {  fontFamily: ["Alex"]  },
  palette: {  primary: {main: "#ba000d"}  }
});

function App () {
  
  return (
    <ThemeProvider theme={theme}>

      <TodosContextProvider>

        <ToastProvider>
          <div className="App">
              <TodoList />
          </div>
        </ToastProvider>

      </TodosContextProvider>

    </ThemeProvider>
  );
}
export default App;