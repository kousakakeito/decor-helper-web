
const contentHome = document.querySelector('#content-home');
const contentSpace = document.querySelector('#content-space');
const contentFurniture = document.querySelector('#content-furniture');
const contentHelp = document.querySelector('#content-help');
const contentTos = document.querySelector('#content-tos');
const contentPrivacy = document.querySelector('#content-privacy');
const contentInquiry = document.querySelector('#content-inquiry');
const contentCert = document.querySelector('#content-cert');



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

function getObjData() {
  fetch('/get-spaceData')
    .then(response => response.json())
    .then(data => {
      const ul = document.querySelector('.space-list');
      data.forEach(spaceFormValues => {
        const li = document.createElement('li');
        li.textContent = spaceFormValues;
        li.classList.add("add-list");
        const addBtn = document.createElement("button");
        addBtn.append("追加");
        addBtn.classList.add("addBtn");
        const cancelBtn = document.createElement("button");
        cancelBtn.append("取消");
        cancelBtn.classList.add("cancelBtn");
        const editBtn = document.createElement("button");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid")
        trash.classList.add("fa-trash-can")
        editBtn.append(trash);
        editBtn.classList.add("editBtn");
        const btnBox = document.createElement("div");
        btnBox.classList.add("btn-box");
        btnBox.append(addBtn,cancelBtn,editBtn);
        li.append(btnBox);
        ul.appendChild(li);
      });
    })
    .catch(error => {
      console.error('エラー:', error);
    });

    fetch('/get-furnitureData')
    .then(response => response.json())
    .then(data => {
      const ul = document.querySelector('.furniture-list');
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
        const trash = document.createElement("i");
        trash.classList.add("fa-solid")
        trash.classList.add("fa-trash-can")
        editBtn.append(trash);
        editBtn.classList.add("editBtn");
        const btnBox = document.createElement("div");
        btnBox.classList.add("btn-box");
        btnBox.append(addBtn,cancelBtn,editBtn);
        li.append(btnBox);
        ul.appendChild(li);
      });
    })
    .catch(error => {
      console.error('エラー:', error);
    });

    fetch('/get-genreData')
    .then(response => response.json())
    .then(data => {
      const ol = document.querySelector('.genre-dropdown');
      // データから重複を削除
      const uniqueGenreFormValues = [...new Set(data)];
      uniqueGenreFormValues.forEach(genreFormValue => {
       const li = document.createElement('li');
       const label = document.createElement('label');
       label.classList.add("li-label");
       label.textContent = genreFormValue;
       const checkHome = document.createElement("input");
       checkHome.type = "checkbox";
       checkHome.name = "checkHome";
       li.append(checkHome, label);
       ol.appendChild(li);
      });
    })
    .catch(error => {
      console.error('エラー:', error);
    });

    fetch('/get-roomData')
    .then(response => response.json())
    .then(data => {
      const ul = document.querySelector('.home-addlist');
      data.forEach(homeFormValues => {
        const li = document.createElement('li');
        li.textContent = homeFormValues;
        li.classList.add("add-list");
        const addBtn = document.createElement("button");
        addBtn.append("編集");
        addBtn.classList.add("editBtn2");
        const cancelBtn = document.createElement("button");
        cancelBtn.append("取消");
        cancelBtn.classList.add("cancelBtn2");
        const editBtn = document.createElement("button");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid")
        trash.classList.add("fa-trash-can")
        editBtn.append(trash);
        editBtn.classList.add("deleteBtn2");
        const btnBox = document.createElement("div");
        btnBox.classList.add("btn-box");
        btnBox.append(addBtn,cancelBtn,editBtn);
        li.append(btnBox);
        ul.appendChild(li);

      });
    })
    .catch(error => {
      console.error('エラー:', error);
    });
}

function mailCert(){
  fetch('/get-mailCert')
  .then(response => response.json())
  .then(data => {
    if(!data.certMail){
      const i = document.createElement('i');
      i.classList.add("fa-solid");
      i.classList.add("fa-circle-exclamation");
      i.classList.add("mailcert-not");
      document.querySelector(".mailcert-icon").append(i)
    }else if(data.certMail){
      const i = document.createElement('i');
      i.classList.add("fa-solid");
      i.classList.add("fa-circle-check");
      i.classList.add("mailcert-clear");
      document.querySelector(".mailcert-icon").append(i)
    }
    })
  .catch(error => {
    console.error('エラー:', error);
  });
}


function getUserMail(){
  fetch('/get-userEmail')
  .then(response => response.json())
  .then(data => {
    document.querySelector(".register-mail").append(data.email);
    })
  .catch(error => {
    console.error('エラー:', error);
  });
}


document.querySelector(".content-tutorial1").style.display = "none";

function getTutorial(){
  fetch('/get-tutorial')
  .then(response => response.json())
  .then(data => {
    if(!data.firstLogin){
      document.querySelector(".tabs").style.pointerEvents = "none";
      document.querySelector(".sidebar").style.pointerEvents = "none";

      document.querySelector(".content-tutorial1").style.display = "block";
      document.querySelector(".tutorial-containar1").style.display = "none";
      window.setTimeout(() => {
        document.querySelector(".tutorial-containar1").style.display = "block";
        document.querySelector(".tutorial-text1").style.display = "none";
        document.querySelector(".tutorial-btn1").style.display = "none";
        document.querySelector(".tutorial-btn2").style.display = "none";
        document.querySelector(".tutorial-btn3").style.display = "none";
        document.querySelector(".tutorial-btn4").style.display = "none";
        document.querySelector(".tutorial-btn5").style.display = "none";
        document.querySelector(".tutorial-btn6").style.display = "none";
        document.querySelector(".tutorial-btn7").style.display = "none";
        document.querySelector(".tutorial-btn8").style.display = "none";
        document.querySelector(".tutorialskip-btn").style.display = "none";
        document.querySelector(".tutorialend-btn").style.display = "none";
        document.querySelector(".space-tutorial").style.display = "none";
        document.querySelector(".furniture-tutorial").style.display = "none";
        document.querySelector(".home-tutorial").style.display = "none";
        document.querySelector(".help-tutorial").style.display = "none";
        document.querySelector(".set-tutorial").style.display = "none";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.querySelector(".tutorial-containar1").style.opacity = 1;
          });
        });
      }, 2000);

      const text = 
      "この度はDecorHelperにご登録頂きありがとうございます。当アプリは、図形を操作し、模様替えの事前配置確認や家具の事前設置確認が行えます。事前配置確認を行うことで家具の空きスペース間隔を予め予測できます。図形を操作して部屋、家具を予め作成しなければいけませんが、1度作成してしまえばログインアカウントに保存されますので作成した部屋、家具は何度でも再利用が可能です。"; 

      const displayElement = document.querySelector(".tutorial-text1"); 
      const totalDuration = 20000; // 総表示時間（ミリ秒）
      const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
      const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
      let currentIndex = 0; // 現在の文字インデックス

      window.setTimeout(() => {
        document.querySelector(".tutorial-text1").style.display = "block";
        document.querySelector(".tutorial-btn1").style.display = "none";
        document.querySelector(".tutorial-btn2").style.display = "none";
        document.querySelector(".tutorial-btn3").style.display = "none";
        document.querySelector(".tutorial-btn4").style.display = "none";
        document.querySelector(".tutorial-btn5").style.display = "none";
        document.querySelector(".tutorial-btn6").style.display = "none";
        document.querySelector(".tutorial-btn7").style.display = "none";
        document.querySelector(".tutorial-btn8").style.display = "none";
        document.querySelector(".tutorialskip-btn").style.display = "none";
        document.querySelector(".tutorialend-btn").style.display = "none";
        document.querySelector(".space-tutorial").style.display = "none";
        document.querySelector(".furniture-tutorial").style.display = "none";
        document.querySelector(".home-tutorial").style.display = "none";
        document.querySelector(".help-tutorial").style.display = "none";
        document.querySelector(".set-tutorial").style.display = "none";
        displayText();
      }, 5000);

      function displayText() {
        if (currentIndex < text.length) {
          displayElement.textContent += text[currentIndex]; 
      
          let interval = totalDuration / text.length; 
          const nextChar = text[currentIndex];
      
          // 特定の文字に応じて一時停止時間を設定
          if (nextChar === '。') {
            interval = pauseDurationDot; 
          } else if (nextChar === '、') {
            interval = pauseDurationComma; 
          }
      
          currentIndex++;
          setTimeout(displayText, interval); 
        } else {
          document.querySelector(".tutorial-btn1").style.display = "block";
        }
      }
      
    }else if(data.firstLogin){
      console.log("not tutorial");
    }
    })
  .catch(error => {
    console.error('エラー:', error);
  });
}

document.querySelector(".tutorial-btn1").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorial-btn1").style.display = "none";
  const text = 
  "ユーザーの皆様には使いずらさを感じさせるかもしれませんが、常に改善へ努めて参りますので、どうかよろしくお願い致します。ここからは操作方法の説明を行います。説明をスキップする場合は下記のスキップをクリックしてください。説明を受ける場合は、次へをクリックしてください。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 15000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);

  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
  
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
  
    
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
  
      currentIndex++; 
      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorial-btn2").style.display = "block";
      document.querySelector(".tutorialskip-btn").style.display = "block";
    }
  }
});

document.querySelector(".tutorialskip-btn").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorial-btn2").style.display = "none";
  document.querySelector(".tutorial-btn3").style.display = "none";
  document.querySelector(".tutorial-btn4").style.display = "none";
  document.querySelector(".tutorial-btn5").style.display = "none";
  document.querySelector(".tutorial-btn6").style.display = "none";
  document.querySelector(".tutorial-btn7").style.display = "none";
  document.querySelector(".tutorial-btn8").style.display = "none";
  document.querySelector(".tutorialskip-btn").style.display = "none";
  document.querySelector(".space-tutorial").style.display = "none";
  document.querySelector(".furniture-tutorial").style.display = "none";
  document.querySelector(".home-tutorial").style.display = "none";
  document.querySelector(".help-tutorial").style.display = "none";
  document.querySelector(".set-tutorial").style.display = "none";
  if(document.querySelector(".location1")){
  document.querySelector(".tabs").removeChild(document.querySelector(".location1"));
  }else if(document.querySelector(".location2")){
  document.querySelector(".tabs").removeChild(document.querySelector(".location2"));
  }else if(document.querySelector(".location3")){
  document.querySelector(".tabs").removeChild(document.querySelector(".location3"));
  }else if(document.querySelector(".location4")){
  document.querySelector(".tabs").removeChild(document.querySelector(".location4"));
  }else if(document.querySelector(".location5")){
  document.querySelector(".tabs").removeChild(document.querySelector(".location5"));
  }
  if(dropdownMenu.style.display === 'block'){
    dropdownMenu.style.display = 'none';
  }
  const text = 
  "以上で操作方法の説明を終了致します。今後チュートリアルは表示されませんので、操作方法について他にご不明な点がありましたら、ヘルプをご確認頂くか、お問い合わせをお願い致します。またDecorHelperをご利用いただく前に必ず設定タブ、メニュー内の利用規約、プライバシーポリシーをお読み下さい。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 10000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);

  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
  
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
  
    
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
  
      currentIndex++; 
      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorialend-btn").style.display = "block";
    }
  }
})


document.querySelector(".tutorial-btn2").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorialskip-btn").style.display = "none";
  document.querySelector(".tutorial-btn2").style.display = "none";
  const text = 
  "まずは部屋作成について説明いたします。こちらのタブから部屋の上面図を図形操作して作成します。実際の部屋の横幅と縦幅をメジャーなどで測っていただき実際の数値を入力することで、入力した数値に合わせた四角形の図形が生成されます。実際の部屋を上面図として見た時、凹凸などがある場合は、生成された四角形の辺をクリックしていただくことで凹凸具合の調整が行えます。この凹凸具合も実際の縦、横の長さを測って頂き数値を入力します。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 23000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);


  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
    
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
    
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
    
      currentIndex++; 
  
      if (displayElement.textContent.endsWith('ついて')) {
        // ここでアイコンを追加する処理をスケジュールする
        setTimeout(() => {
          const i = document.createElement('i');
          i.classList.add("fa-solid");
          i.classList.add("fa-location-dot");
          i.classList.add("fa-rotate-270");
          i.classList.add("location1");
          document.querySelector(".tabs").append(i);
          document.querySelector(".space-tutorial").style.display = "block";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.querySelector(".location1").style.opacity = 1;
              document.querySelector(".space-tutorial").style.opacity = 1;
            });
          });
          
        }, 2000); // アイコン表示のための遅延を設定
      }
  
      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorial-btn3").style.display = "block";
      document.querySelector(".tutorialskip-btn").style.display = "block";
    }
  }
  

})

