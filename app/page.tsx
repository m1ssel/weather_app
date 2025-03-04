"use client";

import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "@/types/main";
import Navbar from "@/components/navbar";
import DayToday from "@/components/dayToday";
import axios from "axios";
import MainInfo from "@/components/mainInfo";
import DaysForecast from "@/components/daysForecast";

export default function Home() {
  const { isPending, data } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=lodz&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=9`
      );
      return data;
    },
  });

  const firstData = data?.list[0];

  console.log("data", data);

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDay = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isPending)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-4 bg-primary_s min-h-screen text-gray-600">
      <Navbar />
      <main>
        {firstData && <MainInfo data={data} firstData={firstData} />}
        <section className="flex justify-between mt-[1rem]">
          {firstDataForEachDay.map(
            (d, i) =>
              firstData &&
              d && (
                <DaysForecast key={i} data={data} firstData={firstData} d={d} />
              )
          )}
          {firstData && <DayToday data={data} firstData={firstData} />}
        </section>
      </main>
    </div>
  );
}
