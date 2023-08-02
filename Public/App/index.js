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


  // 新規作成ボタンがクリックされたときの処理
  const spaceCreateBtn = document.querySelector('.space-createbtn');
  spaceCreateBtn.addEventListener('click', () => {

    const stage = new Konva.Stage({
      container: spacecenterInner,
      width: spacecenterInner.offsetWidth,
      height: spacecenterInner.offsetHeight,
    });
  
  
  
    layer = new Konva.Layer(); // グローバル変数を使うために、constをletに変更
    stage.add(layer);

    let widthValue = 300;
    let heightValue = 300;
  
    // 図形を作成
    const rectangle = new Konva.Rect({
      x: (spacecenterInner.offsetWidth - widthValue) / 2, // spacecenterInnerの中央に配置
      y: (spacecenterInner.offsetHeight - heightValue) / 2, // spacecenterInnerの中央に配置
      width: widthValue, // 適宜調整
      height: heightValue, // 適宜調整
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
  
      // 2つの丸点の座標
      const newStartX = dots[0].x();
      const newStartY = dots[0].y();
      const newEndX = dots[1].x();
      const newEndY = dots[1].y();
  
      //丸い点と四角が垂直に交わる座標
      const intersectionPointX1 = dots[0].x(); 
      const intersectionPointY1 = midRect.y()+5;
      
      //もう一方の丸い点と四角が垂直に交わる座標
      const intersectionPointX2 = dots[1].x(); 
      const intersectionPointY2 = midRect.y()+5;
      
  
  
  
      dashedLine = drawDashedLine(newStartX, newStartY,intersectionPointX1,intersectionPointY1);
      dashedLine2 = drawDashedLine(intersectionPointX1,intersectionPointY1,midX,midY);
      dashedLine3 = drawDashedLine(midX,midY,intersectionPointX2,intersectionPointY2);
      dashedLine4 = drawDashedLine(intersectionPointX2,intersectionPointY2,newEndX,newEndY);
      layer.add(dashedLine);
      layer.add(dashedLine2);
      layer.add(dashedLine3);
      layer.add(dashedLine4);
  
      
         
  
  
  
      layer.batchDraw();
  
      midRect.on('dragstart', () => {
        if (dashedLine) {
          dashedLine2.destroy(); // 既存の破線があれば削除 
          dashedLine3.destroy();
          dashedLine4.destroy(); 
        }
      });
  
       // アニメーション (点滅)
       const animation = new Konva.Animation((frame) => {
        if (dashedLine && isDashedLineVisible) {
          const opacity = 0.1 + 1 * Math.abs(Math.sin(frame.time * 2 * Math.PI / 3000));
          dashedLine.opacity(opacity);
          dashedLine2.opacity(opacity);
          dashedLine3.opacity(opacity);
          dashedLine4.opacity(opacity);
          layer.batchDraw();
        }
      });
    
      animation.start();
  
    
      stage.on('click', (event) => {
        const { x, y } = stage.getPointerPosition();
      
        
        if (y >= rectangle.y() - 5 && y <= rectangle.y() + 5 && x >= rectangle.x() && x <= rectangle.x() + rectangle.width()) {
          // クリックした位置が図形の上辺の丸い点が適用される範囲の場合
          dashedLine2.destroy();
          dashedLine3.destroy();
          dashedLine4.destroy();
        }else if(y >= rectangle.y() + rectangle.height() - 5 && y <= rectangle.y() + rectangle.height() + 5 && x >= rectangle.x() && x <= rectangle.x() + rectangle.width()){
          // クリックした位置が図形の下辺の丸い点が適用される範囲の場合
          dashedLine2.destroy();
          dashedLine3.destroy();
          dashedLine4.destroy();
        }else if(x >= rectangle.x() - 5 && x <= rectangle.x() + 5 && y >= rectangle.y() && y <= rectangle.y() + rectangle.height()){
          // クリックした位置が図形の左辺の丸い点が適用される範囲の場合
          dashedLine2.destroy();
          dashedLine3.destroy();
          dashedLine4.destroy();
        }else if(x >= rectangle.x() + rectangle.width() - 5 && x <= rectangle.x() + rectangle.width() + 5 && y >= rectangle.y() && y <= rectangle.y() + rectangle.height()){
          // クリックした位置が図形の右辺の丸い点が適用される範囲の場合
          dashedLine2.destroy();
          dashedLine3.destroy();
          dashedLine4.destroy();
        };
        
    
      });
  
  });
  
  
  
  midRect.on('dragmove', () => {
  
  
  
     
    
    
  
  
  
  });
  
  
  
  
  
  
  
  
  
  
  
      
        
  }
     
        }
      }

    

    
    
      if(dots[0] && dots[1] ) {

        const rectAngleSizeForm3 = document.createElement('input');
        rectAngleSizeForm3.type = "text";
        rectAngleSizeForm3.classList.add("rectAngle-SizeForm3");
        rectAngleSizeForm3.placeholder = "対象箇所の長さをcm単位で入力";
  
        const rectAngleConfirm2 = document.createElement('button');
        rectAngleConfirm2.classList.add("rectAngle-confirm2");
        rectAngleConfirm2.append("決定");
        const div4 = document.createElement("div");
        div4.classList.add("div4");
        const div3 = document.createElement("div");
        div3.classList.add("div3");
    
        div4.append(rectAngleSizeForm3,rectAngleConfirm2);
        div3.append(div4);
        spacecenterInner.append(div3);


        document.querySelector(".rectAngle-confirm2").addEventListener("click",function(){

          const size1 =document.querySelector(".rectAngle-SizeForm3").value;
          const sizeY = Number.parseFloat(size1);
          const size1Num = sizeY /1.06;
          console.log(size1Num)
          
      
          if(Number.isNaN(size1Num)){
           const sizeFormError2 = document.createElement("p");
           sizeFormError2.classList.add("size-form-error2");
           div4.append(sizeFormError);
           document.querySelector(".size-form-error2").textContent = "※数値のみ入力してください※";
      
          } else {
    
         // 長さを格納する変数
         let length = size1Num; // 適宜長さを設定
         
         dots[0].destroy();
         dots[1].destroy();
         dashedLine.destroy();


         // 四角の中心座標を取得
        const midRectX = midRect.x() + midRect.width() / 2;
        const midRectY = midRect.y() + midRect.height() / 2;

        // 破線を描画する座標を計算
        const dashedLineX1 = midRectX - length / 2;
        const dashedLineY1 = midRectY;
        const dashedLineX2 = midRectX + length / 2;
        const dashedLineY2 = midRectY;

        // 破線を作成
        const dashedLine5 = new Konva.Line({
          points: [dashedLineX1, dashedLineY1, dashedLineX2, dashedLineY2],
          stroke: 'red',
          strokeWidth: 2,
          dash: [5, 10], // 破線のパターンを指定（length変数の値を使用）
        });

        // 丸い点を作成
        const circle1 = new Konva.Circle({
          x: dashedLineX1,
          y: dashedLineY1,
          radius: 5,
          fill: 'red',
        });

        const circle2 = new Konva.Circle({
          x: dashedLineX2,
          y: dashedLineY2,
          radius: 5,
          fill: 'red',
        });

        // レイヤーに追加
        const layer = new Konva.Layer();
        layer.add(dashedLine5, circle1, circle2, midRect);
        stage.add(layer);

        while (document.querySelector(".div3").lastChild) {
          document.querySelector(".div3").removeChild(document.querySelector(".div3").lastChild);
         }

        

        

        if( midRect.y() <= rectangle.y()){
         
        const rectAngleSizeForm4 = document.createElement('input');
        rectAngleSizeForm4.type = "text";
        rectAngleSizeForm4.classList.add("rectAngle-SizeForm4");
        rectAngleSizeForm4.placeholder = "右端からの長さを入力";

        const rectAngleSizeForm5 = document.createElement('input');
        rectAngleSizeForm5.type = "text";
        rectAngleSizeForm5.classList.add("rectAngle-SizeForm5");
        rectAngleSizeForm5.placeholder = "左端からの長さを入力";
  
        const rectAngleConfirm3 = document.createElement('button');
        rectAngleConfirm3.classList.add("rectAngle-confirm3");
        rectAngleConfirm3.append("決定");

        const div6 = document.createElement("div");
        div6.classList.add("div6");

        const div5 = document.createElement("div");
        div5.classList.add("div5");

        const note1 = document.createElement("p");
        note1.classList.add("note1");

        div6.append(note1);
        div6.append(rectAngleSizeForm4,rectAngleSizeForm5,rectAngleConfirm3);

        div5.append(div6);
        spacecenterInner.append(div5);

        document.querySelector(".note1").textContent = "※右端または左端のどちらかを入力してください※";

      } else if( midRect.x() + midRect.width() >= rectangle.x() + rectangle.width()){

        const rectAngleSizeForm6 = document.createElement('input');
        rectAngleSizeForm6.type = "text";
        rectAngleSizeForm6.classList.add("rectAngle-SizeForm6");
        rectAngleSizeForm6.placeholder = "上端からの長さを入力";

        const rectAngleSizeForm7 = document.createElement('input');
        rectAngleSizeForm7.type = "text";
        rectAngleSizeForm7.classList.add("rectAngle-SizeForm7");
        rectAngleSizeForm7.placeholder = "下端からの長さを入力";
  
        const rectAngleConfirm4 = document.createElement('button');
        rectAngleConfirm4.classList.add("rectAngle-confirm4");
        rectAngleConfirm4.append("決定");
        const div8 = document.createElement("div");
        div8.classList.add("div8");
        const div7 = document.createElement("div");
        div7.classList.add("div7");
    
        div8.append(rectAngleSizeForm6,rectAngleSizeForm7,rectAngleConfirm4);

        const note2 = document.createElement("p");
        note2.classList.add("note2");
        div8.append(note2);
        document.querySelector(".note2").textContent = "※上端または下端のどちらかを入力してください※";

        div7.append(div8);
        spacecenterInner.append(div7);

      } else if( midRect.x() <= rectangle.x()){

        const rectAngleSizeForm8 = document.createElement('input');
        rectAngleSizeForm8.type = "text";
        rectAngleSizeForm8.classList.add("rectAngle-SizeForm8");
        rectAngleSizeForm8.placeholder = "上端からの長さを入力";

        const rectAngleSizeForm9 = document.createElement('input');
        rectAngleSizeForm9.type = "text";
        rectAngleSizeForm9.classList.add("rectAngle-SizeForm9");
        rectAngleSizeForm9.placeholder = "下端からの長さを入力";
  
        const rectAngleConfirm5 = document.createElement('button');
        rectAngleConfirm5.classList.add("rectAngle-confirm5");
        rectAngleConfirm5.append("決定");
        const div10 = document.createElement("div");
        div10.classList.add("div10");
        const div9 = document.createElement("div");
        div9.classList.add("div9");
    
        div10.append(rectAngleSizeForm8,rectAngleSizeForm9,rectAngleConfirm5);

        const note3 = document.createElement("p");
        note3.classList.add("note3");
        div10.append(note3);
        document.querySelector(".note3").textContent = "※上端または下端のどちらかを入力してください※";

        div9.append(div10);
        spacecenterInner.append(div9);

      } else if( midRect.y() + midRect.height() >= rectangle.y() + rectangle.height()){

        const rectAngleSizeForm10 = document.createElement('input');
        rectAngleSizeForm10.type = "text";
        rectAngleSizeForm10.classList.add("rectAngle-SizeForm10");
        rectAngleSizeForm10.placeholder = "右端からの長さを入力";

        const rectAngleSizeForm11 = document.createElement('input');
        rectAngleSizeForm11.type = "text";
        rectAngleSizeForm11.classList.add("rectAngle-SizeForm11");
        rectAngleSizeForm11.placeholder = "左端からの長さを入力";
  
        const rectAngleConfirm6 = document.createElement('button');
        rectAngleConfirm6.classList.add("rectAngle-confirm6");
        rectAngleConfirm6.append("決定");
        const div12 = document.createElement("div");
        div12.classList.add("div12");
        const div11 = document.createElement("div");
        div11.classList.add("div11");
    
        div12.append(rectAngleSizeForm10,rectAngleSizeForm11,rectAngleConfirm6);

        const note4 = document.createElement("p");
        note4.classList.add("note4");
        div12.append(note4);
        document.querySelector(".note4").textContent = "※右端または左端のどちらかを入力してください※";

        div11.append(div12);
        spacecenterInner.append(div11);

      }  
    
         
          }
       

        });



      }
    });
  

   
  
  
    
  
  
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
    
    document.querySelector(".rectAngle-confirm").addEventListener("click",function(){

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


      while (document.querySelector(".div1").lastChild) {
        document.querySelector(".div1").removeChild(document.querySelector(".div1").lastChild);
      }

     
      }
  
  
    });

  });

