"use client";
import React from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "../ui/glowing-stars";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333", // Background color of the modal
    color: "#fff", // Text color inside the modal
    padding: "20px",
    border: "none",
    borderRadius: "8px",
    maxWidth: "70%", // Adjust as needed
    maxHeight: "80%", // Adjust as needed
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Background color of the overlay
  },
};

function openModal() {
  setIsOpen(true);
}
function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = "#FFFFF";
}
function closeModal() {
  setIsOpen(false);
}

const handleDelete = async (id) => {
  try {
    console.log("Delete");
    // const response = await fetch(`/user/deleteTodo/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    // window.location.reload();
  } catch (error) {
    console.error(error);
  }
}


export function Card({ title, description }) {
  return (
    <>
      <GlowingStarsBackgroundCard>
        <GlowingStarsTitle>{title}</GlowingStarsTitle>
        <div className="flex justify-between items-end break-words ">
          <GlowingStarsDescription>{description}</GlowingStarsDescription>
        </div>
        <div className="ml-48">
          <Icon />
        </div>
      </GlowingStarsBackgroundCard>
    </>
  );
}

const Icon = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <button className=" px-2 py-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" onClick={handleDelete}>
        Delete &nbsp;
        <BottomGradient />
      </button>
      <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              style={customStyles}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <div className="flex flex-row mb-10">
                <div>
                  <p className="text-4xl w-full">Add Task</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-4xl w-8 text-red-600 ml-60"
                >
                  X
                </button>
              </div>
              Helloooo
            </Modal>
    </div>
  );
};
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-800 to-transparent" />
    </>
  );
};
