import { cn } from "@/utils/cn";

const DayContainer = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn("w-full bg-white py-4 flex shadow-sm", props.className)}
    />
  );
};

export default DayContainer;
