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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    postButton.addEventListener('click', setLocalStorage, setLocation, vibrationPattern)
    addCameraButton.addEventListener('click', cameraTakePicture)
    addMediaButton.addEventListener('click', cameraGetPicture)
}

const addNewContent = document.getElementById('createNewReport');
const newReport = document.getElementById('newPost');
const postButton = document.createElement('button');
const newCard = document.getElementById('newCard');
const newPost = document.createElement('form');
const newH3 = document.createElement('h3');
const p_title = document.createElement('p');
const labelT = document.createElement('label');
const p_report = document.createElement('p');
const labelR = document.createElement('label');
const inputTitle = document.createElement('input');
const inputReport = document.createElement('textarea');
const addMediaButton = document.createElement('button');
const addCameraButton = document.createElement('button');
const img = document.createElement('img');
const currentLocation = document.createElement('div');

addNewContent.addEventListener('click', newSituation)
postButton.addEventListener('click', postSituation)


    
function newSituation() {
        console.log('working');

    newPost.classList.add('newReportCard');
    inputTitle.classList.add('new-title');
    inputReport.classList.add('new-report');
    addMediaButton.classList.add('btn');
    addCameraButton.classList.add('btn');
    postButton.classList.add('submitBtn');

    newH3.textContent = 'Report a new situation: ';
    postButton.textContent = 'Post';
    addMediaButton.textContent = 'Add Media';
    addCameraButton.textContent = 'Open Camera';

    labelT.textContent = 'Add situation type:- ';
    labelR.textContent = 'Describe situation:- ';

    p_title.appendChild(labelT).setAttribute('for', 'inputTitle');
    p_report.appendChild(labelR).setAttribute('for', 'inputReport');
    inputTitle.placeholder = 'Type of report';
    inputReport.placeholder = 'Describe situation';
    


    newPost.appendChild(newH3);
    newPost.appendChild(p_title);
    newPost.appendChild(inputTitle);
    newPost.appendChild(p_report);
    newPost.appendChild(inputReport);
    newPost.appendChild(addMediaButton);
    newPost.appendChild(addCameraButton);
    newPost.appendChild(postButton);

    newCard.appendChild(newPost);
    
}


function postSituation(e) {
    e.preventDefault();
    console.log('pressed!')

    const postLi = document.createElement('li');
    const postH2 = document.createElement('h2');
    const postPara = document.createElement('p');

    postLi.classList.add('timeline_content');
    postH2.classList.add('post_header');

    const titleInput = inputTitle.value;
    const reportInput = inputReport.value;

    console.log(titleInput);
    console.log(reportInput);

    const titleTextNode = document.createTextNode(titleInput);
    const reportTextNode = document.createTextNode(reportInput);

    postH2.appendChild(titleTextNode);
    postPara.appendChild(reportTextNode);

    console.log(titleTextNode + reportTextNode);
    
    postLi.appendChild(postH2);
    postLi.appendChild(postPara);

    newReport.appendChild(postLi);

    inputTitle.value = '';
    inputReport.value = '';
    
}

// set camera take picture plugin
function cameraTakePicture(e) {
    e.preventDefault();
    console.log ("shutter!");
    navigator.camera.getPicture(onSuccess, onFail, {  
       quality: 50, 
       destinationType: Camera.DestinationType.DATA_URL 
    });  
    
    function onSuccess(imageData) { 
       img.src = "data:image/jpeg;base64," + imageData; 
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 
 }

 //set camera get media
 function cameraGetPicture(e) {
    e.preventDefault();
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
       destinationType: Camera.DestinationType.DATA_URL,
       sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
 
    function onSuccess(imageURL) {
       var image = document.getElementById('myImage');
       image.src = imageURL;
    }
 
    function onFail(message) {
       alert('Failed because: ' + message);
    }
 
 }

 //set geolocation plugin
 function setLocation() {
    var options = {
       enableHighAccuracy: true,
       maximumAge: 3600000
    }
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
 
    function onSuccess(position) {
       const currentLocation = ('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');

        currentLocation.innerHTML = currentLocation;
    };
 
    function onError(error) {
        currentLocation.innerHTML = `Error getting location: ${error.message}`;
    }

    navigator.geolocation.clearWatch(watchID);
 }

 //setting vibration plugin
 function vibrationPattern() {
    var pattern = [1000, 1000, 1000, 1000];
    navigator.vibrate(pattern);
 }

//set local storage
function setLocalStorage() { 
    localStorage.setItem("title", inputTitle.value); 
    localStorage.setItem("comment", inputReport.value);
 }