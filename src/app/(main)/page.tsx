"use client";
import SearchForm from "@/components/ui/SearchForm";
import { ISearch } from "@/types/search.interface";
import { IUser } from "@/types/user.interface";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function MainPage() {
  const [users, setUsers] = useState<[]>([]);
  const [selectedUser, setSelectedUser] = useState<[]>([]);
  const { control, handleSubmit } = useForm<ISearch>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ISearch> = ({ search }) => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) =>
        setUsers(data.users.map((u: any) => ({ name: u.firstName, id: u.id })))
      );
  };

  const handleUserClick = (id: number) => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // обновляем список пользователей: добавляем email только выбранному
        setUsers((prev: any) => {
          return prev.map((u: any) =>
            u.id === id ? { ...u, email: data.email } : u
          );
        });

        // если нужно хранить отдельно выбранного
        setSelectedUser(data);
      });
  };

  console.log("users", users);
  console.log("selectedUser", selectedUser);

  return (
    <div>
      <div className="w-1/3 mb-0">
        <h3 className="text-xl mb-3 mt-4">Поиск по ИИН</h3>
        <SearchForm
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
        <ul className="mt-6">
          {users?.map((user: any) => (
            <li
              key={user.id}
              className="cursor-pointer font-semibold p-2 hover:bg-gray-200"
              onClick={() => handleUserClick(user.id)}
            >
              {user?.name} - {user?.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
