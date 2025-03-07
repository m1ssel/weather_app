"use client";

import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "@/types/main";
import { fromUnixTime, parseISO, format } from "date-fns";
import { KelvToCels } from "@/utils/kelvToCels";
import { metersToKm } from "@/utils/metersToKm";
import { ConvertWindSpeed } from "@/utils/convertWindSpeed";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import DayToday from "@/components/dayToday";
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

  const uniqueDates = [
    ...new Set(
      forecastData?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDay = uniqueDates.map((date) => {
    return forecastData?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <div className="flex flex-col bg-primary_s min-h-screen text-gray-600">
      <Navbar />
      <main>
        {loadingCity ? (
          <SkeletonLoader />
        ) : (
          <>
            {firstData && (
              <MainInfo firstData={firstData} location={todayData?.city.name} />
            )}
            <section className="flex justify-between h-[30rem] mx-[10rem]">
              <div className="bg-secondary_s w-[68rem] h-full rounded-lg border border-solid border-gray-100 flex flex-col overflow-y-auto gap-4">
                <h2 className="text-2xl font-medium text-center mt-3 pb-3 shadow-sm">
                  Forecast
                </h2>
                {firstDataForEachDay.filter(Boolean).map((d, i) => (
                  <DaysForecast
                    key={i}
                    weatherIcon={d?.weather[0].icon ?? ""}
                    date={d?.dt_txt ? format(parseISO(d.dt_txt), "EEEE") : ""}
                    realFeel={`${KelvToCels(d?.main.feels_like ?? 0)} °C`}
                    temp={KelvToCels(d?.main.temp ?? 0)}
                    humidity={`${d?.main.humidity}%`}
                    sunrise={format(
                      fromUnixTime(forecastData?.city.sunrise ?? 0),
                      "HH:mm"
                    )}
                    sunset={format(
                      fromUnixTime(forecastData?.city.sunset ?? 0),
                      "HH:mm"
                    )}
                    visibility={`${metersToKm(d?.visibility ?? 0)} km`}
                    windSpeed={`${ConvertWindSpeed(d?.wind.speed ?? 0)} km/h`}
                  />
                ))}
              </div>
              <div>
                {firstData && (
                  <DayToday data={todayData} firstData={firstData} />
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
