"use client";
import Loader from "@/components/ui/Loader";
import SearchForm from "@/components/ui/SearchForm";
import clientInstance from "@/lib/axios.client";
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
    address: string;
  }>({
    id: "",
    lastName: "",
    firstName: "",
    address: "",
  });

  const { control, handleSubmit } = useForm<ISearch>({
    mode: "onChange",
    defaultValues:{
      // fioiin: '870914302491'
    }
  });

  const onSubmit: SubmitHandler<ISearch> = ({ fioiin }) => {
    setPhone("");
    setIsLoading(true);
    clientInstance.get(`/api/users/by-iin/${fioiin}`).then((res) => {
      const data = res.data;
      setIsLoading(false);
      setUser({
        id: data[0]?.MainAddress?.personID,
        lastName: data[0]?.lastName,
        firstName: data[0]?.firstName,
        address: data[0]?.MainAddress?.addressString || "",
      });
    });
  };

  const handleUserClick = (id: string) => {
    setIsLoadingPhone(true);
    fetch(`/api/users/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPhone(false);
        if (data[0]?.PhoneNumber !== null) {
          setPhone(data[0]?.PhoneNumber);
        }
      });
  };

  return (
    <div>
      <div className="w-full md:w-2/3 lg:w-1/3 mb-0">
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
            <div className="mt-6">
              <div
                className="cursor-pointer flex-col mt-3 hover:bg-gray-200  "
                onClick={() => handleUserClick(user.id)}
              >
                <div className="flex mb-3">
                  <div>Имя: </div>
                  <div className="font-bold pl-6">
                    {user?.lastName} {user?.firstName}
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <div>Адрес:</div>
                  <div className="font-bold">{user?.address}</div>
                </div>
              </div>
              {isLoadingPhone ? (
                <Loader />
              ) : (
                <div className="pl-14 pt-3 font-bold">{phone}</div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
