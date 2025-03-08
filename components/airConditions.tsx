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
  <div className="flex gap-2 w-[150px]">
    <div className="w-[2rem] h-[2rem]">{props.icon}</div>
    <div className="flex flex-col">
      <p>{props.label}</p>
      <p>{props.value}</p>
    </div>
  </div>
);

export const AirConditions = (props: WeatherDetails) => {
  return (
    <div className="flex justify-between">
      <ConditionItem
        icon={<FaThermometerEmpty className="w-full h-full mt-2" />}
        label="Real Feel"
        value={props.realFeel}
      />
      <ConditionItem
        icon={<RiWindyFill className="w-full h-full mt-2" />}
        label="Wind speed"
        value={props.windSpeed}
      />
      <ConditionItem
        icon={<FaRegEye className="w-full h-full mt-2" />}
        label="Visibility"
        value={props.visibility}
      />
      <ConditionItem
        icon={<SiRainmeter className="w-full h-full mt-2" />}
        label="Humidity"
        value={props.humidity}
      />
      <ConditionItem
        icon={<TbSunrise className="w-full h-full mt-2" />}
        label="Sunrise"
        value={props.sunrise}
      />
      <ConditionItem
        icon={<TbSunset className="w-full h-full mt-2" />}
        label="Sunset"
        value={props.sunset}
      />
    </div>
  );
};
