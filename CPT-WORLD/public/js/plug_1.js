/*

	自定义插件库

	Create Time : 2014-07-22
	Update Time : 2015-04-28
	Author      : Trueland Development Department

	
	-------------------目录 -------------------

	★ 元素垂直居中

	★ 下拉菜单

	★ 选项卡

	★ IE版本检测处理 

	★ placeholder 兼容处理

	-------------------------------------------


*/

;(function($){
	
	/*
		----------------------------------------------------------------------------------------

		元素垂直居中 HOW TO USE
		$(".elementName").center(); public.js里 已经调用 直接给元素添加 vertical-center 即可

		----------------------------------------------------------------------------------------
	*/

	$.fn.center=function(){ 

        return this.each(function(){
        	
        	var $this=$(this),
        		parent=$this.parent(),
        		topPos,
        		topMargin,
        		leftMargin,
        		resizeTimeout;

	        if(parent.is("body:not(.root-height-set)")){
	           
	           $("html,body").css("height","100%").addClass("root-height-set");
	        }

	        if($this.css("position")==="absolute" || $this.css("position")==="fixed"){

	            topPos="50%";
	            topMargin="-"+Math.round($this.outerHeight()/2)+"px";
	            leftMargin="-"+Math.round($this.outerWidth()/2)+"px";
	            $this.css({"left":"50%","margin-left":leftMargin});

	        }else{

	            topPos=Math.floor((parent.height()-$this.outerHeight())/2);
	            topMargin="auto";

	            $this.css({
	            	"display":"block",
	            	"position":"relative",
	            	"margin-left":"auto",
	            	"margin-right":"auto"
	            });
	        }

          	$this.css({"top":topPos,"margin-top":topMargin});

	        $(window).resize(function(){

	        	if(resizeTimeout){

	              clearTimeout(resizeTimeout);

	            }

            resizeTimeout=setTimeout(function(){

		            if($this.css("position")==="absolute"){

		               topMargin="-"+Math.round($this.outerHeight()/2)+"px";
		               leftMargin="-"+Math.round($this.outerWidth()/2)+"px";
		               $this.css({"margin-left":leftMargin,"margin-top":topMargin});

		            }else{

		               topPos=Math.floor((parent.height()-$this.outerHeight())/2);
		               $this.css("top",topPos);

		            }
            },150);

          });

        });
    }
	
	
	
	/*
		----------------------------------------------------------------------------------------

		无缝滚动插件  HOW TO USE :
		$("#marquee-main").kxbdMarquee({
			
			direction : "left", 	//滚动方向
			eventA : "mousedown", 	
			eventB : "mouseup"

		});

		----------------------------------------------------------------------------------------
	
	*/
	
	$.fn.kxbdMarquee = function(options){
		var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);
		
		return this.each(function(){
			var $marquee = $(this);//滚动元素容器
			var _scrollObj = $marquee.get(0);//滚动元素容器DOM
			var scrollW = $marquee.width();//滚动元素容器的宽度
			var scrollH = $marquee.height();//滚动元素容器的高度
			var $element = $marquee.children(); //滚动元素
			var $kids = $element.children();//滚动子元素
			var scrollSize=0;//滚动元素尺寸
			var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//滚动类型，1左右，0上下

			//防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
			$element.css(_type?'width':'height',10000);
			//获取滚动元素的尺寸
			if (opts.isEqual) {
				scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
			}else{
				$kids.each(function(){
					scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
				});
			}
			//滚动元素总尺寸小于容器尺寸，不滚动
			if (scrollSize<(_type?scrollW:scrollH)) return; 
			//克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
			$element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
			
			var numMoved = 0;
			function scrollFunc(){
				var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
				if (opts.loop > 0) {
					numMoved+=opts.scrollAmount;
					if(numMoved>scrollSize*opts.loop){
						_scrollObj[_dir] = 0;
						return clearInterval(moveId);
					} 
				}
				if(opts.direction == 'left' || opts.direction == 'up'){
					var newPos = _scrollObj[_dir] + opts.scrollAmount;
					if(newPos>=scrollSize){
						newPos -= scrollSize;
					}
					_scrollObj[_dir] = newPos;
				}else{
					var newPos = _scrollObj[_dir] - opts.scrollAmount;
					if(newPos<=0){
						newPos += scrollSize;
					}
					_scrollObj[_dir] = newPos;
				}
			};
			//滚动开始
			var moveId = setInterval(scrollFunc, opts.scrollDelay);
			//鼠标划过停止滚动
			$marquee.hover(
				function(){
					clearInterval(moveId);
				},
				function(){
					clearInterval(moveId);
					moveId = setInterval(scrollFunc, opts.scrollDelay);
				}
			);
			
			//控制加速运动
			if(opts.controlBtn){
				$.each(opts.controlBtn, function(i,val){
					$(val).bind(opts.eventA,function(){
						opts.direction = i;
						opts.oldAmount = opts.scrollAmount;
						opts.scrollAmount = opts.newAmount;
					}).bind(opts.eventB,function(){
						opts.scrollAmount = opts.oldAmount;
					});
				});
			}
		});
	};
	$.fn.kxbdMarquee.defaults = {
		isEqual:true,//所有滚动的元素长宽是否相等,true,false
		loop: 0,//循环滚动次数，0时无限
		direction: 'left',//滚动方向，'left','right','up','down'
		scrollAmount:1,//步长
		scrollDelay:25,//时长
		newAmount:3,//加速滚动的步长
		eventA:'mousedown',//鼠标事件，加速
		eventB:'mouseup'//鼠标事件，原速
	};
	
	$.fn.kxbdMarquee.setDefaults = function(settings) {
		$.extend( $.fn.kxbdMarquee.defaults, settings );
	};
	
	
	
	
	
	/*
		--------------------------------------------------------------------------------------------------

		下拉菜单 HOW TO USE :
		$.dropdpwn_Menu(".nav > ul > li > ul");

		选项卡 HOW TO USE :
		$.easy_Tab(".tabHead",".tabCont","click","li");

		HTML结构:
		
		<div class="tabHead">
			<ul>
				<li>one</li>
				<li>two</li>
				<li>three</li>
			</ul>
		</div>

		<div class="tabCont">
			<ul>
				<li>oneCont</li>
				<li>twoCont</li>
				<li>twoCont</li>
			</ul>
		</div>

		--------------------------------------------------------------------------------------------------
	*/

	$.extend({

		'dropdpwn_Menu' : function(nName){

			$(nName).css('display','none');
			$(nName).parent('li').hover(function() {
				$(this).children(nName).stop(true, true).slideDown(200);
			}, function() {
				$(this).children(nName).stop(true, true).slideUp(200);
			});

			return this;
		},

		'easy_Tab' : function(tHead,tConn,tType,childEleName){

			$(tHead).find(childEleName).bind(tType, function() {

				var index = $(this).index();
                $(this).addClass("select").siblings().removeClass("select");
                $(tConn).find(childEleName).eq(index).show().siblings().hide();
	
			});

            return this;
		}
		
	})
	
})(jQuery);


