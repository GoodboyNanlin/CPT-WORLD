/*
	your jquery
	
	create time : xxxx-xx-xx;
	update time : xxxx-xx-xx;

*/

	$(document).ready(function() {

        //栏目页导航
        $('.cateList li').mouseover(function(){
            $('.cateList-childs').hide();
            $(this).find('div').show();
        });
        $('.cateList li').mouseout(function(){
            $('.cateList-childs').hide();
            $(this).find('div').hide();
        });
        $('.cateList-childs .cur').parents('li').addClass('cur');

		//调用垂直居中
		$(window).load(function() {
			if($(".vcenter").length>0) $(".vcenter").center();
		});
			
		//  ========== 
		//  = 启用 Phone Nav = 
		//  ========== 

		$("#pnav").mmenu({
			//classes: "mm-light", //启用主题 (mm-light,mm-black,mm-white)
			offCanvas: {
	            position  : "bottom"
	            //zposition : "front" //禁止缩进 内容
	       	},
//	       	header: true, //显示头部标题
//	       	footer: {
//	       		add:true,
//	       		content:"(c) 2015"
//	       	},
	       	//autoHeight: true, 自动高度
 			//counters: true, //显示子栏目数目
			extensions : ["pageshadow","theme-light"]  //主题 theme-dark theme-black theme-white theme-light (default)
		});
		
	    $.dropdpwn_Menu(".nav > ul > li > ul");	

	    //产品导航
	    $(function(){
		    $(".slick-track div.slick-slide").hover(function(){
		        $(this).find('.two_li').stop(true).show();
		    },function(){
		        $(this).find('.two_li').stop(true).hide();
		    }) 
		})
	
	});
	
	
  	