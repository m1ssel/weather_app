import { AirConditions } from "./airConditions";
import { MainWeather, WeatherData, Wind } from "@/types/main";
import Slider from "./slider";

type Props = {
  data: WeatherData;
  firstData: {
    main: MainWeather;
    wind: Wind;
  };
};

const DayToday = ({ data, firstData }: Props) => {
  return (
    <div className="bg-secondary_s w-[30rem] mr-[10rem] rounded-lg py-4 px-7 border border-solid border-gray-100">
      <h3 className="flex text-xl font-medium justify-center mb-5 uppercase">
        Today
      </h3>
      <div className="mb-[1rem]">
        <Slider data={data} />
      </div>
      <h4 className="flex uppercase mb-[2rem] justify-center font-medium">
        Air Conditions
      </h4>
      <AirConditions
        realFeel={firstData.main.feels_like}
        humidity={firstData.main.humidity}
        windSpeed={firstData.wind.speed}
        pressure={firstData.main.pressure}
      />
    </div>
  );
};

export default DayToday;
