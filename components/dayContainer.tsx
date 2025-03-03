import { cn } from "@/utils/cn";

const DayContainer = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        props.className
      )}
    >
      Container
    </div>
  );
};

export default DayContainer;
