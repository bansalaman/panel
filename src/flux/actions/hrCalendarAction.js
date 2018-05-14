import {hrCalendarAPI} from '../../api/hrCalendarAPI';
export const ADD_SLOTS = `ADD_SLOTS`;
export const UPDATE_CANDIDATE_INFO_ON_SLOTS=`UPDATE_CANDIDATE_INFO_ON_SLOTS`;
export const VIEW_CANDIDATE_INFO=`VIEW_CANDIDATE_INFO`;
export const GET_SLOTS=`GET_SLOTS`;
export const CHANGE_VIEW_BTN=`CHANGE_VIEW_BTN`;


class HrActions {
    constructor(){}
     changeViewBtn(data){
        return {
            data:data,
            upload : false,
            view : true
            }
        }  
     addSlotsAction(startTime,endTime){
        return {
            type:ADD_SLOTS,
            data:{
                slotId:hrCalendarAPI.getCounter(),
                startTime: startTime,
                endTime: endTime,
                empty: "yes",
                emailAddress: "",
                candidateInfo: "no"
            }
        }
    }
    getSlotsAction(){
        return {
            type:GET_SLOTS,
            data:""
            }
    }
     getSlotsActionResponse(){
         return hrCalendarAPI.ajaxCall('http://localhost:3000/DatewiseSlots/1','get');
    }
     addSlotsActionResponse(data){
        return hrCalendarAPI.ajaxCall('http://localhost:3000/DatewiseSlots/1','put',JSON.stringify(data));
    }
     viewCandidateInfoAction(data){
        return{
            type:VIEW_CANDIDATE_INFO,
            data:{}
        }
    }
     viewCandidateInfoActionResponse(data){
        return hrCalendarAPI.ajaxCall('http://localhost:4000/SlotwiseCandidateDetails/1','get');
    }
    
     updateCandidateInfoAction(id,name,email,phone){
        return{
            type:UPDATE_CANDIDATE_INFO_ON_SLOTS,
            data:{
                slotId:id,
                candidateInfo: {
                    name: name,
                    email: email,
                    phone: phone,
                    codility: ""
                }
            }
        }
    }
     updateCandidateInfoActionResponse(data){
        return hrCalendarAPI.ajaxCall('http://localhost:4000/SlotwiseCandidateDetails/1','put',JSON.stringify(data)); 
    }
}
// function ajaxCall(url,method,data="") {
//     if(data) {
//         return $.ajax({
//             url:url,
//             contentType:"application/json",
//             method:method,
//             data:data, 
//         });
//     }
//     else {
//         return $.ajax({
//             url:url,
//             contentType:"application/json",
//             method:method, 
//         });
//     }
// }
export const hrActions=new HrActions();