
module.exports = function sideTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2){
  stage.off("click",handleClick2);
        
        

  const rectAngleSizeForm3 = document.createElement('input');
  rectAngleSizeForm3.type = "text";
  rectAngleSizeForm3.classList.add("rectAngle-SizeForm3");
  rectAngleSizeForm3.placeholder = "対象箇所の長さをcm単位で入力";

  const rectAngleConfirm2 = document.createElement('button');
  rectAngleConfirm2.classList.add("rectAngle-confirm2");
  rectAngleConfirm2.append("決定");
  const div4 = document.createElement("div");
  div4.classList.add("div4");
  const div3 = document.createElement("div");
  div3.classList.add("div3");

  div4.append(rectAngleSizeForm3,rectAngleConfirm2);
  div3.append(div4);
  spacecenterInner.append(div3);


  document.querySelector(".rectAngle-confirm2").addEventListener("click",handleConfirm2);
  function handleConfirm2(){



    const size1 =document.querySelector(".rectAngle-SizeForm3").value;
    const sizeY = Number.parseFloat(size1);
    const size1Num = sizeY /1.06;
    console.log(size1Num)
    
    

    if(Number.isNaN(size1Num)){
     const sizeFormError2 = document.createElement("p");
     sizeFormError2.classList.add("size-form-error2");
     div4.append(sizeFormError2);
     document.querySelector(".size-form-error2").textContent = "※数値のみ入力してください※";

    } else {


   // 長さを格納する変数
   let length = size1Num; 
   
   dots[0].destroy();
   dots[1].destroy();
   dashedLine.destroy();
  

  if( midRect.y() <= rectangle.y()){
   
    const  topTwoPoints  = require('src/SpaceTopTwoPointsModule');
    const topTwoPoints2 = () =>{

      topTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length)

    };

    topTwoPoints2();

} else if( midRect.x() + midRect.width() >= rectangle.x() + rectangle.width()){

    const  rightTwoPoints  = require('src/SpaceRightTwoPointsModule');
    const rightTwoPoints2 = () =>{

      rightTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length)

    };

    rightTwoPoints2();

} else if( midRect.x() <= rectangle.x()){

    const  leftTwoPoints  = require('src/SpaceLeftTwoPointsModule');
    const leftTwoPoints2 = () =>{

      leftTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length)

    };

    leftTwoPoints2();


} else if( midRect.y() + midRect.height() >= rectangle.y() + rectangle.height()){

  const  bottomTwoPoints  = require('src/SpaceBottomTwoPointsModule');
  const bottomTwoPoints2 = () =>{

    bottomTwoPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length)

  };

  bottomTwoPoints2();


  
};

   
    };
 
   
  };
};