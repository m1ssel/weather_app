import { FaThermometerEmpty } from "react-icons/fa";
import { RiWindyFill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { TbSunrise } from "react-icons/tb";
import { TbSunset } from "react-icons/tb";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
  width?: string;
};

export type WeatherDetail = {
  realFeel: string;
  windSpeed: string;
  visibility: string;
  humidity: string;
  sunrise: string;
  sunset: string;
  weatherIcon?: string;
};

const WeatherDetailItem = (props: Props) => (
  <div className="flex flex-col justify-between gap-2 lg:gap-4 items-center text-xs font-semibold text-gray-600">
    <p className="whitespace-nowrap">{props.label}</p>
    <div className="text-3xl">{props.icon}</div>
    <p>{props.value}</p>
  </div>
);

export const WeatherInfo = (props: WeatherDetail) => {
  return (
    <>
      <WeatherDetailItem
        icon={<FaThermometerEmpty />}
        label="Real Feel"
        value={props.realFeel}
      />
      <WeatherDetailItem
        icon={<RiWindyFill />}
        label="Wind speed"
        value={props.windSpeed}
      />
      <WeatherDetailItem
        icon={<FaRegEye />}
        label="Visibility"
        value={props.visibility}
      />
      <WeatherDetailItem
        icon={<SiRainmeter />}
        label="Humidity"
        value={props.humidity}
      />
      <WeatherDetailItem
        icon={<TbSunrise />}
        label="Sunrise"
        value={props.sunrise}
      />
      <WeatherDetailItem
        icon={<TbSunset />}
        label="Sunset"
        value={props.sunset}
      />
    </>
  );
};
