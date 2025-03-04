import { MainWeather, WeatherData, WeatherEntry } from "@/types/main";
import { format, fromUnixTime, parseISO } from "date-fns";
import { AirConditions } from "./airConditions";
import { DayTodayProps } from "./dayToday";
import { KelvToCels } from "@/utils/kelvToCels";
import { ConvertWindSpeed } from "@/utils/convertWindSpeed";
import { metersToKm } from "@/utils/metersToKm";
import DayContainer from "./dayContainer";
import WeatherIcon from "./weatherIcon";

type Props = DayTodayProps &
  MainWeather & {
    data: WeatherData;
    firstData: WeatherEntry;
    d: WeatherEntry;
    weatherIcon: string;
  };

const DaysForecast = ({ data, d, weatherIcon }: Props) => {
  return (
    <div className="bg-secondary_s w-[68rem] h-[30rem] ml-[10rem] rounded-lg py-4 px-7 border border-solid border-gray-100">
      {/* <span>{KelvToCels(firstData?.main.temp ?? 0)}°</span>
      <p className="space-x-1 whitespace-nowrap">
        <span>Feels like</span>
        <span>{KelvToCels(firstData?.main.feels_like ?? 0)}°</span>
      </p>
      <p>
        <span>{KelvToCels(firstData?.main.temp_min ?? 0)}°↓ </span>
        <span> {KelvToCels(firstData?.main.temp_max ?? 0)}°↑</span>
      </p> */}
      <DayContainer>
        <section>
          <h2>{format(parseISO(d?.dt_txt ?? ""), "EEEE")}</h2>
          <WeatherIcon iconName={weatherIcon} />
        </section>
        <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
          <AirConditions
            realFeel={`${KelvToCels(d?.main.feels_like)} °C`}
            windSpeed={`${ConvertWindSpeed(d?.wind.speed)} km/h`}
            visibility={`${metersToKm(d?.visibility)} km`}
            humidity={`${d?.main.humidity}%`}
            sunrise={format(fromUnixTime(data?.city.sunrise), "HH:mm")}
            sunset={format(fromUnixTime(data?.city.sunset), "HH:mm")}
            weatherIcon={d?.weather[0].icon}
            temp_min={KelvToCels(d?.main.temp_min)}
            temp_max={KelvToCels(d?.main.temp_max)}
          />
        </section>
      </DayContainer>
    </div>
  );
};

export default DaysForecast;
