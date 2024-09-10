import React, { useEffect, useState } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { projects, dispatch } = useProjectsContext();
  const { user } = useAuthContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const getAllProjects = async () => {
      const res = await fetch(
        `https://project-management-backend-7s6b.onrender.com/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };

    if (user) {
      getAllProjects();
    }
  }, [dispatch, user]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    
    <div className="home container mx-auto py-10 px-4 sm:px-8 md:px-12 lg:px-10 lg:py-10 grid grid-cols-1 lg:grid-cols-1 gap-5 lg:gap-10">
  <div className="project-form-button w-full mb-0 flex justify-end">
    <button
      onClick={togglePopup}
      className="bg-blue-500 text-white mb-0 px-4 py-2 rounded-xl hover:bg-blue-900"
    >
      Create New
    </button>
  </div>

      
      {/* Popup Box */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex items-center justify-center z-50">
         <div className={`update-modal h-[40rem] w-[35rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-10 rounded-xl shadow-xl border border-slate-700 z-[2] flex flex-col 
          ${isPopupOpen ? "" : "hidden"}`}>
<button
  onClick={togglePopup}
  className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-3xl p-2"
>
  &times;
</button>

  <h2 className="text-3xl font-semibold mb-4 text-sky-400">
    Create New Project
  </h2>
  <div
    style={{
      flex: 1,
      overflow: 'auto',
      scrollbarWidth: 'none', 
      msOverflowStyle: 'none' 
    }}
  >
    <div
      style={{
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch' 
      }}
    >
      <ProjectForm setIsModalOpen={setIsPopupOpen} setIsOverlayOpen={() => {}} />
    </div>
  </div>
</div>


        </div>
      )}
      
      {/* Projects List */}
      <div className="home-center col-span-2 lg:col-span-3 mx-auto">
        <h2 className="text-xl sm:text-2xl font-medium mb-0 lg:mb-10 text-sky-400 text-center">
          {projects.length < 1 ? "No Projects" : "All Projects"}
        </h2>
        <div className="projects-wrapper grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
