// JavaScript Engine -> Virtual Machine -> v8
// event queue -> single execution thread --> callback function
// long running job -> asynchronous function ?
// functional programming language
// event-triggered --> callback function --> asynchronous function
// object-based programming: {x: 0, y: 0, radius: 100, color: "red"}
// object-oriented programming: class

// application state
class CounterApp { // defines a class -> ES6
    constructor() {
        this.counter = 0;
        this.spanCounter = null;
        // this.init = this.init.bind(this);
        // this.incrementAndUpdateView = this.incrementAndUpdateView.bind(this);
    }
    incrementAndUpdateView = () => { // for every second
        this.counter++;
        this.spanCounter.innerHTML = this.counter.toString();
    }

    init = () => {
        this.spanCounter = document.querySelector(".counter")
        // Timeout Event -- after 1 sec -- TimeOut Event - ...
        // register callback function :
        // TimeOut Event --> incrementAndUpdateView
        // setInterval async
        window.setInterval(this.incrementAndUpdateView, 1000)
    }
}
// let counter = 0;
// let spanCounter ;
let counterApp = new CounterApp()

// jQuery : $(document).ready(app);
// register callback function :
window.onload = counterApp.init // On-load Event -> callback function (app)
