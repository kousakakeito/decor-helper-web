const contentHome = document.querySelector('#content-home');
const contentSpace = document.querySelector('#content-space');
const contentFurniture = document.querySelector('#content-furniture');
const contentHelp = document.querySelector('#content-help');
const contentPrint = document.querySelector('#content-print');
const contentPhoto = document.querySelector('#content-photo');
const contentInquiry = document.querySelector('#content-inquiry');

// ユーザーネーム要素を取得
const usernameElement = document.querySelector('.user-info');

// ユーザーネームが設定されるまで非表示にする
usernameElement.style.display = 'none';

// ログインしたと仮定して、ユーザーネームを設定
const username = 'John Doe'; // ここでログイン時のユーザーネームを取得する処理を行う
usernameElement.textContent = `こんにちわ！${username}さん！`;
usernameElement.style.display = 'inline';

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
}

// ロード時にcontent-homeのみを表示
hideAllContent();
contentHome.style.display = 'block';


// タブ切り替えのイベントリスナーを設定
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    // すべてのタブの色を元に戻す
    tabs.forEach(t => t.classList.remove('active'));
    // クリックされたタブに色を付ける
    tab.classList.add('active');
    // すべてのコンテンツを非表示にする
    hideAllContent();

    // クリックされたタブに対応するコンテンツを表示する
    const targetContent = tab.getAttribute('data-target');
    const content = document.querySelector(`#${targetContent}`);
    content.style.display = 'block';
  });

  // 設定タブ以外をクリックしたときにドロップダウンメニューを閉じる
  tab.addEventListener('mouseenter', () => {
    if (tab.classList.contains('tab-dropdown')) {
      if (!dropdownOpen) {
        dropdownMenu.style.display = 'none';
      }
    } else {
      dropdownMenu.style.display = 'none';
      dropdownOpen = false;
    }
  });
});

// ドロップダウンメニューの表示・非表示を切り替える
const dropdownTab = document.querySelector('.tab-dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
let dropdownOpen = false; // ドロップダウンメニューが開いているかのフラグ

// ドロップダウンメニューをクリックしてもメニューが開かないようにする
dropdownTab.addEventListener('click', (event) => {
  event.stopPropagation(); // クリックイベントが親要素に伝搬しないようにする
  dropdownMenu.style.display = dropdownOpen ? 'none' : 'block';
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
    const content = document.querySelector(`#${targetContent}`);

    // すでに表示されているコンテンツの場合は非表示にしない
    if (content.style.display !== 'block') {
      // すべてのコンテンツを非表示にする
      hideAllContent();
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
