const contentHome = document.querySelector('#content-home');
const contentSpace = document.querySelector('#content-space');
const contentFurniture = document.querySelector('#content-furniture');
const contentHelp = document.querySelector('#content-help');
const contentPrint = document.querySelector('#content-print');
const contentPhoto = document.querySelector('#content-photo');
const contentInquiry = document.querySelector('#content-inquiry');


// クッキーからユーザー名を取得
const username = getCookie('username');

// Display the username on the page
if (username) {
  const userName = document.querySelector('.user-name');
  userName.textContent = `${username}`;
}

// クッキーを取得する関数
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// ログアウトボタンをクリックしたときの処理
const logoutButton = document.querySelector('#logout-button');
logoutButton.addEventListener('click', () => {
  // サーバーにログアウトリクエストを送信
  fetch('/logout', {
    method: 'POST',
    credentials: 'same-origin', // クッキーをサーバーに送信するための設定
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


function createRectangle() {
  const stage = new Konva.Stage({
    container: spacecenterInner,
    width: spacecenterInner.offsetWidth,
    height: spacecenterInner.offsetHeight,
  });



  layer = new Konva.Layer(); // グローバル変数を使うために、constをletに変更
  stage.add(layer);

  // 図形を作成
  const rectangle = new Konva.Rect({
    x: (spacecenterInner.offsetWidth - 600) / 2, // spacecenterInnerの中央に配置
    y: (spacecenterInner.offsetHeight - 350) / 2, // spacecenterInnerの中央に配置
    width: 600, // 適宜調整
    height: 350, // 適宜調整
    fill: 'blue', // 適宜調整
    draggable: false,
  });

  layer.add(rectangle);
  layer.draw();

  // 丸い点を格納する配列
  const dots = [];
  let dashedLine = null; // 破線を格納する変数
  let isDashedLineVisible = false; // 破線の表示状態

  // 破線の真ん中に四角を格納する変数
  let midRect = null;

  // クリックした位置に丸い点を追加
  stage.on('click', (e) => {
    const pointerPos = stage.getPointerPosition();
    const x = pointerPos.x;
    const y = pointerPos.y;

    // 図形の上辺、左辺、下辺、右辺上でのみ丸い点を追加
    const border = isMouseOnBorder(rectangle, x, y);
    if (border) {
      // クリックした位置に丸い点を追加
      let centerX, centerY;
      switch (border) {
        case 'top':
          centerX = x;
          centerY = rectangle.y();
          break;
        case 'left':
          centerX = rectangle.x();
          centerY = y;
          break;
        case 'bottom':
          centerX = x;
          centerY = rectangle.y() + rectangle.height();
          break;
        case 'right':
          centerX = rectangle.x() + rectangle.width();
          centerY = y;
          break;
      }

      const dot = new Konva.Circle({
        x: centerX,
        y: centerY,
        radius: 5,
        fill: 'red', // 適宜調整
        draggable: false,
      });

      // 丸い点が２つを超えたら古い順に削除
      if (dots.length >= 2) {
        const removedDot = dots.shift();
        removedDot.destroy();
      }

      dots.push(dot);
      layer.add(dot);
      layer.batchDraw(); // レイヤーを再描画する必要があります

      // 2つの丸い点の間に破線（実線）を描画
      if (dots.length === 2) {
        const startDot = dots[0];
        const endDot = dots[1];
        const startX = startDot.x();
        const startY = startDot.y();
        const endX = endDot.x();
        const endY = endDot.y();

        if (dashedLine) {
          dashedLine.destroy(); // 既存の破線があれば削除
        }

        dashedLine = drawDashedLine(startX, startY, endX, endY);
        layer.add(dashedLine);
        layer.batchDraw();
        isDashedLineVisible = true;

        // 破線の真ん中に四角を表示
        if (midRect) {
          midRect.destroy(); // 既存の四角があれば削除
        }

        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        midRect = new Konva.Rect({
          x: midX - 5,
          y: midY - 5,
          width: 10,
          height: 10,
          fill: 'red', // 適宜調整
          draggable: true, // 四角をドラッグ可能にする
          dragBoundFunc: (pos) => { // ドラッグ時の制約を設定
            // ドラッグ中の四角の位置をspacecenterInnerの範囲内に制約する
            let newX = midRect.x();
            let newY = pos.y;

            // ドラッグが範囲外にならないように制約を設定
            const minX = 0;
            const minY = 0;
            const maxY = spacecenterInner.offsetHeight - 14; // 四角の高さを考慮

            if (newY < minY) {
              newY = minY;
            } else if (newY > maxY) {
              newY = maxY;
            }

            return {
              x: newX,
              y: newY,
            };
          },
          // ドラッグ終了時の処理
          dragend: () => {
            // 四角をドラッグした位置に応じて丸い点の位置を更新
            const newMidY = midRect.y() + 5; // 四角の高さを考慮して補正

            const newYTop = startY; // 上辺のY座標
            const newYBottom = endY; // 下辺のY座標

            if (newMidY < newYTop) {
              dots[0].position({ y: newYTop });
              dots[1].position({ y: newYTop });
              dashedLine.points([startX, newYTop, endX, newYTop]);
            } else if (newMidY > newYBottom) {
              dots[0].position({ y: newYBottom });
              dots[1].position({ y: newYBottom });
              dashedLine.points([startX, newYBottom, endX, newYBottom]);
            } else {
              dots[0].position({ y: newMidY });
              dots[1].position({ y: newMidY });
              dashedLine.points([startX, newMidY, endX, newMidY]);
            }

            layer.batchDraw();
          },
        });

        layer.add(midRect); // 四角をレイヤーに追加
        layer.batchDraw();

        // 四角をドラッグして離した位置で再び破線と四角を繋ぎ直す
if (midRect) {
  midRect.on('dragstart', () => {
    if (dashedLine) {
      dashedLine.destroy(); // 既存の破線があれば削除  
    }
  });

  midRect.on('dragend', () => {

    // 四角の座標を取得
    const midX = midRect.x() + 5; // 四角の中心座標を取得
    const midY = midRect.y() + 5;

    // 四角をドラッグした位置で再び破線と四角を繋ぎ直す
    const newStartX = dots[0].x();
    const newStartY = dots[0].y();
    const newEndX = dots[1].x();
    const newEndY = dots[1].y();


    dashedLine = drawDashedLine(newStartX, newStartY,midX,midY);
    dashedLine2 = drawDashedLine(midX,midY,newEndX, newEndY);
    layer.add(dashedLine);
    layer.add(dashedLine2);
    layer.batchDraw();

    midRect.on('dragstart', () => {
      if (dashedLine) {
        dashedLine2.destroy(); // 既存の破線があれば削除  
      }
    });

     // アニメーション (点滅)
     const animation = new Konva.Animation((frame) => {
      if (dashedLine && isDashedLineVisible) {
        const opacity = 0.1 + 1 * Math.abs(Math.sin(frame.time * 2 * Math.PI / 3000));
        dashedLine.opacity(opacity);
        dashedLine2.opacity(opacity);
        layer.batchDraw();
      }
    });
  
    animation.start();

  
    stage.on('click', (event) => {
      const { x, y } = stage.getPointerPosition();
    
      
      if (y >= rectangle.y() - 5 && y <= rectangle.y() + 5 && x >= rectangle.x() && x <= rectangle.x() + rectangle.width()) {
        // クリックした位置が図形の上辺の丸い点が適用される範囲の場合
        dashedLine2.destroy();
      }else if(y >= rectangle.y() + rectangle.height() - 5 && y <= rectangle.y() + rectangle.height() + 5 && x >= rectangle.x() && x <= rectangle.x() + rectangle.width()){
        // クリックした位置が図形の下辺の丸い点が適用される範囲の場合
        dashedLine2.destroy();
      }else if(x >= rectangle.x() - 5 && x <= rectangle.x() + 5 && y >= rectangle.y() && y <= rectangle.y() + rectangle.height()){
        // クリックした位置が図形の左辺の丸い点が適用される範囲の場合
        dashedLine2.destroy();
      }else if(x >= rectangle.x() + rectangle.width() - 5 && x <= rectangle.x() + rectangle.width() + 5 && y >= rectangle.y() && y <= rectangle.y() + rectangle.height()){
        // クリックした位置が図形の右辺の丸い点が適用される範囲の場合
        dashedLine2.destroy();
      };
  
    });



 




    
    

});


midRect.on('dragmove', () => {
  // 表示されているdotsの座標を取得
  const dotsCoordinates = dots.map((dot) => ({
    x: dot.x(),
    y: dot.y(),
  }));

  // midRectの中心座標を取得
  const midRectX = midRect.x() + midRect.width() / 2;
  const midRectY = midRect.y() + midRect.height() / 2;

  // 新しい図形の座標を計算
  const newRectCoordinates = [
    { x: dotsCoordinates[0].x, y: dotsCoordinates[0].y },
    { x: dotsCoordinates[1].x, y: dotsCoordinates[1].y },
    { x: midRectX, y: midRectY },
  ];

  // 新しい図形を作成
  const newTriangle = new Konva.Line({
    points: newRectCoordinates.flatMap((point) => [point.x, point.y]),
    fill: isTriangleInsideRectangle(newRectCoordinates) ? 'white' : 'blue',
    closed: true,
    draggable: false,
  });

  

  // 新しい図形をレイヤーに追加
  layer.add(newTriangle);
  layer.batchDraw(); // レイヤーを再描画

});

// 三角形が長方形の内部にあるかを判定
const isTriangleInsideRectangle = (points) => {
  // 四角形の座標を取得
  const rectX = rectangle.x();
  const rectY = rectangle.y();
  const rectWidth = rectangle.width();
  const rectHeight = rectangle.height();

  // 三角形の頂点が長方形の内部に含まれるかを判定
  for (const point of points) {
    if (point.x < rectX || point.x > rectX + rectWidth || point.y < rectY || point.y > rectY + rectHeight) {
      return false; // 一つでも長方形の外側にあればfalseを返す
    }
  }

  return true; // 全ての頂点が長方形の内部にあればtrueを返す
};












    
      
}
   
      }
    }
  });


  

}

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

// ページが読み込まれたときに実行
document.addEventListener('DOMContentLoaded', () => {
  // 新規作成ボタンがクリックされたときの処理
  const spaceCreateBtn = document.querySelector('.space-createbtn');
  spaceCreateBtn.addEventListener('click', () => {
    // 長方形を作成
    createRectangle();
  });
});