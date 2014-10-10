/*
 * Hoch Slider 2.0;
 * Dependencias: https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * VetSlide bool;
 *     Caso true animação e touch são verticais
 *     Caso false animação e touch são hotizontais
 *     Caso omitido animação em fade e sem touch
 * customClass string;
 *     pode setar uma classe customizada, não é obrigatório
 *     
 */
$.fn.Hoch = function(VertSlide,customClass){
    //Botando esse each podemos usar vários slides com a mesma classe
    $(this).each(function(){
            //É o slide Wrapper
        var $this = $(this),
            $slide = $this.find(".slide"),
            $next = $this.find("#nextSlide"),
            $prev = $this.find("#previousSlide"),
            $play = $this.find("#playSlide"),
            $pause = $this.find("#pauseSlide"),
            lastClick,
            listQuantity = function(){
                if($slide.children().length==1){
                    $this.addClass("only-one");
                }
            },
            //Função para avançar o slide
            nextSlide = function(){
                if($slide.children().length>1){
                    var currentSlider = $slide.find(".currentSlider");
                    lastClick = "next";
                    currentSlider.addClass("out");
                    currentSlider.next().addClass("nextIn").addClass("currentSlider");
                    currentSlider.removeClass("currentSlider");

                    if($this.find(".slide > li.currentSlider").length==0){
                    	$this.find(".slide > li:first-child").first().addClass("nextIn");
                        $this.find(".slide > li:first-child").first().addClass("currentSlider");
                    }
                    
                    window.setTimeout(function(){
                        $slide.find(".out").removeClass("out");
                        $slide.find(".nextIn").removeClass("nextIn");
                    },600);
                }
            },
            //Função para voltar o slide
            previousSlide = function(){
                if($slide.children().length>1){
                    var currentSlider = $slide.find(".currentSlider");
                    lastClick = "prev";
                    $slide.addClass("back");
                    currentSlider.addClass("out");
                    currentSlider.prev().addClass("nextIn").addClass("currentSlider");
                    currentSlider.removeClass("currentSlider");

                    if($this.find(".slide > li.currentSlider").length==0){
                        $this.find(".slide > li:last-child").addClass("nextIn");
                        $this.find(".slide > li:last-child").addClass("currentSlider");
                    }
                    
                    window.setTimeout(function(){
                        $slide.removeClass("back");
                        $slide.find(".out").removeClass("out");
                        $slide.find(".nextIn").removeClass("nextIn");
                    },600);
                }
            },
            haveCurrentSlider = function(){
            	if(!$slide.find(".currentSlider").is(":visible")){
            		// switch(lastClick){
            			// case
            		// }
            	}
            },
            autoPlay,
            playAutoPlay = function(){
                $this.addClass("playing");
                autoPlay = setInterval(function(){
                    $next.click();
                },5000);
            },
            stopAutoPlay = function(){
                $this.removeClass("playing");
                clearInterval(autoPlay);
            },
            paginacao = function(){
                var slideLength = $slide.find("li").first().length,
                    i = 0;
                if($("#paginacaoSlider").length==0){
                    $this.append("<div id='paginacaoSlider' class='paginacaoSlider'></div>")
                }
                while(i<=slideLength){
                    $("#paginacaoSlider").append("<span class='bulletSlider'>"+(i+1)+"</span>");
                    i++;
                }
            };

        //Adiciona a páginação
        // paginacao();
        //Verifica quantos slides tesm
        listQuantity();
        //Adiciona a classe customizada
        $this.addClass(customClass);
        //Verifica se é mobile
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $this.addClass("show-swipe");
        }
        //Verifica qual tipo de animação vai ser
        switch(VertSlide){
            case true:
                $slide.addClass("vertical");
                $this.addClass("vertical");
                if($.fn.swipe){
                    $slide.swipe({
                        swipeUp:function(){previousSlide();},
                        swipeDown:function(){nextSlide();},
                        threshold:0
                    });
                }
            break;
            case false:
                $slide.addClass("horizontal");
                $this.addClass("horizontal");
                if($.fn.swipe){
                    $slide.swipe({
                        swipeLeft:function(){previousSlide();},
                        swipeRight:function(){nextSlide();},
                        threshold:0
                    });
                }
            break;
            default:
                //Default animation without finget
                break;
        }
        //Binds
        $next.click(function(e){
            e.preventDefault();
            nextSlide();
        });
        $prev.click(function(e){
            e.preventDefault();
            previousSlide();
        });
        $play.click(function(e){
            e.preventDefault;
            playAutoPlay();
        })
        $pause.click(function(e){
            e.preventDefault;
            stopAutoPlay();
        });
    })
}
//Usage
$(".slideWrapper").Hoch(false);