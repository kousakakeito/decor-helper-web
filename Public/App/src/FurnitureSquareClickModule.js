

module.exports = function handleClick(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2){
    
  const pointerPos = stage.getPointerPosition();
  const x = pointerPos.x;
  const y = pointerPos.y;

  // 図形の上辺、左辺、下辺、右辺上でのみ丸い点を追加
  const border = isMouseOnBorder(rectangle, x, y);
  if (border) {
    // クリックした位置に丸い点を追加
    let centerX, centerY;
    switch (border) {
      case 'top':
        centerX = x;
        centerY = rectangle.y();
        break;
      case 'left':
        centerX = rectangle.x();
        centerY = y;
        break;
      case 'bottom':
        centerX = x;
        centerY = rectangle.y() + rectangle.height();
        break;
      case 'right':
        centerX = rectangle.x() + rectangle.width();
        centerY = y;
        break;
    }

    const dot = new Konva.Circle({
      x: centerX,
      y: centerY,
      radius: 5,
      fill: 'red', // 適宜調整
      draggable: false,
    });

    // 丸い点が２つを超えたら古い順に削除
    if (dots.length >= 2) {
      const removedDot = dots.shift();
      removedDot.destroy();
    }

    dots.push(dot);
    layer.add(dot);
    layer.batchDraw(); // レイヤーを再描画する必要があります

    // 2つの丸い点の間に破線（実線）を描画
    if (dots.length === 2) {
      const startDot = dots[0];
      const endDot = dots[1];
      const startX = startDot.x();
      const startY = startDot.y();
      const endX = endDot.x();
      const endY = endDot.y();

      if (dashedLine) {
        dashedLine.destroy(); // 既存の破線があれば削除
      }

      dashedLine = drawDashedLine(startX, startY, endX, endY);
      layer.add(dashedLine);
      layer.batchDraw();
      isDashedLineVisible = true;

      // 破線の真ん中に四角を表示
      if (midRect) {
        midRect.destroy(); // 既存の四角があれば削除
      }

      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      midRect = new Konva.Rect({
        x: midX - 5,
        y: midY - 5,
        width: 10,
        height: 10,
        fill: 'red', // 適宜調整
        draggable: false,
      });

      layer.add(midRect);
    }
  }
 
  
  
  

  if( dots.filter(dot => dot.y() === rectangle.y()).length === 2 ||
      dots.filter(dot => dot.y() === rectangle.y() + rectangle.height()).length === 2 ||
      dots.filter(dot => dot.x() === rectangle.x() + rectangle.width()).length === 2 ||
      dots.filter(dot => dot.x() === rectangle.x()).length === 2 ) {
        

        
        const sideTwoPoints  = require('src/FurnitureSideTwoPointsModule');
        const sideTwoPoints2 = () =>{
          sideTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2)
        };
        sideTwoPoints2();

  } else if(dots.length === 2 && dots[0].y() === rectangle.y() && dots[1].x() === rectangle.x() + rectangle.width() ||
            dots.length === 2 && dots[0].x() === rectangle.x() + rectangle.width() && dots[1].y() === rectangle.y()){

        const sideTopRightPoints  = require('src/FurnitureSideTopRightPointsModule');
        const sideTopRightPoints2 = () =>{
          sideTopRightPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2)
        };
        sideTopRightPoints2();

  } else if(dots.length === 2 && dots[0].y() === rectangle.y() && dots[1].x() === rectangle.x() ||
            dots.length === 2 && dots[0].x() === rectangle.x() && dots[1].y() === rectangle.y()){

        const sideTopLeftPoints  = require('src/FurnitureSideTopLeftPointsModule');
        const sideTopLeftPoints2 = () =>{
          sideTopLeftPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2)
        };
        sideTopLeftPoints2();

  } else if(dots.length === 2 && dots[0].x() === rectangle.x() + rectangle.width() && dots[1].y() === rectangle.y() + rectangle.height() ||
            dots.length === 2 && dots[0].y() === rectangle.y() + rectangle.height() && dots[1].x() === rectangle.x() + rectangle.width()){

        const sideBottomRightPoints  = require('src/FurnitureSideBottomRightPointsModule');
        const sideBottomRightPoints2 = () =>{
          sideBottomRightPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2)
        };
        sideBottomRightPoints2();

  } else if(dots.length === 2 && dots[0].y() === rectangle.y() + rectangle.height() && dots[1].x() === rectangle.x() ||
            dots.length === 2 && dots[0].x() === rectangle.x() && dots[1].y() === rectangle.y() + rectangle.height()){

        const sideBottomLeftPoints  = require('src/FurnitureSideBottomLeftPointsModule');
        const sideBottomLeftPoints2 = () =>{
          sideBottomLeftPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2)
        };
        sideBottomLeftPoints2();

  }



};