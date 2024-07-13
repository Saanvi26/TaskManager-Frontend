import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Update to a named import
import { Card } from "./Card";
import Modal from "react-modal";
import { AddTaskForm } from "./AddTaskForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    border: "none",
    borderRadius: "8px",
    maxWidth: "70%",
    maxHeight: "80%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const Home = () => {
  const navigate = useNavigate();
  Modal.setAppElement("#root");

  const [modalIsOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/register");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken) {
        navigate("/register");
        return;
      }
      setUsername(decodedToken.username);
    } catch (error) {
      console.error("Failed to decode token:", error);
      navigate("/register");
    }
  }, [navigate]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await fetch("/user/getcards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setCards(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCards();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const AddCard = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const token = Cookies.get("token");
    let decodedToken = null;
    if (token) {
      decodedToken = jwtDecode(token);
    } else {
      navigate("/register");
      return;
    }
    data.createdBy = decodedToken._id;
    closeModal();
    try {
      const response = await fetch("/user/addcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      const newCard = {
        key: responseData._id,
        id: responseData._id,
        title: data.title,
        description: data.description,
      };
      if (response.ok) {
        setCards([...cards, newCard]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    console.log("Clicked", id);
    navigate(`/task/${id}`);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/register");
  };

  if (username === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="flex flex-row">
          <h1 className="text-white text-3xl ml-10 mt-10 w-1/2 cursiveheading">
            Welcome {username}!
          </h1>
          <div className="mt-10 ml-52 mr-10">
            <button
              className="px-4 py-2  bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={openModal}
            >
              Add Category
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
              <form onSubmit={AddCard}>
                <AddTaskForm />
              </form>
            </Modal>
          </div>
          <div className="mt-10 mr-10">
            <button
              className="px-4 py-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={handleLogout}
            >
              Logout &rarr;
              <BottomGradient />
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-10 grid grid-cols-1 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card._id}
              onClick={() => handleClick(card._id)}
              className="hover:cursor-pointer"
            >
              <Card title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default Home;
