export function formartDate(date) {
  let dformat =
    String(date.getDate()).padStart(2, '0') + "-" +
    String(date.getMonth() + 1).padStart(2, '0') + "-" +
    String(date.getFullYear()) + "-" +
    String(date.getHours()).padStart(2, '0') + "-" +
    String(date.getMinutes()).padStart(2, '0') + "-" +
    String(date.getSeconds()).padStart(2, '0')
  return dformat
}

export function dateFormatter(date) {
  let format = new Date(date)
  let dformat =
    String(format.getUTCDate()).padStart(2, '0') + "/" +
    String(format.getUTCMonth() + 1).padStart(2, '0') + " " +
    String(format.getUTCHours()).padStart(2, '0') + ":" +
    String(format.getUTCMinutes()).padStart(2, '0') + ":" +
    String(format.getUTCSeconds()).padStart(2, '0')
  return dformat
};

export function fixedDecimal(floatNumber) {
  return floatNumber.toFixed(2);
}

export function formatPercentage(number, isPercentage) {
  if (isPercentage) {
    return (number).toFixed(2);
  }
  return (number * 100).toFixed(2);
}

export function fixedToInt(number) {
  return (number * 100).toFixed(0);
}

export function fixedToIntWithouPercentage(number) {
  return (number).toFixed(0);
}

export function formatToMegabytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}