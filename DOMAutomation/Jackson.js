

(function(global){



var Jackson = function(id){
    return new Jackson.createJacksonInstance(id);

}


Jackson.createJacksonInstance = function(id){
    if(id.constructor!=Array) {
        this.selector = global.document.getElementById(id);
        if (!this.selector) {
            this.selector = global.document.createElement(id);
        }
    }
    else{
        var length = id.length;
        var valid = true;
        this.selector = [];

        while(length-- ){
            var element = global.document.getElementById(id[length]);
            this.selector.push(element);
            if(!element){
                valid = false;
                break;
            }
        }

        if(!valid) {
            var length = id.length;
            this.selector = [];
            while (length--) {
                this.selector.push(global.document.createElement(id[length]))
            }
        }
    }

};


Jackson.createJacksonInstance.prototype = {

    addClass: function(className) {
        if (this.selector.constructor != Array)
        {
            if (className) {
                if (className.constructor == Array) {
                    var length = className.length;
                    while (length--) {
                        this.selector.classList.add(className[length])
                    }
                }
                else {
                    this.selector.classList.add(className);
                }
            }
            else {

                return this.selector.classList;
            }
    }
    else
        {
            var selLength = this.selector.length;
            if (className) {

                while(selLength--) {
                    if (className.constructor == Array) {
                        var length = className.length;
                        while (length--) {
                            this.selector[selLength].classList.add(className[length])
                        }
                    }
                    else {
                        this.selector[selLength].classList.add(className);
                    }
                }
            }
            else {
                var classList = [];
                while(selLength--){
                    classList.push(this.selector[selLength].classList)
                }
                return classList;

            }
        }

    },

    removeClass: function(className){
        if (this.selector.constructor != Array)
        {
            if (className.constructor == Array) {
                var length = className.length;
                while (length--) {
                    this.selector.classList.remove(className[length])
                }
            }
            else {
                this.selector.classList.remove(className);
            }
        }
        else
        {
            var selLength = this.selector.length;

            while(selLength--) {
                if (className.constructor == Array) {
                    var length = className.length;
                    while (length--) {
                        this.selector[selLength].classList.remove(className[length])
                    }
                }
                else {
                    this.selector[selLength].classList.remove(className);
                }
            }

        }

    },
    attr: function(attrName,value){
        if(this.selector.constructor != Array) {
            if (attrName.constructor != Array) {
                if (value) {
                    this.selector.setAttribute(attrName, value);
                }
                else {
                    return this.selector.getAttribute(attrName);
                }
            }
            else{
               var attrLength = attrName.length;
               while(attrLength--){
                   this.selector.setAttribute(attrName[attrLength],value[attrLength])
               }
            }
        }
        else{
            var selLength = this.selector.length;
            var attrList = [];
                while(selLength--)
                {
                    if (attrName.constructor != Array) {
                        if (value) {
                            this.selector[selLength].setAttribute(attrName, value);
                        }
                        else {

                            attrList.push(this.selector[selLength].getAttribute(attrName))
                            if(selLength==0){
                                return attrList;
                            }
                        }
                    }
                    else {
                        var attrLength = attrName.length;
                        var selAttrList = []
                        while(attrLength--) {

                            if (value) {
                                this.selector[selLength].setAttribute(attrName[attrLength], value[attrLength]);
                            }
                            else {

                                selAttrList.push(this.selector[selLength].getAttribute(attrName[attrName.length-1-attrLength]))

                                if(attrLength ==0){
                                    attrList.push(selAttrList)
                                }
                                if(attrLength==0 && selLength==0){
                                    return attrList;
                                }
                            }
                        }
                    }
                }

        }
    },

    appendTo: function(parent){
        if(this.selector.constructor === Array){
            var selLength = this.selector.length;
            while(selLength--){
                if (parent instanceof Jackson.createJacksonInstance) {
                    parent.selector.appendChild(this.selector[selLength]);
                }
                else{
                    parent.selector.appendChild(this.selector[selLength]);
                }
            }
        }
        else {
            if (parent instanceof Jackson.createJacksonInstance) {
                parent.selector.appendChild(this.selector);
            }
            else{
                parent.selector.appendChild(this.selector);
            }
        }


    },

    innerHtml: function(htmlString){
        if(htmlString) {
            this.selector.innerHTML = htmlString;
        }
        else{
            return this.selector.innerHTML;
        }
    },

    style: function(style) {
        if (!style) {
            if (this.selector.constructor === Array) {
                var selLength = this.selector.length;
                var styleArray = [];
                while (selLength--) {
                    styleArray.push(this.selector[selLength].style)
                }
                return styleArray;
            }
            else {
                return this.selector.style;

            }
        }
        else {
            if (this.selector.constructor === Array) {
                var selLength = this.selector.length;
                while (selLength--) {
                    for (var key in style) {
                        this.selector[selLength].style[key] = style[key];
                    }
                }

            }
            else {
                for (var key in style) {
                    this.selector.style[key] = style[key];
                }
            }

        }
    },

    addEvent: function(type, fn){
        if(this.selector.constructor === Array){
            var selLength = this.selector.length;
            while(selLength--){
                this.selector.addEventListener(type,fn);
            }
        }
        else{
            this.selector.addEventListener(type,fn);
        }

    }

}





global.Jackson = global.J$ = Jackson;

}(window));
