"use client";

import Navbar from "@/components/navbar";
import Slider from "@/components/slider";
import { IoPartlySunny } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaThermometerEmpty } from "react-icons/fa";
import { RiWindyFill } from "react-icons/ri";
import { FaDroplet } from "react-icons/fa6";
import { MdWbSunny } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";

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
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "GMT",
    timeZoneName: "shortGeneric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const time = new Date().toLocaleTimeString("en-US", options);
  const anotherOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const currentDate = new Date().toLocaleDateString("en-US", anotherOptions);
  const formattedDate = currentDate.replace(",", " |");

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
    <div className="flex flex-col gap-4 bg-primary_s min-h-screen text-white">
      <Navbar />
      <main>
        <section className="flex justify-between">
          <div className="ml-[10rem] rounded-lg my-4">
            <div className="flex items-center gap-2 mb-[2rem] bg-secondary_s rounded-lg py-4 px-7">
              <FaLocationDot className="scale-125" />
              <h3 className="text-xl">New York</h3>
            </div>
            <div className="bg-secondary_s rounded-lg py-4 px-7">
              <h1 className="text-3xl mb-[1rem]">Cloudy</h1>
              <h2 className="text-3xl">26°C</h2>
              <div className="flex gap-1">
                <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")} |</p>
                <p>{format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}</p>
              </div>
            </div>
          </div>
          <div className="mr-[10rem]">
            <IoPartlySunny className="w-[15rem] h-auto" />
          </div>
        </section>
        <section className="flex justify-between mt-[2rem]">
          <div className="bg-secondary_s w-[68rem] h-[30rem] ml-[10rem] rounded-lg py-4 px-7">
            asd
          </div>
          <div className="bg-secondary_s w-[30rem] mr-[10rem] rounded-lg py-4 px-7">
            <div className="mb-[1rem]">
              <Slider />
            </div>
            <div className="flex justify-center mb-[1rem]">{time}</div>
            <div className="flex flex-col items-start gap-[1rem]">
              <h4 className="uppercase">Air Conditions</h4>
              <div className="flex gap-2">
                <FaThermometerEmpty className="w-[2rem] h-[2rem]" />
                <div className="flex flex-col">
                  <p>Real Feel</p>
                  <p>30°</p>
                </div>
              </div>
              <div className="flex gap-2">
                <RiWindyFill className="w-[2rem] h-[2rem]" />
                <div className="flex flex-col">
                  <p>Wind</p>
                  <p>0.8 km/hr</p>
                </div>
              </div>
              <div className="flex gap-2">
                <FaDroplet className="w-[2rem] h-[2rem]" />
                <div className="flex flex-col">
                  <p>Chance of rain</p>
                  <p>2%</p>
                </div>
              </div>
              <div className="flex gap-2">
                <MdWbSunny className="w-[2rem] h-[2rem]" />
                <div className="flex flex-col">
                  <p>UV Index</p>
                  <p>4</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
