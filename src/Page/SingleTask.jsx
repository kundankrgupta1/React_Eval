import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const SingleTask = () => {

	const [data, setData] = useState({})
	const { id } = useParams()


	const fetchData = async () => {
		try {
			const res = await axios.get(`http://localhost:8080/todos/${id}`)
			setData(res.data)
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchData();
	}, [])

	const { title, desc, due_date, status } = data

	return (
		<Card maxW='md' m={'auto'} p={5}>
			<CardBody>
				<Stack mt='6' spacing='3'>
					<Heading size='md'>{title}</Heading>
					<Text>
						{desc}
					</Text>
					<Text color='blue.600' fontSize='2xl'>
						{due_date}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<ButtonGroup>
					<Button
						bg={status ? "green.200" : "red.200"} _hover={'none'}
					// onClick={() => handleToggle(id, status)}
					>{status ? "Completed" : "Pending"}</Button>

					<Button bg={'blue.400'} _hover={'none'}
					// onClick={() => setLocalStorage(id, title, desc, due_date, status)}
					>Edit</Button>

					<Button bg={'red.400'} _hover={'none'}
					// onClick={() => handleDelete(id)}
					>Delete</Button>
					<Link to="/">
						<Button bg={'red.200'} _hover={'none'} >Go Back</Button>
					</Link>
				</ButtonGroup>
			</CardFooter>
		</Card>
	)
}

export default SingleTask