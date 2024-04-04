import { Alert, AlertIcon, Box, Button, Checkbox, FormControl, Heading, Input, Textarea } from "@chakra-ui/react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useReducer, useEffect } from "react"
import axios from "axios"

const InitialState = {
	title: "",
	desc: "",
	due_date: "",
	status: false
}

const formReducer = (state, action) => {
	switch (action.type) {
		case "TITLE":
			return { ...state, title: action.payload }
		case "DESC":
			return { ...state, desc: action.payload }
		case "DUE_DATE":
			return { ...state, due_date: action.payload }
		case "STATUS":
			return { ...state, status: action.payload }
		case "RESET":
			return InitialState
		default: {
			throw new Error("Invalid Action Type")
		}
	}
}
const Edit = () => {
	const [state, dispatch] = useReducer(formReducer, InitialState)
	const [message, setMessage] = useState("")
	const navigate = useNavigate();
	const { id } = useParams();

	const handleUpdate = (e) => {
		e.preventDefault();
		axios({
			method: "PUT",
			baseURL: "http://localhost:8080",
			url: `/todos${id}`,
			data: state
		})
		dispatch({ type: "RESET" });
		e.target.reset();
		setMessage(
			<Alert status='success' variant='solid' rounded={'lg'}>
				<AlertIcon />
				Data Updated Successfully!
			</Alert>
		)

		setTimeout(() => {
			navigate("/")
		}, 1000)
	}

	useEffect(() => {

	}, [])

	return (
		<Box maxW={350} m={'auto'} mt={2} borderWidth={2} p={2} textAlign={'center'} rounded={'lg'}>
			<Heading mb={5}>Edit Existing Task</Heading>
			<Box>
				<form onSubmit={handleUpdate}>
					<FormControl>
						<Input mb={3} type='text' placeholder="Task Name" name="title" value={localStorage.getItem("title")}
							onChange={(e) => dispatch({ type: "TITLE", payload: e.target.value })} />

						<Textarea mb={3} placeholder="Task Descriptions" name="desc" value={localStorage.getItem("desc")}
							onChange={(e) => dispatch({ type: "DESC", payload: e.target.value })} />

						<Input mb={3} type='date' name="due_date" value={localStorage.getItem("due_date")}
							onChange={(e) => dispatch({ type: "DUE_DATE", payload: e.target.value })} />

						<Checkbox mb={3} name="status" value={localStorage.getItem("status")}
							onChange={(e) => dispatch({ type: "STATUS", payload: e.target.value })}>Completed?</Checkbox>

					</FormControl>
					<Button type="submit" width={'100%'} bg={'blue.400'} _hover={'none'}>Update</Button>
				</form>
			</Box>
			<Link to="/">
				<Button mt={4} mb={5} width={'100%'} bg={'red.200'} _hover={'none'} >Go Back</Button>
			</Link>
			<>{message}</>
		</Box>
	)
}

export default Edit


