import { WeatherInfo } from "./weatherInfo";
import DayContainer from "./dayContainer";
import WeatherIcon from "./weatherIcon";
import { format, fromUnixTime, parseISO } from "date-fns";
import { KelvToCels } from "@/utils/kelvToCels";
import { metersToKm } from "@/utils/metersToKm";
import { ConvertWindSpeed } from "@/utils/convertWindSpeed";
import { WeatherData } from "@/types/main";

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
  temp_min?: number;
  temp_max?: number;
};

type ForecastProps = {
  forecastData?: WeatherData;
};

const DayForecast = (props: Props) => {
  return (
    <DayContainer>
      <section className="flex pl-5">
        <h2 className="flex items-center text-xl font-semibold text-gray-600 w-[8rem]">
          {props.date}
        </h2>
        <div className="flex items-center mx-7 w-[15rem]">
          <h2 className="text-[3rem] font-medium text-center w-[6rem]">
            {props.temp}°
          </h2>
          <WeatherIcon
            className="h-[5rem] w-[5rem]"
            iconname={props.weatherIcon ?? ""}
          />
        </div>
      </section>
      <section className="overflow-x-auto flex justify-between gap-4 pr-5 w-full">
        <WeatherInfo {...props} />
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
    <section className="mx-[10rem] h-[30rem] mb-6">
      <div className="bg-secondary_s w-full h-full rounded-lg border border-solid border-gray-100 flex flex-col overflow-y-auto gap-4">
        <h2 className="text-2xl font-medium text-center mt-3 pb-3 shadow-sm">
          Forecast
        </h2>
        {firstDataForEachDay.filter(Boolean).map((d, i) => (
          <DayForecast
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
          />
        ))}
      </div>
    </section>
  );
};

export default DaysForecast;
