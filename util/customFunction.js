const fs = require('fs');
const util=require('../util/customFunction.js')
let async= require('async');
/****  custom function to send response in json format - START  ****/
exports.makeResponse=(res, successStatus, status, message, appVersion, data)=>{
    // response
    res.set('Access-Control-Allow-Origin', '*');
    res.status(status).json({
        Success: successStatus,
        Status: status,
        Message: message,
        AppVersion: appVersion,
        Result: data
    }); 

}


const PI= Math.PI;
exports.readTextfile= function(){
    let jsonArray = [
    ];
    return new Promise((resolve,reject)=> {
        fs.readFile('files/customers.txt', function(err, data) {
            if(err) 
                reject(err);
            var array = data.toString().split("\n");
            for(i in array) {  
                jsonArray.push(JSON.parse(array[i])); 
                  resolve(jsonArray)  
            }
        })
    })
   
}
// custom function to find the distance among lat long within certain distance
exports.findListWithinDistance=(lati,longi,dist)=> {
    let distanceResult=[
    
    ];
let lat = lati*(PI/180);
let long= longi*(PI/180);
    return new Promise((resolve,reject)=> {
          util.readTextfile().then((response)=> {
              if(response) {
                  async.forEach(response,(temp,callback)=>{
                    let latitude =temp.latitude*(PI/180); // convert the latitude in radian 
                    let longitude = temp.longitude*(PI/180); // convert the longitude in radian 
                    // find the distance within theess lat long by the given lat long
                    // 6371 is the earth radius
                    let dis=Math.acos(Math.sin(lat) * Math.sin(latitude) + Math.cos(lat) * Math.cos(latitude) * Math.cos(longitude - (long))) * 6371               
                     if(dis<=dist) {
                         temp.distance = dis;
                         let object = {
                             'user_id':temp.user_id,
                             'name':temp.name
                         }
                         distanceResult.push(object);     
                            }
                            callback();     
                  }) 
                 resolve(sortByKey(distanceResult,'user_id')); 
                    
              }
          }).catch((err)=> {
               throw err;
          })
    })
}


// custom function for sorting
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}