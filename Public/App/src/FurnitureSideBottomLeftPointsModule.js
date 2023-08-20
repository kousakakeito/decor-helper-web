
module.exports = function sideBottomLeftPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2){
  stage.off("click",handleClick2);

  const rectAngleSizeForm24 = document.createElement('input');
  rectAngleSizeForm24.type = "text";
  rectAngleSizeForm24.classList.add("rectAngle-SizeForm24");
  rectAngleSizeForm24.placeholder = "下辺丸点の左端からの長さを入力";

  const rectAngleSizeForm25 = document.createElement('input');
  rectAngleSizeForm25.type = "text";
  rectAngleSizeForm25.classList.add("rectAngle-SizeForm25");
  rectAngleSizeForm25.placeholder = "下辺丸点の右端からの長さを入力";

  const rectAngleSizeForm26 = document.createElement('input');
  rectAngleSizeForm26.type = "text";
  rectAngleSizeForm26.classList.add("rectAngle-SizeForm26");
  rectAngleSizeForm26.placeholder = "左辺丸点の上端からの長さを入力";

  const rectAngleSizeForm27 = document.createElement('input');
  rectAngleSizeForm27.type = "text";
  rectAngleSizeForm27.classList.add("rectAngle-SizeForm27");
  rectAngleSizeForm27.placeholder = "左辺丸点の下端からの長さを入力";

  const rectAngleConfirm10 = document.createElement('button');
  rectAngleConfirm10.classList.add("rectAngle-confirm10");
  rectAngleConfirm10.append("決定");

  const div20 = document.createElement("div");
  div20.classList.add("div20");

  const div19 = document.createElement("div");
  div19.classList.add("div19");

  const note11 = document.createElement("p");
  note11.classList.add("note11");

  const note12 = document.createElement("p");
  note12.classList.add("note12");

  div20.append(note11,note12);
  div20.append(rectAngleSizeForm24,rectAngleSizeForm25,rectAngleSizeForm26,rectAngleSizeForm27,rectAngleConfirm10);

  div19.append(div20);
  furniturecenterInner.append(div19);

  document.querySelector(".note11").textContent = "※右端または左端のどちらかを入力してください※";
  document.querySelector(".note12").textContent = "※上端または下端のどちらかを入力してください※";

  document.querySelector(".rectAngle-confirm10").addEventListener("click",handleConfirm10);
  function handleConfirm10(){

    const size2 =document.querySelector(".rectAngle-SizeForm24").value;
    const size3 =document.querySelector(".rectAngle-SizeForm25").value;
    const size4 =document.querySelector(".rectAngle-SizeForm26").value;
    const size5 =document.querySelector(".rectAngle-SizeForm27").value;
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
    
    if (dots[0].y() === rectangle.y() + rectangle.height() && dots[1].x() === rectangle.x()) {
    
      const  firstLeftNextBottomPoints  = require('src/FurnitureFirstLeftNextBottomPointsModule');
      const firstLeftNextBottomPoints2 = () =>{
  
        firstLeftNextBottomPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm10,size2,size3,size4,size5)
  
      };
  
      firstLeftNextBottomPoints2();

}else if (dots[0].x() === rectangle.x() && dots[1].y() === rectangle.y() + rectangle.height()) {

        const  firstBottomNextLeftPoints  = require('src/FurnitureFirstBottomNextLeftPointsModule');
      const firstBottomNextLeftPoints2 = () =>{
  
        firstBottomNextLeftPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm10,size2,size3,size4,size5)
  
      };
  
      firstBottomNextLeftPoints2();

};

  };
};