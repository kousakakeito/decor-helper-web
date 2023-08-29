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


 // 空間新規作成ボタンがクリックされたときの処理
  const spaceCreate  = require('src/SpaceCreateModule');

  const spaceCreateBtn = document.querySelector('.space-createbtn');
  spaceCreateBtn.addEventListener('click', spaceCreate);

 // 家具新規作成ボタンがクリックされたときの処理
  const furnitureCreate  = require('src/FurnitureCreateModule');

  const furnitureCreateBtn = document.querySelector('.furniture-createbtn');
  furnitureCreateBtn.addEventListener('click', furnitureCreate);



  const spaceList = document.querySelector(".space-list");

  spaceList.addEventListener("click", event => {
    if (event.target.classList.contains("addBtn")) {
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
        
          const homecenterInner = document.querySelector('.homecenter-inner');

        const stage2 = new Konva.Stage({
          container: homecenterInner,
          width: homecenterInner.offsetWidth,
          height: homecenterInner.offsetHeight,
        });

        const newLayer = new Konva.Layer();

      
      
        stage2.add(newLayer);
      })
        .catch(error => {
            console.error('Error:', error);
        });
        
      }
  });
  