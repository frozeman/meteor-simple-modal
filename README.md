# Simple Modal

This package adds a simple modal menu, which can be shown using a Session variable.

![Alt text](https://raw.githubusercontent.com/frozeman/meteor-simple-modal/master/screenshot.png "Screenshot of a styled modal")

## Usage

To use the modal with a Session trigger simply add the modal somewhere in your template:

    {{#simpleModal trigger="mySessionVariableName" class="some-custom-class"}}
        // html content
    {{/simpleModal}}

If you don't pass a trigger variable the modal will be shown at all times.

Then you just need to add an action, e.g. a button click to set the Session variable to `true` or `false` and the modal will fade in or out:
    
    Template.myTemplate.events({
        'click button.show-modal': function(){
            if(Session.equals('mySessionVariableName', true))
                Session.set('mySessionVariableName', false);
            else
                Session.set('mySessionVariableName', true);
        }
    });


## Styling

The default styles are simply:

    div.simple-modal {
        position: absolute;
        width: 200px;
        background-color: #fff;

        // and a fade in/out animation using css transitions
    }

To overwrite it you can either access your own class you added to the modal container, or style the `simple-modal` class itself.