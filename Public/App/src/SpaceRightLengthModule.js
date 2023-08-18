
module.exports = function rightLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm3){

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

    const  rightCheckTriangle  = require('src/SpaceRightCheckTriangleModule');
    const rightCheckTriangle2 = () =>{

      rightCheckTriangle(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm3,check,dashedLine6,newCircle,newRect,handleConfirm11)

    };

    rightCheckTriangle2();


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
};