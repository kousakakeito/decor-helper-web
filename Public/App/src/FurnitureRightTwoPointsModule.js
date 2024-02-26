
module.exports = function rightTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length){

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
  furniturecenterInner.append(div7);

  document.querySelector(".rectAngle-SizeForm6").addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  document.querySelector(".rectAngle-SizeForm7").addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  
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

  layer.add(dashedLine5, circle1, circle2, midRect);
  stage.add(layer);

  document.querySelector(".rectAngle-confirm4").addEventListener("click",handleConfirm4);

  document.querySelector(".rectAngle-confirm2").removeEventListener("click",handleConfirm2);
      
  while (document.querySelector(".div3").lastChild) {
    document.querySelector(".div3").removeChild(document.querySelector(".div3").lastChild);
    console.log("while0");

   }

   document.querySelector(".div3").parentNode.removeChild(document.querySelector(".div3"));

   function handleConfirm4(){

    const size2 =document.querySelector(".rectAngle-SizeForm6").value;
    const size3 =document.querySelector(".rectAngle-SizeForm7").value;
    const size2Y = Number.parseFloat(size2);
    const size3Y = Number.parseFloat(size3);
    const size2Num = size2Y /1.06;
    const size3Num = size3Y /1.06;
    console.log(size2Num)
    console.log(size3Num)
    
    
    if(size2 !== "" && size3 === ""){

      const  rightTopLength  = require('src/FurnitureRightTopLengthModule');
      const rightTopLength2 = () =>{
  
        rightTopLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm4)
  
      };
  
      rightTopLength2();


    } else if(size3 !== "" && size2 === ""){

      const  rightBottomLength  = require('src/FurnitureRightBottomLengthModule');
      const rightBottomLength2 = () =>{
  
        rightBottomLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length,size3Num,dashedLine5, circle1, circle2,handleConfirm4)
  
      };
  
      rightBottomLength2();

    };  

  };
};