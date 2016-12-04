export function getFormattedDate(date1) {
  var date = new Date(date1);
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  var hour = date.getHours().toString();
  hour = hour.length > 1 ? hour : '0' + hour;
  var minutes = date.getMinutes().toString();
  minutes = minutes.length > 1 ? minutes : '0' + minutes;
  var seconds = date.getSeconds().toString();
  seconds = seconds.length > 1 ? seconds : '0' + seconds;
  return hour + ':' + minutes + ':' + seconds + ' ' + month + '/' + day + '/' + year;
}

export function nextday(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1 , date.getHours(), date.getMinutes(),date.getSeconds());
}
export function nextweek(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()+7 , date.getHours(), date.getMinutes(),date.getSeconds());
}
export function nextmonth(date){
    return new Date(date.getFullYear(), date.getMonth()+1, date.getDate() , date.getHours(), date.getMinutes(),date.getSeconds());
}
export function nextyear(date){
    return new Date(date.getFullYear()+1, date.getMonth(), date.getDate() , date.getHours(), date.getMinutes(),date.getSeconds());
}
export function previewsday(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()-1 , date.getHours(), date.getMinutes(),date.getSeconds());
}

export function previewsweek(date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()-7 , date.getHours(), date.getMinutes(),date.getSeconds());
}
export function previewsmonth(date){
    return new Date(date.getFullYear(), date.getMonth()-1, date.getDate() , date.getHours(), date.getMinutes(),date.getSeconds());
}
export function previewsyear(date){
    return new Date(date.getFullYear()-1, date.getMonth(), date.getDate() , date.getHours(), date.getMinutes(),date.getSeconds());
}
export function objectIdFromDate(date) {
 	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};
export function dateFromObjectId(objectId) {
   	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};