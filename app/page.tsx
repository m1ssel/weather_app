"use client";

import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "@/types/main";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import axios from "axios";
import MainInfo from "@/components/mainInfo";
import DaysForecast from "@/components/daysForecast";
import SkeletonLoader from "@/components/weatherSkeleton";

export default function Home() {
  const [place] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  const fetchWeatherData = async (cnt: number) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=${cnt}`
    );
    console.log("data", data);
    return data;
  };

  const {
    isPending: isLoadingToday,
    data: todayData,
    refetch: todayRefetch,
  } = useQuery<WeatherData>({
    queryKey: ["todayWeather"],
    queryFn: () => fetchWeatherData(9),
  });

  const {
    isPending: isLoadingForecast,
    data: forecastData,
    refetch: foreCastRefetch,
  } = useQuery<WeatherData>({
    queryKey: ["forecastWeather"],
    queryFn: () => fetchWeatherData(56),
  });

  useEffect(() => {
    foreCastRefetch();
    todayRefetch();
  }, [place, foreCastRefetch, todayRefetch]);

  if (isLoadingToday || isLoadingForecast)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  const firstData = todayData?.list[0];

  return (
    <div className="flex flex-col bg-primary_s min-h-screen text-gray-600">
      <Navbar />
      <main className="flex flex-col justify-between h-[92vh]">
        {loadingCity ? (
          <SkeletonLoader />
        ) : (
          <>
            {firstData && (
              <MainInfo
                firstData={firstData}
                location={todayData?.city.name}
                todayData={todayData}
              />
            )}
            <DaysForecast forecastData={forecastData} />
          </>
        )}
      </main>
    </div>
  );
}
