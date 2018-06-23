import * as $ from 'jquery';

export class BaseApiService {
    BASE_URL = 'https://statsapi.mlb.com';

    constructor() {  }

    getData(path, method = 'GET'): Promise<any> {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: method,
                url: this.BASE_URL + path,
                success: (data) => { resolve(data); },
                    error: (err) => { reject(err); }
            });
        });
    }

    parseTimeToObject(date): any {
        const timeObj = {
            month: this.toTwoDigit((date.getMonth() + 1).toString()),
            day: this.toTwoDigit(date.getDate().toString()),
            hour: this.toTwoDigit(date.getHours().toString()),
            min: this.toTwoDigit(date.getMinutes().toString()),
            sec: this.toTwoDigit(Math.round(date.getSeconds() / 10) * 10),
            year: date.getFullYear()
        }

        timeObj['timecode'] = "" + date.getFullYear() + timeObj.month + timeObj.day + "_" + timeObj.hour + timeObj.min + timeObj.sec;

        return timeObj;

    }

    private toTwoDigit(str): string {
        if (str.length === 1) { str = '0' + str; }
        return str;
    }
}
