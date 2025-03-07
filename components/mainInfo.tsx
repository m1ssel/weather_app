import { FaLocationDot } from "react-icons/fa6";
import { format, parseISO } from "date-fns";
import { KelvToCels } from "@/utils/kelvToCels";
import { GetDayOrNight } from "@/utils/getDayOrNight";
import { WeatherEntry } from "@/types/main";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { API_KEY } from "./navbar";
import WeatherIcon from "./weatherIcon";
import axios from "axios";

type Props = {
  firstData: WeatherEntry;
  location?: string;
};

const MainInfo = ({ firstData, location }: Props) => {
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
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  };

  return (
    <section className="flex justify-between my-8 mx-[10rem]">
      <div className="rounded-lg min-w-[13rem] max-w-20[rem]">
        <div className="flex items-center justify-center gap-2 mb-[2rem] bg-secondary_s rounded-lg py-4 pl-7 pr-9 border border-solid border-gray-100">
          <FaLocationDot
            title="Your Current Location"
            className="scale-125 cursor-pointer"
            onClick={handleCurrentLocation}
          />
          <h3 className="text-xl font-[600] text-center">{location}</h3>
        </div>
        <div className="bg-secondary_s rounded-lg py-4 px-7  border border-solid border-gray-100">
          <h1 className="text-[3rem] text-center font-[500] ml-5">
            {KelvToCels(firstData?.main.temp ?? 0)}°
          </h1>
          <h2 className="text-xl font-[600] mb-[1rem] text-center capitalize">
            {firstData.weather[0].description}
          </h2>
          <div className="flex justify-center">
            <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <WeatherIcon
          className="h-[17rem] w-[17rem] bg-secondary_s rounded-lg"
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
