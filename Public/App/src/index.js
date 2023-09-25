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
  const stage2 = new Konva.Stage({
    container: homecenterInner,
    width: homecenterInner.offsetWidth,
    height: homecenterInner.offsetHeight,
  });

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

                console.log(rect);
                newLayer.add(line);
                newLayer.add(rect);
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

                console.log(rect);
                newLayer.add(line);
                newLayer.add(rect);
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
        console.log("layerToRemoveの名前:",layerToRemove.name());
        
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