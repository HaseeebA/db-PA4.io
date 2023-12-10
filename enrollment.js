import React, { useState, useEffect } from "react"; // Import the useState hook from React
import Navbar from "./navbar"; // Import the Navbar component
import "../styles/enrollment.css"; // Ensure the path to your CSS file is correct
import axios from "axios"; // Import axios

const Enrollment = () => {
	const [enrollmentPopup, setEnrollmentPopup] = useState(false);
	const [coursesPopup, setCoursesPopup] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [courseList, setCourseList] = useState([]);

	const toggleEnrollmentPopup = () => {
		setEnrollmentPopup(!enrollmentPopup);
	};
	const toggleCoursesPopup = () => {
		setCoursesPopup(!coursesPopup);
	};

	const handleEnrollment = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const courseName = formData.get("courseName");
		const courseCode = formData.get("courseCode");

		if (courseName === "" || courseCode === "") {
			alert("Please fill out all fields");
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:3001/api/student-enrollment",
				{
					courseName,
					courseCode,
				}
			);

			if (response.data.message === "You have been enrolled successfully!") {
				setSuccessMessage("You have been enrolled successfully!");
			} else {
				setSuccessMessage("Error enrolling in course");
			}

			// Set a timeout to clear the success message after some time (e.g., 3 seconds)
			setTimeout(() => {
				setSuccessMessage("");
				toggleEnrollmentPopup();
			}, 1000);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchCourseList = async () => {
		try {
			const response = await axios.get("http://localhost:3001/api/course-list");
			setCourseList(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchCourseList();
	}, []);

	useEffect(() => {
		document.title = "ZAMBOOL"; // Set the new title here
	}, []);

	return (
		<div>
			<Navbar />
			<div className="body">
				{/* Use enrollment-container for overall alignment and padding */}
				<div className="enrollment-container">
					{/* Use enrollment class for each grid item for consistent styling */}
					<div className="enrollment">
						<img src="https://pngimg.com/d/skull_PNG69.png" alt="View Grades" />
						<h2>View Grades</h2>
					</div>
					<div className="enrollment" onClick={toggleCoursesPopup}>
						<img
							src="https://www.freeiconspng.com/thumbs/courses-icon/courses-icon-12.png"
							alt="View Courses"
						/>
						<h2>View Courses</h2>
					</div>
					<div className="enrollment" onClick={toggleEnrollmentPopup}>
						<img
							src="https://cdn-icons-png.flaticon.com/512/2247/2247728.png"
							alt="Enroll"
						/>
						<h2>Enroll</h2>
					</div>

					{coursesPopup ? (
						<div className="enrollment-popup">
							<div className="courses-popup-inner">
								<button onClick={toggleCoursesPopup}>X</button>
								<h3>Your Courses</h3>
								<div className="courses-list">
									{courseList.map((course) => (
										<div className="course" key={course._id}>
											<h4>{course.name}</h4>
											<p>{course.code}</p>
											<p>{course.instructor}</p>
											{/* <button onClick={() => handleDelete(course._id)}>
												Delete
											</button> */}
										</div>
									))}
								</div>
							</div>
						</div>
					) : null}

					{enrollmentPopup ? (
						<div className="enrollment-popup">
							<div className="courses-popup-inner">
								<button onClick={toggleEnrollmentPopup}>X</button>
								<h3>Enroll in Course</h3>
								<form className="enrollment-form" onSubmit={handleEnrollment}>
									<label htmlFor="courseName">Course Name</label>
									<input type="text" name="courseName" />
									<label htmlFor="courseCode">Course Code</label>
									<input type="text" name="courseCode" />
									<button type="submit">Submit</button>
									{successMessage && (
										<p className="success-message">{successMessage}</p>
									)}
								</form>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Enrollment;
