
module.exports = function topTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length){

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
  furniturecenterInner.append(div5);

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

      const  topRightLength  = require('src/FurnitureTopRightLengthModule');
      const topRightLength2 = () =>{
  
        topRightLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm3)
  
      };
  
      topRightLength2();

    } else if(size3 !== "" && size2 === ""){

      const  topLeftLength  = require('src/FurnitureTopLeftLengthModule');
      const topLeftLength2 = () =>{
  
        topLeftLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,handleConfirm2,length,size3Num,dashedLine5, circle1, circle2,handleConfirm3)
  
      };
  
      topLeftLength2();

    };  
    
  };
};