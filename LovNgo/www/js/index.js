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
const app = {

  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    document.getElementById('photo').addEventListener('click', this.deviceFound, false);
    alert(`Welcome on Lov'n'Go ! Start looking for people ?`);
    ble.isEnabled(
      () => { },
      () => { ble.enable(() => { console.log('SUCCESS: ble activate by user'); } , () => { console.log('FAILURE: ble activate by user'); }) }
    );
    ble.scan([], 60, (device) => {
      alert(`DEVICE FOUND: ${JSON.stringify(device)}`);
      this.deviceFound(device);
    }, () => { console.log('FAILURE: ble scan'); });
  },

  deviceFound: function(device) {
    const parentThis = this;
    navigator.vibrate([500, 250, 500, 250, 500]);
    if (confirm('A lovely user found near you, take a picture with him/her ;) ?')) {
      navigator.camera.getPicture(
        (picture) => { 
          console.log('SUCCESS: take pic');
          parentThis.sendLoveToServer(parentThis.getPosition, picture);
        },
        () => { console.log('FAILURE: take pic') });    
    }
  },

  togglePhoto: function (enable) {
    if (enable) {
      document.getElementById('disable').style.backgroundColor = 'rgba(0, 0, 0, 0)';    
    } else {
      document.getElementById('disable').style.backgroundColor = 'rgba(0, 0, 0, 0.25)';  
    }
  },

  getPosition: function() {
    let userPosition;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
      }
    );
    return userPosition;
  },

  sendLoveToServer: function(position, picture) {
    alert('LOVE SENT TO SERVER');
    // TODO
  }

};

app.initialize();