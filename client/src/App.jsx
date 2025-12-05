import { useEffect, useState } from "react"
import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import Pagination from "./components/Pagination.jsx"
import Search from "./components/Search.jsx"
import UserList from "./components/UserList.jsx"
import CreateUserModal from "./components/CreateUserModal.jsx"

function App() {
	const [users, setUsers] = useState([]);
	const [showCreateUser, setShowCreateUser] = useState(false);


	useEffect(() => {
		fetch('http://localhost:3030/jsonstore/users')
			.then(response => response.json())
			.then(result => {
				setUsers(Object.values(result))
			})
			.catch((err) => alert(err.message));
	}, []);


	const addUserClickHandler = () => {
		setShowCreateUser(true);
	};

	const closeUserModalHandler = () => {
		setShowCreateUser(false);
	};

	const addUserSubmitHandler = (event) => {
		//Stop page refresh
		event.preventDefault();

		//get form data
		const formData = new FormData(event.target);

		//transform form data to user data
		const { country, city, street, streeNumber, ...userData } = Object.fromEntries(formData)
		userData.address = {
			country,
			city,
			street,
			streeNumber
		};

		userData.createdAt = new Date().toISOString;
		userData.updatedAt = new Date().toISOString;

		// create new user request
		fetch('http://localhost:3030/jsonstore/users', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(userData)
		})
			.then(respone => respone.json)
			.then(result => {

			})
	}

	return (
		<div>
			<Header />

			<main className="main">
				<section className="card users-container">
					<Search />

					<UserList users={users}/>

					<button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

					<Pagination />
				</section>

				{showCreateUser &&
					<CreateUserModal
						onClose={closeUserModalHandler}
						onSubmit={addUserSubmitHandler}
					/>
				}
			</main>

			<Footer />
		</div >
	)
}

export default App
