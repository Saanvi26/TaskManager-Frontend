import React from "react";
import dayjs from "dayjs";
const SubTodoCard = ({ content, completeBy, isCompleted }) => {
  completeBy = dayjs(completeBy).format("DD-MM-YYYY");
  return (
    <div className="p-8 border border-white">
      {isCompleted ? (
        <div className="text-white line-through">{content}</div>
      ) : (
        <div className="text-white">{content}</div>
      )}
      <div className="text-white">Complete By : {completeBy}</div>
    </div>
  );
};

export default SubTodoCard;
