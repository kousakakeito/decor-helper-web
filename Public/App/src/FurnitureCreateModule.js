
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


    document.querySelector('.furniture-addbtn').addEventListener('click', furnitureAdd);
    
    function furnitureAdd(){

      const furnitureForm = document.querySelector('.furniture-form');
      const genreForm = document.querySelector('.genre-form');
      const furnitureFormValue = furnitureForm.value;
      const genreFormValue = genreForm.value;
      const ul = document.querySelector(".furniture-addlist");

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

  
       if( furnitureFormValue === ""){
         const furnitureFormError = document.createElement("p");
         furnitureFormError.classList.add("furniture-form-error");
         document.querySelector(".furniturecenter-outer").append(furnitureFormError);
         document.querySelector(".furniture-form-error").textContent = "※家具名を入力してください※";
       } else if(furnitureFormValue.length >= 6){
        const furnitureFormError = document.createElement("p");
        furnitureFormError.classList.add("furniture-form-error");
        document.querySelector(".furniturecenter-outer").append(furnitureFormError);
        document.querySelector(".furniture-form-error").textContent = "※５文字以内で指定してください※";
       }  else if (isDuplicateValuePresent("家具名:"+furnitureFormValue+"削除", ul.querySelectorAll("li"))) {
        const furnitureFormError = document.createElement("p");
        furnitureFormError.classList.add("furniture-form-error");
        document.querySelector(".furniturecenter-outer").append(furnitureFormError);
        document.querySelector(".furniture-form-error").textContent = "※この家具名は既に追加されています※";
        } else if( genreFormValue === ""){
          const furnitureFormError = document.createElement("p");
          furnitureFormError.classList.add("furniture-form-error");
          document.querySelector(".furniturecenter-outer").append(furnitureFormError);
          document.querySelector(".furniture-form-error").textContent = "※ジャンル名を入力してください※";
        } else if(genreFormValue.length >= 6){
         const furnitureFormError = document.createElement("p");
         furnitureFormError.classList.add("furniture-form-error");
         document.querySelector(".furniturecenter-outer").append(furnitureFormError);
         document.querySelector(".furniture-form-error").textContent = "※５文字以内で指定してください※";
       } else {

        const sourceLayers = stage.getLayers(); // すべてのレイヤーの配列を取得


        const layerData = {
          layers: [],  // レイヤーの情報を格納する配列
        };
        
        sourceLayers.forEach(layer => {
          const layerInfo = {
            name: furnitureFormValue,  // レイヤーの名前を取得
            children: [],      // 子要素の情報を格納する配列
          };

          function getShapeType(shape) {
            if (shape instanceof Konva.Rect) {
              return "Rect";
            } else if (shape instanceof Konva.Line) {
              return "Line";
            } 
          };
          
          layer.getChildren().forEach(shape => {
            const shapeType = getShapeType(shape);
            if (shapeType === "Rect") {
            const rectData = {
              type: shape.getType(),   // シェイプの種類（Rect、Circle など）
              x: shape.x(),
              y: shape.y(),
              width: shape.width(),
              height: shape.height(),
              fill: shape.fill(),    
            };
            layerInfo.children.push(rectData); // 子要素の情報を配列に追加
          }

          if (shapeType === "Line") {
            const lineData = {
              type: shape.getType(),   // シェイプの種類（Rect、Circle など）
              points: shape.points(),
              stroke: shape.stroke(), // 線の色
              strokeWidth: shape.strokeWidth(), // 線の太さ
              closed: shape.closed(), // 閉じた形状として描画
              fill: shape.fill(),    
            };
            layerInfo.children.push(lineData); // 子要素の情報を配列に追加
          }
            
            
          });
        
          layerData.layers.push(layerInfo); // レイヤーの情報を配列に追加
        });
        
        


  const newData = {
    furnitureFormValue: furnitureFormValue,
    genreFormValue: genreFormValue,
    layerData: layerData,
  };

    // /user-data の fetch 処理
fetch('/user-data2', {
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


  fetch('/get-new-data2')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const list = document.createElement("li");
    list.classList.add("add-list");
    const furnitureTextNode = document.createTextNode("家具名:" + furnitureFormValue);
    list.append(furnitureTextNode);
    const deleteBtn = document.createElement("button");
    deleteBtn.append("削除");
    deleteBtn.classList.add("deleteBtn");
    const btnBox = document.createElement("div");
    btnBox.classList.add("btn-box2");
    btnBox.append(deleteBtn);
    list.append(btnBox);
    document.querySelector('.furniture-addlist').append(list);
  })
  .catch(error => {
    console.error('Error getting new data:', error);
    // エラー処理
  });


  layer.destroy();
  furnitureForm.value = "";
  genreForm.value = "";
  const errorElement = document.querySelector(".furniture-form-error");
  if (errorElement && errorElement.textContent !== "") {
      errorElement.textContent = "";
  }  

  document.querySelector('.furniture-addbtn').removeEventListener('click', furnitureAdd);

       };

       ul.addEventListener("click", event => {
        if (event.target.classList.contains("deleteBtn")) {
    
          const liElement = event.target.closest("li");
          const text = liElement.firstChild.textContent.trim();
          const parts = text.split(':'); // "："(コロン)を区切り文字として文字列を分割

          
          console.log(parts.length); 

          if (parts.length === 2) {

           const furnitureName = parts[1].trim(); 
           console.log(furnitureName); 

 

           if (liElement && ul.contains(liElement)) {
            // 存在する場合、liElement を削除
            ul.removeChild(liElement);
          }


          fetch('/user-data3', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({furnitureName}),
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

          };
      
          } 
      });

    };

    document.querySelector('.furniture-compbtn').addEventListener('click', furnitureComp);
    
    function furnitureComp(){

      const ul = document.querySelector('.furniture-addlist'); // あなたのul要素の適切なセレクタを使用して取得します
      const liElements = ul.querySelectorAll('li');

      if (liElements.length > 0) {

        fetch('/user-data4', {
          method: 'POST', // または 'GET' など、HTTPメソッドを選択
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
            const ul = document.querySelector('.furniture-list');
            ul.innerHTML = ''; // リストをクリア
        
            data.forEach(furnitureFormValues => {
              const li = document.createElement('li');
              li.textContent = furnitureFormValues;
              li.classList.add("add-list2");
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
              li.append(btnBox);
              ul.appendChild(li);
            });

            while (document.querySelector('.furniture-addlist').firstChild) {
              document.querySelector('.furniture-addlist').removeChild(document.querySelector('.furniture-addlist').firstChild);
            }
          })
          .catch(error => {
            console.error('Error:', error);
            // エラー処理
          });

          fetch('/user-data5', {
            method: 'POST', 
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
              const ol = document.querySelector('.genre-dropdown');
              ol.innerHTML = ''; // リストをクリア
          
              // データから重複を削除
              const uniqueGenreFormValues = [...new Set(data)];

              
              uniqueGenreFormValues.forEach(genreFormValue => {
               const li = document.createElement('li');
               const label = document.createElement('label');
               label.classList.add("li-label");
               label.textContent = genreFormValue;
               const check = document.createElement("input");
               check.type = "checkbox";
               check.name = "check";
               li.append(check, label);
               ol.appendChild(li);
              });


              let check = document.querySelectorAll('[name=check]');
              const genreDropdown = document.querySelector('.genre-dropdown');
              
              genreDropdown.addEventListener('click', function (event) {
                  const target = event.target.closest('li');
                  
                  if (target) {
                      const checkbox = target.querySelector('[name="check"]');
                      
                      if (checkbox) {
                          if (checkbox.checked) {
                            if (target.textContent === "全て表示") {
                              fetch('/user-data7', {
                                method: 'POST', 
                              })
                                .then(response => {
                                  if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                  }
                                  return response.json();
                                })
                                .then(data => {

                                  setTimeout(() => {

                                  const ul = document.querySelector('.furniture-list');
                                 
                                  console.log(data);
                                  // dataをulに追加
                                  data.forEach(item => {
                                    
                                    const newlist = document.createElement('li');
                                    newlist.textContent = item;
                                    newlist.classList.add("add-list2");
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
                                    newlist.append(btnBox);
                                    ul.appendChild(newlist);
                                  });
                                },350);
                                });

                            };
                              check.forEach((checkbox) => {
                                  checkbox.checked = false;
                              });
                              checkbox.checked = true;
                              const checkText = target.textContent;
                              setTimeout(() => {
                                  genreDropdown.classList.remove('is-open');
                                  document.querySelector('.caret-down').innerHTML = '<i class="fa-solid fa-caret-down"></i>';
                                  target.remove();
              
                                  const genreText = document.querySelector('.genre-checktext').textContent;
                                  document.querySelector('.genre-checktext').textContent = '';
                                  document.querySelector('.genre-checktext').textContent = checkText;
              
                                  const list = document.createElement('li');
                                  const label = document.createElement('label');
                                  label.classList.add('li-label');
                                  label.textContent = genreText;
                                  const newCheckbox = document.createElement('input');
                                  newCheckbox.type = 'checkbox';
                                  newCheckbox.name = 'check';
                                  list.append(newCheckbox, label);
                                  ol.appendChild(list);
              
                                  check = document.querySelectorAll('[name=check]');

                                  fetch('/user-data6', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ checkText }),
                                })
                                .then(response => response.json())
                                .then(data => {
                                    const ul = document.querySelector('.furniture-list');
                                    ul.innerHTML = ''; 
                                    
                                    // dataをulに追加
                                    data.forEach(item => {
                                      
                                      const newlist = document.createElement('li');
                                      newlist.textContent = item;
                                      newlist.classList.add("add-list2");
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
                                      newlist.append(btnBox);
                                      ul.appendChild(newlist);
                                    });
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                              }, 300);
                          }
                      }
                  }
              });
              
            })
            .catch(error => {
              console.error('Error:', error);
              // エラー処理
            });
        
        
        

          

 
      } else {
        const furnitureFormError = document.createElement("p");
        furnitureFormError.classList.add("furniture-form-error");
        document.querySelector(".furniturecenter-outer").append(furnitureFormError);
        document.querySelector(".furniture-form-error").textContent = "※家具を追加後に保存をクリックしてください※";
      
      }

    };


  
   
    }
  

  };

};
