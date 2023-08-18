
module.exports = function topTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length){

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

      const  rightLength  = require('src/SpaceRightLengthModule');
      const rightLength2 = () =>{
  
        rightLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm3)
  
      };
  
      rightLength2();

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
};