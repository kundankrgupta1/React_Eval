import { Route, Routes } from "react-router-dom"
import Home from "../Page/Home"
import AddTask from "../Page/AddTask"
import Edit from "../Page/Edit"
import SingleTask from "../Page/SingleTask"

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/create" element={<AddTask />} />
			<Route path="/edit/:id" element={<Edit />} />
			<Route path="/task/:id" element={<SingleTask />} />
		</Routes>
	)
}

export default AllRoutes
