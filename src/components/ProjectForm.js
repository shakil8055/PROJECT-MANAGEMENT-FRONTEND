import React, { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProjectForm = ({ project, setIsModalOpen, setIsOverlayOpen }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [description, setDescription] = useState(project ? project.description : "");
  
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in!");
      return;
    }

    // Start loading animation
    setIsLoading(true);

    const projectObj = { title, tech, budget, duration, manager, description };

    try {
      // POST request if no project exists
      let res;
      if (!project) {
        res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        });
      } else {
        // PATCH request if updating an existing project
        res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        });
      }

      const json = await res.json();

      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setError(null);
        setEmptyFields([]);

        // Dispatching action to update/create the project
        dispatch({
          type: project ? "UPDATE_PROJECT" : "CREATE_PROJECT",
          payload: json,
        });

        // Close modal and overlay on success
        setIsModalOpen(false);
        setIsOverlayOpen(false);

        // Clear form fields
        setTitle("");
        setTech("");
        setBudget("");
        setDuration("");
        setManager("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form");
    } finally {
      // End loading animation
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="project-form flex flex-col gap-5">
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="title"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Project Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="e.g. e-commerce website"
          id="title"
          className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("title")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="tech"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type="text"
          placeholder="e.g. react.js, redux, node.js"
          id="tech"
          className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("tech")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="description"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Describe about the project"
          id="description"
          className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("description")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="budget"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Budget (in INR)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          placeholder="e.g. 500"
          id="budget"
          className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("budget")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="duration"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Duration (in week)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="e.g. 6"
          id="duration"
          className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("duration")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="manager"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Team Leader
        </label>
        <select
          id="teamOption"
          className={`bg-transparent text-white border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("teamOption")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
          value={manager}
          onChange={(e) => setManager(e.target.value)}
        >
          <option className="text-black" value="">--Select an option--</option>
          <option className="text-black" value="ANANYA">ANANYA</option>
          <option className="text-black" value="ARUN">ARUN</option>
          <option className="text-black" value="BHARATH">BHARATH</option>
          <option className="text-black" value="NANDHINI">NANDHINI</option>
          <option className="text-black" value="SHAKIL">SHAKIL</option>
        </select>
      </div>

      <button
  type="submit"
  className="bg-sky-400 text-slate-900 py-3 px-5 rounded-lg hover:bg-sky-50 duration-300 capitalize flex items-center justify-center"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <div className="animate-pulse bg-slate-900 h-2 w-2 rounded-full mr-2"></div>
      <span>{project ? "Updating" : "Adding"}</span>
    </>
  ) : project ? "Confirm Update" : "Add project"}
</button>


      {error && (
        <p className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default React.memo(ProjectForm);
