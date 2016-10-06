

var Nav = {
    
    history: {
        
        page: [],
        
        param: []
        
    },
    
    begin: {
        
        page: '',
        
        param: ''
        
    },
    
    currentPage: "",
    
    currentParam: "",
    
    events: {
        
        open: {},
        
        close: {}
        
    },
    
    tmpBack: false,
    
    addTmpBack: function(func){
        
        console.log('nav.add');
        
        this.tmpBack = func;
        
    },
    
    removeTmpBack: function(){
        
        this.tmpBack = false;
        
    },
    
    goTo: function(page, param, flag){
        
        if(this.currentPage == page)
            return false;
        
        if(this.currentPage != "" && this.events.close[this.currentPage] != "undefined")
            this.events.close[this.currentPage](this.currentParam);
        
        if(this.events.open[page] != "undefined")
            this.events.open[page](param);
        
        this.currentPage = page;
        
        this.currentParam = param;
        
        if(flag != true){
        
            this.history.page[this.history.page.length] = page;

            this.history.param[this.history.param.length] = param;
            
        }
        
        console.log('Nav.goTo('+page+')');
        
        return true;
        
    },
    
    back: function(){
        
        console.log(typeof this.tmpBack);
        
        if(typeof this.tmpBack == 'function'){
            
            console.log('work');
            
            this.tmpBack();
            
            this.removeTmpBack();
            
            return false;
            
        }
        
        if(this.history.page.length < 2 || this.history.param.length < 2)
            return false;
        
        if(this.history.param.length != this.history.page.length)
            return false;
        
        var i = this.history.page.length - 2;
        
        delete this.history.page[i + 1];
        
        this.history.page.length -= 1;
        
        this.history.param.length -= 1;
        
        delete this.history.param[i + 1];
        
        this.goTo(this.history.page[i],this.history.param[i],true);
        
        console.log('Nav.back()');
        
        return true;
        
    },
    
    initPages: function(container){
        
        container = container || "";
        
        $(container + ' [data-page]').click(function(){

            var page = $(this).attr('data-page');

            var param = $(this).attr('data-param');
            
            Nav.goTo(page, param);

        });
        
        console.log('Nav.initPages()');
        
    },
    
    initBackbtn: function(){
        
        $('[data-back]').click(function(){

            Nav.back();

        });

        document.addEventListener("backbutton", function(){

            if(Nav.back() == false){

                navigator.app.exitApp();

            }

        }, true);
        
        console.log('Nav.initBackbtn()');
        
    },
    
    init: function(){
        
        if(this.currentPage == "")
            this.goTo(this.begin.page,this.begin.param);
        
        this.initPages();
        
        this.initBackbtn();
        
        console.log('Nav.init()');
        
    },
    
    hiddenAll: function(){
        
        console.log('Nav.hiddenAll()');
        
        $('section.page').css('display','none');
        
    },
    
    reload: function(){
        
        console.log('Nav.reload()');
        
        if(this.currentPage != "" && this.events.close[this.currentPage] != "undefined")
            this.events.close[this.currentPage](this.currentParam);

        if(this.events.open[this.currentPage] != "undefined")
            this.events.open[this.currentPage](this.currentParam);
        
    }
    
}