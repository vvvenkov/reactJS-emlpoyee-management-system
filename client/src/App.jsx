import { useState } from "react"
import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import Pagination from "./components/Pagination.jsx"
import Search from "./components/Search.jsx"
import UserList from "./components/UserList.jsx"
import CreateUserModal from "./components/CreateUserModal.jsx"

function App() {
	const [showCreateUser, setShowCreateUser] = useState(false);

	const addUserClickHandler = () => {
		setShowCreateUser(true);
	};

	const closeUserModalHandler = () => {
		setShowCreateUser(false);
	};

	const addUserSubmitHandler = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);

		const { country, city, street, streeNumber, ...userData } = Object.fromEntries(formData)
		userData.address = {
			country,
			city,
			street,
			streeNumber
		};

		userData.createdAt = new Date().toISOString;
		userData.updatedAt = new Date().toISOString;

		// TODO Fix address

		// TODO Fix created at and updatedAt

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

					<UserList />

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
