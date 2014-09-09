

硬的游戏开放平台
===============

----------

1. 首先在游戏头部引入下面的标签
	
	```html
	<script src="http://end.baidu.com/api/1.0/endgame.js"></script>
	```
	
2. 夸平台（微信，百度浏览器，91助手，微博） `分享接口` 调用

	```javascript
	(function(){
		shareBtn.on('click',share);
		function share(){
			eg.share('我在疯狂手指中获得了'+score+'分，你行你试试').popup();
		}
	})();
	```
3. 更多参数用法

	```javascript
	(function(){
		shareBtn.on('click',share);
		function share(){
			eg.share('我在疯狂手指中得了' +score +'分，你行你试试')
			.icon('http://hightscore/golden.png') //获得一枚金色臂章
			.param({ score: score }) //让朋友来和我比试一下吧
			.popup();
		}
	})()
   ``` 
4. 更多高级用法
	http://end.baidu.com/openapi/turorial

5. 在线调试
   http://endgamedev.duapp.com/debug.html?url={游戏url}