

module.exports = function handleClick(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2){
    
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
        

        
        const  sideTwoPoints  = require('src/SpaceSideTwoPointsModule');

        const sideTwoPoints2 = () =>{
    
          sideTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2)
    
        };

        sideTwoPoints2();



  } else if(dots.length === 2 && dots[0].y() === rectangle.y() && dots[1].x() === rectangle.x() + rectangle.width() ||
            dots.length === 2 && dots[0].x() === rectangle.x() + rectangle.width() && dots[1].y() === rectangle.y()){

    const rectAngleSizeForm12 = document.createElement('input');
    rectAngleSizeForm12.type = "text";
    rectAngleSizeForm12.classList.add("rectAngle-SizeForm12");
    rectAngleSizeForm12.placeholder = "上辺丸点の左端からの長さを入力";

    const rectAngleSizeForm13 = document.createElement('input');
    rectAngleSizeForm13.type = "text";
    rectAngleSizeForm13.classList.add("rectAngle-SizeForm13");
    rectAngleSizeForm13.placeholder = "上辺丸点の右端からの長さを入力";

    const rectAngleSizeForm14 = document.createElement('input');
    rectAngleSizeForm14.type = "text";
    rectAngleSizeForm14.classList.add("rectAngle-SizeForm14");
    rectAngleSizeForm14.placeholder = "右辺丸点の上端からの長さを入力";

    const rectAngleSizeForm15 = document.createElement('input');
    rectAngleSizeForm15.type = "text";
    rectAngleSizeForm15.classList.add("rectAngle-SizeForm15");
    rectAngleSizeForm15.placeholder = "右辺丸点の下端からの長さを入力";

    const rectAngleConfirm7 = document.createElement('button');
    rectAngleConfirm7.classList.add("rectAngle-confirm7");
    rectAngleConfirm7.append("決定");

    const div14 = document.createElement("div");
    div14.classList.add("div14");

    const div13 = document.createElement("div");
    div13.classList.add("div13");

    const note5 = document.createElement("p");
    note5.classList.add("note5");

    const note6 = document.createElement("p");
    note6.classList.add("note6");

    div14.append(note5,note6);
    div14.append(rectAngleSizeForm12,rectAngleSizeForm13,rectAngleSizeForm14,rectAngleSizeForm15,rectAngleConfirm7);

    div13.append(div14);
    spacecenterInner.append(div13);

    document.querySelector(".note5").textContent = "※右端または左端のどちらかを入力してください※";
    document.querySelector(".note6").textContent = "※上端または下端のどちらかを入力してください※";

    document.querySelector(".rectAngle-confirm7").addEventListener("click",function(){

      const size2 =document.querySelector(".rectAngle-SizeForm12").value;
      const size3 =document.querySelector(".rectAngle-SizeForm13").value;
      const size4 =document.querySelector(".rectAngle-SizeForm14").value;
      const size5 =document.querySelector(".rectAngle-SizeForm15").value;
      const size2Y = Number.parseFloat(size2);
      const size3Y = Number.parseFloat(size3);
      const size4Y = Number.parseFloat(size4);
      const size5Y = Number.parseFloat(size5);
      const size2Num = size2Y /1.06;
      const size3Num = size3Y /1.06;
      const size4Num = size4Y /1.06;
      const size5Num = size5Y /1.06;
      console.log(size2Num)
      console.log(size3Num)
      console.log(size4Num)
      console.log(size5Num)
      
      if (dots[0].y() === rectangle.y() && dots[1].x() === rectangle.x() + rectangle.width()) {
      
      if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

      if(Number.isNaN(size4Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[0].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div13").lastChild) {
      document.querySelector(".div13").removeChild(document.querySelector(".div13").lastChild);
     }




    }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size2Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[0].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div13").lastChild) {
      document.querySelector(".div13").removeChild(document.querySelector(".div13").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size4Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[0].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div13").lastChild) {
      document.querySelector(".div13").removeChild(document.querySelector(".div13").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[0].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div13").lastChild) {
      document.querySelector(".div13").removeChild(document.querySelector(".div13").lastChild);
     }



    };

  }else if (dots[0].x() === rectangle.x() + rectangle.width() && dots[1].y() === rectangle.y()) {

    if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

      if(Number.isNaN(size4Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[1].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div13").lastChild) {
      document.querySelector(".div13").removeChild(document.querySelector(".div13").lastChild);
     }




    }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size2Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[1].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div13").lastChild) {
      document.querySelector(".div13").removeChild(document.querySelector(".div13").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size4Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[1].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div13").lastChild) {
      document.querySelector(".div13").removeChild(document.querySelector(".div13").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[1].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div13").lastChild) {
      document.querySelector(".div13").removeChild(document.querySelector(".div13").lastChild);
     }



    };

  }

    });


  } else if(dots.length === 2 && dots[0].y() === rectangle.y() && dots[1].x() === rectangle.x() ||
            dots.length === 2 && dots[0].x() === rectangle.x() && dots[1].y() === rectangle.y()){

    const rectAngleSizeForm16 = document.createElement('input');
    rectAngleSizeForm16.type = "text";
    rectAngleSizeForm16.classList.add("rectAngle-SizeForm16");
    rectAngleSizeForm16.placeholder = "上辺丸点の左端からの長さを入力";

    const rectAngleSizeForm17 = document.createElement('input');
    rectAngleSizeForm17.type = "text";
    rectAngleSizeForm17.classList.add("rectAngle-SizeForm17");
    rectAngleSizeForm17.placeholder = "上辺丸点の右端からの長さを入力";

    const rectAngleSizeForm18 = document.createElement('input');
    rectAngleSizeForm18.type = "text";
    rectAngleSizeForm18.classList.add("rectAngle-SizeForm18");
    rectAngleSizeForm18.placeholder = "左辺丸点の上端からの長さを入力";

    const rectAngleSizeForm19 = document.createElement('input');
    rectAngleSizeForm19.type = "text";
    rectAngleSizeForm19.classList.add("rectAngle-SizeForm19");
    rectAngleSizeForm19.placeholder = "左辺丸点の下端からの長さを入力";

    const rectAngleConfirm8 = document.createElement('button');
    rectAngleConfirm8.classList.add("rectAngle-confirm8");
    rectAngleConfirm8.append("決定");

    const div16 = document.createElement("div");
    div16.classList.add("div16");

    const div15 = document.createElement("div");
    div15.classList.add("div15");

    const note7 = document.createElement("p");
    note7.classList.add("note7");

    const note8 = document.createElement("p");
    note8.classList.add("note8");

    div16.append(note7,note8);
    div16.append(rectAngleSizeForm16,rectAngleSizeForm17,rectAngleSizeForm18,rectAngleSizeForm19,rectAngleConfirm8);

    div15.append(div16);
    spacecenterInner.append(div15);

    document.querySelector(".note7").textContent = "※右端または左端のどちらかを入力してください※";
    document.querySelector(".note8").textContent = "※上端または下端のどちらかを入力してください※";

    document.querySelector(".rectAngle-confirm8").addEventListener("click",function(){

      const size2 =document.querySelector(".rectAngle-SizeForm16").value;
      const size3 =document.querySelector(".rectAngle-SizeForm17").value;
      const size4 =document.querySelector(".rectAngle-SizeForm18").value;
      const size5 =document.querySelector(".rectAngle-SizeForm19").value;
      const size2Y = Number.parseFloat(size2);
      const size3Y = Number.parseFloat(size3);
      const size4Y = Number.parseFloat(size4);
      const size5Y = Number.parseFloat(size5);
      const size2Num = size2Y /1.06;
      const size3Num = size3Y /1.06;
      const size4Num = size4Y /1.06;
      const size5Num = size5Y /1.06;
      console.log(size2Num)
      console.log(size3Num)
      console.log(size4Num)
      console.log(size5Num)
      
      if (dots[0].y() === rectangle.y() && dots[1].x() === rectangle.x()) {
      
      if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

      if(Number.isNaN(size4Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[0].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div15").lastChild) {
      document.querySelector(".div15").removeChild(document.querySelector(".div15").lastChild);
     }




    }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size2Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[0].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div15").lastChild) {
      document.querySelector(".div15").removeChild(document.querySelector(".div15").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size4Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[0].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div15").lastChild) {
      document.querySelector(".div15").removeChild(document.querySelector(".div15").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[0].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div15").lastChild) {
      document.querySelector(".div15").removeChild(document.querySelector(".div15").lastChild);
     }



    };

  }else if (dots[0].x() === rectangle.x() && dots[1].y() === rectangle.y()) {

    if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

      if(Number.isNaN(size4Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[1].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div15").lastChild) {
      document.querySelector(".div15").removeChild(document.querySelector(".div15").lastChild);
     }




    }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size2Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[1].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div15").lastChild) {
      document.querySelector(".div15").removeChild(document.querySelector(".div15").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size4Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[1].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div15").lastChild) {
      document.querySelector(".div15").removeChild(document.querySelector(".div15").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[1].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div15").lastChild) {
      document.querySelector(".div15").removeChild(document.querySelector(".div15").lastChild);
     }



    };

  }

    });

  } else if(dots.length === 2 && dots[0].x() === rectangle.x() + rectangle.width() && dots[1].y() === rectangle.y() + rectangle.height() ||
            dots.length === 2 && dots[0].y() === rectangle.y() + rectangle.height() && dots[1].x() === rectangle.x() + rectangle.width()){

    const rectAngleSizeForm20 = document.createElement('input');
    rectAngleSizeForm20.type = "text";
    rectAngleSizeForm20.classList.add("rectAngle-SizeForm20");
    rectAngleSizeForm20.placeholder = "右辺丸点の上端からの長さを入力";

    const rectAngleSizeForm21 = document.createElement('input');
    rectAngleSizeForm21.type = "text";
    rectAngleSizeForm21.classList.add("rectAngle-SizeForm21");
    rectAngleSizeForm21.placeholder = "右辺丸点の下端からの長さを入力";

    const rectAngleSizeForm22 = document.createElement('input');
    rectAngleSizeForm22.type = "text";
    rectAngleSizeForm22.classList.add("rectAngle-SizeForm22");
    rectAngleSizeForm22.placeholder = "下辺丸点の右端からの長さを入力";

    const rectAngleSizeForm23 = document.createElement('input');
    rectAngleSizeForm23.type = "text";
    rectAngleSizeForm23.classList.add("rectAngle-SizeForm23");
    rectAngleSizeForm23.placeholder = "下辺丸点の左端からの長さを入力";

    const rectAngleConfirm9 = document.createElement('button');
    rectAngleConfirm9.classList.add("rectAngle-confirm9");
    rectAngleConfirm9.append("決定");

    const div18 = document.createElement("div");
    div18.classList.add("div18");

    const div17 = document.createElement("div");
    div17.classList.add("div17");

    const note9 = document.createElement("p");
    note9.classList.add("note9");

    const note10 = document.createElement("p");
    note10.classList.add("note10");

    div18.append(note9,note10);
    div18.append(rectAngleSizeForm20,rectAngleSizeForm21,rectAngleSizeForm22,rectAngleSizeForm23,rectAngleConfirm9);

    div17.append(div18);
    spacecenterInner.append(div17);

    document.querySelector(".note9").textContent = "※上端または下端のどちらかを入力してください※";
    document.querySelector(".note10").textContent = "※右端または左端のどちらかを入力してください※";

    document.querySelector(".rectAngle-confirm9").addEventListener("click",function(){

      const size2 =document.querySelector(".rectAngle-SizeForm20").value;
      const size3 =document.querySelector(".rectAngle-SizeForm21").value;
      const size4 =document.querySelector(".rectAngle-SizeForm22").value;
      const size5 =document.querySelector(".rectAngle-SizeForm23").value;
      const size2Y = Number.parseFloat(size2);
      const size3Y = Number.parseFloat(size3);
      const size4Y = Number.parseFloat(size4);
      const size5Y = Number.parseFloat(size5);
      const size2Num = size2Y /1.06;
      const size3Num = size3Y /1.06;
      const size4Num = size4Y /1.06;
      const size5Num = size5Y /1.06;
      console.log(size2Num)
      console.log(size3Num)
      console.log(size4Num)
      console.log(size5Num)
      
      if (dots[0].y() === rectangle.y() + rectangle.height() && dots[1].x() === rectangle.x() + rectangle.width()) {
      
      if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

      if(Number.isNaN(size4Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();
     

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length3;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length2;

     // 左の丸い点の座標を更新
     dots[0].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div17").lastChild) {
      document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
     }




    }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size2Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length3;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length2;

     // 左の丸い点の座標を更新
     dots[0].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div17").lastChild) {
      document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size4Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length3;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length2;

     // 左の丸い点の座標を更新
     dots[0].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div17").lastChild) {
      document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length3;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length2;

     // 左の丸い点の座標を更新
     dots[0].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div17").lastChild) {
      document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
     }



    };

  }else if (dots[0].x() === rectangle.x() + rectangle.width() && dots[1].y() === rectangle.y() + rectangle.height()) {

    if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

      if(Number.isNaN(size4Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();
     

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length3;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length2;

     // 左の丸い点の座標を更新
     dots[1].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div17").lastChild) {
      document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
     }




    }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size2Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length3;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length2;

     // 左の丸い点の座標を更新
     dots[1].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div17").lastChild) {
      document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size4Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length3;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length2;

     // 左の丸い点の座標を更新
     dots[1].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div17").lastChild) {
      document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length3;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length2;

     // 左の丸い点の座標を更新
     dots[1].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div17").lastChild) {
      document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
     }



    };

  }

    });
    
  } else if(dots.length === 2 && dots[0].y() === rectangle.y() + rectangle.height() && dots[1].x() === rectangle.x() ||
            dots.length === 2 && dots[0].x() === rectangle.x() && dots[1].y() === rectangle.y() + rectangle.height()){

    const rectAngleSizeForm24 = document.createElement('input');
    rectAngleSizeForm24.type = "text";
    rectAngleSizeForm24.classList.add("rectAngle-SizeForm24");
    rectAngleSizeForm24.placeholder = "下辺丸点の右端からの長さを入力";

    const rectAngleSizeForm25 = document.createElement('input');
    rectAngleSizeForm25.type = "text";
    rectAngleSizeForm25.classList.add("rectAngle-SizeForm25");
    rectAngleSizeForm25.placeholder = "下辺丸点の左端からの長さを入力";

    const rectAngleSizeForm26 = document.createElement('input');
    rectAngleSizeForm26.type = "text";
    rectAngleSizeForm26.classList.add("rectAngle-SizeForm26");
    rectAngleSizeForm26.placeholder = "左辺丸点の上端からの長さを入力";

    const rectAngleSizeForm27 = document.createElement('input');
    rectAngleSizeForm27.type = "text";
    rectAngleSizeForm27.classList.add("rectAngle-SizeForm27");
    rectAngleSizeForm27.placeholder = "左辺丸点の下端からの長さを入力";

    const rectAngleConfirm10 = document.createElement('button');
    rectAngleConfirm10.classList.add("rectAngle-confirm10");
    rectAngleConfirm10.append("決定");

    const div20 = document.createElement("div");
    div20.classList.add("div20");

    const div19 = document.createElement("div");
    div19.classList.add("div19");

    const note11 = document.createElement("p");
    note11.classList.add("note11");

    const note12 = document.createElement("p");
    note12.classList.add("note12");

    div20.append(note11,note12);
    div20.append(rectAngleSizeForm24,rectAngleSizeForm25,rectAngleSizeForm26,rectAngleSizeForm27,rectAngleConfirm10);

    div19.append(div20);
    spacecenterInner.append(div19);

    document.querySelector(".note11").textContent = "※右端または左端のどちらかを入力してください※";
    document.querySelector(".note12").textContent = "※上端または下端のどちらかを入力してください※";

    document.querySelector(".rectAngle-confirm10").addEventListener("click",function(){

      const size2 =document.querySelector(".rectAngle-SizeForm24").value;
      const size3 =document.querySelector(".rectAngle-SizeForm25").value;
      const size4 =document.querySelector(".rectAngle-SizeForm26").value;
      const size5 =document.querySelector(".rectAngle-SizeForm27").value;
      const size2Y = Number.parseFloat(size2);
      const size3Y = Number.parseFloat(size3);
      const size4Y = Number.parseFloat(size4);
      const size5Y = Number.parseFloat(size5);
      const size2Num = size2Y /1.06;
      const size3Num = size3Y /1.06;
      const size4Num = size4Y /1.06;
      const size5Num = size5Y /1.06;
      console.log(size2Num)
      console.log(size3Num)
      console.log(size4Num)
      console.log(size5Num)
      
      if (dots[0].y() === rectangle.y() + rectangle.height() && dots[1].x() === rectangle.x()) {
      
      if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

      if(Number.isNaN(size4Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();
     

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[0].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div19").lastChild) {
      document.querySelector(".div19").removeChild(document.querySelector(".div19").lastChild);
     }




    }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size2Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[0].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div19").lastChild) {
      document.querySelector(".div19").removeChild(document.querySelector(".div19").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size4Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[0].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div19").lastChild) {
      document.querySelector(".div19").removeChild(document.querySelector(".div19").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[0].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[1].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[1].x(); 
       const intersectionY1 = dots[0].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div19").lastChild) {
      document.querySelector(".div19").removeChild(document.querySelector(".div19").lastChild);
     }



    };

  }else if (dots[0].x() === rectangle.x() && dots[1].y() === rectangle.y() + rectangle.height()) {

    if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

      if(Number.isNaN(size4Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();
     

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[1].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div19").lastChild) {
      document.querySelector(".div19").removeChild(document.querySelector(".div19").lastChild);
     }




    }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size2Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size2Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[1].x(newLeftCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div19").lastChild) {
      document.querySelector(".div19").removeChild(document.querySelector(".div19").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size4Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size4Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newTopCircleX = rectangle.y() + length3;

     // 左の丸い点の座標を更新
     dots[1].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newTopCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div19").lastChild) {
      document.querySelector(".div19").removeChild(document.querySelector(".div19").lastChild);
     }

    }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

      if(Number.isNaN(size3Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");

       if(Number.isNaN(size5Num)){

        const sizeFormError3 = document.createElement("p");
        sizeFormError3.classList.add("size-form-error3");
        div6.append(sizeFormError3);
        document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
       }
         console.log("A");
 
     // 長さを格納する変数
     let length2 = size3Num;
     let length3 = size5Num;  

     midRect.destroy();
     dashedLine.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;
     // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

     // 左の丸い点の座標を更新
     dots[1].x(newRightCircleX);
     layer.draw();

     // 右の丸い点の座標を更新
     dots[0].y(newBottomCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x1 = dots[0].x();
       const y1 = dots[0].y();

       // 丸い点の座標を取得
       const x2 = dots[1].x();
       const y2 = dots[1].y();

       const intersectionX1 = dots[0].x(); 
       const intersectionY1 = dots[1].y();



       const polygon = new Konva.Line({
        points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
        stroke: 'white', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: 'white', // 塗りつぶし色（透明）
      });
      
       layer.add(polygon);
       dots[0].destroy();
       dots[1].destroy();
       layer.draw();

    
     while (document.querySelector(".div19").lastChild) {
      document.querySelector(".div19").removeChild(document.querySelector(".div19").lastChild);
     }



    };

  }

    });

  }



};