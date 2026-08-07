function Dashboard(){

    const logout = () =>{
        localStorage.removeItem("token");
        window.location.href="/";
    }


    return(
        <div>

            <h1>Dashboard</h1>

            <p>
                Welcome! You are authenticated using JWT.
            </p>


            <button onClick={logout}>
                Logout
            </button>

        </div>
    )
}


export default Dashboard;