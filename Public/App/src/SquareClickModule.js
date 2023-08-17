

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
        

        
        stage.off("click",handleClick2);
        
        

    const rectAngleSizeForm3 = document.createElement('input');
    rectAngleSizeForm3.type = "text";
    rectAngleSizeForm3.classList.add("rectAngle-SizeForm3");
    rectAngleSizeForm3.placeholder = "対象箇所の長さをcm単位で入力";

    const rectAngleConfirm2 = document.createElement('button');
    rectAngleConfirm2.classList.add("rectAngle-confirm2");
    rectAngleConfirm2.append("決定");
    const div4 = document.createElement("div");
    div4.classList.add("div4");
    const div3 = document.createElement("div");
    div3.classList.add("div3");

    div4.append(rectAngleSizeForm3,rectAngleConfirm2);
    div3.append(div4);
    spacecenterInner.append(div3);


    document.querySelector(".rectAngle-confirm2").addEventListener("click",handleConfirm2);
    function handleConfirm2(){



      const size1 =document.querySelector(".rectAngle-SizeForm3").value;
      const sizeY = Number.parseFloat(size1);
      const size1Num = sizeY /1.06;
      console.log(size1Num)
      
      
  
      if(Number.isNaN(size1Num)){
       const sizeFormError2 = document.createElement("p");
       sizeFormError2.classList.add("size-form-error2");
       div4.append(sizeFormError2);
       document.querySelector(".size-form-error2").textContent = "※数値のみ入力してください※";
  
      } else {


     // 長さを格納する変数
     let length = size1Num; 
     
     dots[0].destroy();
     dots[1].destroy();
     dashedLine.destroy();
    

    if( midRect.y() <= rectangle.y()){
     
    const rectAngleSizeForm4 = document.createElement('input');
    rectAngleSizeForm4.type = "text";
    rectAngleSizeForm4.classList.add("rectAngle-SizeForm4");
    rectAngleSizeForm4.placeholder = "右端からの長さを入力";

    const rectAngleSizeForm5 = document.createElement('input');
    rectAngleSizeForm5.type = "text";
    rectAngleSizeForm5.classList.add("rectAngle-SizeForm5");
    rectAngleSizeForm5.placeholder = "左端からの長さを入力";

    const rectAngleConfirm3 = document.createElement('button');
    rectAngleConfirm3.classList.add("rectAngle-confirm3");
    rectAngleConfirm3.append("決定");

    const div6 = document.createElement("div");
    div6.classList.add("div6");

    const div5 = document.createElement("div");
    div5.classList.add("div5");

    const note1 = document.createElement("p");
    note1.classList.add("note1");

    div6.append(note1);
    div6.append(rectAngleSizeForm4,rectAngleSizeForm5,rectAngleConfirm3);

    div5.append(div6);
    spacecenterInner.append(div5);

    console.log(div5);

    document.querySelector(".note1").textContent = "※右端または左端のどちらかを入力してください※";

    // 四角の中心座標を取得
    const midRectX = midRect.x() + midRect.width() / 2;
    const midRectY = midRect.y() + midRect.height() / 2;

    // 横破線を描画する座標を計算
    const dashedLineX1 = midRectX - length / 2;
    const dashedLineY1 = midRectY;
    const dashedLineX2 = midRectX + length / 2;
    const dashedLineY2 = midRectY;

    // 破線を作成
    const dashedLine5 = new Konva.Line({
      points: [dashedLineX1, dashedLineY1, dashedLineX2, dashedLineY2],
      stroke: 'red',
      strokeWidth: 2,
      dash: [5, 10], // 破線のパターンを指定（length変数の値を使用）
    });

    // 丸い点を作成
    const circle1 = new Konva.Circle({
      x: dashedLineX1,
      y: dashedLineY1,
      radius: 5,
      fill: 'red',
    });

    const circle2 = new Konva.Circle({
      x: dashedLineX2,
      y: dashedLineY2,
      radius: 5,
      fill: 'red',
    });

    // レイヤーに追加
    const layer = new Konva.Layer();
    layer.add(dashedLine5, circle1, circle2, midRect);
    stage.add(layer);

    document.querySelector(".rectAngle-confirm3").addEventListener("click",handleConfirm3);

    document.querySelector(".rectAngle-confirm2").removeEventListener("click",handleConfirm2);
        
    while (document.querySelector(".div3").lastChild) {
      document.querySelector(".div3").removeChild(document.querySelector(".div3").lastChild);
      console.log("while0");

     }

     document.querySelector(".div3").parentNode.removeChild(document.querySelector(".div3"));
     

    function handleConfirm3(){
      
      

      const size2 =document.querySelector(".rectAngle-SizeForm4").value;
      const size3 =document.querySelector(".rectAngle-SizeForm5").value;
      const size2Y = Number.parseFloat(size2);
      const size3Y = Number.parseFloat(size3);
      const size2Num = size2Y /1.06;
      const size3Num = size3Y /1.06;
      console.log(size2Num)
      console.log(size3Num)
      
      
      if(size2 !== "" && size3 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      } else {
        console.log("A");


     // 長さを格納する変数
     let length2 = size2Num; 

     circle1.destroy();
     midRect.destroy();
     dashedLine5.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい右の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;

     // 右の丸い点の座標を更新
     circle2.x(newRightCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x = circle2.x();
       const y = circle2.y();

       // 破線を作成
       const dashedLine6 = new Konva.Line({
         points: [x, y, x - length, y], // 例としてX座標から100ピクセル右に破線を表示
         stroke: 'red',
         strokeWidth: 2,
         lineCap: 'round',
         dash: [5, 10],
       });

       // 新しい丸い点を作成
       const newCircle = new Konva.Circle({
         x: dashedLine6.points()[2], // 破線の一番左端のX座標を取得
         y: dashedLine6.points()[3], // 破線の一番左端のY座標を取得
         radius: 5,
         fill: 'red',
       });

       const x2 = newCircle.x();
       const y2 = newCircle.y();

       const newRectX = (x + x2) / 2;
       const newRectY = (y + y2) / 2;
       const newRect = new Konva.Rect({
         x: newRectX - 5, // 四角の幅と高さを考慮して調整
         y: newRectY - 5,
         width: 10,
         height: 10,
         fill: 'red',
       });

       layer.add(dashedLine6);
       layer.add(newCircle); 
       layer.add(newRect);
       layer.draw();

     

    const paturnText = document.createElement('p');
    paturnText.classList.add("paturn-text");

    const check1 = document.createElement('input');
    check1.type = "checkbox";
    check1.classList.add("check1");
    check1.name = "check";

    const check2 = document.createElement('input');
    check2.type = "checkbox";
    check2.classList.add("check2");
    check2.name = "check";

    const paturn1 = document.createElement('img');
    paturn1.src = "/images/paturn1.png";
    paturn1.classList.add("paturn1");

    const paturn2 = document.createElement('img');
    paturn2.src = "/images/paturn2.png";
    paturn2.classList.add("paturn2");

    const rectAngleSizeForm28 = document.createElement('input');
    rectAngleSizeForm28.type = "text";
    rectAngleSizeForm28.classList.add("rectAngle-SizeForm28");
    rectAngleSizeForm28.placeholder = "上方向に伸ばす長さを入力";

    const rectAngleSizeForm29 = document.createElement('input');
    rectAngleSizeForm29.type = "text";
    rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
    rectAngleSizeForm29.placeholder = "下方向に縮める長さを入力";

    const rectAngleConfirm11 = document.createElement('button');
    rectAngleConfirm11.classList.add("rectAngle-confirm11");
    rectAngleConfirm11.append("決定");

    const div22 = document.createElement("div");
    div22.classList.add("div22");

    const div21 = document.createElement("div");
    div21.classList.add("div21");

    const note13 = document.createElement("p");
    note13.classList.add("note13");

    div22.append(note13);
    div22.append(paturnText,check1,paturn1,check2,paturn2,rectAngleSizeForm28,rectAngleSizeForm29,rectAngleConfirm11);

    div21.append(div22);
    spacecenterInner.append(div21);



    document.querySelector(".note13").textContent = "上方向または下方向のどちらかを入力してください";
    document.querySelector(".paturn-text").textContent = "伸縮パターンを選択後、長さを入力してください";

    const check = document.querySelectorAll("[name=check");
    for(let i = 0; i < 2; i++){
      check[i].addEventListener("click",function(){
        const currentItem = this;
        if(currentItem.checked){
          check[0].checked = false;
          check[1].checked = false;
          currentItem.checked = true;
        };
      });
    };

    document.querySelector(".rectAngle-confirm11").addEventListener("click",handleConfirm11);
   
    document.querySelector(".rectAngle-confirm3").removeEventListener("click",handleConfirm3);



    while (document.querySelector(".div5").lastChild) {
      document.querySelector(".div5").removeChild(document.querySelector(".div5").lastChild);
      console.log("while");
     }

     document.querySelector(".div5").parentNode.removeChild(document.querySelector(".div5"));




    
    function handleConfirm11(){
      

      if(check[0].checked){
  
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
           } else {

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = -size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle2.x();
          const circleY2 = circle2.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

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
           rectAngleSizeForm30.placeholder = "四角を右方向に動かす場合はその長さを入力";
   
           const rectAngleSizeForm31 = document.createElement('input');
           rectAngleSizeForm31.type = "text";
           rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
           rectAngleSizeForm31.placeholder = "四角を左方向に動かす場合はその長さを入力";
     
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
           spacecenterInner.append(div23);
   
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
              stroke: 'blue', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'blue', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle2.destroy();
            newRect.destroy();
            newCircle.destroy();

            
            dots.length = 0 ;
            stage.on("click",handleClick);
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
               } else {
        
               const offsetX = size6Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX + offsetX;
               const newY = currentY;

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
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              
              dots.length = 0 ;
              stage.on("click",handleClick);
              document.querySelector(".rectAngle-confirm12").removeEventListener("click",handleConfirm12);

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }


                document.querySelector(".div23").parentNode.removeChild(document.querySelector(".div23"));


              }
             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } else {

               const offsetX = size7Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX - offsetX;
               const newY = currentY;

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
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              dots.length = 0 ;
              stage.on("click",handleClick);
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
           } else {

           dashedLine6.destroy();

          // 下に移動させる距離を指定
          const offsetY = size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle2.x();
          const circleY2 = circle2.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

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
           rectAngleSizeForm30.placeholder = "四角を右方向に動かす場合はその長さを入力";
   
           const rectAngleSizeForm31 = document.createElement('input');
           rectAngleSizeForm31.type = "text";
           rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
           rectAngleSizeForm31.placeholder = "四角を左方向に動かす場合はその長さを入力";
     
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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",handleConfirm13);
           document.querySelector(".rectAngle-confirm12").removeEventListener("click",handleConfirm12);

           while (document.querySelector(".div21").lastChild) {
             document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
            }

             document.querySelector(".div21").parentNode.removeChild(document.querySelector(".div21"));
           
           function handleConfirm13(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'white', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'white', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle2.destroy();
            newRect.destroy();
            newCircle.destroy();

            dots.length = 0 ;
            stage.on("click",handleClick);
            document.querySelector(".rectAngle-confirm13").removeEventListener("click",handleConfirm13);

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }


              document.querySelector(".div23").parentNode.removeChild(document.querySelector(".div23"));

           };

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
               const offsetX = size6Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX + offsetX;
               const newY = currentY;

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
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

               const offsetX = size7Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX - offsetX;
               const newY = currentY;

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
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });
          };
        };



      }else if(check[1].checked){

        const size4 =document.querySelector(".rectAngle-SizeForm28").value;
        const size5 =document.querySelector(".rectAngle-SizeForm29").value;
        const size4Y = Number.parseFloat(size4);
        const size5Y = Number.parseFloat(size5);
        const size4Num = size4Y /1.06;
        const size5Num = size5Y /1.06;
        

        if(size4 !== "" && size5 === ""){

          //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す
          

          if(Number.isNaN(size4Num)){
            const sizeFormError5 = document.createElement("p");
            sizeFormError5.classList.add("size-form-error5");
            div22.append(sizeFormError5);
            document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
           } else {

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = -size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle2.x();
          const circleY2 = circle2.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionX1 = newCircle.x(); 
          const intersectionY1 = newRect.y()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionX2 = circle2.x(); 
          const intersectionY2 = newRect.y()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'blue', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'blue', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle2.destroy();
          newRect.destroy();
          newCircle.destroy();
          


           
           

        
           dots.length = 0 ;

           document.querySelector(".rectAngle-confirm11").removeEventListener("click",handleConfirm11); 
           stage.off("click",handleClick2);

           stage.on("click",handleClick2);

           while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
            console.log("while2");
           };

           document.querySelector(".div21").parentNode.removeChild(document.querySelector(".div21"));


        
          

           

          };


        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           } 

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle2.x();
          const circleY2 = circle2.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionX1 = newCircle.x(); 
          const intersectionY1 = newRect.y()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionX2 = circle2.x(); 
          const intersectionY2 = newRect.y()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'white', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'white', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle2.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

        };



      }else{

        const sizeFormError7 = document.createElement("p");
        sizeFormError7.classList.add("size-form-error7");
        div22.append(sizeFormError7);
        document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

      }
     
    };



  };

      } else if(size3 !== "" && size2 === ""){

        if(Number.isNaN(size3Num)){
          const sizeFormError3 = document.createElement("p");
          sizeFormError3.classList.add("size-form-error3");
          div6.append(sizeFormError);
          document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";
         } 

          // 長さを格納する変数
     let length2 = size3Num; 

     circle2.destroy();
     midRect.destroy();
     dashedLine5.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;

     // 左の丸い点の座標を更新
     circle1.x(newLeftCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x = circle1.x();
       const y = circle1.y();

       // 破線を作成
       const dashedLine6 = new Konva.Line({
         points: [x, y, x + length, y], // 例としてX座標から100ピクセル右に破線を表示
         stroke: 'red',
         strokeWidth: 2,
         lineCap: 'round',
         dash: [5, 10],
       });

       // 新しい丸い点を作成
       const newCircle = new Konva.Circle({
         x: dashedLine6.points()[2], // 破線の一番右端のX座標を取得
         y: dashedLine6.points()[3], // 破線の一番右端のY座標を取得
         radius: 5,
         fill: 'red',
       });


       const x2 = newCircle.x();
       const y2 = newCircle.y();

       const newRectX = (x + x2) / 2;
       const newRectY = (y + y2) / 2;
       const newRect = new Konva.Rect({
         x: newRectX - 5, // 四角の幅と高さを考慮して調整
         y: newRectY - 5,
         width: 10,
         height: 10,
         fill: 'red',
       });

       layer.add(dashedLine6);
       layer.add(newCircle); 
       layer.add(newRect);
       layer.draw();
    

     while (document.querySelector(".div5").lastChild) {
      document.querySelector(".div5").removeChild(document.querySelector(".div5").lastChild);
     }

    const paturnText = document.createElement('p');
    paturnText.classList.add("paturn-text");

    const check1 = document.createElement('input');
    check1.type = "checkbox";
    check1.classList.add("check1");
    check1.name = "check";

    const check2 = document.createElement('input');
    check2.type = "checkbox";
    check2.classList.add("check2");
    check2.name = "check";

    const paturn1 = document.createElement('img');
    paturn1.src = "/images/paturn1.png";
    paturn1.classList.add("paturn1");

    const paturn2 = document.createElement('img');
    paturn2.src = "/images/paturn2.png";
    paturn2.classList.add("paturn2");

    const rectAngleSizeForm28 = document.createElement('input');
    rectAngleSizeForm28.type = "text";
    rectAngleSizeForm28.classList.add("rectAngle-SizeForm28");
    rectAngleSizeForm28.placeholder = "上方向に伸ばす長さを入力";

    const rectAngleSizeForm29 = document.createElement('input');
    rectAngleSizeForm29.type = "text";
    rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
    rectAngleSizeForm29.placeholder = "下方向に縮める長さを入力";

    const rectAngleConfirm11 = document.createElement('button');
    rectAngleConfirm11.classList.add("rectAngle-confirm11");
    rectAngleConfirm11.append("決定");

    const div22 = document.createElement("div");
    div22.classList.add("div22");

    const div21 = document.createElement("div");
    div21.classList.add("div21");

    const note13 = document.createElement("p");
    note13.classList.add("note13");

    div22.append(note13);
    div22.append(paturnText,check1,paturn1,check2,paturn2,rectAngleSizeForm28,rectAngleSizeForm29,rectAngleConfirm11);

    div21.append(div22);
    spacecenterInner.append(div21);

    document.querySelector(".note13").textContent = "上方向または下方向のどちらかを入力してください";
    document.querySelector(".paturn-text").textContent = "伸縮パターンを選択後、長さを入力してください";

    const check = document.querySelectorAll("[name=check");
    for(let i = 0; i < 2; i++){
      check[i].addEventListener("click",function(){
        const currentItem = this;
        if(currentItem.checked){
          check[0].checked = false;
          check[1].checked = false;
          currentItem.checked = true;
        };
      });
    };

    document.querySelector(".rectAngle-confirm11").addEventListener("click",function(){

      if(check[0].checked){
  
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
           }

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = -size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

           const rectAngleSizeForm30 = document.createElement('input');
           rectAngleSizeForm30.type = "text";
           rectAngleSizeForm30.classList.add("rectAngle-SizeForm30");
           rectAngleSizeForm30.placeholder = "四角を右方向に動かす場合はその長さを入力";
   
           const rectAngleSizeForm31 = document.createElement('input');
           rectAngleSizeForm31.type = "text";
           rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
           rectAngleSizeForm31.placeholder = "四角を左方向に動かす場合はその長さを入力";
     
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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'blue', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'blue', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle1.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
               const offsetX = size6Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX + offsetX;
               const newY = currentY;

               newRect.position({ x: newX, y: newY });

               layer.draw();

               dashedLine7.destroy();
               dashedLine8.destroy();

               const circleX1A = newCircle.x();
               const circleY1A = newCircle.y();

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

               const offsetX = size7Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX - offsetX;
               const newY = currentY;

               newRect.position({ x: newX, y: newY });

               layer.draw();

               dashedLine7.destroy();
               dashedLine8.destroy();

               const circleX1A = newCircle.x();
               const circleY1A = newCircle.y();

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を白色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を白色にする

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           };

           dashedLine6.destroy();

          // 下に移動させる距離を指定
          const offsetY = size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

           const rectAngleSizeForm30 = document.createElement('input');
           rectAngleSizeForm30.type = "text";
           rectAngleSizeForm30.classList.add("rectAngle-SizeForm30");
           rectAngleSizeForm30.placeholder = "四角を右方向に動かす場合はその長さを入力";
   
           const rectAngleSizeForm31 = document.createElement('input');
           rectAngleSizeForm31.type = "text";
           rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
           rectAngleSizeForm31.placeholder = "四角を左方向に動かす場合はその長さを入力";
     
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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'white', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'white', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle1.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
               const offsetX = size6Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX + offsetX;
               const newY = currentY;

               newRect.position({ x: newX, y: newY });

               layer.draw();

               dashedLine7.destroy();
               dashedLine8.destroy();

               const circleX1A = newCircle.x();
               const circleY1A = newCircle.y();

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

               const offsetX = size7Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX - offsetX;
               const newY = currentY;

               newRect.position({ x: newX, y: newY });

               layer.draw();

               dashedLine7.destroy();
               dashedLine8.destroy();

               const circleX1A = newCircle.x();
               const circleY1A = newCircle.y();

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });

        };



      }else if(check[1].checked){

        const size4 =document.querySelector(".rectAngle-SizeForm28").value;
        const size5 =document.querySelector(".rectAngle-SizeForm29").value;
        const size4Y = Number.parseFloat(size4);
        const size5Y = Number.parseFloat(size5);
        const size4Num = size4Y /1.06;
        const size5Num = size5Y /1.06;
        

        if(size4 !== "" && size5 === ""){

          //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す

          if(Number.isNaN(size4Num)){
            const sizeFormError5 = document.createElement("p");
            sizeFormError5.classList.add("size-form-error5");
            div22.append(sizeFormError5);
            document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
           }

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = -size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionX1 = newCircle.x(); 
          const intersectionY1 = newRect.y()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionX2 = circle1.x(); 
          const intersectionY2 = newRect.y()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'blue', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'blue', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle1.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           } 

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionX1 = newCircle.x(); 
          const intersectionY1 = newRect.y()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionX2 = circle1.x(); 
          const intersectionY2 = newRect.y()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'white', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'white', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle1.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

        };



      }else{

        const sizeFormError7 = document.createElement("p");
        sizeFormError7.classList.add("size-form-error7");
        div22.append(sizeFormError7);
        document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

      }

    });

      };  
      
    };

  } else if( midRect.x() + midRect.width() >= rectangle.x() + rectangle.width()){

    const rectAngleSizeForm6 = document.createElement('input');
    rectAngleSizeForm6.type = "text";
    rectAngleSizeForm6.classList.add("rectAngle-SizeForm6");
    rectAngleSizeForm6.placeholder = "上端からの長さを入力";

    const rectAngleSizeForm7 = document.createElement('input');
    rectAngleSizeForm7.type = "text";
    rectAngleSizeForm7.classList.add("rectAngle-SizeForm7");
    rectAngleSizeForm7.placeholder = "下端からの長さを入力";

    const rectAngleConfirm4 = document.createElement('button');
    rectAngleConfirm4.classList.add("rectAngle-confirm4");
    rectAngleConfirm4.append("決定");

    const div8 = document.createElement("div");
    div8.classList.add("div8");

    const div7 = document.createElement("div");
    div7.classList.add("div7");

    const note2 = document.createElement("p");
    note2.classList.add("note2");

    div8.append(note2);
    div8.append(rectAngleSizeForm6,rectAngleSizeForm7,rectAngleConfirm4);

    div7.append(div8);
    spacecenterInner.append(div7);
    
    document.querySelector(".note2").textContent = "※上端または下端のどちらかを入力してください※";

     // 四角の中心座標を取得
    const midRectX = midRect.x() + midRect.width() / 2;
    const midRectY = midRect.y() + midRect.height() / 2;

     // 縦破線を描画する座標を計算
     const dashedLineX1 = midRectX;
     const dashedLineY1 = midRectY - length / 2;
     const dashedLineX2 = midRectX;
     const dashedLineY2 = midRectY + length / 2;

    // 破線を作成
    const dashedLine5 = new Konva.Line({
      points: [dashedLineX1, dashedLineY1, dashedLineX2, dashedLineY2],
      stroke: 'red',
      strokeWidth: 2,
      dash: [5, 10], // 破線のパターンを指定（length変数の値を使用）
    });

    // 丸い点を作成
    const circle1 = new Konva.Circle({
      x: dashedLineX1,
      y: dashedLineY1,
      radius: 5,
      fill: 'red',
    });

    const circle2 = new Konva.Circle({
      x: dashedLineX2,
      y: dashedLineY2,
      radius: 5,
      fill: 'red',
    });

    // レイヤーに追加
    const layer = new Konva.Layer();
    layer.add(dashedLine5, circle1, circle2, midRect);
    stage.add(layer);

    document.querySelector(".rectAngle-confirm4").addEventListener("click",function(){

      const size2 =document.querySelector(".rectAngle-SizeForm6").value;
      const size3 =document.querySelector(".rectAngle-SizeForm7").value;
      const size2Y = Number.parseFloat(size2);
      const size3Y = Number.parseFloat(size3);
      const size2Num = size2Y /1.06;
      const size3Num = size3Y /1.06;
      console.log(size2Num)
      console.log(size3Num)
      
      
      if(size2 !== "" && size3 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num; 

     circle1.destroy();
     midRect.destroy();
     dashedLine5.destroy();

     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newRightCircleX = rectangle.y() + length2;

     // 右の丸い点の座標を更新
     circle2.y(newRightCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x = circle2.x();
       const y = circle2.y();

       // 破線を作成
       const dashedLine6 = new Konva.Line({
         points: [x, y, x , y + length], // 例としてX座標から100ピクセル右に破線を表示
         stroke: 'red',
         strokeWidth: 2,
         lineCap: 'round',
         dash: [5, 10],
       });

       // 新しい丸い点を作成
       const newCircle = new Konva.Circle({
         x: dashedLine6.points()[2], // 破線の一番左端のX座標を取得
         y: dashedLine6.points()[3], // 破線の一番左端のY座標を取得
         radius: 5,
         fill: 'red',
       });

       const x2 = newCircle.x();
       const y2 = newCircle.y();

       const newRectX = (x + x2) / 2;
       const newRectY = (y + y2) / 2;
       const newRect = new Konva.Rect({
         x: newRectX - 5, // 四角の幅と高さを考慮して調整
         y: newRectY - 5,
         width: 10,
         height: 10,
         fill: 'red',
       });

       layer.add(dashedLine6);
       layer.add(newCircle); 
       layer.add(newRect);
       layer.draw();
    

     while (document.querySelector(".div7").lastChild) {
      document.querySelector(".div7").removeChild(document.querySelector(".div7").lastChild);
     }

    const paturnText = document.createElement('p');
    paturnText.classList.add("paturn-text");

    const check1 = document.createElement('input');
    check1.type = "checkbox";
    check1.classList.add("check1");
    check1.name = "check";

    const check2 = document.createElement('input');
    check2.type = "checkbox";
    check2.classList.add("check2");
    check2.name = "check";

    const paturn1 = document.createElement('img');
    paturn1.src = "/images/paturn1.png";
    paturn1.classList.add("paturn1");

    const paturn2 = document.createElement('img');
    paturn2.src = "/images/paturn2.png";
    paturn2.classList.add("paturn2");

    const rectAngleSizeForm28 = document.createElement('input');
    rectAngleSizeForm28.type = "text";
    rectAngleSizeForm28.classList.add("rectAngle-SizeForm28");
    rectAngleSizeForm28.placeholder = "右方向に伸ばす長さを入力";

    const rectAngleSizeForm29 = document.createElement('input');
    rectAngleSizeForm29.type = "text";
    rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
    rectAngleSizeForm29.placeholder = "左方向に縮める長さを入力";

    const rectAngleConfirm11 = document.createElement('button');
    rectAngleConfirm11.classList.add("rectAngle-confirm11");
    rectAngleConfirm11.append("決定");

    const div22 = document.createElement("div");
    div22.classList.add("div22");

    const div21 = document.createElement("div");
    div21.classList.add("div21");

    const note13 = document.createElement("p");
    note13.classList.add("note13");

    div22.append(note13);
    div22.append(paturnText,check1,paturn1,check2,paturn2,rectAngleSizeForm28,rectAngleSizeForm29,rectAngleConfirm11);

    div21.append(div22);
    spacecenterInner.append(div21);

    document.querySelector(".note13").textContent = "右方向または左方向のどちらかを入力してください";
    document.querySelector(".paturn-text").textContent = "伸縮パターンを選択後、長さを入力してください";

    const check = document.querySelectorAll("[name=check");
    for(let i = 0; i < 2; i++){
      check[i].addEventListener("click",function(){
        const currentItem = this;
        if(currentItem.checked){
          check[0].checked = false;
          check[1].checked = false;
          currentItem.checked = true;
        };
      });
    };

    document.querySelector(".rectAngle-confirm11").addEventListener("click",function(){

      if(check[0].checked){
  
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
           }

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'blue', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'blue', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle2.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
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
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

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
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を白色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を白色にする

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           };

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'white', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'white', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle2.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
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
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

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
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });

        };



      }else if(check[1].checked){

        const size4 =document.querySelector(".rectAngle-SizeForm28").value;
        const size5 =document.querySelector(".rectAngle-SizeForm29").value;
        const size4Y = Number.parseFloat(size4);
        const size5Y = Number.parseFloat(size5);
        const size4Num = size4Y /1.06;
        const size5Num = size5Y /1.06;
        

        if(size4 !== "" && size5 === ""){

          //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す

          if(Number.isNaN(size4Num)){
            const sizeFormError5 = document.createElement("p");
            sizeFormError5.classList.add("size-form-error5");
            div22.append(sizeFormError5);
            document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
           }

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

          //丸い点と四角が垂直に交わる座標
          const intersectionY1 = newCircle.y(); 
          const intersectionX1 = newRect.x()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionY2 = circle2.y(); 
          const intersectionX2 = newRect.x()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'blue', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'blue', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle2.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           } 

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

          //丸い点と四角が垂直に交わる座標
          const intersectionY1 = newCircle.y(); 
          const intersectionX1 = newRect.x()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionY2 = circle2.y(); 
          const intersectionX2 = newRect.x()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'white', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'white', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle2.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

        };



      }else{

        const sizeFormError7 = document.createElement("p");
        sizeFormError7.classList.add("size-form-error7");
        div22.append(sizeFormError7);
        document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

      }

    });



  

      } else if(size3 !== "" && size2 === ""){

        if(Number.isNaN(size3Num)){
          const sizeFormError3 = document.createElement("p");
          sizeFormError3.classList.add("size-form-error3");
          div6.append(sizeFormError);
          document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";
         } 

     // 長さを格納する変数
     let length2 = size3Num; 

     circle2.destroy();
     midRect.destroy();
     dashedLine5.destroy();

     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newRightCircleX = rectangle.y() + rectangle.height() - length2;

     // 右の丸い点の座標を更新
     circle1.y(newRightCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x = circle1.x();
       const y = circle1.y();

       // 破線を作成
       const dashedLine6 = new Konva.Line({
         points: [x, y, x , y - length], // 例としてX座標から100ピクセル右に破線を表示
         stroke: 'red',
         strokeWidth: 2,
         lineCap: 'round',
         dash: [5, 10],
       });

       // 新しい丸い点を作成
       const newCircle = new Konva.Circle({
         x: dashedLine6.points()[2], // 破線の一番左端のX座標を取得
         y: dashedLine6.points()[3], // 破線の一番左端のY座標を取得
         radius: 5,
         fill: 'red',
       });

       const x2 = newCircle.x();
       const y2 = newCircle.y();

       const newRectX = (x + x2) / 2;
       const newRectY = (y + y2) / 2;
       const newRect = new Konva.Rect({
         x: newRectX - 5, // 四角の幅と高さを考慮して調整
         y: newRectY - 5,
         width: 10,
         height: 10,
         fill: 'red',
       });

       layer.add(dashedLine6);
       layer.add(newCircle); 
       layer.add(newRect);
       layer.draw();
    

     while (document.querySelector(".div7").lastChild) {
      document.querySelector(".div7").removeChild(document.querySelector(".div7").lastChild);
     }

    const paturnText = document.createElement('p');
    paturnText.classList.add("paturn-text");

    const check1 = document.createElement('input');
    check1.type = "checkbox";
    check1.classList.add("check1");
    check1.name = "check";

    const check2 = document.createElement('input');
    check2.type = "checkbox";
    check2.classList.add("check2");
    check2.name = "check";

    const paturn1 = document.createElement('img');
    paturn1.src = "/images/paturn1.png";
    paturn1.classList.add("paturn1");

    const paturn2 = document.createElement('img');
    paturn2.src = "/images/paturn2.png";
    paturn2.classList.add("paturn2");

    const rectAngleSizeForm28 = document.createElement('input');
    rectAngleSizeForm28.type = "text";
    rectAngleSizeForm28.classList.add("rectAngle-SizeForm28");
    rectAngleSizeForm28.placeholder = "右方向に伸ばす長さを入力";

    const rectAngleSizeForm29 = document.createElement('input');
    rectAngleSizeForm29.type = "text";
    rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
    rectAngleSizeForm29.placeholder = "左方向に縮める長さを入力";

    const rectAngleConfirm11 = document.createElement('button');
    rectAngleConfirm11.classList.add("rectAngle-confirm11");
    rectAngleConfirm11.append("決定");

    const div22 = document.createElement("div");
    div22.classList.add("div22");

    const div21 = document.createElement("div");
    div21.classList.add("div21");

    const note13 = document.createElement("p");
    note13.classList.add("note13");

    div22.append(note13);
    div22.append(paturnText,check1,paturn1,check2,paturn2,rectAngleSizeForm28,rectAngleSizeForm29,rectAngleConfirm11);

    div21.append(div22);
    spacecenterInner.append(div21);

    document.querySelector(".note13").textContent = "右方向または左方向のどちらかを入力してください";
    document.querySelector(".paturn-text").textContent = "伸縮パターンを選択後、長さを入力してください";

    const check = document.querySelectorAll("[name=check");
    for(let i = 0; i < 2; i++){
      check[i].addEventListener("click",function(){
        const currentItem = this;
        if(currentItem.checked){
          check[0].checked = false;
          check[1].checked = false;
          currentItem.checked = true;
        };
      });
    };

    document.querySelector(".rectAngle-confirm11").addEventListener("click",function(){

      if(check[0].checked){
  
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
           }

          dashedLine6.destroy();

          // 右に移動させる距離を指定
          const offsetX = size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'blue', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'blue', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle1.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
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

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

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

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を白色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を白色にする

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           };

           dashedLine6.destroy();

          // 左に移動させる距離を指定
          const offsetX = -size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'white', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'white', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle1.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
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

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

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

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });

        };



      }else if(check[1].checked){

        const size4 =document.querySelector(".rectAngle-SizeForm28").value;
        const size5 =document.querySelector(".rectAngle-SizeForm29").value;
        const size4Y = Number.parseFloat(size4);
        const size5Y = Number.parseFloat(size5);
        const size4Num = size4Y /1.06;
        const size5Num = size5Y /1.06;
        

        if(size4 !== "" && size5 === ""){

          //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す

          if(Number.isNaN(size4Num)){
            const sizeFormError5 = document.createElement("p");
            sizeFormError5.classList.add("size-form-error5");
            div22.append(sizeFormError5);
            document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
           }

          dashedLine6.destroy();

          // 右に移動させる距離を指定
          const offsetX = size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX + offsetX;
          const newY = currentY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionY1 = newCircle.y(); 
          const intersectionX1 = newRect.x()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionY2 = circle1.y(); 
          const intersectionX2 = newRect.x()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'blue', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'blue', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle1.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           } 

          dashedLine6.destroy();

          // 左に移動させる距離を指定
          const offsetX = -size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX + offsetX;
          const newY = currentY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionY1 = newCircle.y(); 
          const intersectionX1 = newRect.x()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionY2 = circle1.y(); 
          const intersectionX2 = newRect.x()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'white', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'white', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle1.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

        };



      }else{

        const sizeFormError7 = document.createElement("p");
        sizeFormError7.classList.add("size-form-error7");
        div22.append(sizeFormError7);
        document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

      }

    });

      };  

    });

  } else if( midRect.x() <= rectangle.x()){

    const rectAngleSizeForm8 = document.createElement('input');
    rectAngleSizeForm8.type = "text";
    rectAngleSizeForm8.classList.add("rectAngle-SizeForm8");
    rectAngleSizeForm8.placeholder = "上端からの長さを入力";

    const rectAngleSizeForm9 = document.createElement('input');
    rectAngleSizeForm9.type = "text";
    rectAngleSizeForm9.classList.add("rectAngle-SizeForm9");
    rectAngleSizeForm9.placeholder = "下端からの長さを入力";

    const rectAngleConfirm5 = document.createElement('button');
    rectAngleConfirm5.classList.add("rectAngle-confirm5");
    rectAngleConfirm5.append("決定");

    const div10 = document.createElement("div");
    div10.classList.add("div10");

    const div9 = document.createElement("div");
    div9.classList.add("div9");

    const note3 = document.createElement("p");
    note3.classList.add("note3");

    div10.append(note3);
    div10.append(rectAngleSizeForm8,rectAngleSizeForm9,rectAngleConfirm5);

    div9.append(div10);
    spacecenterInner.append(div9);

    document.querySelector(".note3").textContent = "※上端または下端のどちらかを入力してください※";

    // 四角の中心座標を取得
    const midRectX = midRect.x() + midRect.width() / 2;
    const midRectY = midRect.y() + midRect.height() / 2;

     // 縦破線を描画する座標を計算
     const dashedLineX1 = midRectX;
     const dashedLineY1 = midRectY - length / 2;
     const dashedLineX2 = midRectX;
     const dashedLineY2 = midRectY + length / 2;

    // 破線を作成
    const dashedLine5 = new Konva.Line({
      points: [dashedLineX1, dashedLineY1, dashedLineX2, dashedLineY2],
      stroke: 'red',
      strokeWidth: 2,
      dash: [5, 10], // 破線のパターンを指定（length変数の値を使用）
    });

    // 丸い点を作成
    const circle1 = new Konva.Circle({
      x: dashedLineX1,
      y: dashedLineY1,
      radius: 5,
      fill: 'red',
    });

    const circle2 = new Konva.Circle({
      x: dashedLineX2,
      y: dashedLineY2,
      radius: 5,
      fill: 'red',
    });

    // レイヤーに追加
    const layer = new Konva.Layer();
    layer.add(dashedLine5, circle1, circle2, midRect);
    stage.add(layer);

    document.querySelector(".rectAngle-confirm5").addEventListener("click",function(){

      const size2 =document.querySelector(".rectAngle-SizeForm8").value;
      const size3 =document.querySelector(".rectAngle-SizeForm9").value;
      const size2Y = Number.parseFloat(size2);
      const size3Y = Number.parseFloat(size3);
      const size2Num = size2Y /1.06;
      const size3Num = size3Y /1.06;
      console.log(size2Num)
      console.log(size3Num)
      
      
      if(size2 !== "" && size3 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num; 

     circle1.destroy();
     midRect.destroy();
     dashedLine5.destroy();

     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newRightCircleX = rectangle.y() + length2;

     // 右の丸い点の座標を更新
     circle2.y(newRightCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x = circle2.x();
       const y = circle2.y();

       // 破線を作成
       const dashedLine6 = new Konva.Line({
         points: [x, y, x , y + length], // 例としてX座標から100ピクセル右に破線を表示
         stroke: 'red',
         strokeWidth: 2,
         lineCap: 'round',
         dash: [5, 10],
       });

       // 新しい丸い点を作成
       const newCircle = new Konva.Circle({
         x: dashedLine6.points()[2], // 破線の一番左端のX座標を取得
         y: dashedLine6.points()[3], // 破線の一番左端のY座標を取得
         radius: 5,
         fill: 'red',
       });

       const x2 = newCircle.x();
       const y2 = newCircle.y();

       const newRectX = (x + x2) / 2;
       const newRectY = (y + y2) / 2;
       const newRect = new Konva.Rect({
         x: newRectX - 5, // 四角の幅と高さを考慮して調整
         y: newRectY - 5,
         width: 10,
         height: 10,
         fill: 'red',
       });

       layer.add(dashedLine6);
       layer.add(newCircle); 
       layer.add(newRect);
       layer.draw();
    

     while (document.querySelector(".div9").lastChild) {
      document.querySelector(".div9").removeChild(document.querySelector(".div9").lastChild);
     }

    const paturnText = document.createElement('p');
    paturnText.classList.add("paturn-text");

    const check1 = document.createElement('input');
    check1.type = "checkbox";
    check1.classList.add("check1");
    check1.name = "check";

    const check2 = document.createElement('input');
    check2.type = "checkbox";
    check2.classList.add("check2");
    check2.name = "check";

    const paturn1 = document.createElement('img');
    paturn1.src = "/images/paturn1.png";
    paturn1.classList.add("paturn1");

    const paturn2 = document.createElement('img');
    paturn2.src = "/images/paturn2.png";
    paturn2.classList.add("paturn2");

    const rectAngleSizeForm28 = document.createElement('input');
    rectAngleSizeForm28.type = "text";
    rectAngleSizeForm28.classList.add("rectAngle-SizeForm28");
    rectAngleSizeForm28.placeholder = "右方向に伸ばす長さを入力";

    const rectAngleSizeForm29 = document.createElement('input');
    rectAngleSizeForm29.type = "text";
    rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
    rectAngleSizeForm29.placeholder = "左方向に縮める長さを入力";

    const rectAngleConfirm11 = document.createElement('button');
    rectAngleConfirm11.classList.add("rectAngle-confirm11");
    rectAngleConfirm11.append("決定");

    const div22 = document.createElement("div");
    div22.classList.add("div22");

    const div21 = document.createElement("div");
    div21.classList.add("div21");

    const note13 = document.createElement("p");
    note13.classList.add("note13");

    div22.append(note13);
    div22.append(paturnText,check1,paturn1,check2,paturn2,rectAngleSizeForm28,rectAngleSizeForm29,rectAngleConfirm11);

    div21.append(div22);
    spacecenterInner.append(div21);

    document.querySelector(".note13").textContent = "右方向または左方向のどちらかを入力してください";
    document.querySelector(".paturn-text").textContent = "伸縮パターンを選択後、長さを入力してください";

    const check = document.querySelectorAll("[name=check");
    for(let i = 0; i < 2; i++){
      check[i].addEventListener("click",function(){
        const currentItem = this;
        if(currentItem.checked){
          check[0].checked = false;
          check[1].checked = false;
          currentItem.checked = true;
        };
      });
    };

    document.querySelector(".rectAngle-confirm11").addEventListener("click",function(){

      if(check[0].checked){
  
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
           }

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'white', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'white', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle2.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
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
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

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
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を白色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を白色にする

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           };

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'blue', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'blue', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle2.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
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
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

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
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });

        };



      }else if(check[1].checked){

        const size4 =document.querySelector(".rectAngle-SizeForm28").value;
        const size5 =document.querySelector(".rectAngle-SizeForm29").value;
        const size4Y = Number.parseFloat(size4);
        const size5Y = Number.parseFloat(size5);
        const size4Num = size4Y /1.06;
        const size5Num = size5Y /1.06;
        

        if(size4 !== "" && size5 === ""){

          //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す

          if(Number.isNaN(size4Num)){
            const sizeFormError5 = document.createElement("p");
            sizeFormError5.classList.add("size-form-error5");
            div22.append(sizeFormError5);
            document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
           }

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

          //丸い点と四角が垂直に交わる座標
          const intersectionY1 = newCircle.y(); 
          const intersectionX1 = newRect.x()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionY2 = circle2.y(); 
          const intersectionX2 = newRect.x()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'white', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'white', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle2.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           } 

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

          //丸い点と四角が垂直に交わる座標
          const intersectionY1 = newCircle.y(); 
          const intersectionX1 = newRect.x()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionY2 = circle2.y(); 
          const intersectionX2 = newRect.x()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'blue', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'blue', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle2.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

        };



      }else{

        const sizeFormError7 = document.createElement("p");
        sizeFormError7.classList.add("size-form-error7");
        div22.append(sizeFormError7);
        document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

      }

    });



  

      } else if(size3 !== "" && size2 === ""){

        if(Number.isNaN(size3Num)){
          const sizeFormError3 = document.createElement("p");
          sizeFormError3.classList.add("size-form-error3");
          div6.append(sizeFormError);
          document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";
         } 

     // 長さを格納する変数
     let length2 = size3Num; 

     circle2.destroy();
     midRect.destroy();
     dashedLine5.destroy();

     // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
     const newRightCircleX = rectangle.y() + rectangle.height() - length2;

     // 右の丸い点の座標を更新
     circle1.y(newRightCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x = circle1.x();
       const y = circle1.y();

       // 破線を作成
       const dashedLine6 = new Konva.Line({
         points: [x, y, x , y - length], // 例としてX座標から100ピクセル右に破線を表示
         stroke: 'red',
         strokeWidth: 2,
         lineCap: 'round',
         dash: [5, 10],
       });

       // 新しい丸い点を作成
       const newCircle = new Konva.Circle({
         x: dashedLine6.points()[2], // 破線の一番左端のX座標を取得
         y: dashedLine6.points()[3], // 破線の一番左端のY座標を取得
         radius: 5,
         fill: 'red',
       });

       const x2 = newCircle.x();
       const y2 = newCircle.y();

       const newRectX = (x + x2) / 2;
       const newRectY = (y + y2) / 2;
       const newRect = new Konva.Rect({
         x: newRectX - 5, // 四角の幅と高さを考慮して調整
         y: newRectY - 5,
         width: 10,
         height: 10,
         fill: 'red',
       });

       layer.add(dashedLine6);
       layer.add(newCircle); 
       layer.add(newRect);
       layer.draw();
    

     while (document.querySelector(".div9").lastChild) {
      document.querySelector(".div9").removeChild(document.querySelector(".div9").lastChild);
     }

    const paturnText = document.createElement('p');
    paturnText.classList.add("paturn-text");

    const check1 = document.createElement('input');
    check1.type = "checkbox";
    check1.classList.add("check1");
    check1.name = "check";

    const check2 = document.createElement('input');
    check2.type = "checkbox";
    check2.classList.add("check2");
    check2.name = "check";

    const paturn1 = document.createElement('img');
    paturn1.src = "/images/paturn1.png";
    paturn1.classList.add("paturn1");

    const paturn2 = document.createElement('img');
    paturn2.src = "/images/paturn2.png";
    paturn2.classList.add("paturn2");

    const rectAngleSizeForm28 = document.createElement('input');
    rectAngleSizeForm28.type = "text";
    rectAngleSizeForm28.classList.add("rectAngle-SizeForm28");
    rectAngleSizeForm28.placeholder = "右方向に伸ばす長さを入力";

    const rectAngleSizeForm29 = document.createElement('input');
    rectAngleSizeForm29.type = "text";
    rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
    rectAngleSizeForm29.placeholder = "左方向に縮める長さを入力";

    const rectAngleConfirm11 = document.createElement('button');
    rectAngleConfirm11.classList.add("rectAngle-confirm11");
    rectAngleConfirm11.append("決定");

    const div22 = document.createElement("div");
    div22.classList.add("div22");

    const div21 = document.createElement("div");
    div21.classList.add("div21");

    const note13 = document.createElement("p");
    note13.classList.add("note13");

    div22.append(note13);
    div22.append(paturnText,check1,paturn1,check2,paturn2,rectAngleSizeForm28,rectAngleSizeForm29,rectAngleConfirm11);

    div21.append(div22);
    spacecenterInner.append(div21);

    document.querySelector(".note13").textContent = "右方向または左方向のどちらかを入力してください";
    document.querySelector(".paturn-text").textContent = "伸縮パターンを選択後、長さを入力してください";

    const check = document.querySelectorAll("[name=check");
    for(let i = 0; i < 2; i++){
      check[i].addEventListener("click",function(){
        const currentItem = this;
        if(currentItem.checked){
          check[0].checked = false;
          check[1].checked = false;
          currentItem.checked = true;
        };
      });
    };

    document.querySelector(".rectAngle-confirm11").addEventListener("click",function(){

      if(check[0].checked){
  
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
           }

          dashedLine6.destroy();

          // 右に移動させる距離を指定
          const offsetX = size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'white', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'white', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle1.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
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

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

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

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を白色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を白色にする

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           };

           dashedLine6.destroy();

          // 左に移動させる距離を指定
          const offsetX = -size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'blue', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'blue', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle1.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
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

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

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

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });

        };



      }else if(check[1].checked){

        const size4 =document.querySelector(".rectAngle-SizeForm28").value;
        const size5 =document.querySelector(".rectAngle-SizeForm29").value;
        const size4Y = Number.parseFloat(size4);
        const size5Y = Number.parseFloat(size5);
        const size4Num = size4Y /1.06;
        const size5Num = size5Y /1.06;
        

        if(size4 !== "" && size5 === ""){

          //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す

          if(Number.isNaN(size4Num)){
            const sizeFormError5 = document.createElement("p");
            sizeFormError5.classList.add("size-form-error5");
            div22.append(sizeFormError5);
            document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
           }

          dashedLine6.destroy();

          // 右に移動させる距離を指定
          const offsetX = size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX + offsetX;
          const newY = currentY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionY1 = newCircle.y(); 
          const intersectionX1 = newRect.x()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionY2 = circle1.y(); 
          const intersectionX2 = newRect.x()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'white', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'white', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle1.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           } 

          dashedLine6.destroy();

          // 左に移動させる距離を指定
          const offsetX = -size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX + offsetX;
          const newY = currentY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionY1 = newCircle.y(); 
          const intersectionX1 = newRect.x()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionY2 = circle1.y(); 
          const intersectionX2 = newRect.x()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'blue', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'blue', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle1.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

        };



      }else{

        const sizeFormError7 = document.createElement("p");
        sizeFormError7.classList.add("size-form-error7");
        div22.append(sizeFormError7);
        document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

      }

    });

      };  

    });


  } else if( midRect.y() + midRect.height() >= rectangle.y() + rectangle.height()){

    const rectAngleSizeForm10 = document.createElement('input');
    rectAngleSizeForm10.type = "text";
    rectAngleSizeForm10.classList.add("rectAngle-SizeForm10");
    rectAngleSizeForm10.placeholder = "右端からの長さを入力";

    const rectAngleSizeForm11 = document.createElement('input');
    rectAngleSizeForm11.type = "text";
    rectAngleSizeForm11.classList.add("rectAngle-SizeForm11");
    rectAngleSizeForm11.placeholder = "左端からの長さを入力";

    const rectAngleConfirm6 = document.createElement('button');
    rectAngleConfirm6.classList.add("rectAngle-confirm6");
    rectAngleConfirm6.append("決定");

    const div12 = document.createElement("div");
    div12.classList.add("div12");

    const div11 = document.createElement("div");
    div11.classList.add("div11");

    const note4 = document.createElement("p");
    note4.classList.add("note4");

    div12.append(note4);
    div12.append(rectAngleSizeForm10,rectAngleSizeForm11,rectAngleConfirm6);

    div11.append(div12);
    spacecenterInner.append(div11);

    document.querySelector(".note4").textContent = "※右端または左端のどちらかを入力してください※";

    // 四角の中心座標を取得
    const midRectX = midRect.x() + midRect.width() / 2;
    const midRectY = midRect.y() + midRect.height() / 2;

    // 横破線を描画する座標を計算
    const dashedLineX1 = midRectX - length / 2;
    const dashedLineY1 = midRectY;
    const dashedLineX2 = midRectX + length / 2;
    const dashedLineY2 = midRectY;

    // 破線を作成
    const dashedLine5 = new Konva.Line({
      points: [dashedLineX1, dashedLineY1, dashedLineX2, dashedLineY2],
      stroke: 'red',
      strokeWidth: 2,
      dash: [5, 10], // 破線のパターンを指定（length変数の値を使用）
    });

    // 丸い点を作成
    const circle1 = new Konva.Circle({
      x: dashedLineX1,
      y: dashedLineY1,
      radius: 5,
      fill: 'red',
    });

    const circle2 = new Konva.Circle({
      x: dashedLineX2,
      y: dashedLineY2,
      radius: 5,
      fill: 'red',
    });

    // レイヤーに追加
    const layer = new Konva.Layer();
    layer.add(dashedLine5, circle1, circle2, midRect);
    stage.add(layer);

    document.querySelector(".rectAngle-confirm6").addEventListener("click",function(){

      const size2 =document.querySelector(".rectAngle-SizeForm10").value;
      const size3 =document.querySelector(".rectAngle-SizeForm11").value;
      const size2Y = Number.parseFloat(size2);
      const size3Y = Number.parseFloat(size3);
      const size2Num = size2Y /1.06;
      const size3Num = size3Y /1.06;
      console.log(size2Num)
      console.log(size3Num)
      
      
      if(size2 !== "" && size3 === ""){

      if(Number.isNaN(size2Num)){

       const sizeFormError3 = document.createElement("p");
       sizeFormError3.classList.add("size-form-error3");
       div6.append(sizeFormError3);
       document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
      }
        console.log("A");

     // 長さを格納する変数
     let length2 = size2Num; 

     circle1.destroy();
     midRect.destroy();
     dashedLine5.destroy();

     // 図形の上辺の右端から指定した距離の位置を計算して新しい右の丸い点のX座標を設定
     const newRightCircleX = rectangle.x() + rectangle.width() - length2;

     // 右の丸い点の座標を更新
     circle2.x(newRightCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x = circle2.x();
       const y = circle2.y();

       // 破線を作成
       const dashedLine6 = new Konva.Line({
         points: [x, y, x - length, y], // 例としてX座標から100ピクセル右に破線を表示
         stroke: 'red',
         strokeWidth: 2,
         lineCap: 'round',
         dash: [5, 10],
       });

       // 新しい丸い点を作成
       const newCircle = new Konva.Circle({
         x: dashedLine6.points()[2], // 破線の一番左端のX座標を取得
         y: dashedLine6.points()[3], // 破線の一番左端のY座標を取得
         radius: 5,
         fill: 'red',
       });

       const x2 = newCircle.x();
       const y2 = newCircle.y();

       const newRectX = (x + x2) / 2;
       const newRectY = (y + y2) / 2;
       const newRect = new Konva.Rect({
         x: newRectX - 5, // 四角の幅と高さを考慮して調整
         y: newRectY - 5,
         width: 10,
         height: 10,
         fill: 'red',
       });

       layer.add(dashedLine6);
       layer.add(newCircle); 
       layer.add(newRect);
       layer.draw();
    

     while (document.querySelector(".div11").lastChild) {
      document.querySelector(".div11").removeChild(document.querySelector(".div11").lastChild);
     }

    const paturnText = document.createElement('p');
    paturnText.classList.add("paturn-text");

    const check1 = document.createElement('input');
    check1.type = "checkbox";
    check1.classList.add("check1");
    check1.name = "check";

    const check2 = document.createElement('input');
    check2.type = "checkbox";
    check2.classList.add("check2");
    check2.name = "check";

    const paturn1 = document.createElement('img');
    paturn1.src = "/images/paturn1.png";
    paturn1.classList.add("paturn1");

    const paturn2 = document.createElement('img');
    paturn2.src = "/images/paturn2.png";
    paturn2.classList.add("paturn2");

    const rectAngleSizeForm28 = document.createElement('input');
    rectAngleSizeForm28.type = "text";
    rectAngleSizeForm28.classList.add("rectAngle-SizeForm28");
    rectAngleSizeForm28.placeholder = "上方向に伸ばす長さを入力";

    const rectAngleSizeForm29 = document.createElement('input');
    rectAngleSizeForm29.type = "text";
    rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
    rectAngleSizeForm29.placeholder = "下方向に縮める長さを入力";

    const rectAngleConfirm11 = document.createElement('button');
    rectAngleConfirm11.classList.add("rectAngle-confirm11");
    rectAngleConfirm11.append("決定");

    const div22 = document.createElement("div");
    div22.classList.add("div22");

    const div21 = document.createElement("div");
    div21.classList.add("div21");

    const note13 = document.createElement("p");
    note13.classList.add("note13");

    div22.append(note13);
    div22.append(paturnText,check1,paturn1,check2,paturn2,rectAngleSizeForm28,rectAngleSizeForm29,rectAngleConfirm11);

    div21.append(div22);
    spacecenterInner.append(div21);

    document.querySelector(".note13").textContent = "上方向または下方向のどちらかを入力してください";
    document.querySelector(".paturn-text").textContent = "伸縮パターンを選択後、長さを入力してください";

    const check = document.querySelectorAll("[name=check");
    for(let i = 0; i < 2; i++){
      check[i].addEventListener("click",function(){
        const currentItem = this;
        if(currentItem.checked){
          check[0].checked = false;
          check[1].checked = false;
          currentItem.checked = true;
        };
      });
    };

    document.querySelector(".rectAngle-confirm11").addEventListener("click",function(){

      if(check[0].checked){
  
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
           }

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = -size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle2.x();
          const circleY2 = circle2.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

           const rectAngleSizeForm30 = document.createElement('input');
           rectAngleSizeForm30.type = "text";
           rectAngleSizeForm30.classList.add("rectAngle-SizeForm30");
           rectAngleSizeForm30.placeholder = "四角を右方向に動かす場合はその長さを入力";
   
           const rectAngleSizeForm31 = document.createElement('input');
           rectAngleSizeForm31.type = "text";
           rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
           rectAngleSizeForm31.placeholder = "四角を左方向に動かす場合はその長さを入力";
     
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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'white', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'white', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle2.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
               const offsetX = size6Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX + offsetX;
               const newY = currentY;

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
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

               const offsetX = size7Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX - offsetX;
               const newY = currentY;

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
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を白色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を白色にする

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           };

           dashedLine6.destroy();

          // 下に移動させる距離を指定
          const offsetY = size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle2.x();
          const circleY2 = circle2.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

           const rectAngleSizeForm30 = document.createElement('input');
           rectAngleSizeForm30.type = "text";
           rectAngleSizeForm30.classList.add("rectAngle-SizeForm30");
           rectAngleSizeForm30.placeholder = "四角を右方向に動かす場合はその長さを入力";
   
           const rectAngleSizeForm31 = document.createElement('input');
           rectAngleSizeForm31.type = "text";
           rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
           rectAngleSizeForm31.placeholder = "四角を左方向に動かす場合はその長さを入力";
     
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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'blue', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'blue', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle2.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
               const offsetX = size6Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX + offsetX;
               const newY = currentY;

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
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

               const offsetX = size7Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX - offsetX;
               const newY = currentY;

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
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle2.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });

        };



      }else if(check[1].checked){

        const size4 =document.querySelector(".rectAngle-SizeForm28").value;
        const size5 =document.querySelector(".rectAngle-SizeForm29").value;
        const size4Y = Number.parseFloat(size4);
        const size5Y = Number.parseFloat(size5);
        const size4Num = size4Y /1.06;
        const size5Num = size5Y /1.06;
        

        if(size4 !== "" && size5 === ""){

          //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す

          if(Number.isNaN(size4Num)){
            const sizeFormError5 = document.createElement("p");
            sizeFormError5.classList.add("size-form-error5");
            div22.append(sizeFormError5);
            document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
           }

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = -size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle2.x();
          const circleY2 = circle2.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionX1 = newCircle.x(); 
          const intersectionY1 = newRect.y()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionX2 = circle2.x(); 
          const intersectionY2 = newRect.y()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'white', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'white', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle2.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           } 

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle2.x();
          const circleY2 = circle2.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionX1 = newCircle.x(); 
          const intersectionY1 = newRect.y()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionX2 = circle2.x(); 
          const intersectionY2 = newRect.y()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'blue', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'blue', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle2.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

        };



      }else{

        const sizeFormError7 = document.createElement("p");
        sizeFormError7.classList.add("size-form-error7");
        div22.append(sizeFormError7);
        document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

      }

    });



  

      } else if(size3 !== "" && size2 === ""){

        if(Number.isNaN(size3Num)){
          const sizeFormError3 = document.createElement("p");
          sizeFormError3.classList.add("size-form-error3");
          div6.append(sizeFormError);
          document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";
         } 

          // 長さを格納する変数
     let length2 = size3Num; 

     circle2.destroy();
     midRect.destroy();
     dashedLine5.destroy();

     // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
     const newLeftCircleX = rectangle.x() + length2;

     // 左の丸い点の座標を更新
     circle1.x(newLeftCircleX);
     layer.draw();

     
       // 丸い点の座標を取得
       const x = circle1.x();
       const y = circle1.y();

       // 破線を作成
       const dashedLine6 = new Konva.Line({
         points: [x, y, x + length, y], // 例としてX座標から100ピクセル右に破線を表示
         stroke: 'red',
         strokeWidth: 2,
         lineCap: 'round',
         dash: [5, 10],
       });

       // 新しい丸い点を作成
       const newCircle = new Konva.Circle({
         x: dashedLine6.points()[2], // 破線の一番右端のX座標を取得
         y: dashedLine6.points()[3], // 破線の一番右端のY座標を取得
         radius: 5,
         fill: 'red',
       });


       const x2 = newCircle.x();
       const y2 = newCircle.y();

       const newRectX = (x + x2) / 2;
       const newRectY = (y + y2) / 2;
       const newRect = new Konva.Rect({
         x: newRectX - 5, // 四角の幅と高さを考慮して調整
         y: newRectY - 5,
         width: 10,
         height: 10,
         fill: 'red',
       });

       layer.add(dashedLine6);
       layer.add(newCircle); 
       layer.add(newRect);
       layer.draw();
    

     while (document.querySelector(".div11").lastChild) {
      document.querySelector(".div11").removeChild(document.querySelector(".div11").lastChild);
     }

    const paturnText = document.createElement('p');
    paturnText.classList.add("paturn-text");

    const check1 = document.createElement('input');
    check1.type = "checkbox";
    check1.classList.add("check1");
    check1.name = "check";

    const check2 = document.createElement('input');
    check2.type = "checkbox";
    check2.classList.add("check2");
    check2.name = "check";

    const paturn1 = document.createElement('img');
    paturn1.src = "/images/paturn1.png";
    paturn1.classList.add("paturn1");

    const paturn2 = document.createElement('img');
    paturn2.src = "/images/paturn2.png";
    paturn2.classList.add("paturn2");

    const rectAngleSizeForm28 = document.createElement('input');
    rectAngleSizeForm28.type = "text";
    rectAngleSizeForm28.classList.add("rectAngle-SizeForm28");
    rectAngleSizeForm28.placeholder = "上方向に伸ばす長さを入力";

    const rectAngleSizeForm29 = document.createElement('input');
    rectAngleSizeForm29.type = "text";
    rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
    rectAngleSizeForm29.placeholder = "下方向に縮める長さを入力";

    const rectAngleConfirm11 = document.createElement('button');
    rectAngleConfirm11.classList.add("rectAngle-confirm11");
    rectAngleConfirm11.append("決定");

    const div22 = document.createElement("div");
    div22.classList.add("div22");

    const div21 = document.createElement("div");
    div21.classList.add("div21");

    const note13 = document.createElement("p");
    note13.classList.add("note13");

    div22.append(note13);
    div22.append(paturnText,check1,paturn1,check2,paturn2,rectAngleSizeForm28,rectAngleSizeForm29,rectAngleConfirm11);

    div21.append(div22);
    spacecenterInner.append(div21);

    document.querySelector(".note13").textContent = "上方向または下方向のどちらかを入力してください";
    document.querySelector(".paturn-text").textContent = "伸縮パターンを選択後、長さを入力してください";

    const check = document.querySelectorAll("[name=check");
    for(let i = 0; i < 2; i++){
      check[i].addEventListener("click",function(){
        const currentItem = this;
        if(currentItem.checked){
          check[0].checked = false;
          check[1].checked = false;
          currentItem.checked = true;
        };
      });
    };

    document.querySelector(".rectAngle-confirm11").addEventListener("click",function(){

      if(check[0].checked){
  
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
           }

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = -size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

           const rectAngleSizeForm30 = document.createElement('input');
           rectAngleSizeForm30.type = "text";
           rectAngleSizeForm30.classList.add("rectAngle-SizeForm30");
           rectAngleSizeForm30.placeholder = "四角を右方向に動かす場合はその長さを入力";
   
           const rectAngleSizeForm31 = document.createElement('input');
           rectAngleSizeForm31.type = "text";
           rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
           rectAngleSizeForm31.placeholder = "四角を左方向に動かす場合はその長さを入力";
     
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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'white', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'white', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle1.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
               const offsetX = size6Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX + offsetX;
               const newY = currentY;

               newRect.position({ x: newX, y: newY });

               layer.draw();

               dashedLine7.destroy();
               dashedLine8.destroy();

               const circleX1A = newCircle.x();
               const circleY1A = newCircle.y();

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

               const offsetX = size7Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX - offsetX;
               const newY = currentY;

               newRect.position({ x: newX, y: newY });

               layer.draw();

               dashedLine7.destroy();
               dashedLine8.destroy();

               const circleX1A = newCircle.x();
               const circleY1A = newCircle.y();

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'white', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'white', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、２つの丸い点と四角を破線で繋ぐ。そしてwhileでフォームを消し、新たなフォームを作成する。新フォームで完了を押せば２つの丸い点の座標と四角の座標の内側（破線の内側）を白色にする。四角を右、左方向にずらすの２つのフォームをif文で２パターン化し（右方向を入力して決定を押すパターンとその逆）入力した数値の長さだけ四角を移動させ、破線の内側の色を白色にする

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           };

           dashedLine6.destroy();

          // 下に移動させる距離を指定
          const offsetY = size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

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

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

           const rectAngleSizeForm30 = document.createElement('input');
           rectAngleSizeForm30.type = "text";
           rectAngleSizeForm30.classList.add("rectAngle-SizeForm30");
           rectAngleSizeForm30.placeholder = "四角を右方向に動かす場合はその長さを入力";
   
           const rectAngleSizeForm31 = document.createElement('input');
           rectAngleSizeForm31.type = "text";
           rectAngleSizeForm31.classList.add("rectAngle-SizeForm31");
           rectAngleSizeForm31.placeholder = "四角を左方向に動かす場合はその長さを入力";
     
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
           spacecenterInner.append(div23);
   
           document.querySelector(".note14").textContent = "上記不要の場合はこちら";


           document.querySelector(".rectAngle-confirm13").addEventListener("click",function(){

            const polygon = new Konva.Line({
              points: [circleX1, circleY1,  midRectX1, midRectY1, circleX2, circleY2],
              stroke: 'blue', // 線の色
              strokeWidth: 2, // 線の太さ
              closed: true, // 閉じた形状として描画
              fill: 'blue', // 塗りつぶし色（透明）
            });
            
            layer.add(polygon);

            circle1.destroy();
            newRect.destroy();
            newCircle.destroy();

            while (document.querySelector(".div23").lastChild) {
              document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
             }

           });

           document.querySelector(".rectAngle-confirm12").addEventListener("click",function(){

            
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
               } 
        
               const offsetX = size6Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX + offsetX;
               const newY = currentY;

               newRect.position({ x: newX, y: newY });

               layer.draw();

               dashedLine7.destroy();
               dashedLine8.destroy();

               const circleX1A = newCircle.x();
               const circleY1A = newCircle.y();

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             } else if(size7 !== "" && size6 === ""){

              if(Number.isNaN(size7Num)){
                const sizeFormError9 = document.createElement("p");
                sizeFormError9.classList.add("size-form-error9");
                div24.append(sizeFormError9);
                document.querySelector(".size-form-error9").textContent = "※数値のみ入力してください※";
               } 

               const offsetX = size7Num;
               const currentX = newRect.x();
               const currentY = newRect.y();
               const newX = currentX - offsetX;
               const newY = currentY;

               newRect.position({ x: newX, y: newY });

               layer.draw();

               dashedLine7.destroy();
               dashedLine8.destroy();

               const circleX1A = newCircle.x();
               const circleY1A = newCircle.y();

               const circleX2A = circle1.x();
               const circleY2A = circle1.y();

               // 四角の真ん中の座標を計算
               const midRectX1A = newRect.x() + newRect.width() / 2;
               const midRectY1A = newRect.y() + newRect.height() / 2;

               const polygon = new Konva.Line({
                points: [circleX1A, circleY1A, midRectX1A, midRectY1A, circleX2A, circleY2A],
                stroke: 'blue', // 線の色
                strokeWidth: 2, // 線の太さ
                closed: true, // 閉じた形状として描画
                fill: 'blue', // 塗りつぶし色（透明）
              });
              
              layer.add(polygon);
              newCircle.destroy();
              circle1.destroy();
              newRect.destroy();

              while (document.querySelector(".div23").lastChild) {
                document.querySelector(".div23").removeChild(document.querySelector(".div23").lastChild);
               }



             };

           });

        };



      }else if(check[1].checked){

        const size4 =document.querySelector(".rectAngle-SizeForm28").value;
        const size5 =document.querySelector(".rectAngle-SizeForm29").value;
        const size4Y = Number.parseFloat(size4);
        const size5Y = Number.parseFloat(size5);
        const size4Num = size4Y /1.06;
        const size5Num = size5Y /1.06;
        

        if(size4 !== "" && size5 === ""){

          //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す

          if(Number.isNaN(size4Num)){
            const sizeFormError5 = document.createElement("p");
            sizeFormError5.classList.add("size-form-error5");
            div22.append(sizeFormError5);
            document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
           }

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = -size4Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionX1 = newCircle.x(); 
          const intersectionY1 = newRect.y()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionX2 = circle1.x(); 
          const intersectionY2 = newRect.y()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'white', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'white', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle1.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }



        }else if(size5 !== "" && size4 === ""){

          //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

           if(Number.isNaN(size5Num)){
            const sizeFormError6 = document.createElement("p");
            sizeFormError6.classList.add("size-form-error6");
            div22.append(sizeFormError6);
            document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
           } 

          dashedLine6.destroy();

          // 上に移動させる距離を指定
          const offsetY = size5Num;

          // 現在の midRect の座標を取得
          const currentX = newRect.x();
          const currentY = newRect.y();

          const circleX1 = newCircle.x();
          const circleY1 = newCircle.y();

          const circleX2 = circle1.x();
          const circleY2 = circle1.y();

          // 新しい座標を計算して設定
          const newX = currentX;
          const newY = currentY + offsetY;

          // midRect の座標を更新
          newRect.position({ x: newX, y: newY });

          //丸い点と四角が垂直に交わる座標
          const intersectionX1 = newCircle.x(); 
          const intersectionY1 = newRect.y()+5;

          //もう一方の丸い点と四角が垂直に交わる座標
          const intersectionX2 = circle1.x(); 
          const intersectionY2 = newRect.y()+5;

          // 四角の真ん中の座標を計算
          const midRectX1 = newRect.x() + newRect.width() / 2;
          const midRectY1 = newRect.y() + newRect.height() / 2;

          const polygon = new Konva.Line({
            points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
            stroke: 'blue', // 線の色
            strokeWidth: 2, // 線の太さ
            closed: true, // 閉じた形状として描画
            fill: 'blue', // 塗りつぶし色（透明）
          });
          
          layer.add(polygon);

          // レイヤーを再描画
          layer.draw();

          circle1.destroy();
          newRect.destroy();
          newCircle.destroy();

          while (document.querySelector(".div21").lastChild) {
            document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
           }

        };



      }else{

        const sizeFormError7 = document.createElement("p");
        sizeFormError7.classList.add("size-form-error7");
        div22.append(sizeFormError7);
        document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

      }

    });

      };  

    });

 
    
  }

     
      }
   
     
    };



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