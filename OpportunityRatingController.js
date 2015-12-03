({
	doInit : function(component, event, helper) {
		// load raty rating plugin.
        var ratingElement = component.find("starRating").getElement();
        helper.loadRatingElement( component, helper, ratingElement );
        
        // Get current rating for Opportunity
        var action = component.get("c.getOpportunityCurrentRating");
        action.setParams({
            recordId : component.get("v.recordId")
        });
        action.setCallback(this, function( response ){
            // update current rating attribute and set raty with current rating.
			component.set("v.currentRating", response.getReturnValue());
            $(ratingElement).raty('set', { score: response.getReturnValue() });
            $(".star-rating, .loading-div, .footer-contents").toggle();
		});
        $A.enqueueAction(action);
	}
})
