({
    loadRatingElement: function(component, helper, ratingElement){
        $( ratingElement ).raty({
            starOff  : '/resource/RatingPlugin/images/star_off_darkgray.png',
            starOn   : '/resource/RatingPlugin/images/star_on.png',
            click: function(score, evt) {
                if(score == null ) score = 0;
                if(component.get("v.currentRating") != score ){
                    var result = confirm('Click OK button to confirm update Rating.');
                    if( result ){
                        component.set("v.newRating", score);
                        $(".star-rating, .loading-div, .footer-contents").toggle();
                        helper.updateRating( component );
                    }else{
                        return false;
                    }
                } 
            }
        });
    },
	updateRating : function( component ){
    	// update Opportunity record with new rating.
        var action = component.get("c.updateOpportunityRating");
        action.setParams({
            recordId : component.get("v.recordId"),
            rating : component.get("v.newRating")
        });
        action.setCallback(this, function( response ){
            alert('Great! You have given new rating to this Opportunity.');
            component.set( "v.currentRating", component.get("v.newRating") );
            $(".star-rating, .loading-div, .footer-contents").toggle();
        });
        $A.enqueueAction(action);
    }
})
