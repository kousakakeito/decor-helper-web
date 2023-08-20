
module.exports = function sideTopRightPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2){
  stage.off("click",handleClick2);

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
  furniturecenterInner.append(div13);

  document.querySelector(".note5").textContent = "※右端または左端のどちらかを入力してください※";
  document.querySelector(".note6").textContent = "※上端または下端のどちらかを入力してください※";

  document.querySelector(".rectAngle-confirm7").addEventListener("click",handleConfirm7);
  function handleConfirm7(){

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
    
      const  firstRightNextTopPoints  = require('src/FurnitureFirstRightNextTopPointsModule');
      const firstRightNextTopPoints2 = () =>{
  
        firstRightNextTopPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm7,size2,size3,size4,size5)
  
      };
  
      firstRightNextTopPoints2();


}else if (dots[0].x() === rectangle.x() + rectangle.width() && dots[1].y() === rectangle.y()) {

  const  firstTopNextRightPoints  = require('src/FurnitureFirstTopNextRightPointsModule');
  const firstTopNextRightPoints2 = () =>{

    firstTopNextRightPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm7,size2,size3,size4,size5)

  };

  firstTopNextRightPoints2();

};

  };
};