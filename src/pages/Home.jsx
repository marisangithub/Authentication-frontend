import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5 text-center align-center">    
        <h1>Welcome to my Authentication page </h1>
        <p>Please login or register to access the content.</p>
        <Link to="/login" className="btn btn-primary me-2">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
  );
}
export default Home;