document.querySelector(".tutorial-btn3").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorialskip-btn").style.display = "none";
  document.querySelector(".tutorial-btn3").style.display = "none";
  document.querySelector(".space-tutorial").style.display = "none";
  document.querySelector(".tabs").removeChild(document.querySelector(".location1"))
  const text = 
  "次に家具作成について説明致します。こちらのタブから家具の上面図を図形操作して作成します。部屋作成と同様に、実際の家具の横幅と縦幅をメジャーなどで測っていただき実際の数値を入力することで、入力した数値に合わせた四角形の図形が生成されます。実際の家具を上面図として見た時、凹凸などがある場合は、生成された四角形の辺をクリックしていただくことで凹凸具合の調整が行えます。この凹凸具合も実際の縦、横の長さを測って頂き数値を入力します。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 23000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);



  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
    
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
    
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
    
      currentIndex++; 
  
      if (displayElement.textContent.endsWith('ついて')) {
        // ここでアイコンを追加する処理をスケジュールする
        setTimeout(() => {
          const i = document.createElement('i');
          i.classList.add("fa-solid");
          i.classList.add("fa-location-dot");
          i.classList.add("fa-rotate-270");
          i.classList.add("location2");
          document.querySelector(".tabs").append(i);
          document.querySelector(".furniture-tutorial").style.display = "block";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.querySelector(".location2").style.opacity = 1;
              document.querySelector(".furniture-tutorial").style.opacity = 1;
            });
          });
        }, 2000); // アイコン表示のための遅延を設定
      }
  
      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorial-btn4").style.display = "block";
      document.querySelector(".tutorialskip-btn").style.display = "block";
    }
  }
  
})


document.querySelector(".tutorial-btn4").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorialskip-btn").style.display = "none";
  document.querySelector(".tutorial-btn4").style.display = "none";
  document.querySelector(".furniture-tutorial").style.display = "none";
  document.querySelector(".tabs").removeChild(document.querySelector(".location2"))
  const text = 
  "次にホームについて説明致します。こちらのタブから作成した部屋、家具を配置することができます。現在背景に見えている左端のサイドバーの、上のタブは部屋を作成した時に保存される場所、中央のタブは家具を作成した時に保存される場所、下のタブは部屋と家具で配置図を作成した時に保存される場所になります。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 16000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);


  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
    
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
    
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
    
      currentIndex++; 
  
      if (displayElement.textContent.endsWith('ついて')) {
        // ここでアイコンを追加する処理をスケジュールする
        setTimeout(() => {
          const i = document.createElement('i');
          i.classList.add("fa-solid");
          i.classList.add("fa-location-dot");
          i.classList.add("fa-rotate-270");
          i.classList.add("location3");
          document.querySelector(".tabs").append(i);
          document.querySelector(".home-tutorial").style.display = "block";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.querySelector(".location3").style.opacity = 1;
              document.querySelector(".home-tutorial").style.opacity = 1;
            });
        });
        }, 2000); // アイコン表示のための遅延を設定
      }
  
      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorial-btn5").style.display = "block";
      document.querySelector(".tutorialskip-btn").style.display = "block";
    }
  }
})


document.querySelector(".tutorial-btn5").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorialskip-btn").style.display = "none";
  document.querySelector(".tutorial-btn5").style.display = "none";
  document.querySelector(".home-tutorial").style.display = "none";
  document.querySelector(".tabs").removeChild(document.querySelector(".location3"))
  const text = 
  "次にヘルプについて説明致します。こちらのタブから予め用意された操作方法の説明や、多くのお問い合わせがあるご不明点などが確認できます。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 6000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);


  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
    
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
    
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
    
      currentIndex++; 
  
      if (displayElement.textContent.endsWith('ついて')) {
        // ここでアイコンを追加する処理をスケジュールする
        setTimeout(() => {
          const i = document.createElement('i');
          i.classList.add("fa-solid");
          i.classList.add("fa-location-dot");
          i.classList.add("fa-rotate-270");
          i.classList.add("location4");
          document.querySelector(".tabs").append(i);
          document.querySelector(".help-tutorial").style.display = "block";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.querySelector(".location4").style.opacity = 1;
              document.querySelector(".help-tutorial").style.opacity = 1;
            });
        });
        }, 2000); // アイコン表示のための遅延を設定
      }
  
      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorial-btn6").style.display = "block";
      document.querySelector(".tutorialskip-btn").style.display = "block";
    }
  }
})


document.querySelector(".tutorial-btn6").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorialskip-btn").style.display = "none";
  document.querySelector(".tutorial-btn6").style.display = "none";
  document.querySelector(".help-tutorial").style.display = "none";
  document.querySelector(".tabs").removeChild(document.querySelector(".location4"))
  const text = 
  "次にお問い合わせについて説明致します。こちらの設定タブをクリックしていただくと、ドロップダウンメニューが表示されます。メニュー内のお問い合わせタブからお問い合わせを行うことができますが、お問い合わせをする際はメールアドレスの認証を完了しておく必要があります。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 12000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);


  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
      
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
      
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
      
      currentIndex++; 

      if (displayElement.textContent.endsWith('ついて')) {
        setTimeout(() => {
          const i = document.createElement('i');
          i.classList.add("fa-solid");
          i.classList.add("fa-location-dot");
          i.classList.add("fa-rotate-270");
          i.classList.add("location5");
          document.querySelector(".tabs").append(i);
          document.querySelector(".set-tutorial").style.display = "block";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.querySelector(".location5").style.opacity = 1;
              document.querySelector(".set-tutorial").style.opacity = 1;
            });
          });
        }, 2000);
      }

  
      // ドロップ後にドロップダウンメニューを表示
      if (displayElement.textContent.includes('ドロップ')) {
        dropdownMenu.style.display = 'block';
      }
  
      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorial-btn7").style.display = "block";
      document.querySelector(".tutorialskip-btn").style.display = "block";
    }
  }
  
})



document.querySelector(".tutorial-btn7").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorialskip-btn").style.display = "none";
  document.querySelector(".tutorial-btn7").style.display = "none";
  document.querySelector(".set-tutorial").style.display = "none";
  const text = 
  "次にメールアドレス認証について説明致します。メニュー内のメールアドレス認証タブから認証が行えます。現在タブの横に赤色のマークが表示されていますが、認証が完了しますと緑色のチェックマークに変化します。またメールアドレスの変更もこちらのタブから変更が可能です。認証をしておくと、お問い合わせができることに加えて、パスワード変更時などの確認コードの取得がスムーズになりますので、お早目の認証をオススメ致します。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 23000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);


  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
  
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
  
    
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
  
      currentIndex++; 


      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorial-btn8").style.display = "block";
      document.querySelector(".tutorialskip-btn").style.display = "block";
    }
  }
})


document.querySelector(".tutorial-btn8").addEventListener("click",function(){
  document.querySelector(".tutorial-text1").style.display = "none";
  document.querySelector(".tutorialskip-btn").style.display = "none";
  document.querySelector(".tutorial-btn8").style.display = "none";
  document.querySelector(".tabs").removeChild(document.querySelector(".location5"));
  dropdownMenu.style.display = 'none';
  const text = 
  "以上で操作方法の説明を終了致します。今後チュートリアルは表示されませんので、操作方法について他にご不明な点がありましたら、ヘルプをご確認頂くか、お問い合わせをお願い致します。またDecorHelperをご利用いただく前に必ず設定タブ、メニュー内の利用規約、プライバシーポリシーをお読み下さい。"; 

  const displayElement = document.querySelector(".tutorial-text1"); 
  const totalDuration = 12000; // 総表示時間（ミリ秒）
  const pauseDurationDot = 1000; // ピリオドの後の一時停止時間（ミリ秒）
  const pauseDurationComma = 500; // カンマの後の一時停止時間（ミリ秒）
  let currentIndex = 0; // 現在の文字インデックス

  window.setTimeout(() => {
    document.querySelector(".tutorial-text1").textContent = "";
    document.querySelector(".tutorial-text1").style.display = "block";
    displayText();
  }, 2000);



  function displayText() {
    if (currentIndex < text.length) {
      displayElement.textContent += text[currentIndex];
  
      let interval = totalDuration / text.length; 
      const nextChar = text[currentIndex];
  
    
      if (nextChar === '。') {
        interval = pauseDurationDot; 
      } else if (nextChar === '、') {
        interval = pauseDurationComma; 
      }
  
      currentIndex++; 
      setTimeout(displayText, interval); 
    } else {
      document.querySelector(".tutorialend-btn").style.display = "block";
    }
  }
})


