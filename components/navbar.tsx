"use client";

import axios from "axios";
import SearchBox from "./searchBox";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

const Navbar = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
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
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
    } else {
      setError("");
      setShowSuggestions(false);
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
    <nav className="shadow-sm sticky top-0 left-0 z-50">
      <div className="h-20 px-[9.5rem] flex items-center justify-between bg-secondary_s">
        <Link href="/">
          <Image src="/chill.webp" alt="logo" width={150} height={150} />
          {/* <img src='chill.jpg' alt='asd' /> */}
        </Link>
        <div className="relative">
          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{ showSuggestions, suggestions, handleSuggestionClick, error }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
