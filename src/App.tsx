// import { routeObjects } from "@/routes/AppRoutes";
import { useRoutes } from "react-router-dom";
import { routeObjects } from "./routes/AppRoutes";


function App() {
  function RouterOutlet() {
    const routing = useRoutes(routeObjects);

    return routing;
  }

  return (

    <RouterOutlet />

  )
}

export default App
