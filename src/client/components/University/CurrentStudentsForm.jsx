import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import add from '../../assets/vc.svg';
import axios from 'axios';
import toast from 'react-hot-toast';

const CurrentstudentsForm = () => {
  const [currentstudentsname, setCurrentstudentsname] = useState('');
  const [currentstudentsregisterno, setCurrentstudentsregisterno] = useState('');
  const [currentstudentsdepartment, setCurrentstudentsdepartment] = useState('');
  const [currentstudentsyearofjoining, setCurrentstudentsyearofjoining] = useState('');
  const [currentstudentsyearofpassing, setCurrentstudentsyearofpassing] = useState('');
  const [email, setEmail] = useState('');

  const {_id} = useParams();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  if(_id) {
    localStorage.setItem('_id', _id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const universityId = localStorage.getItem("_id");
      const response = await axios.post("http://localhost:3000/student/addstudent",{
        universityId,
        currentstudentsname,currentstudentsdepartment,currentstudentsregisterno,currentstudentsyearofjoining,currentstudentsyearofpassing,email
      });
      if (response.status === 200) {
        toast.success("Student added successfully");
        // navigate(`/currentstudentslist/${_id}`)
        setStep(3);
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const firstPage = () => {
    setStep(1);
  };

  const dashboard = () => {
    navigate(`/universitydashboard/${_id}`);
  };

  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center p-6">
      <div className="flex mx-auto bg-[#1E1E1E] p-16 rounded-2xl justify-center items-center">
        <div className="relative w-[35%]">
          <div className="h-[700px] w-[500px] p-5">
            <h1 className="text-white font-semibold text-4xl uppercase">
              Let's Add Current Students <span className='text-[#CFF80B]'>Account!</span> 
            </h1>
            <div className='mt-24'>
              <img src={add} alt="" className='h-[300px]' />
            </div>
          </div>
        </div>

        <div id="back-div" className="w-[65%] flex justify-center rounded-[26px]">
          {/* Step 1 */}
          {step === 1 && (
            <div className="h-[700px] bg-[#111111] relative flex items-center rounded-[20px] xl:p-10 2xl:p-16 lg:p-10 md:p-10 sm:p-2">
              <div>
                <h1 className="text-white font-extrabold text-6xl uppercase">
                   Students Form
                </h1>

                <form className="space-y-4 w-[400px]">
                  <div className="mt-10 ">
                    <label htmlFor="currentstudentsname" className="text-sm font-semibold text-[#87888C]">
                      Student Name
                    </label>
                    <input
                      name="currentstudentsname"
                      id="currentstudentsname"
                      className="border-[#87888C] bg-transparent border-t-0 border-r-0 border-l-0 border-2 p-3 shadow-lg placeholder:text-base outline-none mb-5 text-[#87888C] w-full"
                      type="text"
                      placeholder="Enter Student name"
                      onChange={(e) => setCurrentstudentsname(e.target.value)}
                      required
                    />
                    <div className="grid">
                      <label htmlFor="currentstudentsdepartment" className="text-sm font-semibold text-[#87888C]">
                        Department
                      </label>
                      <select
                        className="border-[#87888C] bg-transparent border-t-0 border-r-0 border-l-0 border-2 p-3 shadow-lg placeholder:text-base outline-none mb-5 bg-[#111111] text-[#87888C] w-full"
                        name="currentstudentsdepartment"
                        id="currentstudentsdepartment"
                        value={currentstudentsdepartment}
                        onChange={(e) => setCurrentstudentsdepartment(e.target.value)}
                      >
                        <option value="" >Select Department</option>
                        <option className='text-black' value="IT">IT</option>
                        <option className='text-black' value="CSE">CSE</option>
                        <option className='text-black' value="AIDS">AIDS</option>
                        <option className='text-black' value="MECH">MECH</option>
                      </select>
                    </div>
                    <label htmlFor="currentstudentsyearofjoining" className="text-sm font-semibold text-[#87888C]">
                      Year of Joining
                    </label>
                    <input
                      name="currentstudentsyearofjoining"
                      id="currentstudentsyearofjoining"
                      className="border-[#87888C] bg-transparent border-t-0 border-r-0 border-l-0 border-2 p-3 shadow-lg placeholder:text-base outline-none mb-5 text-[#87888C] w-full"
                      type="text"
                      placeholder="Enter Year of Joining"
                      onChange={(e) => setCurrentstudentsyearofjoining(e.target.value)}
                      required
                    />
                    <button
                      className="bg-[#CFF80B] shadow-lg mt-2 p-2 text-black font-semibold rounded-lg w-full hover:scale-100 hover:bg-[#CFF80B] transition duration-300 ease-in-out"
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="h-[700px] bg-[#111111] relative flex items-center rounded-[20px] xl:p-10 2xl:p-16 lg:p-10 md:p-10 sm:p-2">
              <div>
                <h1 className="text-white font-extrabold text-6xl uppercase">
                  Student Form
                </h1>
                <button
                  className="bg-[#CFF80B] mt-5 px-5 py-2 shadow-lg p-2 text-black font-semibold rounded-lg hover:scale-100 hover:bg-[#CFF80B] transition duration-300 ease-in-out"
                  onClick={handlePrev}
                  type="button"
                >
                  <i className="fa-solid fa-arrow-left text-xl"></i>
                </button>

                <form className="w-[400px]" onSubmit={handleSubmit}>
                  <div className="mt-10 ">
                    <label htmlFor="email" className="text-sm font-semibold text-[#87888C]">
                      Student Email
                    </label>
                    <input
                      name="email"
                      id="email"
                      className="border-[#87888C] bg-transparent border-t-0 border-r-0 border-l-0 border-2 p-3 shadow-lg placeholder:text-base outline-none mb-5 text-[#87888C] w-full"
                      type="email"
                      placeholder="Enter Student email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    
                    <label htmlFor="passout" className="text-sm font-semibold text-[#87888C]">
                      Passout Year
                    </label>
                    <input
                      name="currentstudentsyearofpassing"
                      id="currentstudentsyearofpassing"
                      className="border-[#87888C] bg-transparent border-t-0 border-r-0 border-l-0 border-2 p-3 shadow-lg placeholder:text-base outline-none mb-5 text-[#87888C] w-full"
                      type="number"
                      placeholder="Passout year"
                      onChange={(e) => setCurrentstudentsyearofpassing(e.target.value)}
                      required
                    />
                    
                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-[#87888C]">
                     Enter RegisterNo
                    </label>

                    <input
                      name="currentstudentsregisterno"
                      id="currentstudentsregisterno"
                      className="border-[#87888C] bg-transparent border-t-0 border-r-0 border-l-0 border-2 p-3 shadow-lg placeholder:text-base outline-none mb-5 text-[#87888C] w-full"
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => setCurrentstudentsregisterno(e.target.value)}
                      required
                    />
                    <p className='text-[#CFF80B]'>Note: Student password is RegisterNumber</p>
                    <button
                      className="bg-[#CFF80B] shadow-lg mt-10 p-2 text-black font-semibold rounded-lg w-full hover:scale-100 hover:bg-[#CFF80B] transition duration-300 ease-in-out"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="h-[700px] bg-[#111111] relative flex items-center rounded-[20px] xl:p-10 2xl:p-16 lg:p-10 md:p-10 sm:p-2">
              <div className="text-center">
                <h1 className="text-white font-extrabold text-6xl uppercase">
                  Success!
                </h1>
                <p className="mt-4 text-lg text-[#CFF80B]">
                  Student account has been successfully created.
                </p>
                <div className="flex space-x-4">
                  <button
                    className="border-2 border-[#CFF80B] shadow-lg mt-10 p-2 text-[#CFF80B] font-semibold rounded-lg w-full hover:scale-100 hover:bg-[#CFF80B] transition duration-300 ease-in-out"
                    type="button"
                    onClick={firstPage}
                  >
                    Add New
                  </button>
                  <button
                    className="bg-[#CFF80B] shadow-lg mt-10 p-2 text-black font-semibold rounded-lg w-full hover:scale-100 hover:border-2 hover:bg-transparent hover:border-[#87888C] transition duration-300 ease-in-out"
                    type="button"
                    onClick={dashboard}
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentstudentsForm;
