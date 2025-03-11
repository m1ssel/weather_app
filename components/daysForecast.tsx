import { WeatherInfo } from "./weatherInfo";
import { format, fromUnixTime, parseISO } from "date-fns";
import { KelvToCels } from "@/utils/kelvToCels";
import { metersToKm } from "@/utils/metersToKm";
import { ConvertWindSpeed } from "@/utils/convertWindSpeed";
import { WeatherData } from "@/types/main";
import { WeatherInfoPhone } from "./weatherInfoPhone";
import DayContainer from "./dayContainer";
import WeatherIcon from "./weatherIcon";

type Props = {
  date?: string;
  temp?: number;
  weatherIcon?: string;
  realFeel: string;
  windSpeed: string;
  visibility: string;
  humidity: string;
  sunrise: string;
  sunset: string;
  temp_min: string;
  temp_max: string;
};

type ForecastProps = {
  forecastData?: WeatherData;
};

const DayF = (props: Props) => {
  return (
    <DayContainer>
      <section className="flex pl-4 sm:pl-5 w-[40%] lg:w-fit">
        <h2 className="flex items-center text-lg sm:text-xl font-semibold text-gray-600 w-4 md:w-10 lg:w-[8rem]">
          <span className="hidden lg:inline">{props.date}</span>
          <span className="inline lg:hidden">{props.date?.slice(0, 3)}</span>
        </h2>
        <div className="flex items-center justify-center lg:justify-between ml-7 lg:mx-7 w-[8rem] md:w-[8rem] xl:w-[10rem]">
          <h2 className="text-4xl xl:text-5xl font-medium text-center w-[4rem] hidden sm:block">
            {props.temp}°
          </h2>
          <WeatherIcon
            className="h-12 w-12 md:h-14 md:w-14 xl:h-20 xl:w-20"
            iconname={props.weatherIcon ?? ""}
          />
        </div>
      </section>
      <section className="hidden sm:flex overflow-x-auto justify-between gap-2 sm:gap-0 pr-5 w-full">
        <WeatherInfo {...props} />
      </section>
      <section className="flex sm:hidden flex-row overflow-x-auto justify-between gap-2 sm:gap-0 pr-5 w-full">
        <WeatherInfoPhone {...props} />
      </section>
    </DayContainer>
  );
};

const DaysForecast = ({ forecastData }: ForecastProps) => {
  const uniqueDates = [
    ...new Set(
      forecastData?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDay = uniqueDates.map((date) => {
    return forecastData?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
  return (
    <section className="h-[30rem] mb-3 sm:mb-6 overflow-y-auto">
      <div className="bg-secondary_s w-full h-full rounded-lg border border-solid border-gray-100 flex flex-col overflow-y-auto gap-1 sm:gap-3 lg:gap-4 scrollbar-hide">
        <h2 className="text-2xl font-medium text-center mt-3 pb-3 shadow-sm hidden lg:block">
          Forecast
        </h2>
        {firstDataForEachDay.filter(Boolean).map((d, i) => (
          <DayF
            key={i}
            weatherIcon={d?.weather[0].icon ?? ""}
            date={d?.dt_txt ? format(parseISO(d.dt_txt), "EEEE") : ""}
            realFeel={`${KelvToCels(d?.main.feels_like ?? 0)} °C`}
            temp={KelvToCels(d?.main.temp ?? 0)}
            humidity={`${d?.main.humidity}%`}
            sunrise={format(
              fromUnixTime(forecastData?.city.sunrise ?? 0),
              "HH:mm"
            )}
            sunset={format(
              fromUnixTime(forecastData?.city.sunset ?? 0),
              "HH:mm"
            )}
            visibility={`${metersToKm(d?.visibility ?? 0)} km`}
            windSpeed={`${ConvertWindSpeed(d?.wind.speed ?? 0)} km/h`}
            temp_max={`${KelvToCels(d?.main.temp_max ?? 0)} °C`}
            temp_min={`${KelvToCels(d?.main.temp_min ?? 0)} °C`}
          />
        ))}
      </div>
    </section>
  );
};

export default DaysForecast;