/*
	---------------------------------------------------------------------------------------------------
	IE版本检测处理
	---------------------------------------------------------------------------------------------------
*/

	function iePrompt(){
		
		function createMent(){
			var promptMent = "<div class='prompt'>您的浏览器版本也太低啦！赶快下载最新版的吧！推荐浏览器 : <a href='http://se.360.cn/' target='_blank'>360安全浏览器</a> <b class='prompt-close'></b></div>";
			$("body").append(promptMent);
			$(".prompt-close").click(function(){
				if(confirm("为了更好的用户体验，我们还是建议您更换浏览器。点击确定继续浏览")){
					$(this).parent().slideUp('300');
				}else{
					window.close();
				}
			})
			function iePromptHide(){
				$(".prompt").slideUp(200);
			}
			setTimeout(iePromptHide,5000);
			
		}
		
		if (navigator.appName == "Microsoft Internet Explorer") {	

			var browser=navigator.appName
			var b_version=navigator.appVersion
			var version=b_version.split(";");
			var trim_Version=version[1].replace(/[ ]/g,"");
	
			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){
	    		createMent();
			}
			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0"){
	    		createMent();
			}
			else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
			    createMent();
			}
		}
	}

	iePrompt(); //启用



	/*
		-------------------------------------------------------------------------------------
		placeholder 兼容处理 默认调用 创建的类是 : in_placeholder
		-------------------------------------------------------------------------------------
	*/

	var JPlaceHolder = {

		//检测
		_check : function(){
		    return 'placeholder' in document.createElement('input');
		},
		//初始化
		init : function(){
		    if(!this._check()){
		        this.fix();
		    }
		},
		//修复
		fix : function(){

		    jQuery(':input[placeholder]').each(function(index, element) {

		        var self = $(this), txt = self.attr('placeholder');

		        self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
		        var pos = self.position(),
		        	h 	= self.outerHeight(true),
		        	paddingleft = self.css('padding-left');

		        var holder = $('<span class="in_placeholder"></span>').text(txt).css({

		        	position:'absolute',
		        	left:pos.left,
		        	top:pos.top,
		        	height:h,
		        	lienHeight:h,
		        	paddingLeft:'10px',
		        	color:'#aaa'

		        }).appendTo(self.parent());
		        

		        self.focusin(function(e) {
		            holder.hide();
		        }).focusout(function(e) {
		            if(!self.val()){
		                holder.show();
		            }
		        });
		        
		        holder.click(function(e) {
		            holder.hide();
		            self.focus();
		        });
		    });
	}
	};
	//执行
	jQuery(function(){
		JPlaceHolder.init();    
	});
