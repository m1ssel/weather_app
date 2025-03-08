"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import axios from "axios";
import SearchBox from "./searchBox";
import Image from "next/image";

export const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

const Navbar = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [, setPlace] = useAtom(placeAtom);
  const [, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
        );
        const suggestions: string[] = response.data.map(
          (item: { name: string }) => item.name
        );
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  const handleSuggestionClick = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  };

  const SuggestionBox = ({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error,
  }: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
  }) => {
    return (
      <>
        {((showSuggestions && suggestions.length > 1) || error) && (
          <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
            {error && suggestions.length < 1 && (
              <li className="text-red-500 p-1">{error}</li>
            )}
            {suggestions.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(item)}
                className="cursor-pointer p-1 rounded hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50">
        <div className="h-[8vh] px-[10rem] flex items-center justify-between bg-secondary_s">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            target="_blank"
          >
            <Image
              src="/logo2.svg"
              alt="logo"
              className="scale-x-[-1]"
              width={50}
              height={50}
            />
          </a>
          <div className="relative hidden md:flex">
            <SearchBox
              value={city}
              onSubmit={handleSubmitSearch}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <SuggestionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
