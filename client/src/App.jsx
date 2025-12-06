import { useState } from "react"
import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import Pagination from "./components/Pagination.jsx"
import Search from "./components/Search.jsx"
import UserList from "./components/UserList.jsx"
import UserSaveModal from "./components/UserSaveModal.jsx"
import { useEffect } from "react"

function App() {
    const [users, setUsers] = useState([]);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/users')
            .then(response => response.json())
            .then(result => {
                setUsers(Object.values(result));
            })
            .catch((err) => alert(err.message));
    }, [refresh]);

    const forceUserRefersh = () => {
        setRefresh(state => !state);
    };

    const addUserClickHandler = () => {
        setShowCreateUser(true);
    };

    const closeUserModalHandler = () => {
        setShowCreateUser(false);
    };

    const sortUsersHandler = () => {
        console.log('sort users')

        setUsers(state => [...state].sort((userA, userB) => new Date(userB.createdAt) - new Date(userA.createdAt)))
    }

    const addUserSubmitHandler = (event) => {
        // Stop page refresh
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);

        // Transform formdata to userData
        const { country, city, street, streetNumber, ...userData } = Object.fromEntries(formData);
        userData.address = {
            country,
            city,
            street,
            streetNumber,
        };

        userData.createdAt = new Date().toISOString();
        userData.updatedAt = new Date().toISOString();

        // Create new user request
        fetch('http://localhost:3030/jsonstore/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(() => {
                closeUserModalHandler();
                forceUserRefersh();
            })
            .catch(err => alert(err.message))
    }

    return (
        <div>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UserList users={users} forceUserRefersh={forceUserRefersh} onSort={sortUsersHandler} />

                    <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

                    <Pagination />
                </section>

                {showCreateUser &&
                    <UserSaveModal
                        onClose={closeUserModalHandler}
                        onSubmit={addUserSubmitHandler}
                    />
                }
            </main>

            <Footer />
        </div>
    )
}

export default App
