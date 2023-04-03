"use client";
import ResultSearchBar from "@/app/components/ResultSearchBar";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    movieId: string;
  };
  id: string;
};
function MovieDetailPage({ params: { movieId } }: Props) {
  const [movieData, setMovieData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setMovieData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [movieId]);
  return (
    <>
      <nav>
        <ResultSearchBar />
      </nav>
      <div>
        {movieData ? (
          <div className="mt-4 flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
            <div>
              <img
                src={movieData.Poster}
                alt={movieData.Title}
                width={400}
                height={300}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text ">
              <p>
                <span>Name:</span> {movieData.Title}
              </p>
              <p>
                <span>Summary:</span> {movieData.Plot}
              </p>
              <p>
                <span>Released Date:</span> {movieData.Released}
              </p>
              <p>
                <span>Type:</span>{" "}
                {movieData.Genre.split(", ").map(
                  (word: string, index: number) => (
                    <span
                      key={index}
                      className={`${
                        word.includes("Action")
                          ? "text-red-500"
                          : word.includes("Adventure")
                          ? "text-green-500"
                          : word.includes("Animation")
                          ? "text-yellow-500"
                          : word.includes("Biography")
                          ? "text-blue-500"
                          : word.includes("Comedy")
                          ? "text-purple-500"
                          : word.includes("Crime")
                          ? "text-indigo-500"
                          : word.includes("Documentary")
                          ? "text-pink-500"
                          : word.includes("Drama")
                          ? "text-gray-500"
                          : word.includes("Family")
                          ? "text-teal-500"
                          : word.includes("Fantasy")
                          ? "text-orange-500"
                          : word.includes("History")
                          ? "text-red-800"
                          : word.includes("Horror")
                          ? "text-purple-800"
                          : word.includes("Music")
                          ? "text-yellow-800"
                          : word.includes("Musical")
                          ? "text-pink-800"
                          : word.includes("Mystery")
                          ? "text-indigo-800"
                          : word.includes("Romance")
                          ? "text-red-500"
                          : word.includes("Sci-Fi")
                          ? "text-green-800"
                          : word.includes("Sport")
                          ? "text-teal-800"
                          : word.includes("Thriller")
                          ? "text-gray-800"
                          : word.includes("War")
                          ? "text-yellow-800"
                          : word.includes("Western")
                          ? "text-red-800"
                          : "text-black"
                      }`}
                    >
                      {word}
                      {index !== movieData.Genre.split(", ").length - 1
                        ? ", "
                        : ""}
                    </span>
                  )
                )}
              </p>
              <p>
                <span>Writer:</span> {movieData.Writer}
              </p>
              <p>
                <span>Actors:</span> {movieData.Actors}
              </p>
              <p>
                <span>Language:</span> {movieData.Language}
              </p>
              <p>
                <span>Country:</span> {movieData.Country}
              </p>
              <div className="flex text-white">
                <span>Ratings:&nbsp;</span>
                <ul>
                  {movieData.Ratings.map(
                    (rating: { Source: string; Value: string }) => (
                      <li key={rating.Source}>
                        {rating.Source}: {rating.Value}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <p>
                <span>Metascore:</span> {movieData.Metascore}
              </p>
              <p>
                <span>imdbRating:</span> {movieData.imdbRating}
              </p>
              <p>
                <span>imdbVotes:</span> {movieData.imdbVotes}
              </p>
              <p>
                <span>Type: </span> {movieData.Type}
              </p>
              <p>
                <span>totalSeasons:</span> {movieData.totalSeasons}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default MovieDetailPage;
