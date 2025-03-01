import { FaThermometerEmpty } from "react-icons/fa";
import { RiWindyFill } from "react-icons/ri";
import { FaDroplet } from "react-icons/fa6";
import { MdWbSunny } from "react-icons/md";

export const AirConditions = () => {
  return (
    <div className="flex flex-col items-start gap-[3rem]">
      <div className="flex gap-[5rem]">
        <div className="flex gap-2 w-[160px]">
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
      </div>
      <div className="flex gap-[5rem]">
        <div className="flex gap-2 w-[160px]">
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
