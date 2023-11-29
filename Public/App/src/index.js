
const contentHome = document.querySelector('#content-home');
const contentSpace = document.querySelector('#content-space');
const contentFurniture = document.querySelector('#content-furniture');
const contentHelp = document.querySelector('#content-help');
const contentPrint = document.querySelector('#content-print');
const contentPhoto = document.querySelector('#content-photo');
const contentInquiry = document.querySelector('#content-inquiry');


// セッション情報を取得してユーザー名を表示する関数
function getSessionData() {
  fetch('/get-session')
    .then(response => response.json())
    .then(data => {
      
      const username = data.username;
      console.log(username);
      const userNameElement = document.querySelector('.user-name');
      userNameElement.textContent = `${username}`;
    })
    .catch(error => {
      console.error('エラー:', error);
    });
}

// ページがロードされたときにセッション情報を取得して表示する
window.addEventListener('load', getSessionData);

// ログアウトボタンをクリックしたときの処理
const logoutButton = document.querySelector('#logout-button');
logoutButton.addEventListener('click', () => {
  // サーバーにログアウトリクエストを送信
  fetch('/logout', {
    method: 'POST',
    credentials: 'same-origin', 
  })
    .then((response) => {
      if (response.ok) {
        // ログアウトに成功した場合はログイン画面にリダイレクト
        window.location.href = '/index.html'; 
      } else {
        console.error('Logout failed');
      }
    })
    .catch((error) => {
      console.error('Error during logout:', error);
    });
});




// モーダルメニューのコンテンツを非表示にする関数
function hideModalContent() {
  contentPrint.style.display = 'none';
  contentPhoto.style.display = 'none';
  contentInquiry.style.display = 'none';
}

// すべてのコンテンツを非表示にする関数
function hideAllContent() {
  contentHome.style.display = 'none';
  contentSpace.style.display = 'none';
  contentFurniture.style.display = 'none';
  contentHelp.style.display = 'none';
  hideModalContent();
  // content-print, content-photo, content-inquiryも非表示にする
  contentPrint.style.display = 'none';
  contentPhoto.style.display = 'none';
  contentInquiry.style.display = 'none';
}

// ロード時にcontent-homeのみを表示
hideAllContent();
contentHome.style.display = 'block';

function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

// タブ切り替えのイベントリスナーを設定
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  
   // すべてのタブからactiveクラスを削除
 tabs.forEach(t => t.classList.remove('active'));
 const homeTab = document.querySelector('[data-target="content-home"]');
 homeTab.classList.add('active');

  tab.addEventListener('click', () => {

     // クリックされたタブのdata-color属性から背景色を取得
    const color = tab.getAttribute('data-color');
    // 背景色を変更する関数を呼び出す
    changeBackgroundColor(color);
    

    // すべてのタブの色を元に戻す
    tabs.forEach(t => t.classList.remove('active'));

    // クリックされたタブに色を付ける
    tab.classList.add('active');

    // クリックされたタブに対応するコンテンツを取得
    const targetContent = tab.getAttribute('data-target');
    const content = document.querySelector(`#${targetContent}`);

    // タブが既にアクティブ（表示中）の場合は何もしない
    if (content.style.display === 'block') {
      return;
    }
    

    // すべてのコンテンツを非表示にする
    hideAllContent();

    // クリックされたタブに対応するコンテンツを表示する
    content.style.display = 'block';
  });
});

// 設定タブのドロップダウンメニューの表示・非表示を切り替える
const dropdownTab = document.querySelector('.tab-dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
let dropdownOpen = false; // ドロップダウンメニューが開いているかのフラグ


// ドロップダウンメニューをクリックしてもメニューが開かないようにする
dropdownTab.addEventListener('click', (event) => {

  event.stopPropagation(); // クリックイベントが親要素に伝搬しないようにする
  dropdownMenu.style.display = dropdownOpen ? 'none' : 'flex'; // displayをflexに変更
  dropdownOpen = !dropdownOpen;
  
});

// ドロップダウンメニュー以外の場所をクリックしたらメニューを閉じる
document.addEventListener('click', (event) => {
  if (!dropdownTab.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.style.display = 'none';
    dropdownOpen = false;
  }
});

// ドロップダウンメニューの中の各メニューのクリックイベントを設定
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    
    // クリックされたドロップダウンメニューに対応するコンテンツを表示する
    const targetContent = item.getAttribute('data-target');
    const color = item.getAttribute('data-color');
    const content = document.querySelector(`#${targetContent}`);
    

    // すでに表示されているコンテンツの場合は非表示にしない
    if (content.style.display !== 'block') {
      // すべてのコンテンツを非表示にする
      hideAllContent();
      changeBackgroundColor(color);

      // クリックされたコンテンツを表示する
      content.style.display = 'block';
    }


    

    // ドロップダウンメニューを非表示にする
    dropdownMenu.style.display = 'none';
    dropdownOpen = false;
  });

  // ドロップダウンメニューの文字をクリックしたらドロップダウンメニューを閉じる
  item.addEventListener('click', (event) => {
    event.stopPropagation(); // クリックイベントが親要素に伝搬しないようにする
    dropdownMenu.style.display = 'none';
    dropdownOpen = false;
  });
});


