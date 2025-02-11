import Slider from "./slider";
import { FaThermometerEmpty } from "react-icons/fa";
import { RiWindyFill } from "react-icons/ri";
import { FaDroplet } from "react-icons/fa6";
import { MdWbSunny } from "react-icons/md";

type Props = {};

const OtherDays = (props: Props) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "GMT",
    timeZoneName: "shortGeneric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const time = new Date().toLocaleTimeString("en-US", options);
  return (
    <div className="bg-secondary_s w-[30rem] mr-[10rem] rounded-lg py-4 px-7 border border-solid border-gray-100">
      <div className="mb-[1rem]">
        <Slider />
      </div>
      <div className="flex justify-center mb-[1rem]">{time}</div>
      <div className="flex flex-col items-start gap-[1rem]">
        <h4 className="uppercase">Air Conditions</h4>
        <div className="flex gap-2">
          <FaThermometerEmpty className="w-[2rem] h-[2rem]" />
          <div className="flex flex-col">
            <p>Real Feel</p>
            <p>30°</p>
          </div>
        </div>
        <div className="flex gap-2">
          <RiWindyFill className="w-[2rem] h-[2rem]" />
          <div className="flex flex-col">
            <p>Wind</p>
            <p>0.8 km/hr</p>
          </div>
        </div>
        <div className="flex gap-2">
          <FaDroplet className="w-[2rem] h-[2rem]" />
          <div className="flex flex-col">
            <p>Chance of rain</p>
            <p>2%</p>
          </div>
        </div>
        <div className="flex gap-2">
          <MdWbSunny className="w-[2rem] h-[2rem]" />
          <div className="flex flex-col">
            <p>UV Index</p>
            <p>4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDays;
