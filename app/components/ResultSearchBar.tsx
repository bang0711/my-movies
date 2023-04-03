"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type Props = {};

function ResultSearchBar({}: Props) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const searchMovies = () => {
    setInput("");
    router.push(`/movie/${input.toLowerCase()}`);
  };

  return (
    <div className="sticky top-0 flex max-h-fit w-full flex-col items-center justify-center gap-3 px-3 py-2">
      <Link href={"/"}>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          <h1 className="text-3xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Movie Databases
          </h1>
        </div>
      </Link>
      <form
        onSubmit={searchMovies}
        action=""
        className="flex w-full flex-col items-center justify-center"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="mt-3 w-full flex-1 rounded-md border border-white bg-black px-5 py-3 text-lg font-bold text-white shadow-md outline-none focus:outline-none"
          placeholder="Enter Your Movie Name"
          name=""
          id=""
        />
        <div className="mt-3 flex w-full items-center justify-center gap-3 ">
          <button
            disabled={!input}
            type="submit"
            onClick={searchMovies}
            className="flex items-center gap-1 rounded-lg bg-green-500 px-4 py-2 text-lg font-bold text-white shadow-md shadow-black transition-all duration-500 disabled:scale-90 disabled:cursor-not-allowed disabled:grayscale"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            Search A Movie
          </button>
          <button
            disabled={!input}
            onClick={() => setInput("")}
            className="flex items-center gap-1 rounded-lg bg-red-500 px-4 py-2 text-lg font-bold text-white shadow-md shadow-black transition-all duration-500 disabled:scale-90 disabled:cursor-not-allowed disabled:grayscale"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResultSearchBar;
