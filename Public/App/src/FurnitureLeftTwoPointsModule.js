
module.exports = function leftTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length){

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
  furniturecenterInner.append(div9);

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
  layer.add(dashedLine5, circle1, circle2, midRect);
  stage.add(layer);

  document.querySelector(".rectAngle-confirm5").addEventListener("click",handleConfirm5);

  document.querySelector(".rectAngle-confirm2").removeEventListener("click",handleConfirm2);
      
  while (document.querySelector(".div3").lastChild) {
    document.querySelector(".div3").removeChild(document.querySelector(".div3").lastChild);
    console.log("while0");

   }

   document.querySelector(".div3").parentNode.removeChild(document.querySelector(".div3"));

   function handleConfirm5(){

    const size2 =document.querySelector(".rectAngle-SizeForm8").value;
    const size3 =document.querySelector(".rectAngle-SizeForm9").value;
    const size2Y = Number.parseFloat(size2);
    const size3Y = Number.parseFloat(size3);
    const size2Num = size2Y /1.06;
    const size3Num = size3Y /1.06;
    console.log(size2Num)
    console.log(size3Num)
    
    
    if(size2 !== "" && size3 === ""){

      const  leftTopLength  = require('src/FurnitureLeftTopLengthModule');
      const leftTopLength2 = () =>{
  
        leftTopLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm5)
  
      };
  
      leftTopLength2();


    } else if(size3 !== "" && size2 === ""){

      const  leftBottomLength  = require('src/FurnitureLeftBottomLengthModule');
      const leftBottomLength2 = () =>{
  
        leftBottomLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length,size3Num,dashedLine5, circle1, circle2,handleConfirm5)
  
      };
  
      leftBottomLength2();


    };  

  };
};