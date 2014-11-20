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
Gets the parent template instance to get the templatevar

@method ParentTemplatesTemplateVar
@param {Object} instance
@param {String} type the type, either "get" or "set"
@param {Boolean} value TRUE or FALSE
@return {Boolean} The value to set
*/
var ParentTemplatesTemplateVar = function(instance, type, key, value){

    if(!instance.view || typeof TemplateVar === 'undefined')
        return value;

    instance = instance.view;
    // move on view up if its a #with, #if or #unless
    while((instance.name.indexOf('Template.') === -1 && instance.parentView) || instance.name === "Template.simpleModal") {
        instance = instance.parentView;
    }

    return (type === 'set')
        ? TemplateVar.set(instance.templateInstance(), key, value)
        : TemplateVar.get(instance.templateInstance(), key);
};


/**
Adds global event for canceling the modal

*/
Template['simpleModal'].rendered = function(){
    var template = this;

    template._modalDocumentClickEvent = function(e){
        if(template.find('.simple-modal') && !$(e.target).hasClass('simple-modal') && !$(e.target).parents('.simple-modal').hasClass('simple-modal') && template.data) {
            if(template.data['template-var']) {
                ParentTemplatesTemplateVar(template, 'set', template.data.trigger, false);
            } else         
                Session.set(template.data.trigger, false);
        }
    };
    $(document).on('click', template._modalDocumentClickEvent);
};

/**
Removes the global event for canceling the modal

*/
Template['simpleModal'].destroyed = function(){
    if(this._modalDocumentClickEvent)
        $(document).off('click', this._modalDocumentClickEvent);

    if(this.data && this.data.trigger) {

        if(this.data['template-var']) {
            ParentTemplatesTemplateVar(this, 'set', this.data.trigger, false);
        } else 
            Session.set(this.data.trigger, false);
    }
};


Template['simpleModal'].helpers({
    /**
    Shows or hides the modal

    */
    'showModal': function(){
        if (this.trigger) {

            if(this['template-var']) {
                return ParentTemplatesTemplateVar(Template.instance(), 'get', this.trigger);
            } else
                return Session.get(this.trigger)
        } else
            return true;
    },
})