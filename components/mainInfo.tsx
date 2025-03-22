import { FaLocationDot } from "react-icons/fa6";
import { format, parseISO } from "date-fns";
import { KelvToCels } from "@/utils/kelvToCels";
import { GetDayOrNight } from "@/utils/getDayOrNight";
import { WeatherData, WeatherEntry } from "@/types/main";
import WeatherIcon from "./weatherIcon";
import DayToday from "./dayToday";

type Props = {
  firstData: WeatherEntry;
  location?: string;
  todayData: WeatherData;
};

const MainInfo = ({ firstData, location, todayData }: Props) => {
  return (
    <section className="flex flex-col items-center lg:flex-row gap-3 lg:gap-10 mt-3 lg:mt-7 2xl:mt-6 lg:mb-4">
      <div className="rounded-lg w-full lg:w-[15rem] h-full flex flex-col sm:justify-between gap-3 lg:gap-4">
        <div className="flex items-center justify-center gap-2 bg-secondary_s rounded-lg py-3 lg:py-4 pl-7 pr-9">
          <FaLocationDot className="h-5" title="Your Current Location" />
          <h3 className="text-xl font-[600] text-center">{location}</h3>
        </div>
        <div className="bg-secondary_s rounded-lg pb-3 sm:py-3 lg:py-4 px-7">
          <h1 className="text-[3rem] text-center font-[500] mt-1 sm:mt-0 ml-5">
            {KelvToCels(firstData?.main.temp ?? 0)}°
          </h1>
          <h2 className="text-lg lg:text-xl font-[600] text-center capitalize">
            {firstData.weather[0].description}
          </h2>
          <div className="hidden lg:flex justify-center mt-4 ">
            <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
          </div>
        </div>
      </div>
      <DayToday data={todayData} firstData={firstData} />
      <div className="hidden 2xl:flex">
        <WeatherIcon
          className="w-[19rem] h-[19rem] bg-secondary_s rounded-lg"
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
