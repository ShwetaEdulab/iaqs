import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }
 
    sendMessage(msg: string){
        this.socket.emit("messagefromclient", msg);
    }
    //  getMessage() {
    //     return this.socket
    //         .fromEvent("messagefromserver")
    //         .map( data => data['person'] );
    // }
    getMessage(){
      this.socket.on('messagefromserver',function(value){
       // console.log("value name "+ value.name);
      });
      
    }


    getProfileCompleteness(id){
           this.socket.emit('profilecomp',{id});
      
    }

    getCartvalue(userid){
      this.socket.emit('cart',{userid});
}

    getvalue()
    {
      this.socket.on('profilevalue',function(value){
        
       return value;
      });
    }
}
