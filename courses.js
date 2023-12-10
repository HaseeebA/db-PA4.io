import React from "react";
import Navbar from "./navbar"; // Import the Navbar component
import "../styles/courses.css"; // Ensure the path to your CSS file is correct

const Courses = () => {
	return (
		<div>
			<Navbar />
			<div className="body">
				<h2>Course List</h2>
				{/* Use enrollment-container for overall alignment and padding */}
				<div className="course-container">
					{/* Use enrollment class for each grid item for consistent styling */}
					<div className="course">
						<img src="https://www.freeiconspng.com/thumbs/courses-icon/courses-icon-12.png" alt="Course 1" />
						<h2>Course 1</h2>
					</div>
					<div className="course">
						<img
							src="https://www.freeiconspng.com/thumbs/courses-icon/courses-icon-12.png"
							alt="Course 2"
						/>
						<h2>Course 2</h2>
					</div>
					<div className="course">
						<img
							src="https://www.freeiconspng.com/thumbs/courses-icon/courses-icon-12.png"
							alt="Course 3"
						/>
						<h2>Course 3</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Courses;
