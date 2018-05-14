class HrCalendarAPI {
    constructor(){
        this.counter=7;
    }
    ajaxCall(url,method,data="") {
        if(data) {
            return $.ajax({
                url:url,
                contentType:"application/json",
                method:method,
                data:data, 
            });
        }
        else {
            return $.ajax({
                url:url,
                contentType:"application/json",
                method:method, 
            });
        }
    }
    getCounter() {
        return ++this.counter;
    }

    getTime(time) {
        var timeSplit = time.split(':'),
        hours,
        minutes,
        meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } 
        else if (hours < 12) {
            meridian = 'AM';
            if (hours == 0) {
                hours = 12;
            }
        }
        else {
            meridian = 'PM';
        }
        let timeString=(hours + ':' + minutes + ' ' + meridian);
        let timeCalc= new Date("01/01/2007 " + timeString);



        return {
            timeCalc : timeCalc,
            timeString : timeString
        }
        
    }
}
export const hrCalendarAPI = new HrCalendarAPI();