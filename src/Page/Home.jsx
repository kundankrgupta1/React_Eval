import { Box, Button, Flex, Heading, Input, Spacer, Text } from "@chakra-ui/react"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import TaskCard from "../Components/TaskCard"
const Home = () => {
	const [data, setData] = useState([])
	const [search, setSearch] = useState("")

	const fetchData = async () => {
		try {
			const res = await axios.get(`http://localhost:8080/todos?q=${search}`)
			setData(res.data)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const delay = setTimeout(() => {
			fetchData();
		}, 1000)
		return () => clearInterval(delay)
	}, [search])

	const handleToggle = (id, status) => {
		axios({
			method: "PATCH",
			baseURL: "http://localhost:8080",
			url: `/todos/${id}`,
			data: {
				status: !status
			}
		}).then(() => fetchData())
	}
	const handleDelete = (id) => {
		axios({
			method: "DELETE",
			baseURL: "http://localhost:8080",
			url: `/todos/${id}`,
		}).then(() => fetchData())
	}

	return (
		<Box m={5}>
			<Flex>
				<Link to="/">
					<Heading>Task</Heading>
				</Link>
				<Spacer />
				<Input type="text" maxW={350} placeholder="Search task..." onChange={(e) => setSearch(e.target.value)} />
				<Spacer />
				<Link to="/create">
					<Button>Add New Task</Button>
				</Link>
			</Flex>
			<Box display={'flex'} flexWrap={'wrap'} gap={2} mt={5}>
				{data.length === 0 ? <Text w={'100%'} textAlign={'center'}>Not Completed/Pending Task</Text> :
					<>
						{
							data.map((e, ind) => <TaskCard key={ind} {...e} handleToggle={handleToggle} handleDelete={handleDelete} />)
						}
					</>
				}
			</Box>
		</Box>
	)
}

export default Home