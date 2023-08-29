
module.exports = function spaceCreate(){

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




const spacecenterInner = document.querySelector('.spacecenter-inner');
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
    container: spacecenterInner,
    width: spacecenterInner.offsetWidth,
    height: spacecenterInner.offsetHeight,
  });
  
  
  layer = new Konva.Layer(); // グローバル変数を使うために、constをletに変更
  stage.add(layer)


  
  let widthValue = 0;
  let heightValue = 0;
  
  // 図形を作成
  const rectangle = new Konva.Rect({
    x: (spacecenterInner.offsetWidth - widthValue) / 2, // spacecenterInnerの中央に配置
    y: (spacecenterInner.offsetHeight - heightValue) / 2, // spacecenterInnerの中央に配置
    width: widthValue, // 適宜調整
    height: heightValue, // 適宜調整
    fill: '#F0BE99', // 適宜調整
    draggable: false,
  });
  
  layer.add(rectangle);
  layer.draw();
  

  const rectAngleSizeForm1 = document.createElement('input');
  rectAngleSizeForm1.type = "text";
  rectAngleSizeForm1.classList.add("rectAngle-SizeForm1");
  rectAngleSizeForm1.placeholder = "お部屋の横幅をcm単位で入力";
  const rectAngleSizeForm2 = document.createElement('input');
  rectAngleSizeForm2.type = "text";
  rectAngleSizeForm2.classList.add("rectAngle-SizeForm2");
  rectAngleSizeForm2.placeholder = "お部屋の縦幅をcm単位で入力";
  const rectAngleConfirm = document.createElement('button');
  rectAngleConfirm.classList.add("rectAngle-confirm");
  rectAngleConfirm.append("決定");
  const div2 = document.createElement("div");
  div2.classList.add("div2");
  const div1 = document.createElement("div");
  div1.classList.add("div1");

  div2.append(rectAngleSizeForm1,rectAngleSizeForm2,rectAngleConfirm);
  div1.append(div2);
  spacecenterInner.append(div1);

  
  
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
      x: (spacecenterInner.offsetWidth - widthValue) / 2, // spacecenterInnerの中央に配置
      y: (spacecenterInner.offsetHeight - heightValue) / 2, // spacecenterInnerの中央に配置
      width: widthValue,
      height: heightValue,
    });
    
    // レイヤーを再描画
    layer.batchDraw();


    const  handleClick  = require('src/SpaceSquareClickModule');

    const handleClick2 = () =>{

     handleClick(stage,dots,rectangle,isMouseOnBorder,layer,dashedLine,drawDashedLine,midRect,spacecenterInner,handleClick2)

    };

    stage.on("click",handleClick2);

    document.querySelector(".rectAngle-confirm").removeEventListener("click",handleConfirm);

    while (document.querySelector(".div1").lastChild) {
      document.querySelector(".div1").removeChild(document.querySelector(".div1").lastChild);
    }

    document.querySelector(".div1").parentNode.removeChild(document.querySelector(".div1"));



    document.querySelector('.space-compbtn').addEventListener('click', spaceComp); 
    
    function spaceComp(){

      const spaceForm = document.querySelector('.space-form');
      const spaceFormValue = spaceForm.value;
      const ul = document.querySelector(".space-list");

      function isDuplicateValuePresent(value, elements) {
        let isDuplicate = false;
        elements.forEach(element => {
          if (element.textContent.trim() === value) {
            isDuplicate = true;
            return;
          }
        });
        return isDuplicate;
      };

  
       if( spaceFormValue === ""){
         const spaceFormError = document.createElement("p");
         spaceFormError.classList.add("space-form-error");
         document.querySelector(".spacecenter-outer").append(spaceFormError);
         document.querySelector(".space-form-error").textContent = "※空間名を入力してください※";
       } else if(spaceFormValue.length >= 6){
        const spaceFormError = document.createElement("p");
        spaceFormError.classList.add("space-form-error");
        document.querySelector(".spacecenter-outer").append(spaceFormError);
        document.querySelector(".space-form-error").textContent = "※５文字以内で指定してください※";
       }  else if (isDuplicateValuePresent(spaceFormValue+"追加"+"取消"+"編集", ul.querySelectorAll("li"))) {
        const spaceFormError = document.createElement("p");
        spaceFormError.classList.add("space-form-error");
        document.querySelector(".spacecenter-outer").append(spaceFormError);
        document.querySelector(".space-form-error").textContent = "※この空間名は既に登録されています※";
       } else {
        

        const sourceLayers = stage.getLayers(); // すべてのレイヤーの配列を取得


        const layerData = {
          layers: [],  // レイヤーの情報を格納する配列
        };
        
        sourceLayers.forEach(layer => {
          const layerInfo = {
            name: layer.name(),  // レイヤーの名前を取得
            children: [],      // 子要素の情報を格納する配列
          };
          
          layer.getChildren().forEach(shape => {
            // 各シェイプの情報を抽出してオブジェクトを作成
            const shapeData = {
              type: shape.getType(),   // シェイプの種類（Rect、Circle など）
              x: shape.x(),
              y: shape.y(),
              // その他の必要なプロパティを追加
            };
            
            layerInfo.children.push(shapeData); // 子要素の情報を配列に追加
          });
        
          layerData.layers.push(layerInfo); // レイヤーの情報を配列に追加
        });
        
        


  const newData = {
    spaceFormValue: spaceFormValue,
    layerData: layerData,
  };

  // /user-data の fetch 処理
fetch('/user-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newData),
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Server response:', data);
    // サーバーからのレスポンスを処理
  })
  .catch(error => {
    console.error('Error:', error);
    // エラー処理
  });

// /get-new-data の fetch 処理
fetch('/get-new-data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const list = document.createElement("li");
    list.textContent = data.spaceFormValue;
    list.classList.add("add-list");
    const addBtn = document.createElement("button");
    addBtn.append("追加");
    addBtn.classList.add("addBtn");
    const cancelBtn = document.createElement("button");
    cancelBtn.append("取消");
    cancelBtn.classList.add("cancelBtn");
    const editBtn = document.createElement("button");
    editBtn.append("編集");
    editBtn.classList.add("editBtn");
    const btnBox = document.createElement("div");
    btnBox.classList.add("btn-box");
    btnBox.append(addBtn,cancelBtn,editBtn);
    list.append(btnBox);
    document.querySelector('.space-list').append(list);
  })
  .catch(error => {
    console.error('Error getting new data:', error);
    // エラー処理
  });

  layer.destroy();
  spaceForm.value = "";
  const errorElement = document.querySelector(".space-form-error");
  if (errorElement && errorElement.textContent !== "") {
      errorElement.textContent = "";
  }  

  document.querySelector('.space-compbtn').removeEventListener('click', spaceComp);
        
        
        
        
        

        


        
  
  
       };
    
  
  
    };
  
   
    }
  

  };


};
