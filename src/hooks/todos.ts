"use client";

import { TodosService } from "@/services/todos.service";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useGetTodos() {
  // const { isLoading, data: users = [] } = useQuery<IUser[], Error, string[]>({
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: TodosService.getTodos,
  });

  return { todos, isLoading};
}
