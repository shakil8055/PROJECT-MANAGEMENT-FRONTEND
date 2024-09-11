import React, { useState } from "react";
import moment from "moment";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { currencyFormatter } from "../utilities/currencyFormatter";
import ProjectForm from "./ProjectForm";

const ProjectDetails = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const res = await fetch(
      `https://project-management-backend-7s6b.onrender.com/api/projects/${project._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
    setIsOverlayOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOverlayOpen(false);
  };

  return (
    <div className="relative">
      <div className="project bg-slate-800 item-center items-stretch p-5 rounded-xl border border-slate-700 flex flex-col mx-5 w-[28rem]">
        <div className="project-top">
          <span className="text-sky-400">{project._id}</span>
          <h3 className="text-3xl font-medium truncate">{project.title}</h3>
          <span className="uppercase text-xs tracking-widest text-slate-500 font-medium">
            {project.tech}
          </span>
          <div className="text-slate-300 mb-3">
            <span>{project.description}</span>
          </div>
          <hr></hr>
        </div>

        <div className="project-mid mt-2 flex text-sm text-slate-300 gap-5">
          <div className="left flex flex-col">
            <span>Budget : {currencyFormatter(project.budget)}</span>
            <span>
              Added : {moment(project.createdAt).format("MMM DD, hh:mm A")}
            </span>
            <span>
              Updated : {moment(project.updatedAt).format("MMM DD, hh:mm A")}
            </span>
          </div>
          <div className="right flex flex-col">
            <span>Team Leader : {project.manager}</span>
            <span>
              Duration :{" "}
              {`${project.duration} week${project.duration === 1 ? "" : "s"}`}
            </span>
          </div>
        </div>

        <div className="project-bottom justify-end flex mt-2 gap-5">
          <button
            onClick={handleUpdate}
            className="text-sky-500 hover:underline"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="text-rose-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex items-center justify-center z-50">
          {/* MODAL */}
          <div
            className={`update-modal h-[40rem] w-[35rem] bg-slate-800 p-10 rounded-xl shadow-xl border border-slate-700 z-50 flex flex-col relative`}
          >
            <h2 className="text-3xl font-bold mb-3 text-sky-400">
              Update Project
            </h2>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-3xl p-2"
            >
              &times;
            </button>

            <div
              style={{
                flex: 1,
                overflow: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                style={{
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <ProjectForm
                  project={project}
                  setIsModalOpen={setIsModalOpen}
                  setIsOverlayOpen={setIsOverlayOpen}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProjectDetails);
