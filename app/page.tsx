"use client";

import Navbar from "@/components/navbar";
import MainDay from "@/components/mainDay";
import OtherDays from "@/components/otherDays";
import { IoPartlySunny } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import axios from "axios";

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: CityInfo;
};

type WeatherEntry = {
  dt: number;
  main: MainWeather;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
};

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Clouds = {
  all: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type CityInfo = {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coordinates = {
  lat: number;
  lon: number;
};

// https://api.openweathermap.org/data/2.5/forecast?q=kyiv&appid=189a00009d7cbf351d318b64ca8381c2&cnt=56
export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=kyiv&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    },
  });

  const firstData = data?.list[0];

  console.log("data", data);

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
        <section className="flex justify-between ">
          <div className="ml-[10rem] rounded-lg my-4">
            <div className="flex items-center justify-center gap-2 mb-[2rem] bg-secondary_s rounded-lg py-4 px-7 border border-solid border-gray-100">
              <FaLocationDot className="scale-125" />
              <h3 className="text-xl font-[600]">New York</h3>
            </div>
            <div className="bg-secondary_s rounded-lg py-4 px-7  border border-solid border-gray-100">
              <h1 className="text-[3rem] text-center font-[500]">26°C</h1>
              <h2 className="text-xl font-[600] mb-[1rem] text-center">
                Cloudy
              </h2>
              <div className="flex gap-1">
                <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")} |</p>
                <p>{format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}</p>
              </div>
            </div>
          </div>
          <div className="mr-[10rem]">
            <IoPartlySunny className="w-[15rem] h-auto text-yellow-200" />
          </div>
        </section>
        <section className="flex justify-between mt-[1rem]">
          <MainDay />
          <OtherDays />
        </section>
      </main>
    </div>
  );
}
