/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

window.onerror = function(e){
    alert(e);
}

var socket;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        socket = io.connect('https://infinite-sea-77086.herokuapp.com/');
        // socket = io.connect('http://localhost:3001/');
        socket.on('connect', socketStuff);
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
        this.tick();
        setInterval(this.tick.bind(this),100);
    },
    tick: function(){
        document.querySelector('.current-time').innerText = moment().format('h:mm a');
    }
};

function socketStuff() {
    socket.on('text', function(data) {
        console.log('socket connected');
    });
    
    socket.on('weather', function(data) {
        data = JSON.parse(decodeURIComponent(data));
        console.log(data);
        displayWeather(data.hourly.data.slice(0,24));
    });
    
    socket.on('hn-topstories', function(data) {
        data = JSON.parse(decodeURIComponent(data));
        console.log(data);
        displayTopStories(data);
    });
    
    socket.on('hn-topcomment', function(data) {
        data = JSON.parse(decodeURIComponent(data));
        console.log(data);
        displayTopComment(data);
    });
}
