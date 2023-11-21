
module.exports = function rightTopCheckTriangle(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,check,dashedLine6,newCircle,newRect,handleConfirm11,handleConfirm4){

  const size4 =document.querySelector(".rectAngle-SizeForm28").value;
  const size5 =document.querySelector(".rectAngle-SizeForm29").value;
  const size4Y = Number.parseFloat(size4);
  const size5Y = Number.parseFloat(size5);
  const size4Num = size4Y /1.06;
  const size5Num = size5Y /1.06;
  

  if(size4 !== "" && size5 === ""){

    //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を青色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を青色にする

    if(Number.isNaN(size4Num)){
      const sizeFormError5 = document.createElement("p");
      sizeFormError5.classList.add("size-form-error5");
      div22.append(sizeFormError5);
      document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
     } else{

    dashedLine6.destroy();

    // 右に移動させる距離を指定
    const offsetX = size4Num;

    // 現在の midRect の座標を取得
    const currentX = newRect.x();
    const currentY = newRect.y();

    const circleX1 = newCircle.x();
    const circleY1 = newCircle.y();

    const circleX2 = circle2.x();
    const circleY2 = circle2.y();

    // 新しい座標を計算して設定
    const newX = currentX + offsetX;
    const newY = currentY;

    // midRect の座標を更新
    newRect.position({ x: newX, y: newY });

    // 四角の真ん中の座標を計算
    const midRectX1 = newRect.x() + newRect.width() / 2;
    const midRectY1 = newRect.y() + newRect.height() / 2;

    dashedLine7 = drawDashedLine(circleX1,circleY1,midRectX1,midRectY1);
    dashedLine8 = drawDashedLine(midRectX1,midRectY1,circleX2,circleY2);
    layer.add(dashedLine7);
    layer.add(dashedLine8);

    // レイヤーを再描画
    layer.draw();



     const rectAngleSizeForm30 = document.createElement('input');
     rectAngleSizeForm30.type = "text";
     rectAngleSizeForm30.classList.add("rectAngle-SizeForm30");
     rectAngleSizeForm30.placeholder = "四角を上方向に動かす場合はその長さを入力";

     const rectAngleSizeForm31 = document.createElement('input');
     rectAngleSizeForm31.type = "text";
     rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
     rectAngleSizeForm31.placeholder = "四角を下方向に動かす場合はその長さを入力";

     const rectAngleConfirm12 = document.createElement('button');
     rectAngleConfirm12.classList.add("rectAngle-confirm12");
     rectAngleConfirm12.append("決定");

     const rectAngleConfirm13 = document.createElement('button');
     rectAngleConfirm13.classList.add("rectAngle-confirm13");
     rectAngleConfirm13.append("完了");

     const div24 = document.createElement("div");
     div24.classList.add("div24");

     const div23 = document.createElement("div");
     div23.classList.add("div23");

     const note14 = document.createElement("p");
     note14.classList.add("note14");

     div24.append(note14);
     div24.append(rectAngleSizeForm30,rectAngleSizeForm31,rectAngleConfirm12,rectAngleConfirm13);

     div23.append(div24);
     furniturecenterInner.append(div23);

     document.querySelector(".note14").textContent = "上記不要の場合はこちら";

     document.querySelector(".rectAngle-confirm13").addEventListener("click",handleConfirm13);
     document.querySelector(".rectAngle-confirm11").removeEventListener("click",handleConfirm11);

     while (document.querySelector(".div21").lastChild) {
      document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
     }

     document.querySelector(".div21").parentNode.removeChild(document.querySelector(".div21"));


      function handleConfirm13(){

      const polygon = new Konva.Line({
        points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
        stroke: '#8b4513', // 線の色
        strokeWidth: 2, // 線の太さ
        closed: true, // 閉じた形状として描画
        fill: '#8b4513', // 塗りつぶし色（透明）
      });
      
      layer.add(polygon);

      circle2.destroy();
      newRect.destroy();
      newCircle.destroy();

      dots.length = 0 ;
      stage.on("click",handleClick2);
      document.querySelector(".rectAngle-confirm13").removeEventListener("click",handleConfirm13);

      while (document.querySelector(".div23").lastChild) {
        document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
       }

       document.querySelector(".div23").parentNode.removeChild(document.querySelector(".div23"));

     };

     document.querySelector(".rectAngle-confirm12").addEventListener("click",handleConfirm12);
     
     function handleConfirm12(){

      
       const size6 =document.querySelector(".rectAngle-SizeForm30").value;
       const size7 =document.querySelector(".rectAngle-SizeForm31").value;
       const size6Y = Number.parseFloat(size6);
       const size7Y = Number.parseFloat(size7);
       const size6Num = size6Y /1.06;
       const size7Num = size7Y /1.06;

       if(size6 !== "" && size7 === ""){

        if(Number.isNaN(size6Num)){
          const sizeFormError8 = document.createElement("p");
          sizeFormError8.classList.add("size-form-error8");
          div24.append(sizeFormError8);
          document.querySelector(".size-form-error8").textContent = "※数値のみ入力してください※";
         } else{
  
         const offsetX = -size6Num;
         const currentX = newRect.x();
         const currentY = newRect.y();
         const newX = currentX;
         const newY = currentY + offsetX;

         newRect.position({ x: newX, y: newY });

         layer.draw();

         dashedLine7.destroy();
         dashedLine8.destroy();

         const circleX1A = newCircle.x();
         const circleY1A = newCircle.y();

         const circleX2A = circle2.x();
         const circleY2A = circle2.y();

         // 四角の真ん中の座標を計算
         const midRectX1A = newRect.x() + newRect.width() / 2;
         const midRectY1A = newRect.y() + newRect.height() / 2;

         const polygon = new Konva.Line({
          points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
          stroke: '#8b4513', // 線の色
          strokeWidth: 2, // 線の太さ
          closed: true, // 閉じた形状として描画
          fill: '#8b4513', // 塗りつぶし色（透明）
        });
        
        layer.add(polygon);
        newCircle.destroy();
        circle2.destroy();
        newRect.destroy();

        dots.length = 0 ;
        stage.on("click",handleClick2);
        document.querySelector(".rectAngle-confirm12").removeEventListener("click",handleConfirm12);

        while (document.querySelector(".div23").lastChild) {
          document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
         }


          document.querySelector(".div23").parentNode.removeChild(document.querySelector(".div23"));


        };

       } else if(size7 !== "" && size6 === ""){

        if(Number.isNaN(size7Num)){
          const sizeFormError9 = document.createElement("p");
          sizeFormError9.classList.add("size-form-error9");
          div24.append(sizeFormError9);
          document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
         } else{

         const offsetX = size7Num;
         const currentX = newRect.x();
         const currentY = newRect.y();
         const newX = currentX;
         const newY = currentY + offsetX;

         newRect.position({ x: newX, y: newY });

         layer.draw();

         dashedLine7.destroy();
         dashedLine8.destroy();

         const circleX1A = newCircle.x();
         const circleY1A = newCircle.y();

         const circleX2A = circle2.x();
         const circleY2A = circle2.y();

         // 四角の真ん中の座標を計算
         const midRectX1A = newRect.x() + newRect.width() / 2;
         const midRectY1A = newRect.y() + newRect.height() / 2;

         const polygon = new Konva.Line({
          points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
          stroke: '#8b4513', // 線の色
          strokeWidth: 2, // 線の太さ
          closed: true, // 閉じた形状として描画
          fill: '#8b4513', // 塗りつぶし色（透明）
        });
        
        layer.add(polygon);
        newCircle.destroy();
        circle2.destroy();
        newRect.destroy();

        dots.length = 0 ;
        stage.on("click",handleClick2);
        document.querySelector(".rectAngle-confirm12").removeEventListener("click",handleConfirm12);

        while (document.querySelector(".div23").lastChild) {
          document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
         }


          document.querySelector(".div23").parentNode.removeChild(document.querySelector(".div23"));



       };
      };

     };


    };

  }else if(size5 !== "" && size4 === ""){

    //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を白色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を白色にする

     if(Number.isNaN(size5Num)){
      const sizeFormError6 = document.createElement("p");
      sizeFormError6.classList.add("size-form-error6");
      div22.append(sizeFormError6);
      document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
     } else{

     dashedLine6.destroy();

    // 左に移動させる距離を指定
    const offsetX = -size5Num;

    // 現在の midRect の座標を取得
    const currentX = newRect.x();
    const currentY = newRect.y();

    const circleX1 = newCircle.x();
    const circleY1 = newCircle.y();

    const circleX2 = circle2.x();
    const circleY2 = circle2.y();

    // 新しい座標を計算して設定
    const newX = currentX + offsetX;
    const newY = currentY;

    // midRect の座標を更新
    newRect.position({ x: newX, y: newY });

    // 四角の真ん中の座標を計算
    const midRectX1 = newRect.x() + newRect.width() / 2;
    const midRectY1 = newRect.y() + newRect.height() / 2;

    dashedLine7 = drawDashedLine(circleX1,circleY1,midRectX1,midRectY1);
    dashedLine8 = drawDashedLine(midRectX1,midRectY1,circleX2,circleY2);
    layer.add(dashedLine7);
    layer.add(dashedLine8);

    // レイヤーを再描画
    layer.draw();



     const rectAngleSizeForm30 = document.createElement('input');
     rectAngleSizeForm30.type = "text";
     rectAngleSizeForm30.classList.add("rectAngle-SizeForm30");
     rectAngleSizeForm30.placeholder = "四角を上方向に動かす場合はその長さを入力";

     const rectAngleSizeForm31 = document.createElement('input');
     rectAngleSizeForm31.type = "text";
     rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
     rectAngleSizeForm31.placeholder = "四角を下方向に動かす場合はその長さを入力";

     const rectAngleConfirm12 = document.createElement('button');
     rectAngleConfirm12.classList.add("rectAngle-confirm12");
     rectAngleConfirm12.append("決定");

     const rectAngleConfirm13 = document.createElement('button');
     rectAngleConfirm13.classList.add("rectAngle-confirm13");
     rectAngleConfirm13.append("完了");

     const div24 = document.createElement("div");
     div24.classList.add("div24");

     const div23 = document.createElement("div");
     div23.classList.add("div23");

     const note14 = document.createElement("p");
     note14.classList.add("note14");

     div24.append(note14);
     div24.append(rectAngleSizeForm30,rectAngleSizeForm31,rectAngleConfirm12,rectAngleConfirm13);

     div23.append(div24);
     furniturecenterInner.append(div23);

     document.querySelector(".note14").textContent = "上記不要の場合はこちら";


     document.querySelector(".rectAngle-confirm13").addEventListener("click",handleConfirm13);
     document.querySelector(".rectAngle-confirm12").removeEventListener("click",handleConfirm12);

     while (document.querySelector(".div21").lastChild) {
       document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
      }

       document.querySelector(".div21").parentNode.removeChild(document.querySelector(".div21"));
     
     function handleConfirm13(){

      const customShape = new Konva.Shape({

        sceneFunc: function (context, shape) {
      
          const x1 = circleX1; // 三角形の頂点1の X 座標
          const y1 = circleY1; // 三角形の頂点1の Y 座標
          const x2 = midRectX1; // 三角形の頂点2の X 座標
          const y2 = midRectY1; // 三角形の頂点2の Y 座標
          const x3 = circleX2; // 三角形の頂点3の X 座標
          const y3 = circleY2; // 三角形の頂点3の Y 座標

          const clearLine1 = [x1+1, y1];
          const clearLine2 = [x2, y2];
          const clearLine3 = [x3+1, y3];

          context.beginPath();
          context.moveTo(...clearLine1);
          context.lineTo(...clearLine2);
          context.lineTo(...clearLine3);
          context.closePath();
      
          // 三角形のパスをクリアする
          context.globalCompositeOperation = 'destination-out';
          context.fill();
          context.globalCompositeOperation = 'source-over';
      
          shape.clearLine1 = clearLine1;
          shape.clearLine2 = clearLine2;
          shape.clearLine3 = clearLine3;
      
        },
      
        
      });
      
    layer.add(customShape);
    layer.draw();

      circle2.destroy();
      newRect.destroy();
      newCircle.destroy();
      dashedLine7.destroy();
      dashedLine8.destroy();

      dots.length = 0 ;
      stage.on("click",handleClick2);
      document.querySelector(".rectAngle-confirm13").removeEventListener("click",handleConfirm13);

      while (document.querySelector(".div23").lastChild) {
        document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
       }


        document.querySelector(".div23").parentNode.removeChild(document.querySelector(".div23"));

     };

     document.querySelector(".rectAngle-confirm12").addEventListener("click", handle2Confirm12);
     
     function handle2Confirm12(){

      
       const size6 =document.querySelector(".rectAngle-SizeForm30").value;
       const size7 =document.querySelector(".rectAngle-SizeForm31").value;
       const size6Y = Number.parseFloat(size6);
       const size7Y = Number.parseFloat(size7);
       const size6Num = size6Y /1.06;
       const size7Num = size7Y /1.06;

       if(size6 !== "" && size7 === ""){

        if(Number.isNaN(size6Num)){
          const sizeFormError8 = document.createElement("p");
          sizeFormError8.classList.add("size-form-error8");
          div24.append(sizeFormError8);
          document.querySelector(".size-form-error8").textContent = "※数値のみ入力してください※";
         } else { 
  
         const offsetX = -size6Num;
         const currentX = newRect.x();
         const currentY = newRect.y();
         const newX = currentX;
         const newY = currentY + offsetX;

         newRect.position({ x: newX, y: newY });

         layer.draw();

         dashedLine7.destroy();
         dashedLine8.destroy();

         const circleX1A = newCircle.x();
         const circleY1A = newCircle.y();

         const circleX2A = circle2.x();
         const circleY2A = circle2.y();

         // 四角の真ん中の座標を計算
         const midRectX1A = newRect.x() + newRect.width() / 2;
         const midRectY1A = newRect.y() + newRect.height() / 2;

         const customShape = new Konva.Shape({

          sceneFunc: function (context, shape) {
        
            const x1 = circleX1A; // 三角形の頂点1の X 座標
            const y1 = circleY1A; // 三角形の頂点1の Y 座標
            const x2 = midRectX1A; // 三角形の頂点2の X 座標
            const y2 = midRectY1A; // 三角形の頂点2の Y 座標
            const x3 = circleX2A; // 三角形の頂点3の X 座標
            const y3 = circleY2A; // 三角形の頂点3の Y 座標
  
            const clearLine1 = [x1+1, y1];
            const clearLine2 = [x2, y2];
            const clearLine3 = [x3+1, y3];
  
            context.beginPath();
            context.moveTo(...clearLine1);
            context.lineTo(...clearLine2);
            context.lineTo(...clearLine3);
            context.closePath();
        
            // 三角形のパスをクリアする
            context.globalCompositeOperation = 'destination-out';
            context.fill();
            context.globalCompositeOperation = 'source-over';
        
            shape.clearLine1 = clearLine1;
            shape.clearLine2 = clearLine2;
            shape.clearLine3 = clearLine3;
        
          },
        
          
        });
        
      layer.add(customShape);
      layer.draw();
        newCircle.destroy();
        circle2.destroy();
        newRect.destroy();

        dots.length = 0 ;
        stage.on("click",handleClick2);
        document.querySelector(".rectAngle-confirm12").removeEventListener("click",handle2Confirm12);
  
        while (document.querySelector(".div23").lastChild) {
          document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
         }
  
  
          document.querySelector(".div23").parentNode.removeChild(document.querySelector(".div23"));


        };

       } else if(size7 !== "" && size6 === ""){

        if(Number.isNaN(size7Num)){
          const sizeFormError9 = document.createElement("p");
          sizeFormError9.classList.add("size-form-error9");
          div24.append(sizeFormError9);
          document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
         } else{

         const offsetX = size7Num;
         const currentX = newRect.x();
         const currentY = newRect.y();
         const newX = currentX;
         const newY = currentY + offsetX;

         newRect.position({ x: newX, y: newY });

         layer.draw();

         dashedLine7.destroy();
         dashedLine8.destroy();

         const circleX1A = newCircle.x();
         const circleY1A = newCircle.y();

         const circleX2A = circle2.x();
         const circleY2A = circle2.y();

         // 四角の真ん中の座標を計算
         const midRectX1A = newRect.x() + newRect.width() / 2;
         const midRectY1A = newRect.y() + newRect.height() / 2;

         const customShape = new Konva.Shape({

          sceneFunc: function (context, shape) {
        
            const x1 = circleX1A; // 三角形の頂点1の X 座標
            const y1 = circleY1A; // 三角形の頂点1の Y 座標
            const x2 = midRectX1A; // 三角形の頂点2の X 座標
            const y2 = midRectY1A; // 三角形の頂点2の Y 座標
            const x3 = circleX2A; // 三角形の頂点3の X 座標
            const y3 = circleY2A; // 三角形の頂点3の Y 座標
  
            const clearLine1 = [x1+1, y1];
            const clearLine2 = [x2, y2];
            const clearLine3 = [x3+1, y3];
  
            context.beginPath();
            context.moveTo(...clearLine1);
            context.lineTo(...clearLine2);
            context.lineTo(...clearLine3);
            context.closePath();
        
            // 三角形のパスをクリアする
            context.globalCompositeOperation = 'destination-out';
            context.fill();
            context.globalCompositeOperation = 'source-over';
        
            shape.clearLine1 = clearLine1;
            shape.clearLine2 = clearLine2;
            shape.clearLine3 = clearLine3;
        
          },
        
          
        });
        
      layer.add(customShape);
      layer.draw();
        newCircle.destroy();
        circle2.destroy();
        newRect.destroy();

        dots.length = 0 ;
        stage.on("click",handleClick2);
        document.querySelector(".rectAngle-confirm12").removeEventListener("click",handle2Confirm12);
  
        while (document.querySelector(".div23").lastChild) {
          document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
         }
  
  
          document.querySelector(".div23").parentNode.removeChild(document.querySelector(".div23"));


        };

       };

     };

    };

  };

};