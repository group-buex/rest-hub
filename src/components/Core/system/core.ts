export const cx = (...classNames: any[]) =>
  classNames.filter(Boolean).join(" ");

export const checkDataType = (target, dataType) => {
  return (
    Object.prototype.toString.call(target).slice(8, -1).toLowerCase() ===
    dataType.toLowerCase()
  );
};
