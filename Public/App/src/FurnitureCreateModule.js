
module.exports = function furnitureCreate(){

 // 破線の間隔と破線の長さを設定
const dashInterval = 10;
const dashLength = 5;
const dashColor = 'red';

// 2つの丸い点の間に破線（実線）を描画する関数
function drawDashedLine(startX, startY, endX, endY) {
  const dashedLine = new Konva.Line({
    points: [startX, startY, endX, endY],
    stroke: dashColor,
    strokeWidth: 2,
    dash: [dashLength, dashInterval],
  });

  return dashedLine;
}




const furniturecenterInner = document.querySelector('.furniturecenter-inner');
let layer; // レイヤーをグローバル変数として定義



// マウスの座標が図形の上辺、左辺、下辺、右辺のいずれかに乗っているかを判定する関数
function isMouseOnBorder(rectangle, x, y) {
  const borderSize = 5; // ボーダーと判定する幅
  const outline = rectangle.getClientRect();
  const centerX = outline.x + outline.width / 2;
  const centerY = outline.y + outline.height / 2;

  // 上辺の判定
  if (x >= outline.x && x <= outline.x + outline.width &&
      y >= outline.y - borderSize && y <= outline.y + borderSize) {
    return 'top';
  }
  // 左辺の判定
  if (x >= outline.x - borderSize && x <= outline.x + borderSize &&
      y >= outline.y && y <= outline.y + outline.height) {
    return 'left';
  }
  // 下辺の判定
  if (x >= outline.x && x <= outline.x + outline.width &&
      y >= outline.y + outline.height - borderSize && y <= outline.y + outline.height + borderSize) {
    return 'bottom';
  }
  // 右辺の判定
  if (x >= outline.x + outline.width - borderSize && x <= outline.x + outline.width + borderSize &&
      y >= outline.y && y <= outline.y + outline.height) {
    return 'right';
  }

  return null;
}

      // 丸い点を格納する配列
      const dots = [];
      let dashedLine = null; // 破線を格納する変数
      let isDashedLineVisible = false; // 破線の表示状態
      
      // 破線の真ん中に四角を格納する変数
      let midRect = null;

  dots.length = 0 ;


  const stage = new Konva.Stage({
    container: furniturecenterInner,
    width: furniturecenterInner.offsetWidth,
    height: furniturecenterInner.offsetHeight,
  });
  
  
  layer = new Konva.Layer(); // グローバル変数を使うために、constをletに変更
  stage.add(layer)
  
  let widthValue = 0;
  let heightValue = 0;
  
  // 図形を作成
  const rectangle = new Konva.Rect({
    x: (furniturecenterInner.offsetWidth - widthValue) / 2, // furniturecenterInnerの中央に配置
    y: (furniturecenterInner.offsetHeight - heightValue) / 2, // furniturecenterInnerの中央に配置
    width: widthValue, // 適宜調整
    height: heightValue, // 適宜調整
    fill: '#8b4513', // 適宜調整
    draggable: false,
  });
  
  layer.add(rectangle);
  layer.draw();
  

  const rectAngleSizeForm1 = document.createElement('input');
  rectAngleSizeForm1.type = "text";
  rectAngleSizeForm1.classList.add("rectAngle-SizeForm1");
  rectAngleSizeForm1.placeholder = "家具の横幅をcm単位で入力";
  const rectAngleSizeForm2 = document.createElement('input');
  rectAngleSizeForm2.type = "text";
  rectAngleSizeForm2.classList.add("rectAngle-SizeForm2");
  rectAngleSizeForm2.placeholder = "家具の縦幅をcm単位で入力";
  const rectAngleConfirm = document.createElement('button');
  rectAngleConfirm.classList.add("rectAngle-confirm");
  rectAngleConfirm.append("決定");
  const div2 = document.createElement("div");
  div2.classList.add("div2");
  const div1 = document.createElement("div");
  div1.classList.add("div1");

  div2.append(rectAngleSizeForm1,rectAngleSizeForm2,rectAngleConfirm);
  div1.append(div2);
  furniturecenterInner.append(div1);

  
  
  document.querySelector(".rectAngle-confirm").addEventListener("click",handleConfirm);
  
  function handleConfirm(){

    const size1 =document.querySelector(".rectAngle-SizeForm1").value;
    const size2 =document.querySelector(".rectAngle-SizeForm2").value;
    const sizeY = Number.parseFloat(size1);
    const sizeX = Number.parseFloat(size2);
    const size1Num = sizeY /1.06;
    const size2Num = sizeX /1.06;
    console.log(size1Num)

    if(Number.isNaN(size1Num) && Number.isNaN(size2Num)){
     const sizeFormError = document.createElement("p");
     sizeFormError.classList.add("size-form-error");
     div2.append(sizeFormError);
     document.querySelector(".size-form-error").textContent = "※数値のみ入力してください※";

    } else{

    widthValue = size1Num;
    heightValue = size2Num;

    rectangle.setAttrs({
      x: (furniturecenterInner.offsetWidth - widthValue) / 2, // furniturecenterInnerの中央に配置
      y: (furniturecenterInner.offsetHeight - heightValue) / 2, // furniturecenterInnerの中央に配置
      width: widthValue,
      height: heightValue,
    });
    
    // レイヤーを再描画
    layer.batchDraw();


    const  handleClick  = require('src/FurnitureSquareClickModule');

    const handleClick2 = () =>{

     handleClick(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,furniturecenterInner,handleClick2)

    };

    stage.on("click",handleClick2);

    document.querySelector(".rectAngle-confirm").removeEventListener("click",handleConfirm);

    while (document.querySelector(".div1").lastChild) {
      document.querySelector(".div1").removeChild(document.querySelector(".div1").lastChild);
    }

    document.querySelector(".div1").parentNode.removeChild(document.querySelector(".div1"));



  
   
    }
  

  };

};
