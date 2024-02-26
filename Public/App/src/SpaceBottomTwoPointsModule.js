
module.exports = function bottomTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length){

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

  document.querySelector(".rectAngle-SizeForm10").addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  document.querySelector(".rectAngle-SizeForm11").addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

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
  layer.add(dashedLine5, circle1, circle2, midRect);
  stage.add(layer);

  document.querySelector(".rectAngle-confirm6").addEventListener("click",handleConfirm6);

  document.querySelector(".rectAngle-confirm2").removeEventListener("click",handleConfirm2);
      
  while (document.querySelector(".div3").lastChild) {
    document.querySelector(".div3").removeChild(document.querySelector(".div3").lastChild);
    console.log("while0");

   }

   document.querySelector(".div3").parentNode.removeChild(document.querySelector(".div3"));
   

  function handleConfirm6(){

    const size2 =document.querySelector(".rectAngle-SizeForm10").value;
    const size3 =document.querySelector(".rectAngle-SizeForm11").value;
    const size2Y = Number.parseFloat(size2);
    const size3Y = Number.parseFloat(size3);
    const size2Num = size2Y /1.06;
    const size3Num = size3Y /1.06;
    console.log(size2Num)
    console.log(size3Num)
    
    
    if(size2 !== "" && size3 === ""){

      const  bottomRightLength  = require('src/SpaceBottomRightLengthModule');
      const bottomRightLength2 = () =>{
  
        bottomRightLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size2Num,dashedLine5, circle1, circle2,handleConfirm6)
  
      };
  
      bottomRightLength2();





    } else if(size3 !== "" && size2 === ""){

      const  bottomLeftLength  = require('src/SpaceBottomLeftLengthModule');
      const bottomLeftLength2 = () =>{
  
        bottomLeftLength(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size3Num,dashedLine5, circle1, circle2,handleConfirm6)
  
      };
  
      bottomLeftLength2();

    };  

  };
};