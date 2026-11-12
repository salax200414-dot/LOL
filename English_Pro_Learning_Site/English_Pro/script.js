const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "englishpro_users_v1";
const SESSION_KEY = "englishpro_session_v1";
const THEME_KEY = "englishpro_theme_v1";
const levelNames = {A0:"Absolute Beginner",A1:"Beginner",A2:"Elementary",B1:"Intermediate",B2:"Upper Intermediate",C1:"Advanced",C2:"Proficiency"};
const lessons = [
  {title:"Hello! Приветствие",desc:"Поздоровайся и попрощайся",questions:[
    {q:"Как сказать «Привет» по-английски?",hint:"Выбери правильное приветствие.",a:["Hello","Goodbye","Please"],correct:0,why:"Hello означает «Привет» или «Здравствуйте»."},
    {q:"Как правильно спросить «Как дела?»",hint:"Начни с How.",a:["How old are you?","How are you?","Where are you?"],correct:1,why:"How are you? — «Как дела?»"},
    {q:"Выбери перевод слова «Спасибо».",hint:"Вежливое слово.",a:["Sorry","Thanks","Welcome"],correct:1,why:"Thanks означает «Спасибо»."}
  ]},
  {title:"I am… Я есть…",desc:"Знакомство и глагол to be",questions:[
    {q:"I ___ a student.",hint:"С местоимением I используется am.",a:["is","are","am"],correct:2,why:"Правильно: I am a student."},
    {q:"She ___ my friend.",hint:"Для he / she / it.",a:["am","is","are"],correct:1,why:"С she используется is."},
    {q:"They ___ happy.",hint:"Для they.",a:["are","is","am"],correct:0,why:"С they используется are."}
  ]},
  {title:"Everyday words",desc:"Полезные слова на каждый день",questions:[
    {q:"Что означает «water»?",hint:"Это можно пить.",a:["Хлеб","Вода","Молоко"],correct:1,why:"Water — вода."},
    {q:"Что означает «book»?",hint:"Это читают.",a:["Книга","Стол","Дом"],correct:0,why:"Book — книга."},
    {q:"Выбери слово «дом».",hint:"Английское слово из четырёх букв.",a:["Car","Home","Tree"],correct:1,why:"Home — дом."}
  ]},
  {title:"Numbers",desc:"Числа от 1 до 10",questions:[
    {q:"Как будет «пять»?",hint:"Five.",a:["Four","Five","Nine"],correct:1,why:"Five — пять."},
    {q:"Как будет «восемь»?",hint:"Eight.",a:["Eight","Eleven","Two"],correct:0,why:"Eight — восемь."},
    {q:"Какое число означает «three»?",hint:"Three.",a:["2","3","4"],correct:1,why:"Three — три."}
  ]},
  {title:"My family",desc:"Расскажи о своей семье",questions:[
    {q:"Mother — это…",hint:"Член семьи.",a:["Отец","Мать","Сестра"],correct:1,why:"Mother — мама / мать."},
    {q:"Brother — это…",hint:"Мужской член семьи.",a:["Брат","Дедушка","Сын"],correct:0,why:"Brother — брат."},
    {q:"Как будет «семья»?",hint:"Family.",a:["Friend","Family","Father"],correct:1,why:"Family — семья."}
  ]},
  {title:"Articles: a / an",desc:"Артикли в английском",questions:[
    {q:"I have ___ apple.",hint:"Перед гласным звуком.",a:["a","an","the"],correct:1,why:"An используется перед гласным звуком: an apple."},
    {q:"It is ___ book.",hint:"Перед согласным звуком.",a:["a","an","are"],correct:0,why:"A book — одна книга."},
    {q:"She has ___ orange.",hint:"Orange начинается с гласного звука.",a:["a","an","is"],correct:1,why:"Правильно: an orange."}
  ]},
  {title:"Present Simple",desc:"Простые действия каждый день",questions:[
    {q:"I ___ to school every day.",hint:"С I используем начальную форму глагола.",a:["go","goes","going"],correct:0,why:"I go — я хожу."},
    {q:"He ___ football.",hint:"В he/she/it добавляем -s.",a:["play","plays","playing"],correct:1,why:"He plays football."},
    {q:"They ___ English.",hint:"С they — начальная форма.",a:["studies","study","studying"],correct:1,why:"They study English."}
  ]},
  {title:"Questions",desc:"Задавай простые вопросы",questions:[
    {q:"___ you speak English?",hint:"Вопрос с you в Present Simple.",a:["Does","Do","Are"],correct:1,why:"Do you speak English?"},
    {q:"Where ___ you live?",hint:"Вопрос с you.",a:["do","does","is"],correct:0,why:"Where do you live?"},
    {q:"___ she like tea?",hint:"Вопрос с she.",a:["Do","Does","Is"],correct:1,why:"Does she like tea?"}
  ]},
  {title:"Food and drinks",desc:"Еда и напитки",questions:[
    {q:"Как будет «яблоко»?",hint:"Apple.",a:["Apple","Bread","Rice"],correct:0,why:"Apple — яблоко."},
    {q:"Как будет «хлеб»?",hint:"Bread.",a:["Cheese","Bread","Water"],correct:1,why:"Bread — хлеб."},
    {q:"Что означает «milk»?",hint:"Белый напиток.",a:["Сок","Чай","Молоко"],correct:2,why:"Milk — молоко."}
  ]},
  {title:"Daily routine",desc:"Опиши свой обычный день",questions:[
    {q:"I ___ up at seven.",hint:"Фразовый глагол «просыпаться».",a:["wake","wakes","waking"],correct:0,why:"I wake up — я просыпаюсь."},
    {q:"Как будет «завтракать»?",hint:"Have breakfast.",a:["Have dinner","Have breakfast","Go to bed"],correct:1,why:"Have breakfast — завтракать."},
    {q:"I go to ___ at night.",hint:"Место, где спят.",a:["bed","school","work"],correct:0,why:"Go to bed — ложиться спать."}
  ]}
];
const vocabulary = [
  ["Hello","Привет","Hello, my name is Anna."],["Friend","Друг","You are my friend."],["Learn","Учить","I learn English every day."],["Beautiful","Красивый","It is a beautiful day."],["Water","Вода","Can I have some water?"],["Book","Книга","This is my book."],["Family","Семья","I love my family."],["Happy","Счастливый","I am happy today."],["Journey","Путешествие","Learning is a journey."],["Improve","Улучшать","I want to improve my English."],["Practice","Практика","Practice makes progress."],["Dream","Мечта","Never stop dreaming."]];
