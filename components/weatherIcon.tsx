import { cn } from "@/utils/cn";
import Image from "next/image";

const WeatherIcon = (
  props: React.HTMLProps<HTMLDivElement> & { iconname: string; size?: number }
) => {
  return (
    <div {...props} className={cn(`relative`, props.className)}>
      <Image
        width={props.size || 100}
        height={props.size || 100}
        alt="weather"
        priority={true}
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconname}@4x.png`}
      />
    </div>
  );
};

export default WeatherIcon;
