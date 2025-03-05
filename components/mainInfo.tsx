import { FaLocationDot } from "react-icons/fa6";
import { format, parseISO } from "date-fns";
import { KelvToCels } from "@/utils/kelvToCels";
import { GetDayOrNight } from "@/utils/getDayOrNight";
import { WeatherData, WeatherEntry } from "@/types/main";
import WeatherIcon from "./weatherIcon";

type Props = {
  data: WeatherData;
  firstData: WeatherEntry;
};

const MainInfo = ({ data, firstData }: Props) => {
  return (
    <section className="flex justify-between my-8">
      <div className="ml-[10rem] rounded-lg w-[15rem]">
        <div className="flex items-center justify-center gap-2 mb-[2rem] bg-secondary_s rounded-lg py-4 pl-7 pr-9 border border-solid border-gray-100">
          <FaLocationDot className="scale-125" />
          <h3 className="text-xl font-[600]">{data?.city.name}</h3>
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
      <div className="mr-[10rem] flex">
        <WeatherIcon
          className="h-[17rem] w-[17rem] bg-secondary_s rounded-lg"
          size={500}
          iconName={GetDayOrNight(
            firstData?.weather[0]?.icon ?? "weather-icon",
            firstData?.dt_txt ?? ""
          )}
        />
      </div>
    </section>
  );
};

export default MainInfo;
