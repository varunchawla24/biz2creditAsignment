const util= require('../util/customfunction.js');
const config = require('../config/appConstant.js');;
const locale = require('../locale/message.js')
class UserController {
    constructor() {}
// get the lit of customers which is in the range of 100 km 
   getCustomerData(req,res) {
       // defafult paramters for dublin 
      let lat=req.query.lat?req.query.lat:53.339428;
      let long=req.query.lat?req.query.lat:-6.257664;
      let dist= req.query.dis?req.query.dis:100;
      // calling of function 
      util.findListWithinDistance(lat,long,dist).then((response)=> {
          // return the success response 
       util.makeResponse(res,true,config.success,locale.success,config.appVersion,response); 
      }).catch((err)=>{
    util.makeResponse(res,false,config.badRequest,locale.error,config.appVersion,err);
      })
   }
}

module.exports = UserController;