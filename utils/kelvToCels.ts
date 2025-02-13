export const KelvToCels = (tempInKelv: number): number => {
  const tempInCels = tempInKelv - 273.15;
  return Math.floor(tempInCels);
};
