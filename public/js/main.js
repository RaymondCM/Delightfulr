"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function parseResponse(e){"string"==typeof e?alert(e):"object"==("undefined"==typeof e?"undefined":_typeof(e))&&e.tweets.forEach(function(t){return tweetCube.createCube(t.tweet,"— "+e.name+" (@"+e.screen_name+")",t.sentiment)})}var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),AjaxCall=function(){function e(t,o){_classCallCheck(this,e),this.post=t,this.name=o,this.data=""}return _createClass(e,[{key:"getStatus",value:function(t,o){var n=this;$.ajax({type:"GET",contentType:"application/json",url:""+this.post+e.removeAllSpecialCharacters(t),success:function(e){return n.onMessage(e,o)}})}},{key:"onMessage",value:function(e,t){this.data=e,t(e)}}],[{key:"removeAllSpecialCharacters",value:function(e){return e}}]),e}(),_createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),TweetCube=function(){function e(){_classCallCheck(this,e),this.count=0,this.clearCut=!1,this.lollypop=["#FF7F7F","#FFFF7F","#3FFF7F"],this.scheme=["#B6A39E","#D0D1AC","#DCDDC7"],this.theme=this.lollypop}return _createClass(e,[{key:"createCube",value:function(){var e=arguments.length<=0||void 0===arguments[0]?"Tweets and links":arguments[0],t=arguments.length<=1||void 0===arguments[1]?"— Screen Name (@ID)":arguments[1],o=arguments[2],n="cube"+this.count++,a=1,s=.5,r=-.5,c=o.comparative;c>s?c=s:c<r&&(c=r);var l=1-(c-r)/(s-r),u=8,i=(12-u)/2,f=12,d=(12-f)/2;$("#main").append('<div class="text-center col-xs-'+f+" col-sm-"+f+" col-md-"+u+" col-lg-"+u+" col-md-offset-"+i+" col-sm-offset-"+d+" col-xs-offset-"+d+' sentiment_box"><div class="cube-wrap mainCube"><div id="'+n+'" class="cube"><div class="cube-front"><blockquote class="twitter-tweet"><p id="content">'+e+'</p><p id="screen-name">"'+t+'"</p> </blockquote> </div><div class="cube-bottom" style="background-color: '+this.getColor(l)+';"><h3>'+["The Worst!","Awful!","Bad!","Average","Okay","Good","Perfect"][Math.round(6*(1-l))>6?6:Math.round(6*(1-l))<=0?0:Math.round(6*(1-l))]+"</h3></div></div> </div></div>"),$("#"+n).addClass("step1").on("click",function(){var e=a;a=a>1?1:2,$("#"+n).addClass("step"+a).removeClass("step"+e)}),this.clearCut&&$("#"+n).hover(function(){a=2,$("#"+n).addClass("step2").removeClass("step1")},function(){a=1,$("#"+n).addClass("step1").removeClass("step2")})}},{key:"removeAll",value:function(){$(".sentiment_box").remove()}},{key:"getColor",value:function(e){return this.clearCut?this.theme[1-e<.33?0:1-e<.667?1:2]:"hsl("+(120*(1-e)).toString(10)+",100%,70%)"}}]),e}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},twitterFeed=new AjaxCall("/getTweets/"),tweetCube=new TweetCube;$(document).ready(function(){$("#input").submit(function(e){return tweetCube.removeAll(),twitterFeed.getStatus(document.getElementById("search").value,parseResponse),!1}),$("#colourscale").on("click",function(e){tweetCube.clearCut?(tweetCube.clearCut=!1,$("#colourscale").addClass("range"),$("#worst").css("background-color",""),$("#average").css("background-color",""),$("#best").css("background-color","")):(tweetCube.clearCut=!0,$("#colourscale").removeClass("range"),$("#worst").css("background-color",tweetCube.theme[0]),$("#average").css("background-color",tweetCube.theme[1]),$("#best").css("background-color",tweetCube.theme[2]))})});