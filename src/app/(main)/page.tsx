"use client";
import Loader from "@/components/ui/Loader";
import SearchForm from "@/components/ui/SearchForm";
import { ISearch } from "@/types/search.interface";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPhone, setIsLoadingPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState<{
    id: string;
    lastName: string;
    firstName: string;
  }>({
    id: "",
    lastName: "",
    firstName: "",
  });

  const { control, handleSubmit } = useForm<ISearch>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ISearch> = ({ fioiin }) => {
    setIsLoading(true);
    fetch(`/api/users/by-iin/${fioiin}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setUser({
          id: data[0]?.MainAddress?.personID,
          lastName: data[0].lastName,
          firstName: data[0].firstName,
        });
      });
  };

  const handleUserClick = (id: string) => {
    setIsLoadingPhone(true)
    fetch(`/api/users/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPhone(false)
        setPhone(data[0].PhoneNumber);
      });
  };

  console.log("user", user);

  return (
    <div>
      <div className="w-1/3 mb-0">
        <h3 className="text-xl mb-3 mt-4">Поиск</h3>
        <SearchForm
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />

        {isLoading ? (
          <Loader />
        ) : (
          user.lastName && (
            <div>
              <div
                className="cursor-pointer p-2 mt-3 hover:bg-gray-200 mb-2"
                onClick={() => handleUserClick(user.id)}
              >
                {user?.lastName} {user?.firstName}
              </div>
              {isLoadingPhone ? <Loader /> : <div>{phone}</div>}
            </div>
          )
        )}
      </div>
    </div>
  );
}
