import { FaThermometerEmpty } from "react-icons/fa";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
  width?: string;
};

export type WeatherDetailPhone = {
  realFeel: string;
  windSpeed: string;
  visibility: string;
  humidity: string;
  sunrise: string;
  sunset: string;
  weatherIcon?: string;
  temp_min: string;
  temp_max: string;
};

const WeatherDetailPhoneItem = (props: Props) => (
  <div className="flex flex-col justify-between gap-2 lg:gap-4 items-center text-xs font-semibold text-gray-600">
    <p className="whitespace-nowrap">{props.label}</p>
    <div className="text-3xl">{props.icon}</div>
    <p>{props.value}</p>
  </div>
);

export const WeatherInfoPhone = (props: WeatherDetailPhone) => {
  return (
    <>
      <WeatherDetailPhoneItem
        icon={<FaThermometerEmpty />}
        label="Real Feel"
        value={props.realFeel}
      />
      <WeatherDetailPhoneItem
        icon={<FaTemperatureArrowDown />}
        label="Min"
        value={props.temp_min}
      />
      <WeatherDetailPhoneItem
        icon={<FaTemperatureArrowUp />}
        label="Max"
        value={props.temp_max}
      />
    </>
  );
};
