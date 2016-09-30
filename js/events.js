// Settings //

Nav.events.open.settings = function(param){
    
    showPage('settings');
    
}

Nav.events.close.settings = function(param){
    
    hiddenPage();
    
}

// Groups //

Nav.events.open.groups = function(param){
    
    $('[data-back]').css('display','none');
    
    
    DB.connect.transaction(function(connect){
       
        connect.executeSql("SELECT * FROM groups",[],function(connect,res){
            
//            console.log(res);
            
            var html = '';
            
            for(var i=0;i<res.rows.length;i++){
                
                html += '<div class="nav-btn" data-page="study" data-param="' + res.rows.item(i).id + '">';
                
                html += '<button class="nav-btn-del" data-func="delGroup" data-param="' + res.rows.item(i).id + '">+</button>';

                html += '<div class="name">' + res.rows.item(i).name + '</div>';

                html += '</div>';
                
            }
            
            $('#groups .container').html(html);
            
            showPage('groups');
            
            Funcs.init('#groups .container');
            
            Nav.initPages('#groups');
            
        });
        
    });
    
}

Nav.events.close.groups = function(param){
    
    $('[data-back]').css('display','block');
    
    hiddenPage();
    
}

// Add new group //

Nav.events.open.addnewgroup = function(param){

    showPage('addnewgroup');

}

Nav.events.close.addnewgroup = function(param){

    hiddenPage();

}

// STUDY //

Nav.events.open.study = function(param){
    
    DB.connect.transaction(function(connect){

        connect.executeSql("SELECT * FROM study WHERE id_group=?",[param],function(connect,res){

//            console.log(res);

            var html = '';

            for(var i=0;i<res.rows.length;i++){

                html += '<div class="nav-btn" data-page="showStats" data-param="' + res.rows.item(i).id + '">';

                html += '<button class="nav-btn-del" data-func="delStudy" data-param="' + res.rows.item(i).id + '">+</button>';

                html += '<div class="name">' + res.rows.item(i).name + '</div>';

                html += '</div>';

            }

            $('#study .container').html(html);

            showPage('study');
            
            $('#study [data-new="study"]').attr('data-param',param);

            Funcs.init('#study .container');

            Nav.initPages('#study');

        });

    });
    
}


Nav.events.close.study = function(param){

    hiddenPage();

}

// Add new study //

Nav.events.open.addnewstudy = function(param){
    
    // param is id //

    showPage('addnewstudy');
    
    $('#addnewstudy [data-func="saveNewStudy"]').attr('data-param',param);

}


Nav.events.close.addnewstudy = function(param){

    hiddenPage();

}

// addStat //

Nav.events.open.addStat = function(param){
    
    DB.connect.transaction(function(connect){
        
        connect.executeSql("SELECT `name` FROM `study` WHERE `id`=?",[param],function(connect,res){
            $('#addStat .page-name small').html('"'+res.rows.item(0).name+'"');
        });
        
    });
    
    $('[data-func="saveStat"]').attr('data-param',param);
    
    showPage('addStat');
    
}

Nav.events.close.addStat = function(param){

    hiddenPage();

}


// showStats //

Nav.events.open.showStats = function(id_study){
    
    $('[data-page="addStat"]').attr('data-param',id_study);
    
    graph.clear();
    
    DB.connect.transaction(function(c){
        
        c.executeSql("SELECT * FROM entry WHERE id_study=? ORDER BY timestamp DESC",[id_study],function(c,res){
            
            c.executeSql("SELECT name FROM study WHERE id=?",[id_study],function(c,res){
                
                $("#showStats .page-name").html(res.rows.item(0).name);
                
                showPage('showStats');
                
            });
            
            console.log(res);
            
            var points = [];
            
            var ft;
            
            var sum = 0;
            
            var time = 60000;
            
            var flag = 1;
            
            var n = 1;
            
            for(var i=0;i<res.rows.length;i++){
                
                flag = 0;
                
                if(sum == 0){
                    
                    sum = res.rows.item(i).value;
                    
                    ft = res.rows.item(i).timestamp;
                    
                    continue;
                    
                }
                
                if(ft - res.rows.item(i).timestamp <= time){
                    
                    sum += res.rows.item(i).value;
                    
                }else{
                    
                    var p = [n++, sum, ft];
                    
                    points[points.length] = p;
                    
                    sum = res.rows.item(i).value;
                    
                    ft = res.rows.item(i).timestamp;
                    
                    flag = 1;
                    
                }
                
            }
            
            if(flag == 0){
                
                var p = [n, sum, ft];

                points[points.length] = p;
                
            }
            
            console.log(points);
            
            var max = 0;
            
            for(var i=0;i<points.length;i++){
                
                if(points[i][1] > max)
                    max = points[i][1];
                
                var d = new Date(points[i][2]);
                
                points[i][3] = d.getFullYear();
                
                points[i][3] += '/' + d.getMonth();
                
                points[i][3] += '/' + d.getDay() + ' ';
                
                points[i][3] += d.getHours();
                
                points[i][3] += ':' + d.getMinutes();
                
            }
            
            var height = parseInt($('#main-canvas').attr('height'));
            
            graph.sizeY = (height - height / 3) / max;
            
            graph.set([points]);
            
            graph.draw();
            
            
        }, function(c,err){
            
            console.log(err);
            
        });
        
    });
    
}

Nav.events.close.showStats = function(){
    
    hiddenPage();
    
}










