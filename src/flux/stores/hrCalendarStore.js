import {Dispatcher,Store} from '../../flux';
import {hrActions} from '../actions/hrCalendarAction.js'
import {ADD_SLOTS,UPDATE_CANDIDATE_INFO_ON_SLOTS,VIEW_CANDIDATE_INFO,GET_SLOTS,CHANGE_VIEW_BTN} from '../actions/hrCalendarAction.js'
const controlPanelDispatcher = new Dispatcher();

export class CalenderViewStore extends Store {
    getInitialState() {
        return {
            slots:{},
            slotwiseCandidateInfo:{},
            viewBtn :{
                change : false,
                viewid : ""
            },
            viewCandidate:0
        }
    }

    __onDispatch(action) {
        switch(action.type) {
            case ADD_SLOTS:
                hrActions.getSlotsActionResponse().then((res)=>{
                    res.listOfSlots.push(action.data);
                    hrActions.addSlotsActionResponse(res).then((response)=>{
                        this.__state.slots = response;
                        this.__emitChange();
                    }); 
                });
            break;
            
            case GET_SLOTS:
                hrActions.getSlotsActionResponse().then((res)=>{
                    console.log(res);
                    this.__state.slots = res;
                    this.__emitChange();
                });
            break;

            case UPDATE_CANDIDATE_INFO_ON_SLOTS:
                hrActions.viewCandidateInfoActionResponse().then((res)=>{
                    res.SlotwiseCandidates.push(action.data);
                    hrActions.updateCandidateInfoActionResponse(res).then((response)=>{
                        this.__state.slotwiseCandidateInfo = response;
                        this.__emitChange();
                    });
                });  
            break;

            case VIEW_CANDIDATE_INFO:
                hrActions.viewCandidateInfoActionResponse().then((res)=>{
                    this.__state.viewCandidate=action.data,
                    this.__state.slotwiseCandidateInfo = res;
                    this.__emitChange();
                });
            break;

            case CHANGE_VIEW_BTN : 
                hrActions.addSlotsActionResponse(action.data).then((response)=>{
                    this.__state.slots = response;
                    this.__emitChange();
                }); 
            break;
        }

    }

    getUserPreferences(){
        return this.__state;
    }
}
