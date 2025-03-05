import { WeatherInfo } from "./weatherInfo";
import DayContainer from "./dayContainer";
import WeatherIcon from "./weatherIcon";

type Props = {
  date: string;
  temp: number;
  weatherIcon: string;
  realFeel: string;
  windSpeed: string;
  visibility: string;
  humidity: string;
  sunrise: string;
  sunset: string;
  temp_min?: number;
  temp_max?: number;
};

const DaysForecast = (props: Props) => {
  return (
    <DayContainer>
      <section className="flex pl-5">
        <h2 className="flex items-center text-xl font-semibold text-gray-600 w-[8rem]">
          {props.date}
        </h2>
        <div className="flex items-center mx-7 w-[8.5rem]">
          <h2 className="text-[3rem] font-medium text-center w-[4rem]">
            {props.temp}°
          </h2>
          <WeatherIcon
            className="h-[5rem] w-[5rem]"
            iconName={props.weatherIcon}
          />
        </div>
      </section>
      <section className="overflow-x-auto flex justify-between gap-4 pr-5 w-full">
        <WeatherInfo {...props} />
      </section>
    </DayContainer>
  );
};

export default DaysForecast;
