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

export type WeatherDetails = {
  realFeel: string;
  windSpeed: string;
  visibility: string;
  humidity: string;
  sunrise: string;
  sunset: string;
};

const ConditionItem = (props: Props) => (
  <div className="flex items-center gap-1 xl:gap-2">
    <div className="h-7 w-7 xl:w-8 xl:h-8">{props.icon}</div>
    <div className="flex flex-col text-xs font-semibold text-gray-600 text-center items-center justify-center h-full">
      <p>{props.label}</p>
      <p>{props.value}</p>
    </div>
  </div>
);

export const AirConditions = (props: WeatherDetails) => {
  return (
    <div className="hidden lg:flex justify-between pt-2">
      <ConditionItem
        icon={<FaThermometerEmpty className="w-full h-full" />}
        label="Real Feel"
        value={props.realFeel}
      />
      <ConditionItem
        icon={<RiWindyFill className="w-full h-full" />}
        label="Wind speed"
        value={props.windSpeed}
      />
      <ConditionItem
        icon={<FaRegEye className="w-full h-full" />}
        label="Visibility"
        value={props.visibility}
      />
      <ConditionItem
        icon={<SiRainmeter className="w-full h-full" />}
        label="Humidity"
        value={props.humidity}
      />
      <ConditionItem
        icon={<TbSunrise className="w-full h-full" />}
        label="Sunrise"
        value={props.sunrise}
      />
      <ConditionItem
        icon={<TbSunset className="w-full h-full" />}
        label="Sunset"
        value={props.sunset}
      />
    </div>
  );
};
