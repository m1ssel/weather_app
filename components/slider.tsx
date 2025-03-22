import { KelvToCels } from "@/utils/kelvToCels";
import { format, parseISO } from "date-fns";
import { GetDayOrNight } from "@/utils/getDayOrNight";
import WeatherIcon from "./weatherIcon";

type SliderData = {
  list: {
    dt_txt: string;
    weather: {
      icon: string;
    }[];
    main: {
      temp: number;
    };
  }[];
};

const Slider = ({ data }: { data: SliderData }) => {
  return (
    <div className="flex overflow-x-auto w-full justify-between gap-3 sm:gap-0 scrollbar-hide">
      {data?.list.map((d, index) => (
        <div
          key={index}
          className="flex flex-col items-center lg:gap-1 text-xs font-semibold lg:pb-5"
        >
          <p className="whitespace-nowrap">
            {format(parseISO(d.dt_txt), "h:mm a")}
          </p>
          <WeatherIcon
            className="h-14 w-14"
            iconname={GetDayOrNight(d.weather[0].icon, d.dt_txt)}
          />
          <p>{KelvToCels(d?.main.temp ?? 0)}°</p>
        </div>
      ))}
    </div>
  );
};

export default Slider;
