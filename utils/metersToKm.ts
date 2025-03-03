export const metersToKm = (visibilityInM: number) => {
  const visibilityInKm = visibilityInM / 1000;
  return `${visibilityInKm.toFixed(0)}`;
};
