"use client";
import React, { useEffect, useState } from "react";
import { getRandomTodo } from "../actions/todos";

type Props = {};

const TodoPage = (props: Props) => {
  const [todo, setTodo] = useState();

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await fetch("/api/todos");
        const data = await res.json();
        setTodo(data);
      } catch (err) {
        console.error("Error fetching todo:", err);
      }
    };
    getTodo();
  }, []);

  console.log("todo", todo);

  return <div>TodoPage</div>;
};

export default TodoPage;
