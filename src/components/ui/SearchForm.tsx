"use client";
import React, { FC } from "react";
import Field from "./field/Field";
import { ISearch } from "@/types/search.interface";
import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";

interface ISearchForm {
  control: Control<ISearch>;
  onSubmit: SubmitHandler<ISearch>;
  handleSubmit: UseFormHandleSubmit<ISearch>;
}

const SearchForm: FC<ISearchForm> = ({ control, onSubmit, handleSubmit }) => {
  return (
    <div >
      <form onClick={handleSubmit(onSubmit)} className="flex items-start ">
        <Field<ISearch>
          className="mb-0 w-full mr-3"
          placeholder="ИИН"
          control={control}
          name="fioiin"
          rules={{
            required: "Заполните поле!",
            pattern: {
              value: /^[0-9]{12}$/,
              message: "Please enter a valid IIN",
            },
          }}
        />
        <button type='submit'>
          <IoSearchOutline
            size={40}
            className="rounded-lg cursor-pointer border border-gray-400 p-2"
          />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
