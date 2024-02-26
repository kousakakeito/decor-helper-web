
module.exports = function sideBottomRightPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2){
  stage.off("click",handleClick2);

  const rectAngleSizeForm20 = document.createElement('input');
  rectAngleSizeForm20.type = "text";
  rectAngleSizeForm20.classList.add("rectAngle-SizeForm20");
  rectAngleSizeForm20.placeholder = "下辺丸点の左端からの長さを入力";

  const rectAngleSizeForm21 = document.createElement('input');
  rectAngleSizeForm21.type = "text";
  rectAngleSizeForm21.classList.add("rectAngle-SizeForm21");
  rectAngleSizeForm21.placeholder = "下辺丸点の右端からの長さを入力";

  const rectAngleSizeForm22 = document.createElement('input');
  rectAngleSizeForm22.type = "text";
  rectAngleSizeForm22.classList.add("rectAngle-SizeForm22");
  rectAngleSizeForm22.placeholder = "右辺丸点の上端からの長さを入力";

  const rectAngleSizeForm23 = document.createElement('input');
  rectAngleSizeForm23.type = "text";
  rectAngleSizeForm23.classList.add("rectAngle-SizeForm23");
  rectAngleSizeForm23.placeholder = "右辺丸点の下端からの長さを入力";

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
  furniturecenterInner.append(div17);

  document.querySelector(".rectAngle-SizeForm20").addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  document.querySelector(".rectAngle-SizeForm21").addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  document.querySelector(".rectAngle-SizeForm22").addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  document.querySelector(".rectAngle-SizeForm23").addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  document.querySelector(".note9").textContent = "※上端または下端のどちらかを入力してください※";
  document.querySelector(".note10").textContent = "※右端または左端のどちらかを入力してください※";

  document.querySelector(".rectAngle-confirm9").addEventListener("click",handleConfirm9);
  function handleConfirm9(){

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
    
      const  firstRightNextBottomPoints  = require('src/FurnitureFirstRightNextBottomPointsModule');
      const firstRightNextBottomPoints2 = () =>{
  
        firstRightNextBottomPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm9,size2,size3,size4,size5)
  
      };
  
      firstRightNextBottomPoints2();

      console.log("A")

}else if (dots[0].x() === rectangle.x() + rectangle.width() && dots[1].y() === rectangle.y() + rectangle.height()) {

      const  firstBottomNextRightPoints  = require('src/FurnitureFirstBottomNextRightPointsModule');
      const firstBottomNextRightPoints2 = () =>{
  
        firstBottomNextRightPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm9,size2,size3,size4,size5)
  
      };
  
      firstBottomNextRightPoints2();

      console.log("B")

}

  };
};