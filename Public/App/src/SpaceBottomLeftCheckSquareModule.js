
module.exports = function bottomLeftCheckSquare(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2,handleConfirm2,length,size3Num,dashedLine5, circle1, circle2,handleConfirm6,check,dashedLine6,newCircle,newRect,handleConfirm11){

  const size4 =document.querySelector(".rectAngle-SizeForm28").value;
  const size5 =document.querySelector(".rectAngle-SizeForm29").value;
  const size4Y = Number.parseFloat(size4);
  const size5Y = Number.parseFloat(size5);
  const size4Num = size4Y /1.06;
  const size5Num = size5Y /1.06;
  

  if(size4 !== "" && size5 === ""){

    //size4Num取得して上に伸ばす処理、現在表示されている四角を、図形の上方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を青色にする。その後whileでフォームを消す

    if(Number.isNaN(size4Num)){
      const sizeFormError5 = document.createElement("p");
      sizeFormError5.classList.add("size-form-error5");
      div22.append(sizeFormError5);
      document.querySelector(".size-form-error5").textContent = "※数値のみ入力してください※";
     } else {

    dashedLine6.destroy();

    // 上に移動させる距離を指定
    const offsetY = -size4Num;

    // 現在の midRect の座標を取得
    const currentX = newRect.x();
    const currentY = newRect.y();

    const circleX1 = newCircle.x();
    const circleY1 = newCircle.y();

    const circleX2 = circle1.x();
    const circleY2 = circle1.y();

    // 新しい座標を計算して設定
    const newX = currentX;
    const newY = currentY + offsetY;

    // midRect の座標を更新
    newRect.position({ x: newX, y: newY });

    //丸い点と四角が垂直に交わる座標
    const intersectionX1 = newCircle.x(); 
    const intersectionY1 = newRect.y()+5;

    //もう一方の丸い点と四角が垂直に交わる座標
    const intersectionX2 = circle1.x(); 
    const intersectionY2 = newRect.y()+5;

    // 四角の真ん中の座標を計算
    const midRectX1 = newRect.x() + newRect.width() / 2;
    const midRectY1 = newRect.y() + newRect.height() / 2;

    const polygon = new Konva.Line({
      points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
      stroke: 'white', // 線の色
      strokeWidth: 2, // 線の太さ
      closed: true, // 閉じた形状として描画
      fill: 'white', // 塗りつぶし色（透明）
    });
    
    layer.add(polygon);

    // レイヤーを再描画
    layer.draw();

    circle1.destroy();
    newRect.destroy();
    newCircle.destroy();

    dots.length = 0 ;

    document.querySelector(".rectAngle-confirm11").removeEventListener("click",handleConfirm11); 
    stage.off("click",handleClick2);

    stage.on("click",handleClick2);

    while (document.querySelector(".div21").lastChild) {
     document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
     console.log("while2");
    };

    document.querySelector(".div21").parentNode.removeChild(document.querySelector(".div21"));


    };

  }else if(size5 !== "" && size4 === ""){

    //size5Num取得して下に縮める処理、現在表示されている四角を、図形の下方向に入力された数値の長さの座標の位置に移動させ、更に、四角と丸い点が垂直に交わる座標位置を２箇所取得し、丸い点の座標、交わる箇所の座標、四角の座標の内側を白色にする。その後whileでフォームを消す

     if(Number.isNaN(size5Num)){
      const sizeFormError6 = document.createElement("p");
      sizeFormError6.classList.add("size-form-error6");
      div22.append(sizeFormError6);
      document.querySelector(".size-form-error6").textContent = "※数値のみ入力してください※";
     } else{

    dashedLine6.destroy();

    // 上に移動させる距離を指定
    const offsetY = size5Num;

    // 現在の midRect の座標を取得
    const currentX = newRect.x();
    const currentY = newRect.y();

    const circleX1 = newCircle.x();
    const circleY1 = newCircle.y();

    const circleX2 = circle1.x();
    const circleY2 = circle1.y();

    // 新しい座標を計算して設定
    const newX = currentX;
    const newY = currentY + offsetY;

    // midRect の座標を更新
    newRect.position({ x: newX, y: newY });

    //丸い点と四角が垂直に交わる座標
    const intersectionX1 = newCircle.x(); 
    const intersectionY1 = newRect.y()+5;

    //もう一方の丸い点と四角が垂直に交わる座標
    const intersectionX2 = circle1.x(); 
    const intersectionY2 = newRect.y()+5;

    // 四角の真ん中の座標を計算
    const midRectX1 = newRect.x() + newRect.width() / 2;
    const midRectY1 = newRect.y() + newRect.height() / 2;

    const polygon = new Konva.Line({
      points: [circleX1, circleY1, intersectionX1, intersectionY1, midRectX1, midRectY1, intersectionX2, intersectionY2, circleX2, circleY2],
      stroke: '#F0BE99', // 線の色
      strokeWidth: 2, // 線の太さ
      closed: true, // 閉じた形状として描画
      fill: '#F0BE99', // 塗りつぶし色（透明）
    });
    
    layer.add(polygon);

    // レイヤーを再描画
    layer.draw();

    circle1.destroy();
    newRect.destroy();
    newCircle.destroy();

    dots.length = 0 ;

    document.querySelector(".rectAngle-confirm11").removeEventListener("click",handleConfirm11); 
    stage.off("click",handleClick2);

    stage.on("click",handleClick2);

    while (document.querySelector(".div21").lastChild) {
     document.querySelector(".div21").removeChild(document.querySelector(".div21").lastChild);
     console.log("while2");
    };

    document.querySelector(".div21").parentNode.removeChild(document.querySelector(".div21"));

    };
  };
};