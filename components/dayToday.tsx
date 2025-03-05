import { AirConditions } from "./airConditions";
import { MainWeather, WeatherData, Wind } from "@/types/main";
import { metersToKm } from "@/utils/metersToKm";
import { fromUnixTime } from "date-fns";
import { format } from "date-fns";
import { KelvToCels } from "@/utils/kelvToCels";
import { ConvertWindSpeed } from "@/utils/convertWindSpeed";
import Slider from "./slider";

export type DayTodayProps = {
  data: WeatherData;
  firstData: {
    main: MainWeather;
    wind: Wind;
    visibility: number;
  };
};

const DayToday = ({ data, firstData }: DayTodayProps) => {
  return (
    <div className="bg-secondary_s w-[30rem] mr-[10rem] rounded-lg py-4 px-7 border border-solid border-gray-100 h-full">
      <h3 className="flex text-xl font-medium justify-center mb-5 uppercase">
        Today
      </h3>
      <div className="mb-[1rem]">
        <Slider data={data} />
      </div>
      <h4 className="flex uppercase mb-[2rem] justify-center font-medium">
        Air Conditions
      </h4>
      <AirConditions
        realFeel={`${KelvToCels(firstData.main.feels_like)} °C`}
        windSpeed={`${ConvertWindSpeed(firstData.wind.speed)} km/h`}
        visibility={`${metersToKm(firstData.visibility)} km`}
        humidity={`${firstData.main.humidity}%`}
        sunrise={format(fromUnixTime(data?.city.sunrise), "HH:mm")}
        sunset={format(fromUnixTime(data?.city.sunset), "HH:mm")}
      />
    </div>
  );
};

export default DayToday;
