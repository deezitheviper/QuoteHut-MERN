import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./pages/Home.js";
import QuoteDetail from "./pages/QuoteDetail";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CreateQuote from "./pages/createQuote";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/create",
        element: <CreateQuote/>
      },
      {
        path:"/profile/:id",
        element: <Profile/>
      },
      {
        path:"/search",
        element: <Search/>
      },
      
      {
        path:"/categories/:id",
        element: <Feed/>
      },
      {
        path:"/Quote/:id",
        element: <QuoteDetail/>
      }
    ]},  {
      path:"/Login",
      element: <Login/>
    }
]) 

function App() {
  return (
   <RouterProvider router={router} />
  );
}

export default App;