let n = 1;
document.querySelector('.caret-down')
  .addEventListener('click', function() {
    document.querySelector('.genre-dropdown').classList.toggle('is-open');

    if (n === 0 && document.querySelector('.caret-down').innerHTML === '<i class="fa-solid fa-caret-up"></i>') {
      document.querySelector('.caret-down').innerHTML = '<i class="fa-solid fa-caret-down"></i>'; // メニューが閉じている時のアイコン
      n++;
    } else if(n === 0 && document.querySelector('.caret-down').innerHTML === '<i class="fa-solid fa-caret-down"></i>'){

      console.log("ok")
      document.querySelector('.caret-down').innerHTML = '<i class="fa-solid fa-caret-up"></i>'; // メニューが開いた時のアイコン
      n = 0;

    } else {
      document.querySelector('.caret-down').innerHTML = '<i class="fa-solid fa-caret-up"></i>'; // メニューが開いた時のアイコン
      n--;
    }
  });









 // 空間新規作成ボタンがクリックされたときの処理
  const spaceCreate  = require('src/SpaceCreateModule');

  const spaceCreateBtn = document.querySelector('.space-createbtn');
  spaceCreateBtn.addEventListener('click', spaceCreate);

 // 家具新規作成ボタンがクリックされたときの処理
  const furnitureCreate  = require('src/FurnitureCreateModule');

  const furnitureCreateBtn = document.querySelector('.furniture-createbtn');
  furnitureCreateBtn.addEventListener('click', furnitureCreate);


  const homecenterInner = document.querySelector('.homecenter-inner');    
  console.log(homecenterInner.offsetWidth, homecenterInner.offsetHeight);

  const stage2 = new Konva.Stage({
    container: homecenterInner,
    width: homecenterInner.offsetWidth,
    height: homecenterInner.offsetHeight,
  });

  console.log(stage2.width(), stage2.height());

  const spaceList = document.querySelector(".space-list");
  


  spaceList.addEventListener("click", event => {
    if (event.target.classList.contains("addBtn")) {
      if (stage2.getChildren().length === 0) {

      const liElement = event.target.closest("li");
      const spaceFormValue = liElement.firstChild.textContent.trim();
      const requestData = {
          spaceFormValue: spaceFormValue
      };
        
        fetch('/get-layer-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(layerData => {
        
          // レイヤーごとに新しい Layer を作成
          layerData.layerData.layers.forEach(layerInfo => {
            const newLayer = new Konva.Layer({
              name: layerInfo.name, 
          });
            
            layerInfo.children.forEach(shapeData => {
                // shapeData から必要な情報を取得して図形を作成
                const rect = new Konva.Rect({
                  x: (homecenterInner.offsetWidth - shapeData.width) / 2, 
                  y: (homecenterInner.offsetHeight - shapeData.height) / 2,
                  width: shapeData.width,
                  height: shapeData.height,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });

                const line = new Konva.Line({
                  points: shapeData.points,
                  stroke: shapeData.stroke, 
                  strokeWidth: shapeData.strokeWidth, 
                  closed: shapeData.closed,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });

                const shape = new Konva.Shape({
                  sceneFunc: function (context, shape) {
                    const clear = shapeData.clear;
                    shape.clear = clear;
                    const clearLine1 = shapeData.clearLine1;
                    const clearLine2 = shapeData.clearLine2;
                    const clearLine3 = shapeData.clearLine3;
                    shape.clearLine1 = clearLine1;
                    shape.clearLine2 = clearLine2;
                    shape.clearLine3 = clearLine3;
                    layerInfo.children.forEach(child => {
                      if (child.clear) {

                        context.clearRect(...child.clear);
                      }
                      if (child.clearLine1||child.clearLine2||child.clearLine3){

                        context.beginPath();
                        context.moveTo(...child.clearLine1);
                        context.lineTo(...child.clearLine2);
                        context.lineTo(...child.clearLine3);
                        context.closePath();
                    
                        // 三角形のパスをクリアする
                        context.globalCompositeOperation = 'destination-out';
                        context.fill();
                        context.globalCompositeOperation = 'source-over';
                      }
                    });

                    
                  },
                });


                console.log(rect);
                newLayer.add(line);
                newLayer.add(rect);
                newLayer.add(shape);
                newLayer.draw();
              
              // 他の図形タイプに対する処理も同様に追加可能
            });
            
            stage2.add(newLayer); // 新しいレイヤーを stage2 に追加

        
            stage2.draw();

  
            // 描画が完了した後の処理を行う
            newLayer.on('draw', function () {
              console.log('レイヤーの描画が完了しました。');
             
            });
          });

          const errorElement = document.querySelector(".space-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
    
        })

        .catch(error => {
            console.error('Error:', error);
        });

      } else {
        const spaceFormError = document.createElement("p");
         spaceFormError.classList.add("space-form-error");
         document.querySelector(".homecenter-outer").append(spaceFormError);
         document.querySelector(".space-form-error").textContent = "※既に空間が追加されています。新たに空間を追加する場合は追加済みの空間を取消してください※";
      }
        
      } else if (event.target.classList.contains("cancelBtn")) {
        // 削除ボタンをクリックした場合の処理
        const liElement = event.target.closest("li");
        const spaceFormValue = liElement.firstChild.textContent.trim();

    
        // 削除対象のレイヤーを特定
        const layerToRemove = stage2.find(node => node.name() === spaceFormValue)[0];

        console.log('spaceFormValue:', spaceFormValue);
        console.log('すべてのステージの子要素:', stage2.children);
        console.log('削除するレイヤー:', layerToRemove);
        console.log("layerToRemoveの名前:",layerToRemove.name());
        
        if (layerToRemove instanceof Konva.Layer) {
          layerToRemove.destroy();
          stage2.getChildren().forEach(function(layer) {
            if (layer instanceof Konva.Layer) {
              layer.destroy();
            }
          });

          const errorElement = document.querySelector(".space-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
        } else {
          console.log('対象のレイヤーが見つかりませんでした。');
        }

      }
  });

 


  spaceList.addEventListener("click", event => {
    if (event.target.classList.contains("deleteBtn")||event.target.classList.contains("fa-trash-can")) {

      const liElement = event.target.closest("li");
      const spaceFormValue = liElement.firstChild.textContent.trim();


       if (liElement && spaceList.contains(liElement)) {
        // 存在する場合、liElement を削除
        spaceList.removeChild(liElement);

        const layerToRemove = stage2.find(node => node.name() === spaceFormValue)[0];

        if(layerToRemove instanceof Konva.Layer){
          layerToRemove.destroy();
        }
      }

      fetch('/delete-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({spaceFormValue}),
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
  
      
  });


  const furnitureList = document.querySelector(".furniture-list");


  furnitureList.addEventListener("click", event => {
    if (event.target.classList.contains("deleteBtn")||event.target.classList.contains("fa-trash-can")) {

      const liElement = event.target.closest("li");
      const furnitureFormValue = liElement.firstChild.textContent.trim();


       if (liElement && furnitureList.contains(liElement)) {
        // 存在する場合、liElement を削除
        furnitureList.removeChild(liElement);

        const layerToRemove = stage2.find(node => node.name() === furnitureFormValue)[0];

        if(layerToRemove instanceof Konva.Layer){
          layerToRemove.destroy();
        }

      }

      fetch('/delete-data2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({furnitureFormValue}),
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
  
      
  });





  furnitureList.addEventListener("click", event => {
    if (event.target.classList.contains("addBtn")) {
      if (stage2.getChildren().length > 0) {

      const liElement = event.target.closest("li");
      const furnitureFormValue = liElement.firstChild.textContent.trim();
      const requestData = {
        furnitureFormValue: furnitureFormValue
      };
        
        fetch('/get-layer-data2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(layerData => {
        
          // レイヤーごとに新しい Layer を作成
          layerData.layerData.layers.forEach(layerInfo => {
            const newLayer = new Konva.Layer({
              name: layerInfo.name, 
              draggable: true,
          });
            
            layerInfo.children.forEach(shapeData => {
                // shapeData から必要な情報を取得して図形を作成
                const rect = new Konva.Rect({
                  x: (homecenterInner.offsetWidth - shapeData.width) / 2, 
                  y: (homecenterInner.offsetHeight - shapeData.height) / 2,
                  width: shapeData.width,
                  height: shapeData.height,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });

                const line = new Konva.Line({
                  points: shapeData.points,
                  stroke: shapeData.stroke, 
                  strokeWidth: shapeData.strokeWidth, 
                  closed: shapeData.closed,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });

    
               
                console.log(layerInfo);
                
                const shape = new Konva.Shape({
                  sceneFunc: function (context, shape) {
                    const clear = shapeData.clear;
                    shape.clear = clear;
                    const clearLine1 = shapeData.clearLine1;
                    const clearLine2 = shapeData.clearLine2;
                    const clearLine3 = shapeData.clearLine3;
                    shape.clearLine1 = clearLine1;
                    shape.clearLine2 = clearLine2;
                    shape.clearLine3 = clearLine3;
                    layerInfo.children.forEach(child => {
                      if (child.clear) {
                        context.clearRect(...child.clear);
                      }
                      if (child.clearLine1||child.clearLine2||child.clearLine3){

                        context.beginPath();
                        context.moveTo(...child.clearLine1);
                        context.lineTo(...child.clearLine2);
                        context.lineTo(...child.clearLine3);
                        context.closePath();
                    
                        // 三角形のパスをクリアする
                        context.globalCompositeOperation = 'destination-out';
                        context.fill();
                        context.globalCompositeOperation = 'source-over';
                      }
                    });
                  },
                });
                
                
                
                

                
                

                console.log(rect);
                newLayer.add(line);
                newLayer.add(rect);
                newLayer.add(shape);
                newLayer.draw();
 

                
              
              // 他の図形タイプに対する処理も同様に追加可能
            });
            

            stage2.add(newLayer); // 新しいレイヤーを stage2 に追加
            stage2.draw();
      

  
            // 描画が完了した後の処理を行う
            newLayer.on('draw', function () {
              console.log('レイヤーの描画が完了しました。');
             
            });
          });

          const errorElement = document.querySelector(".space-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
    
        })
        
        
        
        .catch(error => {
            console.error('Error:', error);
        });

      } else {
        const spaceFormError = document.createElement("p");
         spaceFormError.classList.add("space-form-error");
         document.querySelector(".homecenter-outer").append(spaceFormError);
         document.querySelector(".space-form-error").textContent = "※空間一覧内から空間を追加後に家具一覧内の家具を追加してください※";
      }
        
      } else if (event.target.classList.contains("cancelBtn")) {
        // 削除ボタンをクリックした場合の処理
        const liElement = event.target.closest("li");
        const furnitureFormValue = liElement.firstChild.textContent.trim();

    
        // 削除対象のレイヤーを特定
        const layerToRemove = stage2.find(node => node.name() === furnitureFormValue)[0];

        console.log('furnitureFormValue:', furnitureFormValue);
        console.log('すべてのステージの子要素:', stage2.children);
        console.log('削除するレイヤー:', layerToRemove);
        
        
        if (layerToRemove instanceof Konva.Layer) {
          layerToRemove.destroy();
          const errorElement = document.querySelector(".space-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
        } else {
          console.log('対象のレイヤーが見つかりませんでした。');
        }
      }
  });

  document.querySelector(".home-compbtn").addEventListener("click",function(){
    

    const homeForm = document.querySelector('.home-form');
    const homeFormValue = homeForm.value;
    const ul = document.querySelector(".home-addlist");

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

    if( homeFormValue === ""){
      const homeFormError = document.createElement("p");
      homeFormError.classList.add("home-form-error");
      document.querySelector(".homecenter-outer").append(homeFormError);
      document.querySelector(".home-form-error").textContent = "※配置図名を入力してください※";
    } else if(homeFormValue.length >= 6){
     const homeFormError = document.createElement("p");
     homeFormError.classList.add("home-form-error");
     document.querySelector(".homecenter-outer").append(homeFormError);
     document.querySelector(".home-form-error").textContent = "※５文字以内で指定してください※";
    }  else if (isDuplicateValuePresent(homeFormValue+"編集"+"取消", ul.querySelectorAll("li"))) {
     const homeFormError = document.createElement("p");
     homeFormError.classList.add("home-form-error");
     document.querySelector(".homecenter-outer").append(homeFormError);
     document.querySelector(".home-form-error").textContent = "※この配置図名は既に追加されています※";
     } else if(stage2.getChildren().length < 2){
       const homeFormError = document.createElement("p");
       homeFormError.classList.add("home-form-error");
       document.querySelector(".homecenter-outer").append(homeFormError);
       document.querySelector(".home-form-error").textContent = "※家具が配置されていません※";
    } else {

      const sourceLayers = stage2.getLayers(); // すべてのレイヤーの配列を取得



      const layerData = {
        layers: [],  // レイヤーの情報を格納する配列
      };
      
      sourceLayers.forEach(layer => {
        const layerInfo = {
          name: homeFormValue,  // レイヤーの名前を取得
          children: [],      // 子要素の情報を格納する配列
        };

        function getShapeType(shape) {
          if (shape instanceof Konva.Rect) {
            return "Rect";
          } else if (shape instanceof Konva.Line) {
            return "Line";
          } else if (shape instanceof Konva.Shape) {
            return "Shape";
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
            absolutePositionRect: shape.getAbsolutePosition(),
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
            absolutePositionLine: shape.getAbsolutePosition(),
          };
          layerInfo.children.push(lineData); // 子要素の情報を配列に追加
        }




        if (shapeType === "Shape") {
          const shapeData = {
            type: shape.getType(),
            clear: shape.clear,
            clearLine1 : shape.clearLine1,
            clearLine2 : shape.clearLine2,
            clearLine3 : shape.clearLine3,
            absolutePositionShape: shape.getAbsolutePosition(),
          };
          layerInfo.children.push(shapeData);
        }

        console.log(shape.clear);
          
          
        });
      
        layerData.layers.push(layerInfo); // レイヤーの情報を配列に追加
      });
      
      


const newData = {
  homeFormValue: homeFormValue,
  layerData: layerData,
};

  // /user-data の fetch 処理
fetch('/user-data8', {
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


fetch('/get-new-data8')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  const list = document.createElement("li");
  list.classList.add("add-list");
  list.append(homeFormValue);
  const editBtn = document.createElement("button");
  editBtn.append("編集");
  editBtn.classList.add("editBtn2");
  const cancelBtn = document.createElement("button");
  cancelBtn.append("取消");
  cancelBtn.classList.add("cancelBtn2");
  const deleteBtn = document.createElement("button");
  const trash = document.createElement("i");
  trash.classList.add("fa-solid")
  trash.classList.add("fa-trash-can")
  deleteBtn.append(trash);
  deleteBtn.classList.add("deleteBtn2");
  const btnBox = document.createElement("div");
  btnBox.classList.add("btn-box");
  btnBox.append(editBtn,cancelBtn,deleteBtn);
  list.append(btnBox);
  document.querySelector('.home-addlist').append(list);
})
.catch(error => {
  console.error('Error getting new data:', error);
  // エラー処理
});








fetch('/get-new-data9')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  const list = document.createElement("li");
  list.classList.add("add-list4");
  list.append(homeFormValue);
  const addBtn = document.createElement("button");
  addBtn.append("表示");
  addBtn.classList.add("addBtn2");
  const cancelBtn = document.createElement("button");
  cancelBtn.append("取消");
  cancelBtn.classList.add("cancelBtn3");
  const btnBox = document.createElement("div");
  btnBox.classList.add("btn-box");
  btnBox.append(addBtn,cancelBtn);
  list.append(btnBox);
  document.querySelector('.photo-addlist').append(list);
})
.catch(error => {
  console.error('Error getting new data:', error);
  // エラー処理
});




// stage2.getChildren().forEach(layer => {layer.destroy()}) 左に記載している処理だとstage2に追加した順番でのレイヤー配列のインデックス番号が偶数のレイヤーだけが削除され奇数のインデックス番号のレイヤーのみ削除されないという挙動に陥ったためsliceメソッドを使用しインデックス番号をコピーした新しい配列を作成することでとりあえずstage2内の全てのレイヤーを削除することに成功

function removeAllLayers() {
  const deleteLayers = stage2.getLayers().slice(); 


  deleteLayers.forEach(deleteLayer => {
    deleteLayer.destroy();

  });
}

removeAllLayers();

homeForm.value = "";
const errorElement = document.querySelector(".home-form-error");
if (errorElement && errorElement.textContent !== "") {
    errorElement.textContent = "";
}  

   }
  });



  const overWrite = document.createElement('button');
  overWrite.classList.add("home-overwritebtn");
  overWrite.append("上書き保存");
  document.querySelector(".homecenter-outer").append(overWrite);
  overWrite.style.display = 'none';

  const homeList = document.querySelector(".home-addlist");


  homeList.addEventListener("click", event => {
    if (event.target.classList.contains("editBtn2")) {
      if (stage2.getChildren().length === 0) {

      const liElement = event.target.closest("li");
      const homeFormValue = liElement.firstChild.textContent.trim();
      const requestData = {
          homeFormValue: homeFormValue
      };
        
        fetch('/get-layer-data3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(layerData => {
        
          // レイヤーごとに新しい Layer を作成
          const layers = layerData.layerData.layers;

          layerData.layerData.layers.forEach(layerInfo => {
            const newLayer1 = new Konva.Layer({
              name: layerInfo.name, 
          });

          const newLayer2 = new Konva.Layer({
            name: layerInfo.name, 
            draggable: true,
        });
          
            
            layerInfo.children.forEach(shapeData => {


              if(layers[0].children.some(child => child === shapeData)){
                // shapeData から必要な情報を取得して図形を作成
                const rect = new Konva.Rect({
                  x: (homecenterInner.offsetWidth - shapeData.width) / 2, 
                  y: (homecenterInner.offsetHeight - shapeData.height) / 2,
                  width: shapeData.width,
                  height: shapeData.height,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });
                
                if (shapeData.absolutePositionRect) {
                  rect.setAbsolutePosition(shapeData.absolutePositionRect);
                }


                const line = new Konva.Line({
                  points: shapeData.points,
                  stroke: shapeData.stroke, 
                  strokeWidth: shapeData.strokeWidth, 
                  closed: shapeData.closed,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });

                if (shapeData.absolutePositionLine) {
                  line.setAbsolutePosition(shapeData.absolutePositionLine);
                }

                


                const shape = new Konva.Shape({
                  sceneFunc: function (context, shape) {
                    const clear = shapeData.clear;
                    shape.clear = clear;
                    const clearLine1 = shapeData.clearLine1;
                    const clearLine2 = shapeData.clearLine2;
                    const clearLine3 = shapeData.clearLine3;
                    shape.clearLine1 = clearLine1;
                    shape.clearLine2 = clearLine2;
                    shape.clearLine3 = clearLine3;
                      if (shapeData.clear) {
                        context.clearRect(...shapeData.clear);
                      }
                      if (shapeData.clearLine1||shapeData.clearLine2||shapeData.clearLine3){
                        context.beginPath();
                        context.moveTo(...shapeData.clearLine1);
                        context.lineTo(...shapeData.clearLine2);
                        context.lineTo(...shapeData.clearLine3);
                        context.closePath();
                    
                        // 三角形のパスをクリアする
                        context.globalCompositeOperation = 'destination-out';
                        context.fill();
                        context.globalCompositeOperation = 'source-over';
                      }
                  },
                });

                if (shapeData.absolutePositionShape) {
                  shape.setAbsolutePosition(shapeData.absolutePositionShape);
                }


                console.log(rect);
                newLayer1.add(line);
                newLayer1.add(rect);
                newLayer1.add(shape);
                newLayer1.draw();

              } else {

                // shapeData から必要な情報を取得して図形を作成
                const rect = new Konva.Rect({
                  x: (homecenterInner.offsetWidth - shapeData.width) / 2, 
                  y: (homecenterInner.offsetHeight - shapeData.height) / 2,
                  width: shapeData.width,
                  height: shapeData.height,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });
                
                if (shapeData.absolutePositionRect) {
                  rect.setAbsolutePosition(shapeData.absolutePositionRect);
                }


                const line = new Konva.Line({
                  points: shapeData.points,
                  stroke: shapeData.stroke, 
                  strokeWidth: shapeData.strokeWidth, 
                  closed: shapeData.closed,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });

                
                if (shapeData.absolutePositionLine) {
                  line.setAbsolutePosition(shapeData.absolutePositionLine);
                }


                const shape = new Konva.Shape({
                  sceneFunc: function (context, shape) {
                    const clear = shapeData.clear;
                    shape.clear = clear;
                    const clearLine1 = shapeData.clearLine1;
                    const clearLine2 = shapeData.clearLine2;
                    const clearLine3 = shapeData.clearLine3;
                    shape.clearLine1 = clearLine1;
                    shape.clearLine2 = clearLine2;
                    shape.clearLine3 = clearLine3;
                      if (shapeData.clear) {
                        context.clearRect(...shapeData.clear);
                      }
                      if (shapeData.clearLine1||shapeData.clearLine2||shapeData.clearLine3){
                        context.beginPath();
                        context.moveTo(...shapeData.clearLine1);
                        context.lineTo(...shapeData.clearLine2);
                        context.lineTo(...shapeData.clearLine3);
                        context.closePath();
                    
                        // 三角形のパスをクリアする
                        context.globalCompositeOperation = 'destination-out';
                        context.fill();
                        context.globalCompositeOperation = 'source-over';
                      }
                  },
                });

                if (shapeData.absolutePositionShape) {
                  shape.setAbsolutePosition(shapeData.absolutePositionShape);
                }


                console.log(rect);
                newLayer2.add(line);
                newLayer2.add(rect);
                newLayer2.add(shape);
                newLayer2.draw();

              };
              
              // 他の図形タイプに対する処理も同様に追加可能
            });
            
            stage2.add(newLayer1); // 新しいレイヤーを stage2 に追加
            stage2.add(newLayer2);
        
            stage2.draw();

            
 

          
  
            // 描画が完了した後の処理を行う
            newLayer1.on('draw', function () {
              console.log('レイヤーの描画が完了しました。');
             
            });
            newLayer2.on('draw', function () {
              console.log('レイヤーの描画が完了しました。');
             
            });
          });

          const errorElement = document.querySelector(".home-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
    
        })

        .catch(error => {
            console.error('Error:', error);
        });

        document.querySelector(".home-compbtn").style.display = 'none';
        overWrite.style.display = 'block';
        document.querySelector(".home-form").value = homeFormValue;

        overWrite.addEventListener("click", function(){
        
  
        fetch('/delete-data4', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({homeFormValue}),
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

          homeList.removeChild(liElement);

         // photoListから該当するhomeFormValueのliを探し、削除
          Array.from(photoList.children).forEach(photoLi => {
            if (photoLi.firstChild.textContent.trim() === homeFormValue) {
              photoList.removeChild(photoLi);
            }
          });
  

          const homeForm = document.querySelector('.home-form');
          const homeFormValue2 = homeForm.value;
          const ul = document.querySelector(".home-addlist");
      
      
          if( homeFormValue2 === ""){
            const homeFormError = document.createElement("p");
            homeFormError.classList.add("home-form-error");
            document.querySelector(".homecenter-outer").append(homeFormError);
            document.querySelector(".home-form-error").textContent = "※配置図名を入力してください※";
          } else if(homeFormValue2.length >= 6){
           const homeFormError = document.createElement("p");
           homeFormError.classList.add("home-form-error");
           document.querySelector(".homecenter-outer").append(homeFormError);
           document.querySelector(".home-form-error").textContent = "※５文字以内で指定してください※";
          } else {
      
            const sourceLayers = stage2.getLayers(); // すべてのレイヤーの配列を取得
      
      
      
            const layerData = {
              layers: [],  // レイヤーの情報を格納する配列
            };
            
            sourceLayers.forEach(layer => {
              const layerInfo = {
                name: homeFormValue2,  // レイヤーの名前を取得
                children: [],      // 子要素の情報を格納する配列
              };


      
              function getShapeType(shape) {
                if (shape instanceof Konva.Rect) {
                  return "Rect";
                } else if (shape instanceof Konva.Line) {
                  return "Line";
                } else if (shape instanceof Konva.Shape) {
                  return "Shape";
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
                  absolutePositionRect: shape.getAbsolutePosition(),
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
                  absolutePositionLine: shape.getAbsolutePosition(),
                };
                layerInfo.children.push(lineData); // 子要素の情報を配列に追加
              }
      
      
      
      
              if (shapeType === "Shape") {
                const shapeData = {
                  type: shape.getType(),
                  clear: shape.clear,
                  clearLine1 : shape.clearLine1,
                  clearLine2 : shape.clearLine2,
                  clearLine3 : shape.clearLine3,
                  absolutePositionShape: shape.getAbsolutePosition(),
                };
                layerInfo.children.push(shapeData);
              }
      
              console.log(shape.clear);
                
                
              });
            
              layerData.layers.push(layerInfo); // レイヤーの情報を配列に追加
            });


      
            
            
      
      
      const newData = {
        homeFormValue: homeFormValue2,
        layerData: layerData,
      };
      
        // /user-data の fetch 処理
      fetch('/user-data9', {
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
      

      
      fetch('/get-new-data10')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const list = document.createElement("li");
        list.classList.add("add-list");
        list.append(homeFormValue2);
        const editBtn = document.createElement("button");
        editBtn.append("編集");
        editBtn.classList.add("editBtn2");
        const cancelBtn = document.createElement("button");
        cancelBtn.append("取消");
        cancelBtn.classList.add("cancelBtn2");
        const deleteBtn = document.createElement("button");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid")
        trash.classList.add("fa-trash-can")
        deleteBtn.append(trash);
        deleteBtn.classList.add("deleteBtn2");
        const btnBox = document.createElement("div");
        btnBox.classList.add("btn-box");
        btnBox.append(editBtn,cancelBtn,deleteBtn);
        list.append(btnBox);
        document.querySelector('.home-addlist').append(list);
      })
      .catch(error => {
        console.error('Error getting new data:', error);
        // エラー処理
      });

      
      fetch('/get-new-data11')
      .then(response => {
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const list = document.createElement("li");
        list.classList.add("add-list4");
        list.append(homeFormValue2);
        const addBtn = document.createElement("button");
        addBtn.append("表示");
        addBtn.classList.add("addBtn2");
        const cancelBtn = document.createElement("button");
        cancelBtn.append("取消");
        cancelBtn.classList.add("cancelBtn3");
        const btnBox = document.createElement("div");
        btnBox.classList.add("btn-box");
        btnBox.append(addBtn,cancelBtn);
        list.append(btnBox);
        document.querySelector('.photo-addlist').append(list);
      })
      .catch(error => {
        console.error('Error getting new data:', error);
      // エラー処理
     });
      
      
      
      const errorElement = document.querySelector(".home-form-error");
      if (errorElement && errorElement.textContent !== "") {
          errorElement.textContent = "";
      }  
      
         }

          const layerToRemove = stage2.find(node => node.name() === homeFormValue)[0];

          if(stage2.getLayers().length !== 0 && layerToRemove instanceof Konva.Layer){
            const deleteLayers = stage2.getLayers().slice();
            deleteLayers.forEach(deleteLayer => {
                deleteLayer.destroy();
            });
          }

          overWrite.style.display = 'none';
          document.querySelector(".home-compbtn").style.display = 'block';
          document.querySelector(".home-form").value = "";


        });

      } else {
        const homeFormError = document.createElement("p");
         homeFormError.classList.add("home-form-error");
         document.querySelector(".homecenter-outer").append(homeFormError);
         document.querySelector(".home-form-error").textContent = "※既に配置図が追加されています。新たな配置図を編集する場合は追加済みの配置図を取消してください※";
      }


      } else if (event.target.classList.contains("cancelBtn2")) {
        // 削除ボタンをクリックした場合の処理
        const liElement = event.target.closest("li");
        const homeFormValue = liElement.firstChild.textContent.trim();

    
        // 削除対象のレイヤーを特定
        const layerToRemove = stage2.find(node => node.name() === homeFormValue)[0];

        console.log('homeFormValue:', homeFormValue);
        console.log('すべてのステージの子要素:', stage2.children);
        console.log('削除するレイヤー:', layerToRemove);
        console.log("layerToRemoveの名前:",layerToRemove.name());
        
        if (layerToRemove instanceof Konva.Layer) {
          layerToRemove.destroy();
          const deleteLayers = stage2.getLayers().slice();
          deleteLayers.forEach(deleteLayer => {
            if (deleteLayer instanceof Konva.Layer) {
              deleteLayer.destroy();
            }
          });


          const errorElement = document.querySelector(".home-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
        } else {
          console.log('対象のレイヤーが見つかりませんでした。');
        }

        overWrite.style.display = 'none';

        document.querySelector(".home-compbtn").style.display = 'block';

        document.querySelector(".home-form").value = "";


      }
  });

 


  homeList.addEventListener("click", event => {
    if (event.target.classList.contains("deleteBtn2")||event.target.classList.contains("fa-trash-can")) {

      const liElement = event.target.closest("li");
      const homeFormValue = liElement.firstChild.textContent.trim();


       if (liElement && homeList.contains(liElement)) {
        // 存在する場合、liElement を削除
        homeList.removeChild(liElement);

        // photoListから該当するhomeFormValueのliを探し、削除
        Array.from(photoList.children).forEach(photoLi => {
        if (photoLi.firstChild.textContent.trim() === homeFormValue) {
          photoList.removeChild(photoLi);
        }
      });

      const layerToRemove = stage2.find(node => node.name() === homeFormValue)[0];

        if(stage2.getLayers().length !== 0 && layerToRemove instanceof Konva.Layer){
          const deleteLayers = stage2.getLayers().slice();
          deleteLayers.forEach(deleteLayer => {
              deleteLayer.destroy();
          });
        }
      }

      fetch('/delete-data3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({homeFormValue}),
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

        overWrite.style.display = 'none';

        document.querySelector(".home-compbtn").style.display = 'block';

        document.querySelector(".home-form").value = "";

      };
  
      
  });
 

  const photoTab = document.querySelector('[data-target="content-photo"]');
  const photoList = document.querySelector(".photo-addlist");

  photoTab.addEventListener("click",function(){

  const photocenterInner = document.querySelector('.photocenter-inner');    
  console.log(photocenterInner.offsetWidth, photocenterInner.offsetHeight);
  const stage3 = new Konva.Stage({
    container: photocenterInner,
    width: photocenterInner.offsetWidth,
    height: photocenterInner.offsetHeight,
  });
  console.log(stage3.width(), stage3.height());



  photoList.addEventListener("click", event => {
    if (event.target.classList.contains("addBtn2")) {
      if (stage3.getChildren().length === 0) {

        

      const liElement = event.target.closest("li");
      const homeFormValue = liElement.firstChild.textContent.trim();
      const requestData = {
          homeFormValue: homeFormValue
      };
        
        fetch('/get-layer-data4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(layerData => {
        
          // レイヤーごとに新しい Layer を作成
          layerData.layerData.layers.forEach(layerInfo => {
            const newLayer = new Konva.Layer({
              name: layerInfo.name, 
          });
            
            layerInfo.children.forEach(shapeData => {
                // shapeData から必要な情報を取得して図形を作成
                const rect = new Konva.Rect({
                  x: (photocenterInner.offsetWidth - shapeData.width) / 2, 
                  y: (photocenterInner.offsetHeight - shapeData.height) / 2,
                  width: shapeData.width,
                  height: shapeData.height,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });

                if (shapeData.absolutePositionRect) {
                  rect.setAbsolutePosition(shapeData.absolutePositionRect);
                }

                const line = new Konva.Line({
                  points: shapeData.points,
                  stroke: shapeData.stroke, 
                  strokeWidth: shapeData.strokeWidth, 
                  closed: shapeData.closed,
                  fill: shapeData.fill,
                  // その他の必要なプロパティを設定
                });

                if (shapeData.absolutePositionLine) {
                  line.setAbsolutePosition(shapeData.absolutePositionLine);
                }

                const shape = new Konva.Shape({
                  sceneFunc: function (context, shape) {
                      if (shapeData.clear) {
                        context.clearRect(...shapeData.clear);
                      }
                      if (shapeData.clearLine1||shapeData.clearLine2||shapeData.clearLine3){
                        context.beginPath();
                        context.moveTo(...shapeData.clearLine1);
                        context.lineTo(...shapeData.clearLine2);
                        context.lineTo(...shapeData.clearLine3);
                        context.closePath();
                    
                        // 三角形のパスをクリアする
                        context.globalCompositeOperation = 'destination-out';
                        context.fill();
                        context.globalCompositeOperation = 'source-over';
                      }
                  },
                });

                if (shapeData.absolutePositionShape) {
                  shape.setAbsolutePosition(shapeData.absolutePositionShape);
                }
                

                console.log(rect);
                newLayer.add(line);
                newLayer.add(rect);
                newLayer.add(shape);
                newLayer.draw();
              
              // 他の図形タイプに対する処理も同様に追加可能
            });

            
            stage3.add(newLayer); // 新しいレイヤーを stage3 に追加

            stage3.draw();
        
  
            // 描画が完了した後の処理を行う
            newLayer.on('draw', function () {
              console.log('レイヤーの描画が完了しました。');
             
            });
          });

          const errorElement = document.querySelector(".photo-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
    
        })

        .catch(error => {
            console.error('Error:', error);
        });

      } else {
        const photoFormError = document.createElement("p");
         photoFormError.classList.add("photo-form-error");
         document.querySelector(".photocenter-outer").append(photoFormError);
         document.querySelector(".photo-form-error").textContent = "※既に配置図が表示されています。新たな配置図を表示する場合は表示済みの配置図を取消してください※";
      }
        
      } else if (event.target.classList.contains("cancelBtn3")) {
        // 削除ボタンをクリックした場合の処理
        const liElement = event.target.closest("li");
        const homeFormValue = liElement.firstChild.textContent.trim();

    
        // 削除対象のレイヤーを特定
        const layerToRemove = stage3.find(node => node.name() === homeFormValue)[0];

        console.log('homeFormValue:', homeFormValue);
        console.log('すべてのステージの子要素:', stage3.children);
        console.log('削除するレイヤー:', layerToRemove);
        console.log("layerToRemoveの名前:",layerToRemove.name());
        
        if (layerToRemove instanceof Konva.Layer) {
          layerToRemove.destroy();
          const deleteLayers = stage3.getLayers().slice();
          deleteLayers.forEach(deleteLayer => {
            if (deleteLayer instanceof Konva.Layer) {
              deleteLayer.destroy();
            }
          });

  

          const errorElement = document.querySelector(".photo-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
        } else {
          console.log('対象のレイヤーが見つかりませんでした。');
        }

      }
  });

});