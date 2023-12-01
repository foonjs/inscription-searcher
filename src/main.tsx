import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./pages/Root.tsx"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Details from "./pages/Details.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/:address",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/details/:address/:id",
		element: <Details />,
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
