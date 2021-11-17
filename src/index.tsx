import { render } from "solid-js/web"
import { Router, useRoutes, RouteDefinition } from "solid-app-router"
import { lazy } from "solid-js"
import generatedRoutes from "virtual:generated-pages"
import App from "./App"
import "./index.css"

const lazyRoutes: RouteDefinition[] = generatedRoutes.map((route) => {
  return {...route, component: lazy(route.component)}
})
const Routes = useRoutes(lazyRoutes)

render(
  () => (
    <Router>
      <App Routes={Routes} />
    </Router>
  ),
  document.getElementById('root')
)