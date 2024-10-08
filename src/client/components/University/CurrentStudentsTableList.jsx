import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const CurrentStudentsTableList = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const tasksPerPage = 5;
  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/student/${_id}/students`
        );
        console.log("Fetched Data:", response.data); // Debug line
        setData(response.data.students || []); // Ensure data is always an array
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    if (_id) {
      fetchData();
    }
  }, [_id]);

  const filteredData =
    filter === "All"
      ? data
      : data.filter((student) => student.currentstudentsdepartment === filter);

  console.log("Filtered Data:", filteredData); // Debug line

  const currentTasks = filteredData.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  console.log("Current Tasks:", currentTasks); // Debug line

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentTasks.length === tasksPerPage) setCurrentPage(currentPage + 1);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/student/delete/${id}`);
      setData(data.filter((student) => student._id !== id));
      toast.success("Student Removed Successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (id) => {
    console.log("Edit student with ID:", id);
    // Add logic to navigate to edit page if needed
  };

  const readUploadFile = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);
        // const universityId = localStorage.get("_id");
        const response = await axios.post(
          `http://localhost:3000/student/addexcelfile/currentstudents/${_id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("File uploaded successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 200);
        setData(response.data.students || []); // Update data with the response data
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error uploading file:", error);
        toast.error("Error uploading file.");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-[90%]">
        <div className="sm:px-6 w-full mt-7 bg-[#1E1E1E] rounded-2xl h-[85vh]">
          <div className="flex justify-between p-5">
            <h1 className="text-white font-semibold text-4xl uppercase">
              Current Student List
            </h1>
            <div className="flex justify-between p-5">
              <div className="flex items-center space-x-2 border border-[#B1D609]">
                <input
                  id="input"
                  name="file"
                  type="file"
                  onChange={readUploadFile}
                  accept=".xlsx, .xls, .csv"
                  className="text-white file:bg-[#CFF80B] file:text-black file:px-4 file:py-2 file:rounded-full hover:file:bg-[#B1D609] cursor-pointer"
                />
                <label htmlFor="input" className="text-sm text-[#cff80b]">
                  Note: The headers in the Excel file should be as follows:
                  Name, Department, Email, Year of Joining, Year of Passing.
                </label>
              </div>
              {loading && <progress style={{ width: "100%" }} />}
              <i className="fa-solid fa-circle-info text-7xl text-[#CFF80B]" />
            </div>
          </div>

          <div className="rounded-2xl py-4 px-4 md:px-8 xl:px-10">
            <div className="sm:flex items-center justify-between">
              <div className="flex items-center">
                {/* Filter buttons */}
                {["All", "IT", "CSE", "AIDS", "EEE", "MECH"].map((dept) => (
                  <a
                    href="javascript:void(0)"
                    onClick={() => setFilter(dept)}
                    key={dept}
                  >
                    <div
                      className={`py-2 px-8 ${
                        filter === dept
                          ? "bg-[#CFF80B] text-black"
                          : "border-[#CFF80B] border text-white hover:text-black hover:bg-[#CFF80B]"
                      } rounded-full uppercase ml-4 sm:ml-8`}
                    >
                      <p>{dept}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-7 h-[50vh] overflow-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="text-center">
                  <tr>
                    <th className="text-sm text-white uppercase">Name</th>
                    <th className="text-sm text-white uppercase">Department</th>
                    <th className="text-sm text-white uppercase">
                      Year of Joining
                    </th>
                    <th className="text-sm text-white uppercase">Email</th>
                    <th className="text-sm text-white uppercase">
                      Year of Passing
                    </th>
                    <th className="text-sm text-white uppercase">
                      Mobile Number
                    </th>
                    <th className="text-sm text-white uppercase">
                      Register Number
                    </th>
                    <th className="text-sm text-white uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.length > 0 ? (
                    currentTasks.map((task) => (
                      <tr className="h-16 border-b" key={task._id}>
                        <td className="text-base font-medium leading-none text-gray-300 uppercase mr-2 text-center">
                          {task.currentstudentsname}
                        </td>
                        <td className="text-center text-sm text-white uppercase">
                          {task.currentstudentsdepartment}
                        </td>
                        <td className="text-center text-sm text-white uppercase">
                          {task.currentstudentsyearofjoining}
                        </td>
                        <td className="text-center text-sm text-white uppercase">
                          {task.email}
                        </td>
                        <td className="text-center text-sm text-white uppercase">
                          {task.currentstudentsyearofpassing}
                        </td>
                        <td className="text-center text-sm text-white uppercase">
                          {task.currentstudentsmobilenumber}
                        </td>
                        <td className="text-center text-sm text-white uppercase">
                          {task.currentstudentsregisterno}
                        </td>
                        <td className="text-center flex justify-center pt-5">
                          <Link
                            to={`/updatecurrentstudents/${task.universityId}/${task._id}`}
                            className="text-[#CFF80B] hover:text-[#CFF80B]"
                          >
<<<<<<< HEAD
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="lucide lucide-settings-2"
                            >
                              <path d="M20 7h-9" />
                              <path d="M14 17H5" />
                              <circle cx="17" cy="17" r="3" />
                              <circle cx="7" cy="7" r="3" />
                            </svg>
=======
                                                    <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>

>>>>>>> f2d54bef8e724be721cef5e1cfcf752581c8cc8a
                          </Link>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
<<<<<<< HEAD
                            <svg
=======
                           <svg
>>>>>>> f2d54bef8e724be721cef5e1cfcf752581c8cc8a
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-trash"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 7l16 0" />
                              <path d="M10 11l0 6" />
                              <path d="M14 11l0 6" />
                              <path d="M5 7l1 12.905c.072 .81 .364 1.25 .905 1.5c.541 .25 1.079 .095 1.5 -.405" />
                              <path d="M14 19c.421 .5 .959 .655 1.5 .405c.541 -.25 .833 -.69 .905 -1.5l1 -12.905" />
                              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-white">
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center space-x-1 items-center">
              <button
                onClick={prevPage}
                className="bg-[#CFF80B] px-4 py-2 rounded-full text-black hover:bg-[#B1D609]"
              >
                <i class="fa-solid fa-caret-left"></i>
              </button>
              <button
                onClick={nextPage}
                className="bg-[#CFF80B] px-4 py-2 rounded-full text-black hover:bg-[#B1D609]"
              >
                <i class="fa-solid fa-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentStudentsTableList;
