
module.exports = function sideTopLeftPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2){
  stage.off("click",handleClick2);

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
  furniturecenterInner.append(div15);

  document.querySelector(".note7").textContent = "※右端または左端のどちらかを入力してください※";
  document.querySelector(".note8").textContent = "※上端または下端のどちらかを入力してください※";

  document.querySelector(".rectAngle-confirm8").addEventListener("click",handleConfirm8);
  function handleConfirm8(){

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

      console.log("qqq");
    
      const  firstLeftNextTopPoints  = require('src/FurnitureFirstLeftNextTopPointsModule');
      const firstLeftNextTopPoints2 = () =>{
  
        firstLeftNextTopPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm8,size2,size3,size4,size5)
  
      };
  
      firstLeftNextTopPoints2();

}else if (dots[0].x() === rectangle.x() && dots[1].y() === rectangle.y()) {

  console.log("qqqaaa");

      const  firstTopNextLeftPoints  = require('src/FurnitureFirstTopNextLeftPointsModule');
      const firstTopNextLeftPoints2 = () =>{
  
        firstTopNextLeftPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm8,size2,size3,size4,size5)
  
      };
  
      firstTopNextLeftPoints2();

}

  };
};