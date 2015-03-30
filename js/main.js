define(function(require, exports, module) {
    var $ = require("../spm_modules/jquery/1.8.3/jquery");
        //Mustache = require('../js/mustache');

    var ids = {},
        selectAll = false,
        len = 0,
        num,
        data = [];

    //input输入后的操作
    $('#textBox').keydown(function(e) {
        var html,
            e = e || window.event,
            value = $('#textBox').val(),
            itemTpl = $('#data-mustache').html(),
            html = '';

        if(e.which === 13 && value !== ''){
            selectAll = false;
            $('#selectAll').removeAttr('checked');

            if (typeof value === 'string') {
                value = [value];
            }

            html = Mustache.render(itemTpl, {value: value});

            $('#listBox').prepend(html);
            $('#listBox').find('li').first().find('input').attr('id','to' + (len + 1));

            $('#textBox').val('');
            len++;
        }
    });

    //checkbox操作后，全选是否选中
    function checkLength(ids) {
        var k,
            m= 0,
            len = $('.toggle').length;
        for(k in ids) {
            m++;
        }
        if(m < len){
            selectAll = false;
            $('#selectAll').removeAttr('checked');
        }else{
            selectAll = true;
            $('#selectAll').prop('checked','checked');
        }
        $('footer em').html(m);
    }


    //点击checkbox
    $(document).on('click', '.toggle', function() {
        var _id = $(this).attr('id');
        if(typeof ids[_id] === 'undefined'){
            ids[_id] = _id;

            $(this).prop('checked', 'checked');
            $(this).parent().addClass('now');
        }else{
            delete ids[_id];

            $(this).removeAttr('checked');
            $(this).parent().removeClass('now');
        }

        checkLength(ids);

    });

    //点击全选
    $(document).on('click', '#selectAll', function() {
        if(selectAll === false){
            $('.toggle').each(function() {

                var _id = $(this).attr('id');

                if(typeof ids[_id] === 'undefined'){
                    ids[_id] = _id;

                    $(this).prop('checked', 'checked');
                    $(this).parent().addClass('now');

                    checkLength(ids);
                }
            });
        }else{
            $('.toggle').each(function() {

                var _id = $(this).attr('id');

                if(typeof ids[_id] !== 'undefined'){
                    delete ids[_id];

                    $(this).removeAttr('checked');
                    $(this).parent().removeClass('now');

                    checkLength(ids);
                }
            });
        }
    });

    //删除
    $(document).on('click', '.del', function() {
        var _id = $(this).parent().find('input').attr('id');

        if(typeof ids[_id] !== 'undefined'){
            delete ids[_id];
            checkLength(ids);
        }

        $(this).closest('li').remove();
    });

    //多选或者全选，删除
    $(document).on('click', 'footer', function() {
        $('#listBox li.now').each(function() {

            var _id = $(this).find('input').attr('id');

            if(typeof ids[_id] !== 'undefined'){
                delete ids[_id];
                checkLength(ids);
            }

            $(this).remove();
        });
        $(this).find('em').html('0');
    });

});