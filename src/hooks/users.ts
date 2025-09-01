"use client";

import { createUser, fetchUsers } from "@/app/actions/users";
import { IUser } from "@/types/user.interface";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useGetUsers() {
  // const { isLoading, data: users = [] } = useQuery<IUser[], Error, string[]>({
  const { isLoading, data: users = [] } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    select: (data) => data,
  });

  return { isLoading, users };
}
