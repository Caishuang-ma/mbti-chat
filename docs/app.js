'use strict';
const replies = {
  INTJ:'先把“累”拆开看看：事情太多，还是一直没有恢复的时间？如果今天只能调整一件事，我会先找最消耗你的那个环节。',
  INTP:'这个“累”挺值得分辨：身体没电，还是脑子一直在后台运行？不必马上找答案，也许先暂停输入，看看哪部分会松下来。',
  ENTJ:'那今天的目标可以改了：恢复一点精力。把必须做的留下，其余往后放。休息也可以是你主动做出的安排。',
  ENTP:'你的脑子是不是又替明天提前加班了？先把“我应该”放进抽屉。世界能不能等十分钟，我们可以试试。',
  INFJ:'那就先停一会儿吧。你不需要等到撑不住，才允许自己休息。现在不用把所有事情都想明白。',
  INFP:'你可以承认自己累了，不用给这个感受找一个足够漂亮的理由。现在有什么，是你心里真正想放下的？',
  ENFJ:'先照顾一下你自己，好吗？如果你一直忙着回应别人的期待，这一会儿可以留给自己的需要。',
  ENFP:'那今天先别塞更多任务了。我们找一个很小的、让你有点想做的事？也可以什么都不做，给新想法留个空位。',
  ISTJ:'先休息一会儿。喝点水，把今天还要做的事情写下来，挑出确实不能延后的，其余留到精力恢复以后。',
  ISFJ:'是不是最近连小事也堆了很多？找个舒服的位置坐一会儿吧。暂时不用照顾所有事情，也给自己留一点照顾。',
  ESTJ:'先看今天还有哪些必须完成的事，能延后的就延后。留一个明确的休息时段，比继续硬撑更容易安排接下来。',
  ESFJ:'那就缓一缓。你想安静待着，还是找个让你安心的人说几句话？这一会儿，可以按你觉得舒服的方式来。',
  ISTP:'先停十分钟，离开现在的任务。看看喝水、走两步或者闭眼，哪个能让你舒服一点。先试，不急着分析。',
  ISFP:'那先顺着自己的节奏来。坐在舒服的地方，听首喜欢的歌，或者只是看看窗外。现在不必勉强自己。',
  ESTP:'先换个场景试试？出去透口气，或者伸个懒腰。别一口气解决全部问题，先看看这一小步能不能让你轻松些。',
  ESFP:'今天可以先对自己好一点。喝杯喜欢的东西，找个舒服的位置。要是你愿意，我们也可以聊点不用费脑子的。'
};
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 600px)');
const reply = document.querySelector('.reply');
function chooseType(type,scrollToDemo=false){
  if(!Object.hasOwn(replies,type))return;
  document.querySelector('.reply-type').textContent=`${type}：`;
  document.querySelector('.reply-text').textContent=replies[type];
  document.querySelectorAll('[data-type]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.type===type)));
  document.querySelector('#prompt').textContent=`使用 $mbti-chat，和 ${type} 聊聊。`;
  reply.classList.remove('enter');
  if(!reduceMotion.matches){requestAnimationFrame(()=>{reply.classList.add('enter');});}
  if(scrollToDemo)document.querySelector('#demo').scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'center'});
}
document.querySelectorAll('[data-type]').forEach(button=>button.addEventListener('click',()=>chooseType(button.dataset.type,Boolean(button.closest('.family')))));
const copyButton=document.querySelector('#copy');
copyButton.addEventListener('click',async()=>{
  const text=document.querySelector('#prompt').textContent;
  const fallback=document.querySelector('#copy-fallback');
  try{
    if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    fallback.hidden=true;
    copyButton.textContent='座位留好了 ✓';
    document.querySelector('#copy-status').textContent='调用语已复制，去 Codex 粘贴就好。';
  }catch{
    fallback.hidden=false;fallback.value=text;fallback.focus();fallback.select();
    document.querySelector('#copy-status').textContent='浏览器未允许自动复制，请手动复制下方文字。';
  }
});
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  document.documentElement.classList.add('js');
  const stage=document.querySelector('.chat-stage');
  new IntersectionObserver(([entry])=>stage.classList.toggle('offscreen',!entry.isIntersecting)).observe(stage);
}
let pending=false;
function updateScroll(){
  document.querySelector('.nav').classList.toggle('scrolled',scrollY>24);
  const parallax=document.querySelector('.parallax');
  parallax.style.transform=reduceMotion.matches||mobile.matches?'none':`translateY(${Math.min(scrollY*.04,30)}px)`;
  pending=false;
}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateScroll);}},{passive:true});
reduceMotion.addEventListener('change',updateScroll);mobile.addEventListener('change',updateScroll);updateScroll();
