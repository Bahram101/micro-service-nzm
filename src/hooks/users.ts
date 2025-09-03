import { UserService } from "@/services/users.todos";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["get users"],
    queryFn: UserService.getAll,
  });

  return { users, isLoading };
};
