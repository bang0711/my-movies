"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ResultSearchBar from "@/app/components/ResultSearchBar";
import { useRouter } from "next/navigation";
type Props = {
  params: {
    movieName: string;
  };
};

function MoviePage({ params: { movieName } }: Props) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const getData = useCallback(async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${movieName}&apikey=a5a42526`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    if (data.Response === "True") {
      return data;
    } else {
      return null;
    }
  }, [movieName]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, [getData]);
  return (
    <>
      <nav>
        <ResultSearchBar />
      </nav>
      <div
        className={`
      ${
        data && data.Search && data.Search.length > 0
          ? "grid h-screen select-none items-center justify-center  gap-5 px-3 py-5 text-center  sm:grid-cols-2 md:grid-cols-3  2xl:grid-cols-4"
          : "flex h-screen items-center justify-center"
      }
      `}
      >
        {data && data.Search && data.Search.length > 0 ? (
          data.Search.map((movie: any) => {
            return (
              <motion.div
                onClick={() => router.push(`/id/${movie.imdbID}`)}
                key={movie.imdbID}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="hover group mx-auto flex h-[500px] w-fit max-w-xs flex-col items-center justify-center rounded-xl bg-black/80 px-5 py-5 shadow-md shadow-slate-500 hover:cursor-pointer"
              >
                <div
                  title={movie.Title}
                  className="flex h-fit w-fit overflow-hidden rounded-xl border-2 border-white transition-all duration-500 group-hover:border-4"
                >
                  <img
                    width={300}
                    height={200}
                    className=" transition-all duration-500 group-hover:scale-110"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                </div>
                <h1 className="mt-2 w-[200px] truncate text-center text-xl font-semibold uppercase tracking-wider text-white sm:w-[300px] md:text-2xl lg:text-3xl">
                  {movie.Title}
                </h1>
              </motion.div>
            );
          })
        ) : (
          <p className="text-white">No results</p>
        )}
      </div>
    </>
  );
}

export default MoviePage;
