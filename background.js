/*
 * Copyright (c) 2018 Robin Mulloy  http://robin.mulloy.ca   All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be found in the LICENSE file.
 */

 chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if(request.action == 'create_menu') {
        chrome.contextMenus.removeAll(function() {
            chrome.contextMenus.create({
                "title"     : "Dial " + request.selection, 
                "contexts"  : ["selection"],
                "id"        : "contextSelection",
                "onclick"   : onClickHandler
            });
        });
        sendResponse({'result':'created','message':request.action, 'selection':request.selection});
    } 
    else if(request.action == 'delete_menu') {
        chrome.contextMenus.removeAll();
        sendResponse({'result':'removed','message':request.action});
    }
    else {
        // uh, not sure what this is??
        sendResponse({'notsure':request});
    }
    
    return true; 
});

var settings = [
    'username',
    'password',
    'domain',
    'dest_cid_name', 
    'dest_cid_number',
    'src',
	'auto_answer',
    'rec',
    'ringback'    
];       
        
function onClickHandler(info, tab) {
    var phoneNum = info.selectionText.replace(/[^+\d]+/g,'');
    
    var url = '';
    chrome.storage.local.get(settings, function(items) {
        
        if( !items.username || !items.password ) {
            alert('Options have not been defined.');
        }
        else {
            //console.log("Calling: " + phoneNum);
            url = items.domain + "/app/click_to_call/click_to_call.php?src_cid_name=WebDialer" +
                '&src_cid_number='   + phoneNum +
                '&dest_cid_name='    + items.dest_cid_name +
                '&dest_cid_number='  + items.dest_cid_number +
                '&src='              + items.src +
                '&dest='             + phoneNum +
                '&auto_answer='      + items.auto_answer +
                '&rec='              + items.rec +
                '&ringback='         + items.ringback;
                
            var login = 'username=' + items.username + '&password=' +  items.password;
                
            //alert(url);
            //alert(login);
                
            // do a background post
            var http = new XMLHttpRequest();
            http.open("POST", url, true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            
            http.onreadystatechange = function() {
                if(http.readyState == 4 && http.status == 200) {
                    // alert(http.responseText);
                }
            }
            http.send(login);
        }
    });
};

