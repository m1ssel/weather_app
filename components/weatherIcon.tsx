import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { iconName: string; size?: number }
) {
  return (
    <div {...props} className={cn(`relative`, props.className)}>
      <Image
        width={props.size || 100}
        height={props.size || 100}
        alt="weather"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
      />
    </div>
  );
}
