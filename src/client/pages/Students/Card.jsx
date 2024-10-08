import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ alumni }) => {
  const navigate=useNavigate()
  const view=()=>{
    navigate('/studentaluminiprofile')
  }
  // Extract the first name from the alumni name
  const firstName = alumni.alumniname.split(' ')[0];
  
  // Generate the avatar URL
  const avatarUrl = `https://avatar.iran.liara.run/username?username=${firstName}`;

  return (
<<<<<<< HEAD
    <div className="">
      <div className="box w-[400px] h-[400px] my-2 bg-white rounded-2xl grid grid-cols-[64px_1fr] relative">
        <div className="box-icon my-5  flex items-center justify-center"></div>
        <div className=" flex items-center pl-4 my-3 text-sm tracking-wide space-x-3">
          <h1 className="border border-black rounded-full px-3 uppercase  font-semibold text-lg">
            {alumni.department}
          </h1>
          <h1 className="border border-black rounded-full px-3 uppercase  font-semibold text-lg">
            {alumni.yearofjoining}
          </h1>
          <h1 className="border border-black rounded-full px-3 uppercase  font-semibold text-lg">
            {alumni.passedoutyear}
          </h1>
        </div>
        <div className="box-title uppercase  flex items-center justify-center  text-2xl font-semibold ">
          {alumni.alumniname}
        </div>
        <div className="box-image">
          <img src={avatarUrl} alt="" className="h-[300px] rounded-lg" />
        </div>
        <div className="studio-button absolute bottom-4 right-4 flex items-center bg-yellow-500 text-black py-2 px-3 rounded-full shadow-lg transition-all ease-in-out duration-300 overflow-hidden max-w-[45px]">
          <div className="studio-button-icon relative top-[1px]">
            <i class="fa-solid fa-chevron-left text-center text-lg"></i>
          </div>
          <button
            onClick={view}
            className="studio-button-label uppercase whitespace-nowrap px-2 opacity-0 translate-x-2 transition-transform duration-250 ease-in-out"
          >
            View Details
          </button>
        </div>
=======
    <div className=''>

    <div className="box w-[400px] h-[400px] bg-white rounded-2xl grid grid-cols-[64px_1fr] my-3 relative">
    <div className="box-icon flex items-center justify-center">
   
    </div>
    <div className=" flex items-center pl-4 text-sm tracking-wide space-x-3">
      <h1 className='border border-black rounded-full px-3 uppercase  font-semibold text-lg'>{alumni.department}</h1>
      <h1 className='border border-black rounded-full px-3 uppercase  font-semibold text-lg'>Coimbatore</h1>
      <h1 className='border border-black rounded-full px-3 uppercase  font-semibold text-lg'>{alumni.passedoutyear}</h1>


    </div>
    <div className="box-title uppercase  flex items-center justify-center  text-2xl font-semibold ">
    {alumni.alumniname}
    </div>
    <div className="box-image">
      <img src={avatarUrl} alt=""  className='h-[300px] rounded-lg'/>
    </div>
    <div className="studio-button absolute bottom-4 right-4 flex items-center bg-yellow-500 text-black py-2 px-3 rounded-full shadow-lg transition-all ease-in-out duration-300 overflow-hidden max-w-[45px]">
      <div className="studio-button-icon relative top-[1px]">
      <i class="fa-solid fa-chevron-left text-center text-lg"></i>
>>>>>>> f2d54bef8e724be721cef5e1cfcf752581c8cc8a
      </div>
      <button  onClick={view}  className="studio-button-label uppercase whitespace-nowrap px-2 opacity-0 translate-x-2 transition-transform duration-250 ease-in-out">
        View Details
      </button  >
    </div>
  </div>


    </div>
  );
};

export default Card;
