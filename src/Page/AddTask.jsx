import { Alert, AlertIcon, Box, Button, Checkbox, FormControl, Heading, Input, Text, Textarea } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useReducer } from "react"
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
const AddTask = () => {
	const [state, dispatch] = useReducer(formReducer, InitialState)
	const [message, setMessage] = useState("")
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios({
			method: "POST",
			baseURL: "http://localhost:8080",
			url: "/todos",
			data: state
		})
		dispatch({ type: "RESET" });
		e.target.reset();
		setMessage(
			<Alert status='success' variant='solid' rounded={'lg'}>
				<AlertIcon />
				Data Submitted Successfully!
			</Alert>
		)

		setTimeout(() => {
			navigate("/")
		}, 1000)
	}


	return (
		<Box maxW={350} m={'auto'} mt={2} borderWidth={2} p={2} textAlign={'center'}>
			<Heading mb={5}>Add New Task</Heading>
			<Box>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<Input mb={3} type='text' placeholder="Task Name" name="title"
							onChange={(e) => dispatch({ type: "TITLE", payload: e.target.value })} />

						<Textarea mb={3} placeholder="Task Descriptions" name="desc"
							onChange={(e) => dispatch({ type: "DESC", payload: e.target.value })} />

						<Input mb={3} type='date' name="due_date"
							onChange={(e) => dispatch({ type: "DUE_DATE", payload: e.target.value })} />

						<Checkbox mb={3} name="status"
							onChange={(e) => dispatch({ type: "STATUS", payload: e.target.value })}>Completed?</Checkbox>

					</FormControl>
					<Button type="submit" width={'100%'} bg={'blue.400'} _hover={'none'}>Submit</Button>
				</form>
			</Box>
			<Link to="/">
				<Button mt={4} mb={5} width={'100%'} bg={'red.200'} _hover={'none'} >Go Back</Button>
			</Link>
			<>{message}</>
		</Box>
	)
}

export default AddTask


