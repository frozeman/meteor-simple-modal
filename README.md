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

### Using with `frozeman:template-var`

You can also use the simple modal and trigger it via a template specific `template-var`.
Just pass `template-var=true` and it will react to a template var of the template where the `{{#simpleModal}}` helper is in:

    {{#simpleModal trigger="myTemplateVariableName" template-var=true}}
        // html content
    {{/simpleModal}}

And trigger it like

    Template.myTemplate.events({
        'click button.show-modal': function(){
            if(TemplateVar.get('myTemplateVariableName', true))
                TemplateVar.set('myTemplateVariableName', false);
            else
                TemplateVar.set('myTemplateVariableName', true);
        }
    });


## Styling

The default styles are simply:

```css
div.simple-modal {
    position: absolute;
    max-width: 200px;
    background-color: #fff;

    /* ANIMATION */
    -webkit-transition-property: opacity transform;
    -moz-transition-property: opacity transform;
    -o-transition-property: opacity transform;
    transition-property: opacity transform;
    -webkit-transition-duration: 200ms;
    -moz-transition-duration: 200ms;
    -o-transition-duration: 200ms;
    transition-duration: 200ms;
}
div.simple-modal ul {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
}
div.simple-modal li {
    display: block;
}

div.simple-modal.animate {
    zoom: 1;
    filter: alpha(opacity=0);
    -webkit-opacity: 0;
    -moz-opacity: 0;
    opacity: 0;

    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: 0 95%;
    -moz-transform-origin: 0 95%;
    transform-origin: 0 95%;
}
```

To overwrite it you can either access your own class you added to the modal container, or style the `simple-modal` class itself.
