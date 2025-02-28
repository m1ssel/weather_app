import { KelvToCels } from "@/utils/kelvToCels";

const DaysWeek = ({ firstData }) => {
  return (
    <div className="bg-secondary_s w-[68rem] h-[30rem] ml-[10rem] rounded-lg py-4 px-7 border border-solid border-gray-100">
      <span>{KelvToCels(firstData?.main.temp ?? 0)}°</span>
      <p className="space-x-1 whitespace-nowrap">
        <span>Feels like</span>
        <span>{KelvToCels(firstData?.main.feels_like ?? 0)}°</span>
      </p>
      <p>
        <span>{KelvToCels(firstData?.main.temp_min ?? 0)}°↓ </span>
        <span> {KelvToCels(firstData?.main.temp_max ?? 0)}°↑</span>
      </p>
    </div>
  );
};

export default DaysWeek;
