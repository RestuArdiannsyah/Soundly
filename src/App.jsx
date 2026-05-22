import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Send from "./pages/Send";
import Browse from "./pages/Browse";
import History from "./pages/History";
import Messages from "./pages/Messages";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />, 
    },
    {
      path: "/send",
      element: <Send />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/browse",
      element: <Browse />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/history",
      element: <History />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/history",
      element: <History />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/messages/:id",
      element: <Messages />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={myRouter} />;
}

export default App;