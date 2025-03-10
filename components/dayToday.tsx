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
    <div className="lg:block bg-secondary_s w-full rounded-lg py-4 px-4 sm:px-7 h-full">
      <h3 className="hidden lg:flex text-xl font-medium justify-center mb-4 uppercase">
        Today
      </h3>
      <div className="">
        <Slider data={data} />
      </div>
      <h4 className="hidden lg:flex uppercase mb-4 justify-center font-medium">
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
