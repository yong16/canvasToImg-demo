$(function() {
  'use strict';

  
  // draw =================================
  var textNum = 0; // 用于 drawTextMore(), 一行绘制多种状态文本时，用于判断当前状态，处理不同逻辑
  var drawPosition = 0; // 用于 drawTextMore(), 用于同一行后面文本的 绘制位置。
  var oImg = new Image();
  //oImg.setAttribute('crossOrigin', 'anonymous');  //跨域读取图片时需要设置
  oImg.src = './img/res-wuling-test.png';
  oImg.onload = function(){
    canvasToImg(oImg);
  }

  function canvasToImg(oImg) {
    var oCanvas = document.querySelector('#canvas');
    var ctx = oCanvas.getContext('2d');

    ctx.fillRect(0, 0, 640, 810); // 绘制填充一个矩形。

    ctx.drawImage(oImg, 0, 0, 640, 810); // 在画布上绘制一个背景图

    // 昵称
    drawTextMore(ctx,{
      text: '悟空悟空',
      size: '40px',
      x: 320,
      y: 60,
      maxWidth: 320,
      textAlign: 'end'
    });
    // 主语
    drawTextMore(ctx,{
      text: '的命中座驾是',
      x: 320,
      y: 60,
      maxWidth: 320,
      textAlign: 'start'
    });

    // 车型
    drawText(ctx,{
      text: '五菱宏光',
      size: '50px',
      x: 320,
      y: 140,
      bold: 'bold',
      textAlign: 'center'
    });

    // slogan
    drawText(ctx,{
      text: '秋名山上满是我的传说',
      size: '35px',
      x: 320,
      y: 537,
      bold: 'bold',
      textAlign: 'center'
    });

    // 座右铭
    drawText(ctx,{
      text: '座右铭：',
      size: '36px',
      x: 18,
      y: 645,
      bold: 'bold'
    });

    drawText(ctx,{
      text: '不见五陵豪杰墓，无花无酒锄作田',
      size: '24px',
      x: 20,
      y: 681,
      bold: 'bold'
    });

    // 生成图片
    $('.save-poster').attr('src',oCanvas.toDataURL());
  }
  
   /*** 
    * text: '',         // 绘制文本
    * size: '30px',     // 文字大小，默认 30px
    * bold: 'normal',   // 字体加粗，默认 normal
    * family: '',       // 文本字体，有默认值，可不设置
    * x: '',            // 绘制 x 轴位置
    * y: '',            // 绘制 y 轴位置
    * maxWidth: ''      // 设置最大宽度，用于超出显示 '...'
    * textAlign: ''     // 设置对齐方式 , 值为 ‘start’,'center','end','left','right',
    * callback          // 回调预留
  ***/

  // title
  function drawTextMore(ctx,opts,callback) {
    var size = opts.size || '30px';
    var bold = opts.bold || 'normal';
    var family = opts.family || '"PingFang SC", Helvetica, Arial, "Hiragino Sans GB", "Microsoft Yahei", STHeiTi, sans-serif';
    ctx.font = bold + ' ' + size + ' ' + family;
    ctx.fillStyle = opts.color || '#000000';

    ctx.textAlign = opts.textAlign || 'start'; // 设置文本对齐方式

    var wordWidth = 0; // 记录文本宽度
    var overIndex = 0; // 记录文本超出时，节点位置
    for(var i = 0; i < opts.text.length; i++) {
      wordWidth += ctx.measureText(opts.text[i]).width; // 计算文本宽度  
      wordWidth > opts.maxWidth && overIndex === 0 && (overIndex = i);
      if(overIndex) break;
    }

    // 文本超出规定宽，截断显示 "..." 
    if(wordWidth > opts.maxWidth) {
      textNum ++;
      ctx.fillText(opts.text.substring(0, overIndex) + '...', opts.x + (wordWidth - 220) / 2, opts.y); // 绘制文字
      drawPosition = opts.x + (wordWidth - 220) / 2;
      return;
    }
    
    // 文本未超出规定宽，走这逻辑
    textNum ++;
    textNum === 2 && wordWidth < 220 && (wordWidth = 225); // 给出 5 像素的间距
    textNum === 1 && wordWidth > 227 && (drawPosition = 320 + (wordWidth - 220) / 2); // 记录 drawPosition 值，用于后面文本开始绘制位置
    textNum === 2 && drawPosition !== 0 && (opts.x = drawPosition); // drawPosition 替换传入的 opts.x 值
    ctx.fillText(opts.text, opts.x + 30 + (wordWidth - 220) / 2, opts.y); // 绘制文字。 ctx.measureText('...').width ≈ 30。

    callback && callback(); // 回调函数，预留位置。
  }

  function drawText(ctx,opts,callback) {
    var size = opts.size || '30px';
    var bold = opts.bold || 'normal';
    var family = opts.family || '"PingFang SC", Helvetica, Arial, "Hiragino Sans GB", "Microsoft Yahei", STHeiTi, sans-serif';
    ctx.font = bold + ' ' + size + ' ' + family;
    ctx.fillStyle = opts.color || '#000000';

    ctx.textAlign = opts.textAlign || 'start'; // 设置文本对齐方式

    ctx.fillText(opts.text, opts.x, opts.y); // 绘制文字

    callback && callback(); // 回调函数，预留位置。
  }


  // mask ==============================
  $('.handle-canvasToImg').on('click',function(){
    $('.mask-poster').removeClass('fn-hide');
  })

  $('.mask,.btn-close').on('click',function(){
    var $this = $(this);
    $this.parent().addClass('fn-hide');
  })
  
});
