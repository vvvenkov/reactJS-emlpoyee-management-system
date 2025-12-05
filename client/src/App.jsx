import { useState } from "react"
import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import Pagination from "./components/Pagination.jsx"
import Search from "./components/Search.jsx"
import UserList from "./components/UserList.jsx"
import CreateUser from "./components/CreateUser.jsx"

function App() {
	const [showCreateUser, setShowCreateUser] = useState(false);

	const addUserClickHandler = () => {
		setShowCreateUser(true);
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

				{showCreateUser && <CreateUser />}
			</main>
			<Footer />
		</div >
	)
}

export default App
