import { Route, Routes } from "react-router-dom"
import Home from "../Page/Home"
import AddTask from "../Page/AddTask"

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/create" element={<AddTask />} />
		</Routes>
	)
}

export default AllRoutes