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
    String(format.getDate()).padStart(2, '0') + "/" +
    String(format.getMonth() + 1).padStart(2, '0') + " " +
    String(format.getHours()).padStart(2, '0') + ":" +
    String(format.getMinutes()).padStart(2, '0') + ":" +
    String(format.getSeconds()).padStart(2, '0')
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

export function fixedToPercentage(number) {
  return (number * 100).toFixed(0) + "%";
}

export function fixedToIntWithouPercentage(number) {
  return (number).toFixed(0);
}

export function fixedToMs(number) {
  return (number * 1000).toFixed(0);
}

export function formatToMegabytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

export function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export function formatTime(time) {
  let teste = time * 1000
  teste = parseFloat(teste).toFixed(0)
  if (String(teste).length <= 3) {
    return teste + "ms"
  }
  if (String(teste).length > 3) {
    return parseFloat(time).toFixed(0) + "s"
  }
}

export function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);

  var dDisplay = d + (d === 1 ? " dia, " : " dias, ");
  // var dDisplay = d > 0 ? d + (d === 1 ? " dia, " : " dias, ") : "";
  // var hDisplay = h > 0 ? h + (h === 1 ? " hora, " : " horas, ") : "";
  // var mDisplay = m > 0 ? m + (m === 1 ? " minuto, " : " minutos, ") : "";
  // var sDisplay = s > 0 ? s + (s === 1 ? " segundo" : " segundos") : "";
  return dDisplay + String(h).padStart(2, '0') + ":" + String(m).padStart(2, '0') + ":" + String(s).padStart(2, '0');
}