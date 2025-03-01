"use client";

import Navbar from "@/components/navbar";
import DaysWeek from "@/components/daysWeek";
import DayToday from "@/components/dayToday";
import { FaLocationDot } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import axios from "axios";
import { KelvToCels } from "@/utils/kelvToCels";
import WeatherIcon from "@/components/weatherIcon";
import { GetDayOrNight } from "@/utils/getDayOrNight";

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

export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=lodz&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
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
            <div className="flex items-center justify-center gap-2 mb-[2rem] bg-secondary_s rounded-lg py-4 pl-7 pr-9 border border-solid border-gray-100">
              <FaLocationDot className="scale-125" />
              <h3 className="text-xl font-[600]">{data?.city.name}</h3>
            </div>
            <div className="bg-secondary_s rounded-lg py-4 px-7  border border-solid border-gray-100">
              <h1 className="text-[3rem] text-center font-[500] ml-6">
                {KelvToCels(firstData?.main.temp ?? 0)}°
              </h1>
              <h2 className="text-xl font-[600] mb-[1rem] text-center">
                {data?.list[0].weather[0].main}
              </h2>
              <div className="flex gap-1">
                <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")} |</p>
                <p>{format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}</p>
              </div>
            </div>
          </div>
          <div className="mr-[10rem]">
            <WeatherIcon
              className="h-[17rem] w-[17rem] bg-secondary_s rounded-lg"
              size={500}
              iconName={GetDayOrNight(
                data?.list[0]?.weather[0]?.icon ?? "weather-icon",
                data?.list[0]?.dt_txt ?? ""
              )}
            />
          </div>
        </section>
        <section className="flex justify-between mt-[1rem]">
          <DaysWeek firstData={firstData} />
          <DayToday data={data} />
        </section>
      </main>
    </div>
  );
}
