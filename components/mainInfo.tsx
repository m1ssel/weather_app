import { FaLocationDot } from "react-icons/fa6";
import { format, parseISO } from "date-fns";
import { KelvToCels } from "@/utils/kelvToCels";
import { GetDayOrNight } from "@/utils/getDayOrNight";
import { WeatherData, WeatherEntry } from "@/types/main";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { API_KEY } from "./navbar";
import WeatherIcon from "./weatherIcon";
import axios from "axios";
import DayToday from "./dayToday";

type Props = {
  firstData: WeatherEntry;
  location?: string;
  todayData: WeatherData;
};

const MainInfo = ({ firstData, location, todayData }: Props) => {
  const [, setLoadingCity] = useAtom(loadingCityAtom);
  const [, setPlace] = useAtom(placeAtom);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch {
          setLoadingCity(false);
        }
      });
    }
  };

  return (
    <section className="flex gap-10 mt-6 mb-4 mx-[10rem]">
      <div className="rounded-lg min-w-[15rem] flex flex-col justify-between">
        <div className="flex items-center justify-center gap-2 bg-secondary_s rounded-lg py-4 pl-7 pr-9">
          <FaLocationDot
            title="Your Current Location"
            className="scale-125 cursor-pointer"
            onClick={handleCurrentLocation}
          />
          <h3 className="text-xl font-[600] text-center">{location}</h3>
        </div>
        <div className="bg-secondary_s rounded-lg py-4 px-7">
          <h1 className="text-[3rem] text-center font-[500] ml-5">
            {KelvToCels(firstData?.main.temp ?? 0)}°
          </h1>
          <h2 className="text-xl font-[600] mb-[1rem] text-center capitalize ">
            {firstData.weather[0].description}
          </h2>
          <div className="flex justify-center">
            <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
          </div>
        </div>
      </div>
      <DayToday data={todayData} firstData={firstData} />
      <div className="flex">
        <WeatherIcon
          className="h-[18rem] w-[18rem] bg-secondary_s rounded-lg"
          size={500}
          iconname={GetDayOrNight(
            firstData?.weather[0]?.icon ?? "weather-icon",
            firstData?.dt_txt ?? ""
          )}
        />
      </div>
    </section>
  );
};

export default MainInfo;
