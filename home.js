import React, {useEffect} from 'react';
import Navbar from './navbar'; // Make sure the path is correct
import "../styles/home.css";

const Home = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log("user role: " + user.role);
    const handleEnrollment = () => {
        window.location.href = "/home/enrollment";
    }

    const renderContentBasedOnRole = () => {
        switch (user.role) {
            case 'student':
                console.log("Student role: " + user.role);
                return (
                    <div className="enroll-container">
                        <a className="enrollment" onClick={handleEnrollment}>
                            <img
                                src="https://www.freeiconspng.com/thumbs/calendar-image-png/calendar-image-png-3.png"
                                alt="Enrollment"
                            />
                            <h2>Enrollment</h2>
                        </a>
                    </div>
                );
            case 'instructor':
                return (
                    <div className="enroll-container">
                        <a className="enrollment" href="/home/courses">
                            <img
                                src="https://www.freeiconspng.com/thumbs/courses-icon/courses-icon-12.png"
                                alt="Courses"
                            />
                            <h2>Courses</h2>
                        </a>
                    </div>
                );
            case 'admin':
                return (
                    <div className="enroll-container">
                        <a className="enrollment" href="/home/manage-enrollment">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2247/2247728.png"
                                alt="Manage Enrollment"
                            />
                            <h2>Manage Enrollment</h2>
                        </a>
                        {/* Add content specific to admin */}
                    </div>
                );
            default:
                return null;
        }
    }
    useEffect(() => {
		document.title = "ZAMBOOL"; // Set the new title here
	}, []);

    return (
        <div className="home-container">
            <Navbar user={user} />

            <h1>Welcome to Zambool, {user.username}!</h1>

            {/* Render content based on user's role */}
            {renderContentBasedOnRole()}

            {/* Other content for your Home page goes here */}
        </div>
    );
};

export default Home;
