import {Dispatcher,Store} from './flux';
import {Calendar} from './calendar.2.js';
import {hrCalendarAPI} from './api/hrCalendarAPI';
import {hrActions} from './flux/actions/hrCalendarAction.js'
import {CalenderViewStore} from './flux/stores/hrCalendarStore.js'
const controlPanelDispatcher = new Dispatcher();
var cal = new Calendar();
cal.createCal.cache = {};
const calenderViewStore = new CalenderViewStore(controlPanelDispatcher);

calenderViewStore.addListener((state)=>{
    render(state);
});

const render = (state)=>{
    if ($.isEmptyObject(state.slots)){
    }
    else { 
       clearSlots();
        state.slots.listOfSlots.forEach((slot)=>{
            let $slotTemplate = $('#slots-template').html();
            let $slotContainer=$('.slot-container');
            // Handlebar template rendering
            let $newSlot = Handlebars.compile($slotTemplate);
            let slotsCreated = $newSlot({startTime:slot.startTime,endTime:slot.endTime});
            let $slot=$(slotsCreated);
            if(slot.candidateInfo=="yes"){
                $slot.find('.update-candy-info').hide();
                $slot.find('.view-candy-info').removeClass('d-none');
            }
            $slot.removeClass('created-slot-clone');
            $slot.attr('id',slot.slotId);     
            $slotContainer.append($slot);
        });
   

        // let $slotContainer=$('.slot-container');
        // $slotContainer.find('.created-slot-clone').hide();
        // state.slots.listOfSlots.forEach((slot) => {
        //     let $newSlot = $slotContainer.find('.created-slot-clone').clone();
        //     $newSlot.removeClass('created-slot-clone');
        //     $newSlot.attr('id',slot.slotId);
        //     $newSlot.find('.slot-time').html(slot.startTime+"-"+slot.endTime);
        //     $newSlot.show();
        //     $slotContainer.append($newSlot);
        //     if(slot.candidateInfo=="yes"){
        //         $newSlot.find('.update-candy-info').hide();
        //         $newSlot.find('.view-candy-info').removeClass('d-none');
        //     }     
        // });
    }
    if ( $.isEmptyObject(state.slotwiseCandidateInfo)){
    }
    else {

            state.slots.listOfSlots.forEach((slot)=>{
                if(state.slotwiseCandidateInfo.slotId==slot.slotId){
                    slot.candidateInfo='yes';
                }
            })
        controlPanelDispatcher.dispatch(hrActions.changeViewBtn(state.slots));
    }
    if(state.viewCandidate!=0){
        let $viewModal=$('#viewModal');
        $viewModal.modal('show');
        state.slotwiseCandidateInfo.SlotwiseCandidates.forEach((candidateSlot) =>{
            if(state.viewcandidate==candidateSlot.slotId){
                $viewModal.find('.view-c-name').html(candidateSlot.candidateInfo.name);
                $viewModal.find('.view-c-email').html(candidateSlot.candidateInfo.email); 
                $viewModal.find('.view-c-phone').html(candidateSlot.candidateInfo.phone);
                $viewModal.find('.view-c-codility').html(candidateSlot.candidateInfo.codility);   
            }
        });
    }  
}

render(calenderViewStore.getUserPreferences());

function init() { 
    cal.wrap.find("#prev").bind("click.calendar", function () { cal.switchMonth(false); }); 
    cal.wrap.find("#next").bind("click.calendar", function () { cal.switchMonth(true);  }); 
    cal.label.bind("click", function () { 
        cal.switchMonth(null, new Date().getMonth(), new Date().getFullYear());
    });        
    cal.label.click();
    $(".curr td:not('.nil')").each((element,value)=>{
        $(value).on("click",()=>{
            controlPanelDispatcher.dispatch(hrActions.getSlotsAction());  
        });
    });         
}

$('#Add').on('click',()=>{
    $('.add-slots').find('.min-time-msg').hide();
    let startTime=hrCalendarAPI.getTime($('#start-time').val());
    let endTime=hrCalendarAPI.getTime($('#end-time').val());
    let timeDiff = (endTime.timeCalc-startTime.timeCalc) / 60000; //dividing by seconds and milliseconds
    let timeDiffInMin = timeDiff % 60;
    if (timeDiffInMin>=30)
        controlPanelDispatcher.dispatch(hrActions.addSlotsAction(startTime.timeString,endTime.timeString));
    else
        $('.add-slots').find('.min-time-msg').show();
         
});

$('.slot-container').on('click','.update-candy-info',(e)=>{
    $('#myModal').modal('show');
    $('#candidate-details-form').on('submit',()=>{
        let name=$('#candidate-name').val(),
        email=$('#candidate-email').val().toLowerCase(),
        phone=$('#candidate-ph-number').val();
            controlPanelDispatcher.dispatch(hrActions.updateCandidateInfoAction($(e.currentTarget).parent().parent().attr('id'),name,email,phone));
    });
});

$('.slot-container').on('click','.view-candy-info',(e)=>{
    controlPanelDispatcher.dispatch(hrActions.viewCandidateInfoAction($(e.currentTarget).parent().parent().attr('id')));
});

init();

function clearSlots(){
    $('.slot-container').children("div:not('.created-slot-clone')").remove();
}









