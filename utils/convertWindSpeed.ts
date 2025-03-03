export const ConvertWindSpeed = (speedInMPS: number): string => {
  const speedInKPH = speedInMPS * 3.6;
  return `${speedInKPH.toFixed(0)}`;
};
