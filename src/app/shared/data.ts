import { Injectable } from '@angular/core';

@Injectable()
export class Data {

    public storage: any;
    public storage2: any;
    public setValue(val,val1) {
        this.storage = val;
        this.storage2 = val1;
    }

    public getVal(){
        var data =this.storage +'/' + this.storage2;
        return data ;
    }
    public constructor() { }

}