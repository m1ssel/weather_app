import { AirConditions } from "./airConditions";
import Slider from "./slider";

const DayToday = ({ data }) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "GMT",
    timeZoneName: "shortGeneric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const time = new Date().toLocaleTimeString("en-US", options);
  return (
    <div className="bg-secondary_s w-[30rem] mr-[10rem] rounded-lg py-4 px-7 border border-solid border-gray-100">
      <h3 className="flex text-xl font-medium justify-center mb-5 uppercase">
        Today
      </h3>
      <div className="mb-[1rem]">
        <Slider data={data} />
      </div>
      {/* <div className="flex justify-center mb-[1rem]">{time}</div> */}
      <h4 className="flex uppercase mb-[2rem] justify-center font-medium">
        Air Conditions
      </h4>
      <AirConditions />
    </div>
  );
};

export default DayToday;
