import { KelvToCels } from "@/utils/kelvToCels";
import { format, parseISO } from "date-fns";
import WeatherIcon from "./weatherIcon";
import { GetDayOrNight } from "@/utils/getDayOrNight";

type SliderData = {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
};

export const Slider = ({ data }: { data: SliderData }) => {
  return (
    <div className="flex gap-3 sm:gap-6 overflow-x-auto w-full justify-between">
      {data?.list.map((d, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-1 text-xs font-semibold pb-5"
        >
          <p className="whitespace-nowrap">
            {format(parseISO(d.dt_txt), "h:mm a")}
          </p>
          {/* <WeatherIcon iconName={d.weather[0].icon} /> */}
          <WeatherIcon iconName={GetDayOrNight(d.weather[0].icon, d.dt_txt)} />
          <p>{KelvToCels(d?.main.temp ?? 0)}°</p>
        </div>
      ))}
    </div>
  );
};

export default Slider;
