var PTYCOLORS={ptyalp:'#C93636',ptylab:'#C93636',ptylib:'#006DBD',ptylnp:'#006DBD',ptynat:'#008761',ptygrn:'#7AAC00',ptyoth:'#666666'};var HIGHLIGHTCOLORS={active:'#478CCC',inactive:'#CCCCCC'};var MULTICOLORS=['#1F79CD','#FF7C0A','#00B3A7','#D662B1','#71A12D','#926CB5','#F55446'];var MONOCHROMECOLORS=['#1B79CC','#47A6FF','#136C9C','#8796A1','#2B4E78','#5686B0','#5E6F7A'];var SINGLECOLORS=['#478CCC'];var classify=function(str){return str.toLowerCase().replace(/\s+/g,'-').replace(/[^\w\-]+/g,'').replace(/\-\-+/g,'-').replace(/^-+/,'').replace(/-+$/,'');};var makeTranslate=function(x,y){var transform=d3.transform();transform.translate[0]=x;transform.translate[1]=y;return transform.toString();};var getParameterByName=function(name){name=name.replace(/[\[]/,'\\[').replace(/[\]]/,'\\]');var regex=new RegExp('[\\?&]'+name+'=([^&#]*)');var results=regex.exec(location.search);return results===null?'':decodeURIComponent(results[1].replace(/\+/g,' '));};var urlToLocation=function(url){var a=document.createElement('a');a.href=url;return a;};var colorArray=function(config,defaultColorArr){var colorArr=defaultColorArr;if(config.colors&&(!config.theme||config.theme=='custom'))colorArr=config.colors.split(/\s*,\s*/);else if(config.theme)if(config.theme=='monochrome')colorArr=MONOCHROMECOLORS;else if(config.theme=='multicolor')colorArr=MULTICOLORS;else if(config.theme=='single')colorArr=SINGLECOLORS;else if(config.theme=='highlight')colorArr=[HIGHLIGHTCOLORS.inactive];for(var i=0;i<colorArr.length;++i){var color=colorArr[i];if(color in PTYCOLORS)colorArr[i]=PTYCOLORS[color];}return colorArr;};var formattedNumber=function(num,prefix,suffix,maxDecimalPlaces){num=parseFloat(num);maxDecimalPlaces=parseInt(maxDecimalPlaces||10,10);var numString=num.toFixed(maxDecimalPlaces);num=parseFloat(numString);numString=d3.format(',')(num);numString=(prefix||'')+numString;numString=numString+(suffix||'');return numString;};var getAspectRatio=function(ratioStr,fallback){if(ratioStr){var ratioArr=/^(\d+)x(\d+)$/.exec(ratioStr);if(ratioArr)return ratioArr[1]/ratioArr[2];}if(typeof fallback==='number')return fallback;var key='base';if(typeof isMobile!=='undefined'&&isMobile)key='mobile';var defaultFallbacks={base:16/9,mobile:4/3};if(fallback)return fallback[key]||defaultFallbacks[key];return defaultFallbacks[key];};var getAccessibleColor=function(foreground,background){background=background||'#fff';var AA_CONTRAST_RATIO_THRESHOLD=4.53;var isDarkTextOnLightBackground;var adjustedForeground;var colorFormula=function(val){val=val/255;if(val<=0.03928)return val/12.92;else return Math.pow(((val+0.055)/1.055),2.4);};var relativeLuminance=function(rgb){var r=colorFormula(rgb.r);var g=colorFormula(rgb.g);var b=colorFormula(rgb.b);return 0.2126*r+0.7152*g+0.0722*b;};var testContrastRatio=function(foreground,background){var fl=relativeLuminance(d3.rgb(foreground));var bl=relativeLuminance(d3.rgb(background));isDarkTextOnLightBackground=bl>fl;var l1=isDarkTextOnLightBackground?bl:fl;var l2=isDarkTextOnLightBackground?fl:bl;var contrastRatio=(l1+0.05)/(l2+0.05);return contrastRatio>=AA_CONTRAST_RATIO_THRESHOLD;};var getAdjustedColor=function(color){var rgb=d3.rgb(color);rgb=isDarkTextOnLightBackground?rgb.darker(0.1):rgb.brighter(0.1);return rgb.toString();};while(!testContrastRatio(foreground,background)){adjustedForeground=getAdjustedColor(foreground);if(adjustedForeground===foreground)return false;foreground=adjustedForeground;}return foreground;};