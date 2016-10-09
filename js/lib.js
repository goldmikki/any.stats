function hQuestionDel(id,t,page){

    $(page + ' .container [data-flag="animation"]').css('opacity','1').removeAttr('data-flag');

    $(t).parent().parent().find('.name').removeAttr('style');

    var askDel = $(t).parent().parent().find('.askDel');

    $(askDel).css('opacity',0);

    setTimeout(function(){

        $(askDel).css('display','none');

    },200);

    $('.page .no-click').css('display','none');

    $(t).parent().parent().find('.nav-btn-del').css('opacity',1);

}

function sQuestionDel(id,t,page){

    $(page + ' .container .nav-btn').attr('data-flag','animation');

    $(t).parent().removeAttr('data-flag');

    $(page + ' .container [data-flag="animation"]').css('opacity','.5');

    $(t).parent().find('.name').css({'margin-top': '65px','opacity': '.6','font-size': '18px'});

    var askDel = $(t).parent().find('.askDel');

    $(askDel).css('display','block');

    setTimeout(function(){

        $(askDel).css('opacity',1);

    },1);

    $('.page .no-click').css('display','block');

    $(t).parent().find('.nav-btn-del').css('opacity',0);

}

function delFromHTML(id,page){
    
    var el = $('.page .no:visible',0);
    
    var str = (new String(page)).split('#')[1];
    
    var letter = (new String(str[0])).toUpperCase();
    
    str = str.split(str[0])[1];
    
    var funcname = 'hQuestionDel' + letter + str;


    Funcs.do[funcname](id,el,page);

    $(page + ' .container [data-param="' + id + '"]').css('opacity','0');

    setTimeout(function(){

        $(page + ' .container [data-param="' + id + '"]').css('display','none');

    },200);
    
}

function studyDelFromDB(id){

    DB.connect.transaction(function(c){

        c.executeSql('DELETE FROM entry WHERE id_study=?',[id],function(c,res){

            c.executeSql('DELETE FROM study WHERE id=?',[id]);

        }, function(c,err){
            
            console.log(err);
            
        });

    });

}

function getCount(res,i){

    i = i || 0;

    DB.connect.transaction(function(c){

        c.executeSql('SELECT COUNT(*) FROM study WHERE id_group=?',[res.rows.item(i).id],function(c,r){


            var str = '(' + r.rows.item(0)['COUNT(*)'] + ')';

            $('#groups .nav-btn[data-param="'+res.rows.item(i++).id+'"] span.count').html(str);

            if(i < res.rows.length){

                getCount(res,i);

            }

        });

    });

}



// system funcs //

function inpFocus(){

    $('input[type="text"]').focus(function(){
        $(this).css('border-color', 'black');
    });

}

function showInput(t){
    
    $(t).parent().find('.form-wrap.input').css({'width': 'inherit','opacity': 1}).find('input',0).focus();
    
    var cv = $(t).parent().find('.current-value');
    
    if($(cv).attr('data-edit-flag') == 1){
        
        var val = $(cv).html();
        
        $(cv).parent().find('input',0).attr('value',val).prop('selectionStart',val.length);
        
    }
    
}

function hiddenInput(t){
    
    var fw = $(t).parent();
    
    $(fw).css({'width': '0px','opacity': 0});
    
    var val = $(t).prop('value');
    
    var cval = $(fw).parent().find('.current-value');
    
    if(val != ''){
    
        $(cval).html(val).attr('data-edit-flag',1);
        
        $(fw).parent().removeClass('warning');
        
    }else{
        
        $(cval).html($(cval).attr('data-default'));
        
        $(fw).parent().addClass('warning');
        
    }
    
}

function checkOn(p,t){
    
    if($(t).prop('checked') == true){
        
        $(t).addClass('check');
        
        $(t).parent().parent().find('.current-value').html(p);
        
    }else{
        
        checkOff(p,t);
        
    }
    
}

function checkOff(p,t){

    $(t).removeClass('check');
    
    var cval = $(t).parent().parent().find('.current-value');
    
    $(cval).html($(cval).attr('data-default'));

}

function showNoRes(){
    
    $("#showStats .canvas-container").css('display', 'none');
    
    $("#showStats .average").css('display','none');
    
    $("#showStats .unit").css('display','none');
    
    $('#showStats [name="period"]').css('display','none');
    
    $('#showStats .no-res').css('display','block');
    
}

function hidNoRes(){

    $("#showStats .canvas-container").css('display', 'block');

    $("#showStats .average").css('display','block');
    
    $("#showStats .unit").css('display','block');

    $('#showStats [name="period"]').css('display','block');

    $('#showStats .no-res').css('display','none');

}



// vis/hid //

function showPage(page){

    $('#' + page).css({'display': 'block'});

    setTimeout(function(){ 

        $('#' + page).css('opacity', 1);

    },10);

}

function hiddenPage(){

    $('.page').css({'opacity': 0});

    Nav.hiddenAll();

}

//////





