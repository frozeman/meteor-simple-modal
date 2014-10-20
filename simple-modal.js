/**
Template Controllers

@module Templates
**/

/**
The modal template.
Set a trigger session variable, adn set it to true to show the modal.
If you don't set a trigger, the modal will always be visible.

    {{#simpleModal trigger="mySessionVariableName" class="some-custom-class-to-add-to-the-modal-div"}}
        // modal html content
    {{/simpleModal}}

@class [template] simpleModal
@constructor
**/


/**
Adds global event for canceling the modal

*/
Template['simpleModal'].rendered = function(){
    var template = this;

    template._modalDocumentClickEvent = function(e){
        if(template.find('.simple-modal') && !$(e.target).hasClass('simple-modal') && !$(e.target).parents('.simple-modal').hasClass('simple-modal') && template.data)
            Session.set(template.data.trigger, false);
    };
    $(document).on('click', template._modalDocumentClickEvent);
};

/**
Removes the global event for canceling the modal

*/
Template['simpleModal'].destroyed = function(){
    if(this._modalDocumentClickEvent)
        $(document).off('click', this._modalDocumentClickEvent);

    if(this.data && this.data.trigger)
        Session.set(this.data.trigger, false);
};


Template['simpleModal'].helpers({
    /**
    Shows or hides the modal

    */
    'showModal': function(){
        return (this.trigger) ? Session.get(this.trigger) : true;
    },
})