document.querySelector(".tutorialend-btn").addEventListener("click",function(){
  document.querySelector(".content-tutorial1").style.display = "none";
  document.querySelector(".tabs").style.pointerEvents = "auto";
  document.querySelector(".sidebar").style.pointerEvents = "auto";
  fetch('/change-tutorial', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("tutorial_end")
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})


// ページがロードされたときに部屋、家具、配置図情報を取得して表示する
window.addEventListener('load', getObjData);
// ページがロードされたときにメール認証の有無アイコンを表示
window.addEventListener('load', mailCert);
// ページがロードされたときにユーザーのメアドを表示
window.addEventListener('load', getUserMail);
// ページがロードされたときに初回ログインであれば、チュートリアルを表示
window.addEventListener('load', getTutorial);
// ページがロードされたときにセッションが未取得の場合ログイン画面へリダイレクト
window.addEventListener('load',function(){
  fetch('/load-session-judge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    window.location.href = data.redirect;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
// お問い合わせタブをクリックしたときにメール認証の有無を判定し、お問い合わせできるか否かを表示
document.querySelector("#contact-btn").addEventListener('click', function(){
  fetch('/contact-certMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.certMail){
      document.querySelector(".contact-errorform").style.display = "none";
    }else{
      document.querySelector(".contact-errorform").style.display = "block";
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

});

document.querySelector(".inquiry").addEventListener("click",function(){
  contentHome.style.display = 'none';
  contentInquiry.style.display = 'block';
  fetch('/contact-certMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.certMail){
      document.querySelector(".contact-errorform").style.display = "none";
    }else{
      document.querySelector(".contact-errorform").style.display = "block";
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})
document.querySelector(".privacy").addEventListener("click",function(){
  contentHome.style.display = 'none';
  contentPrivacy.style.display = 'block';
})
document.querySelector(".terms").addEventListener("click",function(){
  contentHome.style.display = 'none';
  contentTos.style.display = 'block';
})
document.querySelector(".faq").addEventListener("click",function(){
  contentHome.style.display = 'none';
  contentHelp.style.display = 'block';
})

document.querySelector(".icon-circle").addEventListener("click",function(){
  window.location.reload();
})

function rotateImage() {
  document.querySelector(".icon").classList.add('rotating'); // 回転クラスを追加

  setTimeout(function() {
    document.querySelector(".icon").classList.remove('rotating');
  }, 2000);

  setTimeout(rotateImage, 7000);
  
}

// 最初の回転を開始
rotateImage();


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
  contentTos.style.display = 'none';
  contentPrivacy.style.display = 'none';
  contentInquiry.style.display = 'none';
  contentCert.style.display = 'none';
}

// すべてのコンテンツを非表示にする関数
function hideAllContent() {
  contentHome.style.display = 'none';
  contentSpace.style.display = 'none';
  contentFurniture.style.display = 'none';
  contentHelp.style.display = 'none';
  hideModalContent();
  // content-print, content-photo, content-inquiryも非表示にする
  contentTos.style.display = 'none';
  contentPrivacy.style.display = 'none';
  contentInquiry.style.display = 'none';
  contentCert.style.display = 'none';
}

// ロード時にcontent-homeのみを表示
hideAllContent();
contentHome.style.display = 'block';

function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

// タブ切り替えのイベントリスナーを設定
const tabs = document.querySelectorAll('.tab');
const tab2 = document.querySelector('.tab2');
tabs.forEach(tab => {
  
   // すべてのタブからactiveクラスを削除
 tabs.forEach(t => t.classList.remove('active'));
 tab2.classList.remove('active')
 const homeTab = document.querySelector('[data-target="content-home"]');
 homeTab.classList.add('active');

  tab.addEventListener('click', () => {

     // クリックされたタブのdata-color属性から背景色を取得
    const color = tab.getAttribute('data-color');
    // 背景色を変更する関数を呼び出す
    changeBackgroundColor(color);
    

    // すべてのタブの色を元に戻す
    tabs.forEach(t => t.classList.remove('active'));
    tab2.classList.remove('active')

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

tab2.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab2.classList.add('active');
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
  if(document.querySelector(".content-tutorial1").style.display === "none"){
  if (!dropdownTab.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.style.display = 'none';
    dropdownOpen = false;
  }
}
});

// ドロップダウンメニューの中の各メニューのクリックイベントを設定
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', (e) => {

    if(e.target !== document.querySelector("#user-delete")){
    
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


  document.querySelector('.home-spacelist').style.display = 'none';
  document.querySelector('.home-roomlist').style.display = 'none';
  document.querySelector('.homeright-outer').style.display = 'none';
  document.querySelector('.home-optionlist').style.display = 'none';

  function hideAllContents() {
    document.querySelector('.home-spacelist').style.display = 'none';
    document.querySelector('.home-roomlist').style.display = 'none';
    document.querySelector('.homeright-outer').style.display = 'none';
  }

  let spaceSideBar = 0;
  let furnitureSideBar = 0;
  let roomSideBar = 0;

  document.querySelector('.sidebar').addEventListener("click",e =>{
    if(e.target.classList.contains('space') && spaceSideBar === 0){
     document.querySelector('.furniture').classList.remove('select-sidebar'); 
     document.querySelector('.room').classList.remove('select-sidebar');
     furnitureSideBar = 0;
     roomSideBar = 0;
     hideAllContents();
     document.querySelector('.home-spacelist').style.display = 'block';
     document.querySelector('.space').classList.add('select-sidebar');
     spaceSideBar++;
    }else if(e.target.classList.contains('fa-person-shelter') && spaceSideBar === 0){
     document.querySelector('.furniture').classList.remove('select-sidebar'); 
     document.querySelector('.room').classList.remove('select-sidebar');
     furnitureSideBar = 0;
     roomSideBar = 0;
     hideAllContents();
     document.querySelector('.home-spacelist').style.display = 'block';
     document.querySelector('.space').classList.add('select-sidebar');
     spaceSideBar++;
    }else if(e.target.classList.contains('space') && spaceSideBar === 1){
     document.querySelector('.home-spacelist').style.display = 'none';
     document.querySelector('.space').classList.remove('select-sidebar');
     spaceSideBar--;
    }else if(e.target.classList.contains('fa-person-shelter') && spaceSideBar === 1){
     document.querySelector('.home-spacelist').style.display = 'none';
     document.querySelector('.space').classList.remove('select-sidebar');
     spaceSideBar--;
    }else if(e.target.classList.contains('furniture') && furnitureSideBar === 0){
     document.querySelector('.space').classList.remove('select-sidebar'); 
     document.querySelector('.room').classList.remove('select-sidebar');
     spaceSideBar = 0;
     roomSideBar = 0;
     hideAllContents();
     document.querySelector('.homeright-outer').style.display = 'block';
     document.querySelector('.furniture').classList.add('select-sidebar');
     furnitureSideBar++;
    }else if(e.target.classList.contains('fa-couch') && furnitureSideBar === 0){
     document.querySelector('.space').classList.remove('select-sidebar'); 
     document.querySelector('.room').classList.remove('select-sidebar');
     spaceSideBar = 0;
     roomSideBar = 0;
     hideAllContents();
     document.querySelector('.homeright-outer').style.display = 'block';
     document.querySelector('.furniture').classList.add('select-sidebar');
     furnitureSideBar++;
    }else if(e.target.classList.contains('furniture') && furnitureSideBar === 1){
     document.querySelector('.homeright-outer').style.display = 'none';
     document.querySelector('.furniture').classList.remove('select-sidebar');
     furnitureSideBar--;
    }else if(e.target.classList.contains('fa-couch') && furnitureSideBar === 1){
     document.querySelector('.homeright-outer').style.display = 'none';
     document.querySelector('.furniture').classList.remove('select-sidebar');
     furnitureSideBar--;
    }else if(e.target.classList.contains('room') && roomSideBar === 0){
     document.querySelector('.furniture').classList.remove('select-sidebar'); 
     document.querySelector('.space').classList.remove('select-sidebar');
     furnitureSideBar = 0;
     spaceSideBar = 0;
     hideAllContents();
     document.querySelector('.home-roomlist').style.display = 'block';
     document.querySelector('.room').classList.add('select-sidebar');
     roomSideBar++;
    }else if(e.target.classList.contains('fa-house') && roomSideBar === 0){
     document.querySelector('.furniture').classList.remove('select-sidebar'); 
     document.querySelector('.space').classList.remove('select-sidebar');
     furnitureSideBar = 0;
     spaceSideBar = 0;
     hideAllContents();
     document.querySelector('.home-roomlist').style.display = 'block';
     document.querySelector('.room').classList.add('select-sidebar');
     roomSideBar++;
    }else if(e.target.classList.contains('room') && roomSideBar === 1){
     document.querySelector('.home-roomlist').style.display = 'none';
     document.querySelector('.room').classList.remove('select-sidebar');
     roomSideBar--;
    }else if(e.target.classList.contains('fa-house') && roomSideBar === 1){
     document.querySelector('.home-roomlist').style.display = 'none';
     document.querySelector('.room').classList.remove('select-sidebar');
     roomSideBar--;
    }
  });


  document.querySelector(".content-home").addEventListener("mouseover",(e) => {
    if(e.target.classList.contains("space-listCheck")){
      const divSpace = document.createElement('div');
      divSpace.classList.add("balloon-space");
      const pSpace = document.createElement('p');
      pSpace.append("チェック中は追加、取消、削除ボタンをクリックしても一覧メニューは閉じません");
      divSpace.append(pSpace);
      document.querySelector('.balloon-spaceText').append(divSpace);
    }else if(e.target.classList.contains("furniture-listCheck")){
      const divFurniture = document.createElement('div');
      divFurniture.classList.add("balloon-furniture");
      const pFurniture = document.createElement('p');
      pFurniture.append("チェック中は追加、取消、削除ボタンをクリックしても一覧メニューは閉じません");
      divFurniture.append(pFurniture);
      document.querySelector('.balloon-furnitureText').append(divFurniture);
    }else if(e.target.classList.contains("room-listCheck")){    
      const divRoom = document.createElement('div');
      divRoom.classList.add("balloon-room");
      const pRoom = document.createElement('p');
      pRoom.append("チェック中は編集、取消、削除ボタンをクリックしても一覧メニューは閉じません");
      divRoom.append(pRoom);
      document.querySelector('.balloon-roomText').append(divRoom);
    }
  });

  document.querySelector(".content-home").addEventListener("mouseout",(e) => {
    if(e.target.classList.contains("space-listCheck")){
      document.querySelector('.balloon-spaceText').removeChild(document.querySelector('.balloon-space'));
    }else if(e.target.classList.contains("furniture-listCheck")){
      document.querySelector('.balloon-furnitureText').removeChild(document.querySelector('.balloon-furniture'));
    }else if(e.target.classList.contains("room-listCheck")){
      document.querySelector('.balloon-roomText').removeChild(document.querySelector('.balloon-room'));    
    }
  });

/* 公開後の各機能実装時に適用
  let option = 0;

  document.querySelector('.sidebar2').addEventListener("click",() =>{
    if(option === 0){
     document.querySelector('.home-optionlist').style.display = 'block';
     option++;
    }else{
     document.querySelector('.home-optionlist').style.display = 'none';
     option--;
    }
  });
*/
  




console.log(window.innerHeight)

  let checkHome = document.querySelectorAll('[name=checkHome]');
  const genreDropdown = document.querySelector('.genre-dropdown');

  
  genreDropdown.addEventListener('click', function (event) {
      const target = event.target.closest('li');
      
      if (target) {
          const checkbox = target.querySelector('[name="checkHome"]');
          
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
                        const trash = document.createElement("i");
                        trash.classList.add("fa-solid")
                        trash.classList.add("fa-trash-can")
                        editBtn.append(trash);
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
                  checkHome.forEach((checkbox) => {
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
                      newCheckbox.name = 'checkHome';
                      list.append(newCheckbox, label);
                      genreDropdown.appendChild(list);
  
                      checkHome = document.querySelectorAll('[name=checkHome]');

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
                          const trash = document.createElement("i");
                          trash.classList.add("fa-solid")
                          trash.classList.add("fa-trash-can")
                          editBtn.append(trash);
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

  document.querySelector(".content-cert2").style.display = "none";
  document.querySelector(".content-cert3").style.display = "none";

  document.querySelector(".send-certmail").addEventListener("submit",function(e){
    e.preventDefault();
    document.querySelector(".cert-btn").disabled = true;
    const loader = document.createElement('div');
    loader.classList.add("loader"); 
    document.querySelector('.cert-loader').append(loader);
    fetch('/mailcert-send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.message){
       document.querySelector(".content-cert1").style.display = "none";
       document.querySelector(".content-cert2").style.display = "block";
      }else if(data.error){
        console.log("失敗")
      }
      document.querySelector(".cert-btn").disabled = false;
      document.querySelector('.cert-loader').removeChild(loader);
    })
    .catch((error) => {
      console.error('Error:', error);
      document.querySelector(".cert-btn").disabled = false;
      document.querySelector('.cert-loader').removeChild(loader);
    });
  })

  document.querySelector(".cansel-certbtn").addEventListener("click",function(){
    document.querySelector(".content-cert2").style.display = "none";
    document.querySelector(".content-cert1").style.display = "block";
  })

  document.querySelector(".send-certbtn").addEventListener("click",function(){
    fetch('/get-cert-confirmCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // レスポンスをJSONとして解析
      .then((data) => {
        if(data.code === document.querySelector(".confirm-form").value){
          document.querySelector(".content-cert2").style.display = "none";
          document.querySelector(".content-cert3").style.display = "block";
          window.setTimeout(() => {
            document.querySelector(".content-cert3").style.display = "none";
            document.querySelector(".content-cert1").style.display = "block";
          }, 20000);
          fetch('/get-change-icon', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => response.json())
          .then(data => {
            const mailCertIcon = document.querySelector('.mailcert-icon');
            while (mailCertIcon.firstChild) {
             mailCertIcon.removeChild(mailCertIcon.firstChild);
            };
            const i = document.createElement('i');
            i.classList.add("fa-solid");
            i.classList.add("fa-circle-check");
            i.classList.add("mailcert-clear");
            document.querySelector(".mailcert-icon").append(i);
            function rotateImage2() {
              document.querySelector(".icon2").classList.add('rotating'); // 回転クラスを追加
     
              setTimeout(function() {
                document.querySelector(".icon2").classList.remove('rotating');
              }, 2000);
            
              setTimeout(rotateImage, 7000);
            }

            rotateImage2();
            })
          .catch(error => {
            console.error('エラー:', error);
          });
        }else if(data.error){
          const divReset = document.createElement('div');
          divReset.classList.add("balloon-reset2");
          const pReset = document.createElement('p');
          pReset.append("コード発行から5分が経過した為、要求は無効となります。前の手順に戻って再度新しいコードをリクエストしてください。"); 
          divReset.append(pReset);
          document.querySelector('.balloon-resetText').append(divReset);
          window.setTimeout(() => {
            document.querySelector('.balloon-resetText').removeChild(divReset);
          }, 8000);
        }else{
          const divReset = document.createElement('div');
          divReset.classList.add("balloon-reset");
          const pReset = document.createElement('p');
          pReset.append("コードが一致しません"); // サーバーからのエラーメッセージを表示
          divReset.append(pReset);
          document.querySelector('.balloon-resetText').append(divReset);
          window.setTimeout(() => {
            document.querySelector('.balloon-resetText').removeChild(divReset);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  })


  document.querySelector(".content-change2").style.display = "none";
  document.querySelector(".content-change3").style.display = "none";

  document.querySelector(".mailchange-btn").addEventListener("click",function(){
    document.querySelector(".content-change1").style.display = "none";
    document.querySelector(".content-change2").style.display = "block";
  })

  document.querySelector(".cansel-changebtn").addEventListener("click",function(){
    document.querySelector(".content-change2").style.display = "none";
    document.querySelector(".content-change1").style.display = "block";
  })

  // エラーメッセージをクリアする関数
function clearErrorMessages() {
  const errorElements = document.getElementsByClassName('error-message');
  Array.from(errorElements).forEach(element => {
    element.innerText = '';
  });
}

// エラーメッセージを表示する関数1
function displayErrorMessage(field, message) {
  const errorElement = document.getElementById(`${field}-error`);
  errorElement.innerText = message;
}


// エラーメッセージを表示する関数2
function displayErrors(errors) {

  const emailError = document.getElementById('email-error');

  // エラーメッセージをクリア
  emailError.innerText = '';

  // サーバーからのエラーメッセージを表示
  if (errors && errors.errors && Array.isArray(errors.errors) && errors.errors.length > 0) {
    errors.errors.forEach((error) => {
      if (error.path === 'email') {
        emailError.innerText = error.msg;
        window.setTimeout(() => {
          emailError.innerText = "";
        }, 2000);
      } else if (error.path === 'emailConfirm') {
        displayErrorMessage('email-confirm', error.msg);
        window.setTimeout(() => {
          document.querySelector("#email-confirm-error").innerText = "";
        }, 2000);
      }
    });
  }
}

  document.querySelector(".mailchange-btn2").addEventListener('click', async () => {
    // エラーメッセージをクリア
    clearErrorMessages();

    const email = document.getElementById('email').value;
    const emailConfirm = document.getElementById('email-confirm').value;
  
    const data = {
      email: email,
      emailConfirm: emailConfirm 
    };
  
    try {
      const response = await fetch('/changeMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        // レスポンスがエラーの場合、サーバーから返されたエラーメッセージを取得
        const errors = await response.json();
        // エラーメッセージを表示
        displayErrors(errors);
        
        return; // レスポンスがエラーの場合はここで処理を終了
      }

      console.log('User registered successfully!');

      document.querySelector(".content-change2").style.display = "none";
      document.querySelector(".content-change3").style.display = "block";
      window.setTimeout(() => {
        document.querySelector(".content-change3").style.display = "none";
        document.querySelector(".content-change1").style.display = "block";
      }, 20000);

      function rotateImage2() {
        document.querySelector(".icon3").classList.add('rotating'); // 回転クラスを追加

        setTimeout(function() {
          document.querySelector(".icon3").classList.remove('rotating');
        }, 2000);
      
        setTimeout(rotateImage, 7000);
      }

      rotateImage2();
  
      // メールアドレス変更成功時の処理
      const result = await response.json();

      while (document.querySelector(".register-mail").firstChild) {
        document.querySelector(".register-mail").removeChild(document.querySelector(".register-mail").firstChild);
      };
      document.querySelector(".register-mail").append(result.email);

      while (document.querySelector(".mailcert-icon").firstChild) {
        document.querySelector(".mailcert-icon").removeChild(document.querySelector(".mailcert-icon").firstChild);
      };
      const i = document.createElement('i');
      i.classList.add("fa-solid");
      i.classList.add("fa-circle-exclamation");
      i.classList.add("mailcert-not");
      document.querySelector(".mailcert-icon").append(i)
    } catch (error) {
      console.error('Error:', error);
    }

  });

  document.querySelector(".content-delete1").style.display = "none";
  document.querySelector(".content-delete2").style.display = "none";
  document.querySelector(".content-delete3").style.display = "none";
  
  document.querySelector("#user-delete").addEventListener("click", userDelete);
  function userDelete(){
    this.style.pointerEvents = "none";
    document.querySelector(".content-delete1").style.display = "block";
  }

  document.querySelector(".delete-no-btn1").addEventListener("click",function(){
    document.querySelector(".content-delete1").style.display = "none";
    document.querySelector(".content-delete2").style.display = "none";
    document.querySelector(".content-delete3").style.display = "none";
    document.querySelector("#user-delete").style.pointerEvents = "auto";
  })

  document.querySelector(".delete-no-btn2").addEventListener("click",function(){
    document.querySelector(".content-delete1").style.display = "none";
    document.querySelector(".content-delete2").style.display = "none";
    document.querySelector(".content-delete3").style.display = "none";
    document.querySelector("#user-delete").style.pointerEvents = "auto";
  })

  document.querySelector(".delete-yes-btn1").addEventListener("click", userDeleteBtn1);
  function userDeleteBtn1(){
    document.querySelector(".content-delete1").style.display = "none";
    document.querySelector(".content-delete2").style.display = "block";
  }

  function userDeleteData(){
    fetch('/user-delete-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = data.redirect;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  document.querySelector(".delete-yes-btn2").addEventListener("click", userDeleteBtn2);
  function userDeleteBtn2(){
    document.querySelector("#logout-button").style.pointerEvents = "none";
    document.querySelector(".content-delete2").style.display = "none";
    document.querySelector(".content-delete3").style.display = "block";
    window.setTimeout(() => {
      userDeleteData();
    }, 20000);
  }

  document.querySelector(".delete-btn3").addEventListener("click", userDeleteBtn3);
  function userDeleteBtn3(){
    userDeleteData();
  }


  document.querySelector(".contact-text2").style.display = "none";
  document.querySelector(".contact-text3").style.display = "none";

  document.querySelector('#contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.querySelector(".cert-sendbtn").disabled = true;
    const loader = document.createElement('div');
    loader.classList.add("loader2"); 
    document.querySelector('.cert-contactloader').append(loader);
    const messageText = document.querySelector(".textarea-text").value;
    const dataToSend = {
      message: messageText
    };
    
    fetch('/send-contact-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend) // データをJSON文字列に変換
    })
    .then(response => response.json())
    .then(data => {
      if(data.message){
      document.querySelector(".contact-text1").style.display = "none";
      document.querySelector(".contact-text2").style.display = "block";
      window.setTimeout(() => {
        document.querySelector(".textarea-text").value = "";
        document.querySelector(".contact-text2").style.display = "none";
        document.querySelector(".contact-text1").style.display = "block";
      }, 5000);
    }else if(data.error){
      document.querySelector(".contact-text1").style.display = "none";
      document.querySelector(".contact-text3").style.display = "block";
      window.setTimeout(() => {
        document.querySelector(".textarea-text").value = "";
        document.querySelector(".contact-text3").style.display = "none";
        document.querySelector(".contact-text1").style.display = "block";
      }, 5000);
    }
    document.querySelector('.cert-contactloader').removeChild(loader);
    document.querySelector(".cert-sendbtn").disabled = false;
    })
    .catch(error => {
      console.error('送信エラー:', error);
      document.querySelector('.cert-contactloader').removeChild(loader);
      document.querySelector(".cert-sendbtn").disabled = false;
    });
  });
  



 // 空間新規作成ボタンがクリックされたときの処理
  const spaceResetBtn = document.createElement('button');
  spaceResetBtn.classList.add("space-resetbtn");
  spaceResetBtn.append("リセット");
  document.querySelector('.spacecenter-outer').append(spaceResetBtn);
  document.querySelector('.space-resetbtn').style.display = "none";

  const spaceCreate  = require('src/SpaceCreateModule');
  const spaceForm = document.querySelector('.space-form');
  spaceForm.disabled = true;
  const spaceCreateBtn = document.querySelector('.space-createbtn')
  spaceCreateBtn.addEventListener('click', spaceCreate);




 // 家具新規作成ボタンがクリックされたときの処理
  const furnitureResetBtn = document.createElement('button');
  furnitureResetBtn.classList.add("furniture-resetbtn");
  furnitureResetBtn.append("リセット");
  document.querySelector('.furniturecenter-outer').append(furnitureResetBtn);
  document.querySelector('.furniture-resetbtn').style.display = "none";

  const furnitureCreate  = require('src/FurnitureCreateModule');
  const furnitureForm = document.querySelector('.furniture-form');
  const genreForm = document.querySelector('.genre-form');
  furnitureForm.disabled = true;
  genreForm.disabled = true;
  const furnitureCreateBtn = document.querySelector('.furniture-createbtn');
  furnitureCreateBtn.addEventListener('click', furnitureCreate);


  const homecenterInner = document.querySelector('.homecenter-inner');    
  console.log(homecenterInner.offsetWidth, homecenterInner.offsetHeight);

  const stage2 = new Konva.Stage({
    container: homecenterInner,
    width: homecenterInner.offsetWidth-4,
    height: homecenterInner.offsetHeight-4,
  });

  console.log(stage2.width(), stage2.height());

  const spaceList = document.querySelector(".space-list");

  let rectSpBoundsX = [];
  let rectSpBoundsY = [];
  let rectSpBoundsW = [];
  let rectSpBoundsH = [];
  


  spaceList.addEventListener("click", event => {
    if (event.target.classList.contains("addBtn")) {
      if (stage2.getChildren().length === 0) {

        if(!(document.querySelector('.space-listCheck').checked)){
          document.querySelector('.space').classList.remove('select-sidebar');
          document.querySelector('.furniture').classList.remove('select-sidebar'); 
          document.querySelector('.room').classList.remove('select-sidebar');
          furnitureSideBar = 0;
          roomSideBar = 0;
          spaceSideBar = 0;
          hideAllContents();
        }

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
                  strokeWidth: 2, 
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



            const foundRect = newLayer.getChildren().find(node => node instanceof Konva.Rect);
            const rectX = foundRect.x();
            rectSpBoundsX.push(rectX);
            const rectY = foundRect.y();
            rectSpBoundsY.push(rectY);
            const rectW = foundRect.width();
            rectSpBoundsW.push(rectW);
            const rectH = foundRect.height();
            rectSpBoundsH.push(rectH);

            let topRectBorder = [];
            let bottomRectBorder = [];
            let rightRectBorder = [];
            let leftRectBorder = [];

            newLayer.getChildren().forEach(obj => {

            if(obj instanceof Konva.Line){

              if(rectX === obj.points()[0]){

                const line = new Konva.Line({
                  points: obj.points(),
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                if(obj.points().length === 10){
                  leftRectBorder.push(obj.points()[1],obj.points()[9]);
                }else if(obj.points().length === 6){
                  leftRectBorder.push(obj.points()[1],obj.points()[5]);
                };

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(rectX + rectW === obj.points()[0]){

                const line = new Konva.Line({
                  points: obj.points(),
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                if(obj.points().length === 10){
                  rightRectBorder.push(obj.points()[1],obj.points()[9]);
                }else if(obj.points().length === 6){
                  rightRectBorder.push(obj.points()[1],obj.points()[5]);
                };

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(rectY === obj.points()[1]){

                const line = new Konva.Line({
                  points: obj.points(),
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  name: layerInfo.name,
                });

                if(obj.points().length === 10){
                  topRectBorder.push(obj.points()[0],obj.points()[8]);
                  topSpaceRange.push({x1:obj.points()[0],x2:obj.points()[8],y:obj.points()[3],name:obj.name()});
                }else if(obj.points().length === 6){
                  topRectBorder.push(obj.points()[0],obj.points()[4]);
                  topSpaceRange.push({x1:obj.points()[0],x2:obj.points()[4],y:obj.points()[3],name:obj.name()});
                };

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(rectY + rectH === obj.points()[1]){

                const line = new Konva.Line({
                  points: obj.points(),
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                if(obj.points().length === 10){
                  bottomRectBorder.push(obj.points()[0],obj.points()[8]);
                }else if(obj.points().length === 6){
                  bottomRectBorder.push(obj.points()[0],obj.points()[4]);
                };

                newLayer.add(line);
                stage2.add(newLayer);

              };

            }else if(obj instanceof Konva.Shape){
              if(obj.clear && rectX === obj.clear[0] && rectY-1 === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);
               
              }else if(obj.clear && rectX + rectW - obj.clear[2] === obj.clear[0] && rectY-1 === obj.clear[1]){  

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectY === obj.clear[1] && rectX-1 === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectY + rectH - obj.clear[3] === obj.clear[1] && rectX-1 === obj.clear[0]){  

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectY+1 + rectH - obj.clear[3] === obj.clear[1] && rectX === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);
                
              }else if(obj.clear && rectY+1 + rectH - obj.clear[3] === obj.clear[1] && rectX + rectW - obj.clear[2] === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);        
                
              }else if(obj.clear && rectX+1 + rectW - obj.clear[2] === obj.clear[0] && rectY === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectX+1 + rectW - obj.clear[2] === obj.clear[0] && rectY + rectH - obj.clear[3] === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else {

              if(obj.clear && rectX-1 === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectX + rectW - obj.clear[2]+1 === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)                   
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectY-1 === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)   
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                topSpaceRange.push({x1:obj.clear[0],x2:obj.clear[0]+obj.clear[2],y:obj.clear[1]+obj.clear[3],name:obj.name()});

                newLayer.add(line);
                stage2.add(newLayer);
              
              }else if(obj.clear && rectY + rectH - obj.clear[3]+1 === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)         
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)   
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX-1 === obj.clearLine1[0] && rectY-1 !== obj.clearLine2[1] && rectY + rectH+1 !== obj.clearLine2[1] &&
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1])){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX+1 + rectW === obj.clearLine1[0] && rectY-1 !== obj.clearLine2[1] && rectY + rectH+1 !== obj.clearLine2[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1])){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(Math.round(rectX + rectW) === Math.round(obj.clearLine2[0]) && Math.round(rectX + rectW) === Math.round(obj.clearLine3[0])) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1])){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectY+1 + rectH === obj.clearLine1[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(Math.round(rectX + rectW) === Math.round(obj.clearLine2[0]) && Math.round(rectX + rectW) === Math.round(obj.clearLine3[0])) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1])){
                

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && rectY-1 === obj.clearLine3[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(rectX + rectW+1 === obj.clearLine2[0] && rectX + rectW+1 === obj.clearLine3[0]) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1]) &&
              !(rectX-1 === obj.clearLine2[0]) &&
              !(rectX-1 === obj.clearLine1[0])){


                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY+1 + rectH === obj.clearLine1[1] && rectY+1 + rectH === obj.clearLine3[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1]) &&
              !(rectX-1 === obj.clearLine2[0]) &&
              !(rectX + rectW+1 === obj.clearLine2[0])){


                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && rectY-1 === obj.clearLine3[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && Math.round(rectX + rectW) === Math.round(obj.clearLine2[0]) && Math.round(rectX + rectW) === Math.round(obj.clearLine3[0]) && rectY-1 === obj.clearLine1[1] && rectY-1 === obj.clearLine3[1]){

                
                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0] && rectY+1 + rectH === obj.clearLine1[1] && rectY+1 + rectH === obj.clearLine3[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && Math.round(rectX + rectW) === Math.round(obj.clearLine2[0]) && Math.round(rectX + rectW) === Math.round(obj.clearLine3[0]) && rectY+1 + rectH === obj.clearLine1[1] && rectY+1 + rectH === obj.clearLine3[1]){
                

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1] && rectX-1 === obj.clearLine1[0] && rectX-1 === obj.clearLine3[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1] && rectX+1 + rectW === obj.clearLine1[0] && rectX+1 + rectW === obj.clearLine3[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);


                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1] && rectX-1 === obj.clearLine1[0] && rectX-1 === obj.clearLine3[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);


                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1] && rectX+1 + rectW === obj.clearLine1[0] && rectX+1 + rectW === obj.clearLine3[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);


                newLayer.add(line);
                stage2.add(newLayer);
                
              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && rectX-1 === obj.clearLine2[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);


                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX-1 === obj.clearLine1[0] && rectY-1 === obj.clearLine2[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && rectX + rectW +1 === obj.clearLine2[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX + rectW +1 === obj.clearLine1[0] && rectY-1 === obj.clearLine2[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                topRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY + rectH+1 === obj.clearLine1[1] && rectX-1 === obj.clearLine2[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX-1 === obj.clearLine1[0] && rectY + rectH+1  === obj.clearLine2[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY + rectH+1 === obj.clearLine1[1] && rectX + rectW+1 === obj.clearLine2[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX + rectW+1 === obj.clearLine1[0] && rectY + rectH+1 === obj.clearLine2[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                });

                bottomRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }

            };

            };
             
            });


            const topBorder = topRectBorder.sort((a, b) => a - b);
            const topMax = topBorder.length;
            const bottomBorder = bottomRectBorder.sort((a, b) => a - b);
            const bottomMax = bottomBorder.length;
            const leftBorder = leftRectBorder.sort((a, b) => a - b);
            const leftMax = leftBorder.length;
            const rightBorder = rightRectBorder.sort((a, b) => a - b);
            const rightMax = rightBorder.length;

          if (topBorder.length === topMax) {
            if(topBorder.length === 0){
              const line = new Konva.Line({
                points: [rectX,rectY,rectX+rectW,rectY],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
              });
  
              newLayer.add(line);
              stage2.add(newLayer);
            }else{
              const firstPoint = topBorder.shift();
              const line = new Konva.Line({
                points: [rectX,rectY,firstPoint,rectY],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
              });

              newLayer.add(line);
              stage2.add(newLayer);
            }
          }

          while (topBorder.length > 1) {
              const point1 = topBorder.shift();
              const point2 = topBorder.shift();

              const line = new Konva.Line({
                points: [point1,rectY,point2,rectY],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
              });

              newLayer.add(line);
              stage2.add(newLayer);       
          }
          
          if (topBorder.length === 1) {

              const lastPoint = topBorder.shift();
              const line = new Konva.Line({
                points: [lastPoint,rectY,rectX+rectW,rectY],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
              });

              newLayer.add(line);
              stage2.add(newLayer);
          }


          if (bottomBorder.length === bottomMax) {
            if(bottomBorder.length === 0){
              const line = new Konva.Line({
                points: [rectX,rectY+rectH,rectX+rectW,rectY+rectH],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
              });
    
              newLayer.add(line);
              stage2.add(newLayer);
            }else{
            const firstPoint = bottomBorder.shift();
            const line = new Konva.Line({
              points: [rectX,rectY+rectH,firstPoint,rectY+rectH],
              stroke: "black", 
              strokeWidth: 2, 
              closed: false,
            });

            newLayer.add(line);
            stage2.add(newLayer);
          }
        }

        while (bottomBorder.length > 1) {
            const point1 = bottomBorder.shift();
            const point2 = bottomBorder.shift();

            const line = new Konva.Line({
              points: [point1,rectY+rectH,point2,rectY+rectH],
              stroke: "black", 
              strokeWidth: 2, 
              closed: false,
            });

            newLayer.add(line);
            stage2.add(newLayer);       
        }
        
        if (bottomBorder.length === 1) {

            const lastPoint = bottomBorder.shift();
            const line = new Konva.Line({
              points: [lastPoint,rectY+rectH,rectX+rectW,rectY+rectH],
              stroke: "black", 
              strokeWidth: 2, 
              closed: false,
            });

            newLayer.add(line);
            stage2.add(newLayer);
        }
       

        if (leftBorder.length === leftMax) {
          if(leftBorder.length === 0){
            const line = new Konva.Line({
              points: [rectX,rectY,rectX,rectY+rectH],
              stroke: "black", 
              strokeWidth: 2, 
              closed: false,
            });
    
            newLayer.add(line);
            stage2.add(newLayer);
          }else{
          const firstPoint = leftBorder.shift();
          const line = new Konva.Line({
            points: [rectX,rectY,rectX,firstPoint],
            stroke: "black", 
            strokeWidth: 2, 
            closed: false,
          });

          newLayer.add(line);
          stage2.add(newLayer);
          }  
      }

      while (leftBorder.length > 1) {
          const point1 = leftBorder.shift();
          const point2 = leftBorder.shift();

          const line = new Konva.Line({
            points: [rectX,point1,rectX,point2],
            stroke: "black", 
            strokeWidth: 2, 
            closed: false,
          });

          newLayer.add(line);
          stage2.add(newLayer);       
      }
      
      if (leftBorder.length === 1) {

          const lastPoint = leftBorder.shift();
          const line = new Konva.Line({
            points: [rectX,lastPoint,rectX,rectY+rectH],
            stroke: "black", 
            strokeWidth: 2, 
            closed: false,
          });

          newLayer.add(line);
          stage2.add(newLayer);
      }


      if (rightBorder.length === rightMax) {
        if(rightBorder.length === 0){
          const line = new Konva.Line({
            points: [rectX+rectW,rectY,rectX+rectW,rectY+rectH],
            stroke: "black", 
            strokeWidth: 2, 
            closed: false,
          });
    
          newLayer.add(line);
          stage2.add(newLayer);
        }else{
        const firstPoint = rightBorder.shift();
        const line = new Konva.Line({
          points: [rectX+rectW,rectY,rectX+rectW,firstPoint],
          stroke: "black", 
          strokeWidth: 2, 
          closed: false,
        });

        newLayer.add(line);
        stage2.add(newLayer);
      } 
    }

    while (rightBorder.length > 1) {
        const point1 = rightBorder.shift();
        const point2 = rightBorder.shift();

        const line = new Konva.Line({
          points: [rectX+rectW,point1,rectX+rectW,point2],
          stroke: "black", 
          strokeWidth: 2, 
          closed: false,
        });

        newLayer.add(line);
        stage2.add(newLayer);       
    }
    
    if (rightBorder.length === 1) {

        const lastPoint = rightBorder.shift();
        const line = new Konva.Line({
          points: [rectX+rectW,lastPoint,rectX+rectW,rectY+rectH],
          stroke: "black", 
          strokeWidth: 2, 
          closed: false,
        });

        newLayer.add(line);
        stage2.add(newLayer);
    }

  
            // 描画が完了した後の処理を行う
            newLayer.on('draw', function () {
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

      } else {
        const liElement = event.target.closest("li");
        const spaceFormValue = liElement.firstChild.textContent.trim();
        if(stage2.getChildren(node => node.getClassName() === 'Layer')[0].name() === spaceFormValue){
          const spaceFormError = document.createElement("p");
          spaceFormError.classList.add("home-form-error");
          document.querySelector(".homecenter-outer").append(spaceFormError);
          document.querySelector(".home-form-error").textContent = "※この部屋名は既に追加されています※";
        }else{
        const spaceFormError = document.createElement("p");
         spaceFormError.classList.add("home-form-error");
         document.querySelector(".homecenter-outer").append(spaceFormError);
         document.querySelector(".home-form-error").textContent = "※表示中の部屋を取消後、再度追加してください※";
        }
      }
        
      } else if (event.target.classList.contains("cancelBtn")) {
        if(!(document.querySelector('.space-listCheck').checked)){
          document.querySelector('.space').classList.remove('select-sidebar');
          document.querySelector('.furniture').classList.remove('select-sidebar'); 
          document.querySelector('.room').classList.remove('select-sidebar');
          furnitureSideBar = 0;
          roomSideBar = 0;
          spaceSideBar = 0;
          hideAllContents();
        }
        if(document.querySelector(".home-form-error") && document.querySelector(".home-form-error").textContent !== ""){
          document.querySelector(".home-form-error").textContent = "";
        }
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
          const deleteLayers = stage2.getLayers().slice();
          deleteLayers.forEach(deleteLayer => {
            if (deleteLayer instanceof Konva.Layer) {
              deleteLayer.destroy();
            }
          });

          if(overWrite && overWrite.style.display === 'block'){
          overWrite.style.display = 'none';
          document.querySelector(".home-compbtn").style.display = 'block';
          document.querySelector(".home-form").value = "";
          }


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
    if (event.target.classList.contains("editBtn")||event.target.classList.contains("fa-trash-can")) {
      if(!(document.querySelector('.space-listCheck').checked)){
        document.querySelector('.space').classList.remove('select-sidebar');
        document.querySelector('.furniture').classList.remove('select-sidebar'); 
        document.querySelector('.room').classList.remove('select-sidebar');
        furnitureSideBar = 0;
        roomSideBar = 0;
        spaceSideBar = 0;
        hideAllContents();
      }

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

  let topSpaceRange = [];


  furnitureList.addEventListener("click", event => {
    if (event.target.classList.contains("editBtn")||event.target.classList.contains("fa-trash-can")) {
      if(!(document.querySelector('.furniture-listCheck').checked)){
        document.querySelector('.space').classList.remove('select-sidebar');
        document.querySelector('.furniture').classList.remove('select-sidebar'); 
        document.querySelector('.room').classList.remove('select-sidebar');
        furnitureSideBar = 0;
        roomSideBar = 0;
        spaceSideBar = 0;
        hideAllContents();
      }

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


  let rectFnBoundsX = [];
  let rectFnBoundsY = [];
  let rectFnBoundsW = [];
  let rectFnBoundsH = [];


  furnitureList.addEventListener("click", event => {
    if (event.target.classList.contains("addBtn")) {
      if (stage2.getChildren().length > 0) {

        if(!(document.querySelector('.furniture-listCheck').checked)){
          document.querySelector('.space').classList.remove('select-sidebar');
          document.querySelector('.furniture').classList.remove('select-sidebar'); 
          document.querySelector('.room').classList.remove('select-sidebar');
          furnitureSideBar = 0;
          roomSideBar = 0;
          spaceSideBar = 0;
          hideAllContents();
        }
    
      const liElement = event.target.closest("li");
      const furnitureFormValue = liElement.firstChild.textContent.trim();
      if(stage2.getChildren(node => node.getClassName() === 'Layer').slice(1).some(layer => layer.name() === furnitureFormValue)){
        const spaceFormError = document.createElement("p");
        spaceFormError.classList.add("home-form-error");
        document.querySelector(".homecenter-outer").append(spaceFormError);
        document.querySelector(".home-form-error").textContent = "※この家具は既に追加されています※";
      }else{


        console.log(stage2.getChildren(node => node.getClassName() === 'Layer'))

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
      
         /* ドラッグ範囲制御機能一時中断 
          let first1X0 = null;
          let first2X0 = null;
          let first0Y = null;

          let firstX1 = null;
          let first1Y = null;

          let firstX2 = null;
          let first2Y = null;


          let firstShape1X0 = null;
          let firstShape2X0 = null;
          let firstShape0Y = null;

          let firstShapeX1 = null;
          let firstShape1Y = null;

          let firstShapeX2 = null;
          let firstShape2Y = null;

          let firstShape2X1 = null;
          let firstShape2X2 = null;

          let lock = false;*/
          layerData.layerData.layers.forEach(layerInfo => {
            console.log(rectSpBoundsX[0])
            const newLayer = new Konva.Layer({
              name: layerInfo.name, 
              draggable: true,
              
              /* ドラッグ範囲制御機能一時中断 
              
              dragBoundFunc: (pos) =>{
                
                const sameNameW = rectFnBoundsW.find(n => n.name === furnitureFormValue);
                const sameNameH = rectFnBoundsH.find(n => n.name === furnitureFormValue);

               


                let newY = pos.y;
                let newX = pos.x;

                const minRectX = rectSpBoundsX[0]-(homecenterInner.offsetWidth/2)+(sameNameW.width/2);
                const maxRectX = rectSpBoundsX[0]-(homecenterInner.offsetWidth/2) + rectSpBoundsW[0]-(sameNameW.width/2);   
                const minRectY = rectSpBoundsY[0]-(homecenterInner.offsetHeight/2)+(sameNameH.height/2); 
                const maxRectY = rectSpBoundsY[0]-(homecenterInner.offsetHeight/2) + rectSpBoundsH[0]-(sameNameH.height/2); 


                const topSpRangeChange = topSpaceRange.sort((a, b) => a.x1 - b.x1);

                topSpRangeChange.forEach(element => {
                  if(element.x1 > element.x2){
                    [element.x1,element.x2] = [element.x2,element.x1];
                  }
                })

                const topSpRangeChangeX2 = topSpRangeChange.slice().sort((a, b) => b.x2 - a.x2);
                const topSpRangeChangeShapeX1 = topSpRangeChange.slice().sort((a, b) => b.x1 - a.x1);
                

                console.log(topSpaceRange)
                console.log(topSpRangeChange)
                console.log(topSpRangeChangeX2)

                console.log(pos.x);
                console.log(pos.x + sameNameW.width);

              

               
                const matchElemTopLineY = topSpRangeChange.find((element) => rectSpBoundsY[0]-(homecenterInner.offsetHeight/2)+(sameNameH.height/2) > pos.y && pos.y > element.y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2))
                 

        
              
                if(first1X0 === null){
                  const matchElemTopX = topSpRangeChange.find((element) => element.x1-(homecenterInner.offsetWidth/2) < pos.x && pos.x < element.x2-(homecenterInner.offsetWidth/2))
                  if(matchElemTopX && matchElemTopX.y-(homecenterInner.offsetHeight/2) < minRectY){
                    first1X0 = matchElemTopX.x1;
                    first2X0 = matchElemTopX.x2;
                    first0Y = matchElemTopX.y;
                    }
                  }


                if(firstX2 === null){
                if(firstX1 === null){
                  const matchElemTopX2 = topSpRangeChange.find((element) => element.x1-(homecenterInner.offsetWidth/2) > pos.x-(sameNameW.width/2) && pos.y < minRectY)
                  if(matchElemTopX2 && matchElemTopX2.y-(homecenterInner.offsetHeight/2) < minRectY){
                    firstX1 = matchElemTopX2.x1;
                    first1Y = matchElemTopX2.y;
                    console.log(firstX1)
                  }
                }
              }

                if(firstX1 === null){
                if(firstX2 === null){
                  const matchElemTopX3 = topSpRangeChangeX2.find((element) => element.x2-(homecenterInner.offsetWidth/2) < pos.x+(sameNameW.width/2) && pos.y < minRectY)
                  if(matchElemTopX3 && matchElemTopX3.y-(homecenterInner.offsetHeight/2) < minRectY){
                    firstX2 = matchElemTopX3.x2;
                    first2Y = matchElemTopX3.y;
                  }
                }
              }

                const matchElemTopShapeY = topSpRangeChange.find((element) => rectSpBoundsY[0]-(homecenterInner.offsetHeight/2)+(sameNameH.height/2) < pos.y && pos.y < element.y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2))

             
                if(firstShape0Y === null){
                  const matchElemTopShapeX = topSpRangeChange.find((element) =>  element.x1-(homecenterInner.offsetWidth/2) < pos.x && pos.x < element.x2-(homecenterInner.offsetWidth/2))
                  if(matchElemTopShapeX && matchElemTopShapeX.y-(homecenterInner.offsetHeight/2) > minRectY){
                    firstShape0Y = matchElemTopShapeX.y;
                    firstShape1X0 = matchElemTopShapeX.x1;
                    firstShape2X0 = matchElemTopShapeX.x2;
                  }
                }
              

               if(firstShapeX2 === null && firstShape2X2 === null){
                if(firstShapeX1 === null){
                  const matchElemTopShapeX2 = topSpRangeChangeX2.find((element) => element.x1-(homecenterInner.offsetWidth/2)-(sameNameW.width/2) < pos.x && element.y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2) > pos.y)
                  if(matchElemTopShapeX2 && matchElemTopShapeX2.y-(homecenterInner.offsetHeight/2) > minRectY){
                    firstShapeX1 = matchElemTopShapeX2.x1;
                    firstShape1Y = matchElemTopShapeX2.y;
                  }
                }
               }

               if(firstShape2X2 === null){
                if(firstShape2X1 === null){
                  const matchElemTopShapeX2 = topSpRangeChange.find((element) => element.x1-(homecenterInner.offsetWidth/2)-(sameNameW.width/2) > pos.x && element.y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2) > pos.y)
                  if(matchElemTopShapeX2 && matchElemTopShapeX2.y-(homecenterInner.offsetHeight/2) > minRectY){
                    firstShape2X1 = matchElemTopShapeX2.x1;
                  }
                }
               }

               if(firstShapeX1 === null && firstShape2X1 === null){
                if(firstShapeX2 === null){
                  const matchElemTopShapeX3 = topSpRangeChange.find((element) => element.x2-(homecenterInner.offsetWidth/2)+(sameNameW.width/2) > pos.x && element.y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2) > pos.y)
                  if(matchElemTopShapeX3 && matchElemTopShapeX3.y-(homecenterInner.offsetHeight/2) > minRectY){
                    firstShapeX2 = matchElemTopShapeX3.x2;
                    firstShape2Y = matchElemTopShapeX3.y;
                  }
                }
               }

               if(firstShape2X1 === null){
                if(firstShape2X2 === null){
                  const matchElemTopShapeX3 = topSpRangeChangeX2.find((element) => element.x2-(homecenterInner.offsetWidth/2)+(sameNameW.width/2) < pos.x && element.y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2) > pos.y)
                  if(matchElemTopShapeX3 && matchElemTopShapeX3.y-(homecenterInner.offsetHeight/2) > minRectY){
                    firstShape2X2 = matchElemTopShapeX3.x2;
                  }
                }
               }
        

 
                console.log(firstX1)
                console.log(first1Y)
                console.log(firstX2)
                console.log(first2Y)
                console.log(first0Y)
                console.log(first1X0)
                console.log(first2X0)

                console.log(firstShapeX1)
                console.log(firstShape1Y)
                console.log(firstShapeX2)
                console.log(firstShape2Y)
                console.log(firstShape0Y)
                console.log(firstShape1X0)
                console.log(firstShape2X0)
                console.log(firstShape2X1)
                console.log(firstShape2X2)


                //ロックフラグ内の値が代入ごとに更新されなかったのは、スコープの問題だった。Layerコンストラクター外でロックフラグを設定することで改善。
                //matchElemTopX2での範囲設定は不完全なためx1より小さいpos.xの値全てを対象とさせるようにする。
                //最初に取得したx1のelementに対して処理を行うようにする。現在はpos.xより大きいx1を取得するようにしているためドラッグ範囲が変わるほど取得されるx1も変わってしまい、制限箇所も都度変わってしまっている。
                //初めて条件がtrueになった要素の配列１つのみを返すようにする。現在は条件がtrueになる度それぞれの要素の配列を返している。
                //条件発火時のx1のみを取得。
                //条件が解除されたとき、firstX1,firstYをnullにする。そして再び発火時はそのx1,yのみ取得。
                //x2の処理もx1同様
                //x2に対する処理の際furiniture図形が消える理由
                //ロックフラグ適用要
                //matchElemTopLineY,matchElemTopLineY2でx,y座標の制御をしているが、本来matchElemTopLineYはxに対しての制御、matchElemTopLineY2はyに対しての制御。yに対してのロジックがおかしいためmatchElemTopLineY2をmatchElemTopXに変更しブロック内の各条件式でxに対しての条件を設定しているが、yに対して条件に変更する。そうすれば上辺yを超えた場合、上辺yの内側の場合で処理を分けれる。
                //firstY2,Y1X,Y2Xをnullにするブロックの条件を考える→現状の条件ではnullにできていない？nullの有無デバック要
                //1688,1693のx1,x2,yに対する処理でおかしな挙動を起こしているのは、x2の場合、x2を越えて、yを越えたときnewX,Yの制御にnullが代入されている可能性を推測。現在は左のLinex2,右のLinex1にこの現象が起きている。デバック要
                //1X0～2X0の範囲で0Yよりpos.yが上の時X1,X2がnullになる原因を特定
                //nullの状況、null比較を具体的に一旦整理

               if(pos.y < minRectY){ 


                if(matchElemTopLineY){//y座標の範囲
                  if(firstX1-(homecenterInner.offsetWidth/2) > pos.x-(sameNameW.width/2) && first1Y-(homecenterInner.offsetHeight/2) < minRectY){
                    newX = firstX1-(homecenterInner.offsetWidth/2)+(sameNameW.width/2)+2;
                    newY = Math.max(newY,first1Y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2)+2);
                    lock = true;
                  }else if(firstX1-(homecenterInner.offsetWidth/2) < pos.x+(sameNameW.width/2) || pos.y > minRectY){
                    firstX1 = null;
                    first1Y = null;
                    lock = false;
                  }
                  if(firstX2 !== null && first2Y !== null && firstX2-(homecenterInner.offsetWidth/2) < pos.x+(sameNameW.width/2) && first2Y-(homecenterInner.offsetHeight/2) < minRectY){
                    newX = firstX2-(homecenterInner.offsetWidth/2)-(sameNameW.width/2)-2;
                    newY = Math.max(newY,first2Y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2)+2);
                    lock = true;
                  }else if(firstX2-(homecenterInner.offsetWidth/2) > pos.x-(sameNameW.width/2) || pos.y > minRectY){
                      firstX2 = null;
                      first2Y = null;
                      lock = false;
                      console.log(pos.x)
                  }

                }else if(first1X0-(homecenterInner.offsetWidth/2) < pos.x && pos.x < first2X0-(homecenterInner.offsetWidth/2)){//x座標の範囲、すなわちmatchElemTopXが該当
                  if(pos.y-(sameNameH.height/2) < first0Y-(homecenterInner.offsetHeight/2) && first0Y-(homecenterInner.offsetHeight/2) < minRectY){
                    newY = Math.max(newY,first0Y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2)+2);
                    newX = Math.max(first1X0-(homecenterInner.offsetWidth/2)+(sameNameW.width/2)+2,Math.min(newX,first2X0-(homecenterInner.offsetWidth/2)-(sameNameW.width/2)-2));
                  }
                  firstX1 = null;     
                  firstX2 = null;
                  first1Y = null;
                  first2Y = null;
                }else if(firstX1-(homecenterInner.offsetWidth/2) > pos.x-(sameNameW.width/2)){
                  if(pos.y-(sameNameH.height/2) < first1Y-(homecenterInner.offsetHeight/2) && first1Y-(homecenterInner.offsetHeight/2) < minRectY){
                    newY = Math.max(newY,first1Y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2)+2);
                    newX = firstX1-(homecenterInner.offsetWidth/2)+(sameNameW.width/2)+2;
                  }

                }else if(firstX2-(homecenterInner.offsetWidth/2) < pos.x+(sameNameW.width/2)){
                  if(pos.y-(sameNameH.height/2) < first2Y-(homecenterInner.offsetHeight/2) && first2Y-(homecenterInner.offsetHeight/2) < minRectY){
                    newY = Math.max(newY,first2Y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2)+2);
                    newX = firstX2-(homecenterInner.offsetWidth/2)-(sameNameW.width/2)-2;
                  }

                }

               if(!lock){
                if ((rectSpBoundsX[0]-(homecenterInner.offsetWidth/2) < pos.x && pos.x < topSpRangeChange[0].x1-(homecenterInner.offsetWidth/2)) || 
                topSpRangeChange.some((element, index, array) => index < array.length - 1 && element.x2-(homecenterInner.offsetWidth/2) < pos.x && pos.x < array[index + 1].x1-(homecenterInner.offsetWidth/2)) || 
               (topSpRangeChange[topSpRangeChange.length - 1].x2-(homecenterInner.offsetWidth/2) < pos.x && pos.x < rectSpBoundsX[0]-(homecenterInner.offsetWidth/2) + rectSpBoundsW[0])) {

                 newY = Math.max(newY,minRectY+2);

               }
              }
        
              }else if (pos.y > minRectY) {
                //↓if(pos.y < minRectY)のブロック内のfirst0Y,first1X0,first2X0,firstX1,first1Y,firstX2,first2Yに対するnull
                first0Y = null;
                first1X0 = null;
                first2X0 = null;
                firstX1 = null;     
                firstX2 = null;
                first1Y = null;
                first2Y = null;
              
                if(matchElemTopShapeY){

                  if(firstShapeX1 !== null && firstShape1Y !== null && firstShapeX1-(homecenterInner.offsetWidth/2) < pos.x){
                    newX = firstShapeX1-(homecenterInner.offsetWidth/2)-(sameNameW.width/2)-2;
                    firstShape2X1 = null;
                  }else if(firstShapeX1-(homecenterInner.offsetWidth/2) > pos.x){
                    firstShapeX1 = null;
                    firstShape1Y = null;
                  }

                  if(firstShapeX2-(homecenterInner.offsetWidth/2) > pos.x){
                    newX = firstShapeX2-(homecenterInner.offsetWidth/2)+(sameNameW.width/2)+2;
                    firstShape2X2 = null;
                  }else if(firstShapeX2-(homecenterInner.offsetWidth/2) < pos.x){
                    firstShapeX2 = null;
                    firstShape2Y = null;
                  }

                  if(firstShape2X1-(homecenterInner.offsetWidth/2) < pos.x){
                    firstShape2X1 = null;
                  }

                  if(firstShape2X2-(homecenterInner.offsetWidth/2) > pos.x){
                    firstShape2X2 = null;
                  }

                }else if(firstShape1X0-(homecenterInner.offsetWidth/2) < pos.x && pos.x < firstShape2X0-(homecenterInner.offsetWidth/2)){
                  if(pos.y-(sameNameH.height/2) < firstShape0Y-(homecenterInner.offsetHeight/2) && firstShape0Y-(homecenterInner.offsetHeight/2) > minRectY){
                    newY = Math.max(newY,firstShape0Y-(homecenterInner.offsetHeight/2)+(sameNameH.height/2)+2);
                  }
                  firstShapeX1 = null;
                  firstShape1Y = null;
                  firstShapeX2 = null;
                  firstShape2Y = null;

                }else if(firstShape1X0-(homecenterInner.offsetWidth/2) > pos.x || pos.y-(sameNameH.height/2) > firstShape0Y-(homecenterInner.offsetHeight/2)){
                  firstShape0Y = null;
                  firstShape1X0 = null;
                  firstShape2X0 = null;
                }else if(firstShape2X0-(homecenterInner.offsetWidth/2) < pos.x || pos.y-(sameNameH.height/2) > firstShape0Y-(homecenterInner.offsetHeight/2)){
                  firstShape0Y = null;
                  firstShape1X0 = null;
                  firstShape2X0 = null;
                }
              };

                return {
                  x: newX,
                  y: newY,
                };

              },*/
          });
            
            layerInfo.children.forEach(shapeData => {
                // shapeData から必要な情報を取得して図形を作成
                const rect = new Konva.Rect({
                  x: (homecenterInner.offsetWidth - shapeData.width) / 2, 
                  y: (homecenterInner.offsetHeight - shapeData.height) / 2,
                  width: shapeData.width,
                  height: shapeData.height,
                  fill: shapeData.fill,
                  name: layerInfo.name,
                  // その他の必要なプロパティを設定
                });

                const line = new Konva.Line({
                  points: shapeData.points,
                  stroke: shapeData.stroke, 
                  strokeWidth: 2, 
                  closed: shapeData.closed,
                  fill: shapeData.fill,
                  name: layerInfo.name,
                  draggable: true,
                  // その他の必要なプロパティを設定
                });

    
               
                console.log(layerInfo);
                
                const shape = new Konva.Shape({
                  name: layerInfo.name,
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
      

            const foundRect = newLayer.getChildren().find(node => node instanceof Konva.Rect);
            console.log(foundRect)

            const rectName = foundRect.name();

            const rectX = foundRect.x();
            rectFnBoundsX.push(rectX);
            const rectY = foundRect.y();
            rectFnBoundsY.push(rectY);
            const rectW = foundRect.width();
            rectFnBoundsW.push({width:rectW,name:rectName});
            const rectH = foundRect.height();
            rectFnBoundsH.push({height:rectH,name:rectName});


            let topRectBorder = [];
            let bottomRectBorder = [];
            let rightRectBorder = [];
            let leftRectBorder = [];

            let topPoints = [];
            let bottomPoints = [];
            let rightPoints = [];
            let leftPoints = [];


            newLayer.getChildren().forEach(obj => {

            if(obj instanceof Konva.Line){

              if(rectX === obj.points()[0]){

                const line = new Konva.Line({
                  points: obj.points(),
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                if(obj.points().length === 10){
                  leftRectBorder.push(obj.points()[1],obj.points()[9]);
                  leftPoints.push(obj.points()[2]);
                }else if(obj.points().length === 6){
                  leftRectBorder.push(obj.points()[1],obj.points()[5]);
                  leftPoints.push(obj.points()[2]);
                };

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(rectX + rectW === obj.points()[0]){

                const line = new Konva.Line({
                  points: obj.points(),
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                if(obj.points().length === 10){
                  rightRectBorder.push(obj.points()[1],obj.points()[9]);
                  rightPoints.push(obj.points()[2]);
                }else if(obj.points().length === 6){
                  rightRectBorder.push(obj.points()[1],obj.points()[5]);
                  rightPoints.push(obj.points()[2]);
                };

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(rectY === obj.points()[1]){

                const line = new Konva.Line({
                  points: obj.points(),
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                if(obj.points().length === 10){
                  topRectBorder.push(obj.points()[0],obj.points()[8]);
                  topPoints.push(obj.points()[3]);
                }else if(obj.points().length === 6){
                  topRectBorder.push(obj.points()[0],obj.points()[4]);
                  topPoints.push(obj.points()[3]);
                };

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(rectY + rectH === obj.points()[1]){

                const line = new Konva.Line({
                  points: obj.points(),
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                if(obj.points().length === 10){
                  bottomRectBorder.push(obj.points()[0],obj.points()[8]);
                  bottomPoints.push(obj.points()[3]);
                }else if(obj.points().length === 6){
                  bottomRectBorder.push(obj.points()[0],obj.points()[4]);
                  bottomPoints.push(obj.points()[3]);
                };

                newLayer.add(line);
                stage2.add(newLayer);

              };

            }else if(obj instanceof Konva.Shape){
              if(obj.clear && rectX === obj.clear[0] && rectY-1 === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);
               
              }else if(obj.clear && rectX + rectW - obj.clear[2] === obj.clear[0] && rectY-1 === obj.clear[1]){  

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectY === obj.clear[1] && rectX-1 === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectY + rectH - obj.clear[3] === obj.clear[1] && rectX-1 === obj.clear[0]){  

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectY+1 + rectH - obj.clear[3] === obj.clear[1] && rectX === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);
                
              }else if(obj.clear && rectY+1 + rectH - obj.clear[3] === obj.clear[1] && rectX + rectW - obj.clear[2] === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);        
                
              }else if(obj.clear && rectX+1 + rectW - obj.clear[2] === obj.clear[0] && rectY === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectX+1 + rectW - obj.clear[2] === obj.clear[0] && rectY + rectH - obj.clear[3] === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);
                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else {

              if(obj.clear && rectX-1 === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                leftRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectX + rectW - obj.clear[2]+1 === obj.clear[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)                   
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                rightRectBorder.push( obj.clear[1], obj.clear[1] + obj.clear[3]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clear && rectY-1 === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)   
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);

                newLayer.add(line);
                stage2.add(newLayer);
              
              }else if(obj.clear && rectY + rectH - obj.clear[3]+1 === obj.clear[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clear[0], obj.clear[1] + obj.clear[3],                 // 左下の座標 (x, y + height)
                    obj.clear[0], obj.clear[1],                                // 左上の座標 (x, y)
                    obj.clear[0] + obj.clear[2], obj.clear[1],                 // 右上の座標 (x + width, y)         
                    obj.clear[0] + obj.clear[2], obj.clear[1] + obj.clear[3],  // 右下の座標 (x + width, y + height)   
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push( obj.clear[0], obj.clear[0] + obj.clear[2]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX-1 === obj.clearLine1[0] && rectY-1 !== obj.clearLine2[1] && rectY + rectH+1 !== obj.clearLine2[1] &&
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1])){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX+1 + rectW === obj.clearLine1[0] && rectY-1 !== obj.clearLine2[1] && rectY + rectH+1 !== obj.clearLine2[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1])){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(Math.round(rectX + rectW) === Math.round(obj.clearLine2[0]) && Math.round(rectX + rectW) === Math.round(obj.clearLine3[0])) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1])){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectY+1 + rectH === obj.clearLine1[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(Math.round(rectX + rectW) === Math.round(obj.clearLine2[0]) && Math.round(rectX + rectW) === Math.round(obj.clearLine3[0])) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1])){
                

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && rectY-1 === obj.clearLine3[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(rectX + rectW+1 === obj.clearLine2[0] && rectX + rectW+1 === obj.clearLine3[0]) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1]) &&
              !(rectX-1 === obj.clearLine2[0]) &&
              !(rectX-1 === obj.clearLine1[0])){


                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY+1 + rectH === obj.clearLine1[1] && rectY+1 + rectH === obj.clearLine3[1] && 
              !(rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0]) && 
              !(rectX + rectW === obj.clearLine2[0] && rectX + rectW === obj.clearLine3[0]) &&
              !(rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1]) &&
              !(rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1]) &&
              !(rectX-1 === obj.clearLine2[0]) &&
              !(rectX + rectW+1 === obj.clearLine2[0])){


                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                
                    obj.clearLine3[0], obj.clearLine3[1],                
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && rectY-1 === obj.clearLine3[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && Math.round(rectX + rectW) === Math.round(obj.clearLine2[0]) && Math.round(rectX + rectW) === Math.round(obj.clearLine3[0]) && rectY-1 === obj.clearLine1[1] && rectY-1 === obj.clearLine3[1]){

                
                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && rectX === obj.clearLine2[0] && rectX === obj.clearLine3[0] && rectY+1 + rectH === obj.clearLine1[1] && rectY+1 + rectH === obj.clearLine3[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && Math.round(rectX + rectW) === Math.round(obj.clearLine2[0]) && Math.round(rectX + rectW) === Math.round(obj.clearLine3[0]) && rectY+1 + rectH === obj.clearLine1[1] && rectY+1 + rectH === obj.clearLine3[1]){
                

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1] && rectX-1 === obj.clearLine1[0] && rectX-1 === obj.clearLine3[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && rectY === obj.clearLine2[1] && rectY === obj.clearLine3[1] && rectX+1 + rectW === obj.clearLine1[0] && rectX+1 + rectW === obj.clearLine3[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);


                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1] && rectX-1 === obj.clearLine1[0] && rectX-1 === obj.clearLine3[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);


                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && rectY + rectH === obj.clearLine2[1] && rectY + rectH === obj.clearLine3[1] && rectX+1 + rectW === obj.clearLine1[0] && rectX+1 + rectW === obj.clearLine3[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                           
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);


                newLayer.add(line);
                stage2.add(newLayer);
                
              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && rectX-1 === obj.clearLine2[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);


                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX-1 === obj.clearLine1[0] && rectY-1 === obj.clearLine2[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY-1 === obj.clearLine1[1] && rectX + rectW +1 === obj.clearLine2[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX + rectW +1 === obj.clearLine1[0] && rectY-1 === obj.clearLine2[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                topRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY + rectH+1 === obj.clearLine1[1] && rectX-1 === obj.clearLine2[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX-1 === obj.clearLine1[0] && rectY + rectH+1  === obj.clearLine2[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                leftRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] !== obj.clearLine3[0] && obj.clearLine2[0] === obj.clearLine3[0] && rectY + rectH+1 === obj.clearLine1[1] && rectX + rectW+1 === obj.clearLine2[0]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine1[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine2[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }else if(obj.clearLine1 && obj.clearLine1[0] === obj.clearLine3[0] && obj.clearLine2[0] !== obj.clearLine3[0] && rectX + rectW+1 === obj.clearLine1[0] && rectY + rectH+1 === obj.clearLine2[1]){

                const line = new Konva.Line({
                  points: [
                    obj.clearLine1[0], obj.clearLine1[1],                
                    obj.clearLine2[0], obj.clearLine2[1],                              
                  ],
                  stroke: "black", 
                  strokeWidth: 2, 
                  closed: false,
                  fill: "black",
                  name: layerInfo.name,
                });

                bottomRectBorder.push(obj.clearLine2[0],obj.clearLine3[0]);
                rightRectBorder.push(obj.clearLine1[1],obj.clearLine3[1]);

                newLayer.add(line);
                stage2.add(newLayer);

              }

            };

            };
             
            });


            const topBorder = topRectBorder.sort((a, b) => a - b);
            const topMax = topBorder.length;
            const bottomBorder = bottomRectBorder.sort((a, b) => a - b);
            const bottomMax = bottomBorder.length;
            const leftBorder = leftRectBorder.sort((a, b) => a - b);
            const leftMax = leftBorder.length;
            const rightBorder = rightRectBorder.sort((a, b) => a - b);
            const rightMax = rightBorder.length;

          if (topBorder.length === topMax) {
            if(topBorder.length === 0){
              const line = new Konva.Line({
                points: [rectX,rectY,rectX+rectW,rectY],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
                fill: "black",
                name: layerInfo.name,
              });
  
              newLayer.add(line);
              stage2.add(newLayer);
            }else{
              const firstPoint = topBorder.shift();
              const line = new Konva.Line({
                points: [rectX,rectY,firstPoint,rectY],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
                fill: "black",
                name: layerInfo.name,
              });

              newLayer.add(line);
              stage2.add(newLayer);
            }
          }

          while (topBorder.length > 1) {
              const point1 = topBorder.shift();
              const point2 = topBorder.shift();

              const line = new Konva.Line({
                points: [point1,rectY,point2,rectY],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
                fill: "black",
                name: layerInfo.name,
              });

              newLayer.add(line);
              stage2.add(newLayer);       
          }
          
          if (topBorder.length === 1) {

              const lastPoint = topBorder.shift();
              const line = new Konva.Line({
                points: [lastPoint,rectY,rectX+rectW,rectY],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
                fill: "black",
                name: layerInfo.name,
              });

              newLayer.add(line);
              stage2.add(newLayer);
          }


          if (bottomBorder.length === bottomMax) {
            if(bottomBorder.length === 0){
              const line = new Konva.Line({
                points: [rectX,rectY+rectH,rectX+rectW,rectY+rectH],
                stroke: "black", 
                strokeWidth: 2, 
                closed: false,
                fill: "black",
                name: layerInfo.name,
              });
    
              newLayer.add(line);
              stage2.add(newLayer);
            }else{
            const firstPoint = bottomBorder.shift();
            const line = new Konva.Line({
              points: [rectX,rectY+rectH,firstPoint,rectY+rectH],
              stroke: "black", 
              strokeWidth: 2, 
              closed: false,
              fill: "black",
              name: layerInfo.name,
            });

            newLayer.add(line);
            stage2.add(newLayer);
          }
        }

        while (bottomBorder.length > 1) {
            const point1 = bottomBorder.shift();
            const point2 = bottomBorder.shift();

            const line = new Konva.Line({
              points: [point1,rectY+rectH,point2,rectY+rectH],
              stroke: "black", 
              strokeWidth: 2, 
              closed: false,
              fill: "black",
              name: layerInfo.name,
            });

            newLayer.add(line);
            stage2.add(newLayer);       
        }
        
        if (bottomBorder.length === 1) {

            const lastPoint = bottomBorder.shift();
            const line = new Konva.Line({
              points: [lastPoint,rectY+rectH,rectX+rectW,rectY+rectH],
              stroke: "black", 
              strokeWidth: 2, 
              closed: false,
              fill: "black",
              name: layerInfo.name,
            });

            newLayer.add(line);
            stage2.add(newLayer);
        }
       

        if (leftBorder.length === leftMax) {
          if(leftBorder.length === 0){
            const line = new Konva.Line({
              points: [rectX,rectY,rectX,rectY+rectH],
              stroke: "black", 
              strokeWidth: 2, 
              closed: false,
              fill: "black",
              name: layerInfo.name,
            });
    
            newLayer.add(line);
            stage2.add(newLayer);
          }else{
          const firstPoint = leftBorder.shift();
          const line = new Konva.Line({
            points: [rectX,rectY,rectX,firstPoint],
            stroke: "black", 
            strokeWidth: 2, 
            closed: false,
            fill: "black",
            name: layerInfo.name,
          });

          newLayer.add(line);
          stage2.add(newLayer);
          }  
      }

      while (leftBorder.length > 1) {
          const point1 = leftBorder.shift();
          const point2 = leftBorder.shift();

          const line = new Konva.Line({
            points: [rectX,point1,rectX,point2],
            stroke: "black", 
            strokeWidth: 2, 
            closed: false,
            fill: "black",
            name: layerInfo.name,
          });

          newLayer.add(line);
          stage2.add(newLayer);       
      }
      
      if (leftBorder.length === 1) {

          const lastPoint = leftBorder.shift();
          const line = new Konva.Line({
            points: [rectX,lastPoint,rectX,rectY+rectH],
            stroke: "black", 
            strokeWidth: 2, 
            closed: false,
            fill: "black",
            name: layerInfo.name,
          });

          newLayer.add(line);
          stage2.add(newLayer);
      }


      if (rightBorder.length === rightMax) {
        if(rightBorder.length === 0){
          const line = new Konva.Line({
            points: [rectX+rectW,rectY,rectX+rectW,rectY+rectH],
            stroke: "black", 
            strokeWidth: 2, 
            closed: false,
            fill: "black",
            name: layerInfo.name,
          });
    
          newLayer.add(line);
          stage2.add(newLayer);
        }else{
        const firstPoint = rightBorder.shift();
        const line = new Konva.Line({
          points: [rectX+rectW,rectY,rectX+rectW,firstPoint],
          stroke: "black", 
          strokeWidth: 2, 
          closed: false,
          fill: "black",
          name: layerInfo.name,
        });

        newLayer.add(line);
        stage2.add(newLayer);
      } 
    }

    while (rightBorder.length > 1) {
        const point1 = rightBorder.shift();
        const point2 = rightBorder.shift();

        const line = new Konva.Line({
          points: [rectX+rectW,point1,rectX+rectW,point2],
          stroke: "black", 
          strokeWidth: 2, 
          closed: false,
          fill: "black",
          name: layerInfo.name,
        });

        newLayer.add(line);
        stage2.add(newLayer);       
    }
    
    if (rightBorder.length === 1) {

        const lastPoint = rightBorder.shift();
        const line = new Konva.Line({
          points: [rectX+rectW,lastPoint,rectX+rectW,rectY+rectH],
          stroke: "black", 
          strokeWidth: 2, 
          closed: false,
          fill: "black",
          name: layerInfo.name,
        });

        newLayer.add(line);
        stage2.add(newLayer);
    }

  
            // 描画が完了した後の処理を行う
            newLayer.on('draw', function () {
              console.log('レイヤーの描画が完了しました。');
             
            });

            const topLowPoint = topPoints.sort((a, b) => a - b);
            const bottomHeighPoint = bottomPoints.sort((a, b) => b - a);
            const leftLowPoint = leftPoints.sort((a, b) => a - b);
            const rightHeighPoint = rightPoints.sort((a, b) => b - a);





          });

          const errorElement = document.querySelector(".home-form-error");
          if (errorElement && errorElement.textContent !== "") {
              errorElement.textContent = "";
          }  
    
        })
        
        .catch(error => {
            console.error('Error:', error);
        });
      }

      } else {
        const spaceFormError = document.createElement("p");
         spaceFormError.classList.add("home-form-error");
         document.querySelector(".homecenter-outer").append(spaceFormError);
         document.querySelector(".home-form-error").textContent = "※部屋を追加後に家具を追加してください※";
      }
        
      } else if (event.target.classList.contains("cancelBtn")) {
        if(!(document.querySelector('.furniture-listCheck').checked)){
          document.querySelector('.space').classList.remove('select-sidebar');
          document.querySelector('.furniture').classList.remove('select-sidebar'); 
          document.querySelector('.room').classList.remove('select-sidebar');
          furnitureSideBar = 0;
          roomSideBar = 0;
          spaceSideBar = 0;
          hideAllContents();
        }
        // 削除ボタンをクリックした場合の処理
        const liElement = event.target.closest("li");
        const furnitureFormValue = liElement.firstChild.textContent.trim();

    
        // 削除対象のレイヤーを特定
        const layerToRemove = stage2.getChildren(node => node.getClassName() === 'Layer').slice(1).find(node => node.name() === furnitureFormValue);

        console.log('furnitureFormValue:', furnitureFormValue);
        console.log('すべてのステージの子要素:', stage2.children);
        console.log('削除するレイヤー:', layerToRemove);
        
        
        if (layerToRemove instanceof Konva.Layer) {
          layerToRemove.destroy();
          const errorElement = document.querySelector(".home-form-error");
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
            name: shape.name(),
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
            name: shape.name(),
            absolutePositionLine: shape.getAbsolutePosition(),
          };
          layerInfo.children.push(lineData); // 子要素の情報を配列に追加
        }




        if (shapeType === "Shape") {
          const shapeData = {
            type: shape.getType(),
            name: shape.name(),
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
  let homeFormValueTarget;
  let liElementTarget;


  homeList.addEventListener("click", event => {
    if (event.target.classList.contains("editBtn2")) {
      if (stage2.getChildren().length === 0) {
        if(!(document.querySelector('.room-listCheck').checked)){
          document.querySelector('.space').classList.remove('select-sidebar');
          document.querySelector('.furniture').classList.remove('select-sidebar'); 
          document.querySelector('.room').classList.remove('select-sidebar');
          furnitureSideBar = 0;
          roomSideBar = 0;
          spaceSideBar = 0;
          hideAllContents();
        }

      const liElement = event.target.closest("li");
      liElementTarget = liElement;
      const homeFormValue = liElement.firstChild.textContent.trim();
      homeFormValueTarget = homeFormValue;
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

          const layerName = layers.find(obj => obj.name);
          const newLayer1 = new Konva.Layer({
            name: layerName.name,
          });
          
          const newLayer2 = new Konva.Layer({
            name: layerName.name,
            draggable: true,
          });

          let layersAry = [];
          let n = 0;
          
          layers.forEach(layerInfo => {
            
            layerInfo.children.forEach(shapeData => {


                // shapeData から必要な情報を取得して図形を作成
                const rect = new Konva.Rect({
                  x: (homecenterInner.offsetWidth - shapeData.width) / 2, 
                  y: (homecenterInner.offsetHeight - shapeData.height) / 2,
                  width: shapeData.width,
                  height: shapeData.height,
                  fill: shapeData.fill,
                  name: shapeData.name,
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
                  name: shapeData.name,
                  // その他の必要なプロパティを設定
                });

                if (shapeData.absolutePositionLine) {
                  line.setAbsolutePosition(shapeData.absolutePositionLine);
                }

                


                const shape = new Konva.Shape({
                  name: shapeData.name,
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

                const targetLayer = layers.findIndex(layer => layer.children.length > 0); 

                console.log(targetLayer)
                console.log(layers.findIndex(layer => layer.children.length > 0))
                console.log(layers[targetLayer])
                console.log(layers[targetLayer].children)


                if (layers[targetLayer].children.some(child => child === shapeData)) {

                  if(shapeData.hasOwnProperty("absolutePositionLine")){
                    newLayer1.add(line);
                  }else if(shapeData.hasOwnProperty("absolutePositionRect")){
                    newLayer1.add(rect);
                  }else if(shapeData.hasOwnProperty("absolutePositionShape")){
                    newLayer1.add(shape);
                  };
                   } else {
                    //１回目はshapeDataをレイヤーに追加し2回目のshapeDataは１回目にaddされたshapeDataのnameプロパティと値を比較し違う場合は新たなレイヤーを作成し追加、同じ場合は１回目の同じnameプロパティの値が入ったレイヤーに追加、３回目は１，２回目のnameプロパティと値が違う場合は新たなレイヤーを作成し追加、nameプロパティの値が１，２回目のいずれかに該当すれば該当したレイヤーに追加....これらを最後まで繰り返す
                    n++;
                   if(n === 1){ 

                     if(shapeData.hasOwnProperty("absolutePositionLine")){
                      newLayer2.add(line);
                    }else if(shapeData.hasOwnProperty("absolutePositionRect")){
                      newLayer2.add(rect);
                    }else if(shapeData.hasOwnProperty("absolutePositionShape")){
                      newLayer2.add(shape);
                    };   

                    newLayer2.name(shapeData.name);
                    
                   }else{

                    if(newLayer2.getChildren()[0].name() === shapeData.name){

                      if(shapeData.hasOwnProperty("absolutePositionLine")){
                        newLayer2.add(line);
                      }else if(shapeData.hasOwnProperty("absolutePositionRect")){
                        newLayer2.add(rect);
                      }else if(shapeData.hasOwnProperty("absolutePositionShape")){
                        newLayer2.add(shape);
                      };  

                    }else if(layersAry.find(layer =>layer.name() === shapeData.name)){


                      const matchLayer = layersAry.find(layer =>layer.getChildren()[0].name() === shapeData.name);

                      if(shapeData.hasOwnProperty("absolutePositionLine")){
                        matchLayer.add(line);
                      }else if(shapeData.hasOwnProperty("absolutePositionRect")){
                        matchLayer.add(rect);
                      }else if(shapeData.hasOwnProperty("absolutePositionShape")){
                        matchLayer.add(shape);
                      };  


                    }else{

                  
                     layersAry.push(new Konva.Layer({
                      name: shapeData.name,
                      draggable: true,
                     }));

                     if(shapeData.hasOwnProperty("absolutePositionLine")){
                      layersAry[layersAry.length-1].add(line);
                    }else if(shapeData.hasOwnProperty("absolutePositionRect")){
                      layersAry[layersAry.length-1].add(rect);
                    }else if(shapeData.hasOwnProperty("absolutePositionShape")){
                      layersAry[layersAry.length-1].add(shape);
                    };  

                    }

                   }
                   }
              
              // 他の図形タイプに対する処理も同様に追加可能
            });

            console.log(newLayer1);
            console.log(newLayer2);
            console.log(newLayer1.getChildren());
            console.log(newLayer2.getChildren());


            stage2.add(newLayer1); // 新しいレイヤーを stage2 に追加
            stage2.add(newLayer2);
            layersAry.forEach(layer =>{stage2.add(layer)});
            
        
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

      } else {
        const liElement = event.target.closest("li");
        const homeFormValue = liElement.firstChild.textContent.trim();
         if(stage2.getChildren(node => node.getClassName() === 'Layer')[0].name() === homeFormValue){
           const spaceFormError = document.createElement("p");
           spaceFormError.classList.add("home-form-error");
           document.querySelector(".homecenter-outer").append(spaceFormError);
           document.querySelector(".home-form-error").textContent = "※この配置図名は既に追加されています※";
         }else{
         const spaceFormError = document.createElement("p");
          spaceFormError.classList.add("home-form-error");
          document.querySelector(".homecenter-outer").append(spaceFormError);
          document.querySelector(".home-form-error").textContent = "※表示中の配置図を取消後、再度追加してください※";
         }
      }


      } else if (event.target.classList.contains("cancelBtn2")) {
        if(!(document.querySelector('.room-listCheck').checked)){
          document.querySelector('.space').classList.remove('select-sidebar');
          document.querySelector('.furniture').classList.remove('select-sidebar'); 
          document.querySelector('.room').classList.remove('select-sidebar');
          furnitureSideBar = 0;
          roomSideBar = 0;
          spaceSideBar = 0;
          hideAllContents();
        }
        // 削除ボタンをクリックした場合の処理
        const liElement = event.target.closest("li");
        const homeFormValue = liElement.firstChild.textContent.trim();

    
        // 削除対象のレイヤーを特定
        const layerToRemove = stage2.find(node => node.name() === homeFormValue)[0];

        
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
      if(!(document.querySelector('.room-listCheck').checked)){
        document.querySelector('.space').classList.remove('select-sidebar');
        document.querySelector('.furniture').classList.remove('select-sidebar'); 
        document.querySelector('.room').classList.remove('select-sidebar');
        furnitureSideBar = 0;
        roomSideBar = 0;
        spaceSideBar = 0;
        hideAllContents();
      }

      const liElement = event.target.closest("li");
      const homeFormValue = liElement.firstChild.textContent.trim();


       if (liElement && homeList.contains(liElement)) {
        // 存在する場合、liElement を削除
        homeList.removeChild(liElement);


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


  overWrite.addEventListener("click",overWriteEvent); 
  function overWriteEvent(){
  
    const homeForm = document.querySelector('.home-form');
    const homeFormValue2 = homeForm.value;
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
    }else if(stage2.getChildren(node => node.getClassName() === 'Layer')[0].name() !== homeFormValue2 && isDuplicateValuePresent(homeFormValue2+"編集"+"取消", ul.querySelectorAll("li"))){ 
      const homeFormError = document.createElement("p");
      homeFormError.classList.add("home-form-error");
      document.querySelector(".homecenter-outer").append(homeFormError);
      document.querySelector(".home-form-error").textContent = "※この配置図名は既に保存されています※";
    } else {

      const errorElement = document.querySelector(".home-form-error");
      if (errorElement && errorElement.textContent !== "") {
          errorElement.textContent = "";
      }  

  fetch('/delete-data4', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({homeFormValueTarget}),
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

    homeList.removeChild(liElementTarget);

      const sourceLayers = stage2.getLayers(); // すべてのレイヤーの配列を取得

      console.log(stage2.getLayers());


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
            name: shape.name(),
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
            name: shape.name(),
            absolutePositionLine: shape.getAbsolutePosition(),
          };
          layerInfo.children.push(lineData); // 子要素の情報を配列に追加
        }




        if (shapeType === "Shape") {
          const shapeData = {
            type: shape.getType(),
            name: shape.name(),
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



const layerToRemove = stage2.find(node => node.name() === homeFormValueTarget)[0];

if(stage2.getLayers().length !== 0 && layerToRemove instanceof Konva.Layer){
  const deleteLayers = stage2.getLayers().slice();
  deleteLayers.forEach(deleteLayer => {
      deleteLayer.destroy();
  });
}

overWrite.style.display = 'none';
document.querySelector(".home-compbtn").style.display = 'block';
document.querySelector(".home-form").value = "";


   }



  };
 



document.querySelector('.home-form').addEventListener("focus",function(){

if (document.querySelector(".home-form-error") && document.querySelector(".home-form-error").textContent !== "") {
  document.querySelector(".home-form-error").textContent = "";
}  

});

