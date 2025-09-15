"use client";

import Loader from "@/components/ui/Loader";
import { useGetTodos } from "@/hooks/todos";

export default function TodosPage() {
  const { todos, isLoading } = useGetTodos(); 

  return (
    <ul>
      {isLoading ? (
        <Loader />
      ) : (
        todos?.todos.map((t: any) => <li key={t.id}>{t.todo}</li>)
      )}
    </ul>
  );
}
