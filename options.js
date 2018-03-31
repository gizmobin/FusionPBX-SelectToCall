/*
 * Copyright (c) 2018 Robin Mulloy  http://robin.mulloy.ca   All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be found in the LICENSE file.
 */

// defaults
var settings = {
    'domain'            : 'http://pbx',
    'username'          : '',
    'password'          : '',
    'dest_cid_name'     : 'J. Smith',
    'dest_cid_number'   : '123-555-1234',
    'src'               : '1234',
    'rec'               : 'false',
    'ringback'          : 'us-ring'    
};   

function loadOptions() {
	document.querySelector('#save-button').addEventListener('click', saveOptions);
	
    chrome.storage.local.get(settings, function(items) {
        document.getElementById('domain').value = items.domain;
        document.getElementById('username').value = items.username;
        document.getElementById('password').value = items.password;
        document.getElementById('dest_cid_name').value = items.dest_cid_name;
        document.getElementById('dest_cid_number').value = items.dest_cid_number;
        document.getElementById('src').value = items.src;
        document.getElementById('rec').value = items.rec;
        document.getElementById('ringback').value = items.ringback;
    });

    // records call
	var recSelect = document.getElementById('rec');
	for (var i = 0; i < recSelect.children.length; i++) {
		var child = recSelect.children[i];
		if (child.value == rec) {
			child.selected = 'true';
			break;
		}
	}

	// ringback
	var ringbackSelect = document.getElementById('ringback');
	for (var i = 0; i < ringbackSelect.children.length; i++) {
		var child = ringbackSelect.children[i];
		if (child.value == ringback) {
			child.selected = 'true';
			break;
        }
	}
}

function saveOptions() {
	var data = {};
	data['domain'] =  document.getElementById('domain').value;
	data['username'] =  document.getElementById('username').value;
	data['password'] =  document.getElementById('password').value;
	data['dest_cid_name'] =  document.getElementById('dest_cid_name').value;
	data['dest_cid_number'] =  document.getElementById('dest_cid_number').value;
	data['src'] =  document.getElementById('src').value;
	data['rec'] =  document.getElementById('rec').value;
	data['ringback'] =  document.getElementById('ringback').value;
    
    chrome.storage.local.set(data, function() {
        setStatus('Options Saved.'); 
    });        
}

function setStatus(message) {
  var status = document.getElementById('status');
  status.innerHTML = message;
  setTimeout(function() {status.innerHTML='';}, 4000);
}

document.addEventListener('DOMContentLoaded', loadOptions);