let users = readUsers();
let currentEmail = localStorage.getItem(SESSION_KEY);
let user = currentEmail ? users[currentEmail] : null;
let authMode = "register", selectedLevel = null, quiz = null, toastTimer;

function readUsers(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}catch{return {}}}
function saveUsers(){localStorage.setItem(STORAGE_KEY,JSON.stringify(users))}
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function dateBefore(date,n){const d=new Date(date+"T12:00:00");d.setDate(d.getDate()-n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function daysBetween(a,b){return Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/86400000)}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2400)}
function persist(){if(user){users[user.email]=user;saveUsers()}}
function applyTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem(THEME_KEY,theme);$("themeIcon").textContent=theme==="dark"?"☀":"☾";$("themeText").textContent=theme==="dark"?"Дневной режим":"Ночной режим";$("profileThemeBtn").textContent=theme==="dark"?"Включить дневной режим":"Включить ночной режим"}
function toggleTheme(){applyTheme(document.documentElement.dataset.theme==="dark"?"light":"dark")}
function openAuth(){ $("authModal").classList.remove("hidden"); $("authFormWrap").classList.remove("hidden"); $("levelSetup").classList.add("hidden");}
function setAuthMode(mode){authMode=mode;$("authTitle").textContent=mode==="register"?"Создай аккаунт":"С возвращением!";$("authSubtitle").textContent=mode==="register"?"Сохраняй прогресс и учи английский в своём темпе.":"Войди, чтобы продолжить обучение."; $("authName").parentElement.classList.toggle("hidden",mode==="login");$("confirmLabel").classList.toggle("hidden",mode==="login");$("authName").required=mode==="register";$("authConfirm").required=mode==="register";$("authSubmit").textContent=mode==="register"?"Создать аккаунт →":"Войти →";$("authSwitchText").textContent=mode==="register"?"Уже есть аккаунт?":"Ещё нет аккаунта?";$("authSwitchBtn").textContent=mode==="register"?"Войти":"Создать аккаунт"}
$("authSwitchBtn").addEventListener("click",()=>setAuthMode(authMode==="register"?"login":"register"));
$("authForm").addEventListener("submit",e=>{e.preventDefault();const email=$("authEmail").value.trim().toLowerCase(),password=$("authPassword").value;if(authMode==="register"){if(password!==$("authConfirm").value){showToast("Пароли не совпадают");return}if(users[email]){showToast("Этот email уже зарегистрирован");return}user={name:$("authName").value.trim(),email,password,level:null,goal:10,xp:0,completed:[],activity:[],streak:0,longestStreak:0,favorites:[]};users[email]=user;persist();currentEmail=email;localStorage.setItem(SESSION_KEY,email);$("authFormWrap").classList.add("hidden");$("levelSetup").classList.remove("hidden")}else{if(!users[email]||users[email].password!==password){showToast("Неверный email или пароль");return}user=users[email];currentEmail=email;localStorage.setItem(SESSION_KEY,email);$("authModal").classList.add("hidden");initApp() }});
document.querySelectorAll("[data-level]").forEach(btn=>btn.addEventListener("click",()=>{selectedLevel=btn.dataset.level;document.querySelectorAll("[data-level]").forEach(b=>b.classList.toggle("selected",b===btn));$("finishSetup").disabled=false}));
$("finishSetup").addEventListener("click",()=>{if(!selectedLevel)return;user.level=selectedLevel;user.goal=Number($("setupGoal").value);persist();$("authModal").classList.add("hidden");initApp();showToast("Аккаунт готов! Добро пожаловать 🎉")});
function initApp(){if(!user||!user.level){openAuth();return}applyTheme(localStorage.getItem(THEME_KEY)||"light");$("authModal").classList.add("hidden");renderAll()}
function renderAll(){if(!user)return;const first=user.name.split(" ")[0];$("headerGreeting").textContent=`Привет, ${first}!`; $("welcomeTitle").textContent=`Привет, ${first}! Готов учить английский?`; $("topAvatar").textContent=first[0].toUpperCase();$("profileAvatar").textContent=first[0].toUpperCase();$("profileName").textContent=user.name;$("profileEmail").textContent=user.email;$("profileLevel").value=user.level;$("profileGoal").value=String(user.goal);$("levelTag").textContent=`${user.level} · ${levelNames[user.level]}`;$("courseLevelTag").textContent=`${user.level} · ${levelNames[user.level]}`;$("topXp").textContent=user.xp;$("xpValue").textContent=user.xp+" XP";$("statsXp").textContent=user.xp;$("lessonsValue").textContent=user.completed.length;$("statsLessons").textContent=user.completed.length;$("goalValue").textContent=user.goal+" минут";updateStreak(false);const pct=Math.round(user.completed.length/lessons.length*100);$("coursePercent").textContent=pct+"%";$("courseProgress").style.width=pct+"%";$("courseProgressText").textContent=`${user.completed.length} из ${lessons.length} уроков`;renderLessonList();renderVocabulary();renderWeek();renderCalendar()}
function updateStreak(record){const t=today(),last=user.activity[user.activity.length-1];if(record&&!user.activity.includes(t)){user.activity.push(t);user.activity.sort();if(last){const diff=daysBetween(last,t);user.streak=diff===1?user.streak+1:1}else user.streak=1;user.longestStreak=Math.max(user.longestStreak,user.streak);persist()}else{const mostRecent=user.activity[user.activity.length-1];if(!mostRecent)user.streak=0;else{const diff=daysBetween(mostRecent,t);if(diff>1)user.streak=0;else if(diff===1)user.streak=Math.max(user.streak,1)}}$("topStreak").textContent=user.streak;$("streakValue").textContent=user.streak+" "+(user.streak===1?"день":"дней");$("statsStreak").textContent=user.streak+" дней";$("sideStreak").textContent=user.streak+" дней";$("streakHint").textContent=user.streak?"Не прерывай свою серию!":"Начни сегодня!"}
function renderLessonList(){const root=$("lessonList");root.innerHTML="";lessons.forEach((lesson,i)=>{const done=user.completed.includes(i);const item=document.createElement("div");item.className="lesson-item"+(done?" done":"");item.innerHTML=`<div class="lesson-number">${done?"✓":i+1}</div><div><b>${lesson.title}</b><small>${lesson.desc} · ${lesson.questions.length} задания</small></div><button>${done?"Повторить":"Начать"} →</button>`;item.querySelector("button").addEventListener("click",()=>startLesson(i));root.appendChild(item)})}
function renderVocabulary(){const root=$("vocabGrid");root.innerHTML="";vocabulary.forEach(([word,translation,example])=>{const saved=user.favorites.includes(word);const card=document.createElement("article");card.className="vocab-card";card.innerHTML=`<div class="word">${word}</div><div class="translation">${translation}</div><p>${example}</p><button class="${saved?"saved":""}">${saved?"✓ В избранном":"☆ Добавить"}</button>`;card.querySelector("button").addEventListener("click",()=>{if(saved)user.favorites=user.favorites.filter(x=>x!==word);else user.favorites.push(word);persist();renderVocabulary()});root.appendChild(card)})}
function renderWeek(){const root=$("weekDays");root.innerHTML="";const names=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],now=new Date(),monday=new Date(now);monday.setDate(now.getDate()-(now.getDay()+6)%7);names.forEach((n,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;const el=document.createElement("div");el.className="day-dot"+(user.activity.includes(key)?" done":"");el.innerHTML=`<span>${user.activity.includes(key)?"✓":d.getDate()}</span>${n}`;root.appendChild(el)})}
function renderCalendar(){const root=$("calendarGrid");root.innerHTML="";const end=new Date();for(let i=27;i>=0;i--){const d=new Date(end);d.setDate(end.getDate()-i);const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;const cell=document.createElement("div");cell.className="calendar-cell"+(user.activity.includes(key)?" active":"");cell.textContent=d.getDate();root.appendChild(cell)}}
function navigate(page){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));$("page-"+page).classList.add("active");document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));if(page==="stats")renderCalendar();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.goto)));
$("themeToggle").addEventListener("click",toggleTheme);$("profileThemeBtn").addEventListener("click",toggleTheme);
$("logoutBtn").addEventListener("click",()=>{localStorage.removeItem(SESSION_KEY);user=null;openAuth();setAuthMode("login")});
$("saveProfileBtn").addEventListener("click",()=>{user.level=$("profileLevel").value;user.goal=Number($("profileGoal").value);persist();renderAll();showToast("Настройки сохранены")});
$("resetBtn").addEventListener("click",()=>{if(confirm("Точно сбросить весь прогресс? Это действие нельзя отменить.")){user.xp=0;user.completed=[];user.activity=[];user.streak=0;user.longestStreak=0;user.favorites=[];persist();renderAll();showToast("Прогресс сброшен")}});
$("continueBtn").addEventListener("click",()=>startLesson(firstAvailable()));$("startLessonBtn").addEventListener("click",()=>startLesson(firstAvailable()));
function firstAvailable(){for(let i=0;i<lessons.length;i++)if(!user.completed.includes(i))return i;return 0}
function startLesson(index){quiz={index,step:0,correct:0,answered:false};$("lessonModal").classList.remove("hidden");renderQuestion()}
$("closeLesson").addEventListener("click",()=>$("lessonModal").classList.add("hidden"));
function renderQuestion(){const lesson=lessons[quiz.index],q=lesson.questions[quiz.step];$("quizProgressFill").style.width=((quiz.step)/lesson.questions.length*100)+"%";$("lessonContent").innerHTML=`<span class="eyebrow">УРОК ${quiz.index+1} · ВОПРОС ${quiz.step+1}/${lesson.questions.length}</span><h2 class="quiz-question">${q.q}</h2><p class="quiz-hint">${q.hint}</p><div class="answer-list">${q.a.map((a,i)=>`<button class="answer-option" data-answer="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join("")}</div><div class="feedback" id="answerFeedback"></div><div class="quiz-actions"><button class="primary-btn small" id="nextQuestion" disabled>Далее →</button></div>`;document.querySelectorAll("[data-answer]").forEach(btn=>btn.addEventListener("click",()=>chooseAnswer(Number(btn.dataset.answer))));$("nextQuestion").addEventListener("click",nextQuestion)}
function chooseAnswer(choice){if(quiz.answered)return;quiz.answered=true;const q=lessons[quiz.index].questions[quiz.step],correct=choice===q.correct;if(correct)quiz.correct++;document.querySelectorAll("[data-answer]").forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add("correct");if(i===choice&&!correct)b.classList.add("wrong")});const feedback=$("answerFeedback");feedback.className="feedback "+(correct?"good":"bad");feedback.textContent=(correct?"Верно! ✓ ":"Почти! Правильный ответ: "+q.a[q.correct]+". ")+q.why;$("nextQuestion").disabled=false;$("nextQuestion").textContent=quiz.step===lessons[quiz.index].questions.length-1?"Завершить урок":"Далее →"}
function nextQuestion(){if(quiz.step<lessons[quiz.index].questions.length-1){quiz.step++;quiz.answered=false;renderQuestion()}else finishLesson()}
function finishLesson(){const i=quiz.index,perfect=quiz.correct===lessons[i].questions.length,already=user.completed.includes(i);if(!already)user.completed.push(i);const earned=(already?5:20)+(perfect?10:0);user.xp+=earned;updateStreak(true);persist();renderAll();$("quizProgressFill").style.width="100%";$("lessonContent").innerHTML=`<div style="text-align:center;padding:20px 5px"><div style="font-size:64px">${perfect?"🏆":"🎉"}</div><h2 class="quiz-question">${perfect?"Идеально!":"Урок завершён!"}</h2><p class="quiz-hint">Правильных ответов: ${quiz.correct} из ${lessons[i].questions.length}</p><div class="metric-card" style="justify-content:center;margin:20px 0"><div class="metric-icon bolt">⚡</div><div><small>Получено опыта</small><strong>+${earned} XP</strong></div></div><button class="primary-btn full" id="finishClose">Продолжить →</button></div>`;$("finishClose").addEventListener("click",()=>$("lessonModal").classList.add("hidden"));showToast("+"+earned+" XP — отличный результат!")}
if(user&&user.level)initApp();else{applyTheme(localStorage.getItem(THEME_KEY)||"light");openAuth();setAuthMode("register")}
