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

type WeatherDetails = {
  realFeel: string;
  windSpeed: string;
  visibility: string;
  humidity: string;
  sunrise: string;
  sunset: string;
};

const ConditionItem = (props: Props) => (
  <div className="flex gap-2 w-[160px]">
    {/* <props.icon className="w-[2rem] h-[2rem]" /> */}
    <div className="w-[2rem] h-[2rem]">{props.icon}</div>
    <div className="flex flex-col">
      <p>{props.label}</p>
      <p>{props.value}</p>
    </div>
  </div>
);

export const AirConditions = (props: WeatherDetails) => {
  const {
    realFeel = "5",
    windSpeed = "7km/h",
    visibility = "25km",
    humidity = "61%",
    sunrise = "6.20",
    sunset = "18.48",
  } = props;
  return (
    <div className="flex flex-col items-start gap-[1rem]">
      <div className="flex gap-[5rem]">
        <ConditionItem
          icon={<FaThermometerEmpty />}
          label="Real Feel"
          value={realFeel}
        />
        <ConditionItem
          icon={<RiWindyFill />}
          label="Wind speed"
          value={windSpeed}
        />
      </div>
      <div className="flex gap-[5rem]">
        <ConditionItem
          icon={<FaRegEye />}
          label="Visibility"
          value={visibility}
        />
        <ConditionItem
          icon={<SiRainmeter />}
          label="Humidity"
          value={humidity}
        />
      </div>
      <div className="flex gap-[5rem]">
        <ConditionItem icon={<TbSunrise />} label="Sunrise" value={sunrise} />
        <ConditionItem icon={<TbSunset />} label="Sunset" value={sunset} />
      </div>
    </div>
  );
};
