"use client";
import Link from "next/link";
import React from "react";
import Loader from "@/components/ui/Loader";
import { useGetUsers } from "@/hooks/users";

const UsersPage = () => {
  const { isLoading, users } = useGetUsers();

  return (
    <div>
      <div className="flex justify-between pb-4">
        <div>Users</div>
        <Link href="/users/create">
          <button className="bg-green-600 px-4 py-2 rounded text-white cursor-pointer">
            Create
          </button>
        </Link>
      </div>
      <div className="flex-col">
        {isLoading ? (
          <Loader />
        ) : (
          users?.users.map((user: any, index: number) => (
            <div key={index}>{user.firstName}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersPage;
