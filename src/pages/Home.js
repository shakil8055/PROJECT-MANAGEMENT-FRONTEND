import { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import { useProjectsContext } from "../hooks/useProjectsContext";

import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { projects, dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllProjects = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
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

  return (
    
<div className="home container mx-auto py-10 px-4 sm:px-8 md:px-12 lg:px-16 lg:py-20 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">
  {/* Left Section: Projects List */}
  <div className="home-left col-span-1 lg:col-span-2 mx-auto">
    <h2 className="text-xl sm:text-2xl font-medium mb-6 lg:mb-10 text-sky-400 underline text-center">
      {projects.length < 1 ? "No Projects" : "All Projects"}
    </h2>
    <div className="projects-wrapper grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center">
      {projects &&
        projects.map((project) => (
          <ProjectDetails key={project._id} project={project} />
        ))}
    </div>
  </div>
  
  {/* Right Section: Project Form */}
  <div className="project-form col-span-1 mt-10 lg:mt-0">
    <ProjectForm />
  </div>
</div>



  );
};

export default Home;
