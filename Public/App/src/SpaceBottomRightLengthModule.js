
module.exports = function bottomRightLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm6){

  if(Number.isNaN(size2Num)){

    const sizeFormError3 = document.createElement("p");
    sizeFormError3.classList.add("size-form-error3");
    div6.append(sizeFormError3);
    document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
   } else{
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
 rectAngleSizeForm28.placeholder = "上方向に縮める長さを入力";

 const rectAngleSizeForm29 = document.createElement('input');
 rectAngleSizeForm29.type = "text";
 rectAngleSizeForm29.classList.add("rectAngle-SizeForm29");
 rectAngleSizeForm29.placeholder = "下方向に伸ばす長さを入力";

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

 document.querySelector(".rectAngle-SizeForm28").addEventListener('input', function(e) {
  this.value = this.value.replace(/[^0-9]/g, '');
});
document.querySelector(".rectAngle-SizeForm29").addEventListener('input', function(e) {
  this.value = this.value.replace(/[^0-9]/g, '');
});

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

 document.querySelector(".rectAngle-confirm6").removeEventListener("click",handleConfirm6);



 while (document.querySelector(".div11").lastChild) {
   document.querySelector(".div11").removeChild(document.querySelector(".div11").lastChild);
   console.log("while");
  }

  document.querySelector(".div11").parentNode.removeChild(document.querySelector(".div11"));




 
 function handleConfirm11(){

   if(check[0].checked){

    const  bottomRightCheckTriangle  = require('src/SpaceBottomRightCheckTriangleModule');
    const bottomRightCheckTriangle2 = () =>{

      bottomRightCheckTriangle(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm6,check,dashedLine6,newCircle,newRect,handleConfirm11)

    };

    bottomRightCheckTriangle2();



   }else if(check[1].checked){

    const  bottomRightCheckSquare  = require('src/SpaceBottomRightCheckSquareModule');
    const bottomRightCheckSquare2 = () =>{

      bottomRightCheckSquare(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm6,check,dashedLine6,newCircle,newRect,handleConfirm11)

    };

    bottomRightCheckSquare2();



   }else{

     const sizeFormError7 = document.createElement("p");
     sizeFormError7.classList.add("size-form-error7");
     div22.append(sizeFormError7);
     document.querySelector(".size-form-error7").textContent = "※伸縮パターンにチェックを入れてください※";

   }

 };
};
};