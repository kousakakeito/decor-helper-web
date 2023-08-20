
module.exports = function firstBottomNextRightPoints(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,size2Num,size3Num,size4Num,size5Num,handleConfirm9,size2,size3,size4,size5){

  if(size2 !== "" && size3 === "" && size4 !== "" && size5 === ""){

    console.log("B")

    if(Number.isNaN(size2Num)){

     const sizeFormError3 = document.createElement("p");
     sizeFormError3.classList.add("size-form-error3");
     div6.append(sizeFormError3);
     document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
    } else if(Number.isNaN(size4Num)){

     const sizeFormError3 = document.createElement("p");
     sizeFormError3.classList.add("size-form-error3");
     div6.append(sizeFormError3);
     document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
    } else {

   // 長さを格納する変数
   let length2 = size2Num;
   let length3 = size4Num;  

   midRect.destroy();
   dashedLine.destroy();
   

   // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
   const newLeftCircleX = rectangle.x() + length2;
   // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
   const newTopCircleX = rectangle.y() + length3;

   // 左の丸い点の座標を更新
   dots[1].x(newLeftCircleX);
   layer.draw();

   // 右の丸い点の座標を更新
   dots[0].y(newTopCircleX);
   layer.draw();

   
     // 丸い点の座標を取得
     const x1 = dots[0].x();
     const y1 = dots[0].y();

     // 丸い点の座標を取得
     const x2 = dots[1].x();
     const y2 = dots[1].y();

     const intersectionX1 = dots[0].x(); 
     const intersectionY1 = dots[1].y();



     const polygon = new Konva.Line({
      points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
      stroke: 'white', // 線の色
      strokeWidth: 2, // 線の太さ
      closed: true, // 閉じた形状として描画
      fill: 'white', // 塗りつぶし色（透明）
    });
    
     layer.add(polygon);
     dots[0].destroy();
     dots[1].destroy();
     layer.draw();

  
     dots.length = 0 ;
     stage.on("click",handleClick2);
     document.querySelector(".rectAngle-confirm9").removeEventListener("click",handleConfirm9);

     while (document.querySelector(".div17").lastChild) {
       document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
      }


       document.querySelector(".div17").parentNode.removeChild(document.querySelector(".div17"));



  };

  }else if(size2 !== "" && size3 === "" && size4 === "" && size5 !== ""){

    if(Number.isNaN(size2Num)){

      const sizeFormError3 = document.createElement("p");
      sizeFormError3.classList.add("size-form-error3");
      div6.append(sizeFormError3);
      document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
     } else if(Number.isNaN(size5Num)){

      const sizeFormError3 = document.createElement("p");
      sizeFormError3.classList.add("size-form-error3");
      div6.append(sizeFormError3);
      document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
     } else{
       

   // 長さを格納する変数
   let length2 = size2Num;
   let length3 = size5Num;  

   midRect.destroy();
   dashedLine.destroy();

   // 図形の上辺の左端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
   const newLeftCircleX = rectangle.x() + length2;
   // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
   const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

   // 左の丸い点の座標を更新
   dots[1].x(newLeftCircleX);
   layer.draw();

   // 右の丸い点の座標を更新
   dots[0].y(newBottomCircleX);
   layer.draw();

   
     // 丸い点の座標を取得
     const x1 = dots[0].x();
     const y1 = dots[0].y();

     // 丸い点の座標を取得
     const x2 = dots[1].x();
     const y2 = dots[1].y();

     const intersectionX1 = dots[0].x(); 
     const intersectionY1 = dots[1].y();



     const polygon = new Konva.Line({
      points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
      stroke: 'white', // 線の色
      strokeWidth: 2, // 線の太さ
      closed: true, // 閉じた形状として描画
      fill: 'white', // 塗りつぶし色（透明）
    });
    
     layer.add(polygon);
     dots[0].destroy();
     dots[1].destroy();
     layer.draw();

  
     dots.length = 0 ;
     stage.on("click",handleClick2);
     document.querySelector(".rectAngle-confirm9").removeEventListener("click",handleConfirm9);

     while (document.querySelector(".div17").lastChild) {
       document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
      }


       document.querySelector(".div17").parentNode.removeChild(document.querySelector(".div17"));

  };

  }else if(size2 === "" && size3 !== "" && size4 !== "" && size5 === ""){

    if(Number.isNaN(size3Num)){

      const sizeFormError3 = document.createElement("p");
      sizeFormError3.classList.add("size-form-error3");
      div6.append(sizeFormError3);
      document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
     } else if(Number.isNaN(size4Num)){

      const sizeFormError3 = document.createElement("p");
      sizeFormError3.classList.add("size-form-error3");
      div6.append(sizeFormError3);
      document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
     } else{

   // 長さを格納する変数
   let length2 = size3Num;
   let length3 = size4Num;  

   midRect.destroy();
   dashedLine.destroy();

   // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
   const newRightCircleX = rectangle.x() + rectangle.width() - length2;
   // 図形の右辺の上端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
   const newTopCircleX = rectangle.y() + length3;

   // 左の丸い点の座標を更新
   dots[1].x(newRightCircleX);
   layer.draw();

   // 右の丸い点の座標を更新
   dots[0].y(newTopCircleX);
   layer.draw();

   
     // 丸い点の座標を取得
     const x1 = dots[0].x();
     const y1 = dots[0].y();

     // 丸い点の座標を取得
     const x2 = dots[1].x();
     const y2 = dots[1].y();

     const intersectionX1 = dots[0].x(); 
     const intersectionY1 = dots[1].y();



     const polygon = new Konva.Line({
      points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
      stroke: 'white', // 線の色
      strokeWidth: 2, // 線の太さ
      closed: true, // 閉じた形状として描画
      fill: 'white', // 塗りつぶし色（透明）
    });
    
     layer.add(polygon);
     dots[0].destroy();
     dots[1].destroy();
     layer.draw();

  
     dots.length = 0 ;
     stage.on("click",handleClick2);
     document.querySelector(".rectAngle-confirm9").removeEventListener("click",handleConfirm9);

     while (document.querySelector(".div17").lastChild) {
       document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
      }


       document.querySelector(".div17").parentNode.removeChild(document.querySelector(".div17"));

  };

  }else if(size2 === "" && size3 !== "" && size4 === "" && size5 !== ""){

    if(Number.isNaN(size3Num)){

      const sizeFormError3 = document.createElement("p");
      sizeFormError3.classList.add("size-form-error3");
      div6.append(sizeFormError3);
      document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
     } else if(Number.isNaN(size5Num)){

      const sizeFormError3 = document.createElement("p");
      sizeFormError3.classList.add("size-form-error3");
      div6.append(sizeFormError3);
      document.querySelector(".size-form-error3").textContent = "※数値のみ入力してください※";  
     } else{

   // 長さを格納する変数
   let length2 = size3Num;
   let length3 = size5Num;  

   midRect.destroy();
   dashedLine.destroy();

   // 図形の上辺の右端から指定した距離の位置を計算して新しい左の丸い点のX座標を設定
   const newRightCircleX = rectangle.x() + rectangle.width() - length2;
   // 図形の右辺の下端から指定した距離の位置を計算して新しい上の丸い点のX座標を設定
   const newBottomCircleX = rectangle.y() + rectangle.height() - length3;

   // 左の丸い点の座標を更新
   dots[1].x(newRightCircleX);
   layer.draw();

   // 右の丸い点の座標を更新
   dots[0].y(newBottomCircleX);
   layer.draw();

   
     // 丸い点の座標を取得
     const x1 = dots[0].x();
     const y1 = dots[0].y();

     // 丸い点の座標を取得
     const x2 = dots[1].x();
     const y2 = dots[1].y();

     const intersectionX1 = dots[0].x(); 
     const intersectionY1 = dots[1].y();



     const polygon = new Konva.Line({
      points: [x1,y1,intersectionX1,intersectionY1,x2,y2],
      stroke: 'white', // 線の色
      strokeWidth: 2, // 線の太さ
      closed: true, // 閉じた形状として描画
      fill: 'white', // 塗りつぶし色（透明）
    });
    
     layer.add(polygon);
     dots[0].destroy();
     dots[1].destroy();
     layer.draw();

  
     dots.length = 0 ;
     stage.on("click",handleClick2);
     document.querySelector(".rectAngle-confirm9").removeEventListener("click",handleConfirm9);

     while (document.querySelector(".div17").lastChild) {
       document.querySelector(".div17").removeChild(document.querySelector(".div17").lastChild);
      }


       document.querySelector(".div17").parentNode.removeChild(document.querySelector(".div17"));



  };
  };
};