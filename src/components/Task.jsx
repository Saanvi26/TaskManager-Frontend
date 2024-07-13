import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../utils/cn";
import SubTodoCard from "./SubTodoCard";

const Task = () => {
  const { id } = useParams();
  const formRef = useRef(null);
  const [title, setTitle] = useState("");
  const [subTodoCard, setSubTodoCard] = useState([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    getTodoData();
  }, []);

  useEffect(() => {
    const getSubTodos = async (id) => {
      try {
        const response = await fetch(`/user/getSubTodo/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setSubTodoCard(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    getSubTodos(id);
  });

  const getTodoData = async () => {
    try {
      const response = await fetch(`/user/getCardData/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setTitle(responseData.title);
      setDescription(responseData.description);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`/user/subtodo/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      // console.log(responseData._id);
      const newSubTodoCard = {
        key: responseData._id,
        content: responseData.content,
        completeBy: responseData.completeBy,
        isCompleted: responseData.isCompleted,
      };

      setSubTodoCard([...subTodoCard, newSubTodoCard]);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const strikeTask = async(id) => {
    // getTodoData();
    try{
      const response = await fetch(`/user/markComplete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
       const responseData = await response.json();
       const updatedSubTodoCard = subTodoCard.map((subTodoCard) =>
        subTodoCard._id === id ? { ...subTodoCard, isCompleted: responseData.isCompleted } : subTodoCard
      );
      // Update state with updatedSubTodoCards
      setSubTodoCard(updatedSubTodoCard);
       console.log(responseData);
    }
    catch(error){
      console.error(error);
    }
    // console.log("CLICKED! ", id);
  };

  const deleteTask= async(id) => {
    
  }

  return (
    <>
      <div className="text-white mt-10">
        <div className="text-5xl text-center cursiveheading">
          <h1>{title}</h1>
        </div>
        <div className="text-center mt-10">
          <h3>{description}</h3>
        </div>
      </div>
      <form onSubmit={addTask} id="form" ref={formRef}>
        <div className="flex flex-row align-center justify-center">
          <LabelInputContainer className="mb-4 mt-10 ml-10 w-1/2 ">
            <Label htmlFor="content">
              <h1>Task</h1>
            </Label>
            <Input
              id="content"
              placeholder="Get 2 milk packet"
              type="text"
              name="content"
            />
            <Label htmlFor="completeBy">
              <h1>Complete By</h1>
            </Label>
            <Input
              id="completeBy"
              placeholder=""
              type="date"
              name="completeBy"
            />

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Add &rarr;
              <BottomGradient />
            </button>
          </LabelInputContainer>
        </div>
      </form>
      <div className="flex flex-col">
        {subTodoCard.map((subTodoCard) => (
          <div key={subTodoCard.key} className="mt-4 mx-auto text-white">
            <SubTodoCard
              content={subTodoCard.content}
              completeBy={subTodoCard.completeBy}
              isCompleted={subTodoCard.isCompleted}
            />
            <div className="flex flex-row justify-evenly" >
            <button className="border p-2 hover:bg-green-700" onClick={() => strikeTask(subTodoCard._id)}>{subTodoCard.isCompleted ? 'UNDONE' : 'DONE'}</button>
            <button className="border p-2 hover:bg-red-700">DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
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

export default Task;
