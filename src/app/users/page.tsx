"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchUsers } from "../actions/users";
import { useGetUsers } from "@/hooks/users";
import Loader from "@/components/ui/Loader";

const UsersPage = () => {
  const { isLoading, users } = useGetUsers();

  // if (isLoading) return <p>Loading...</p>;

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
          Array.isArray(users) &&
          users.map((user, index) => <div key={index}>{user.name}</div>)
        )}
      </div>
    </div>
  );
};

export default UsersPage;
