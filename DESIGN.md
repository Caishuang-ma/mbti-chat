# MBTI 对话室 · DESIGN.md

> 同一个话题，十六种回应。像走进一间能随时换座位的对话室。

## 1. Visual Theme & Atmosphere

风格：Cream Editorial × Organic Natural。关键词：纸感、温暖、留白、人格、轻巧、亲近。
中文开源 Skill 落地页，主要目标是解释产品、演示切换、引导安装与访问源码。
交互档位：L2（用户已选择）。依赖：原生 HTML/CSS/JavaScript，IntersectionObserver；不引入动画框架。外部字体加载失败时使用中文系统字体。
页面不是在线 AI 聊天服务；演示使用预设回复，明确标注。安装后在 Codex 中获得实际对话体验。
首屏：巨型中文衬线标题 + 散落的人格纸片 + 可操作对话卡片。
首次滑动：全宽大字“换个视角，话题继续”，用章节文字揭示及轻视差建立节奏。
阵列区：不等大四组人格家族卡片，十六种可点选类型。
巧思：复制调用语后，按钮变为“座位留好了”；失败时展示可手动复制内容。

## 2. Color Palette & Roles

```css
:root {
  --bg: #f5f2eb; --surface: #fffdf8; --surface-alt: #e9eee5;
  --surface-hover: #f0f3ea; --border: #d9ded2; --border-hover: #5c705d;
  --text: #203a2d; --text-secondary: #4e6255; --text-tertiary: #626c60;
  --accent: #365c45; --accent-hover: #294a36; --clay: #a44e34;
  --violet: #e9e1ef; --sage: #dfead9; --sand: #ede3cf; --blue: #dce8ee;
  --bg-rgb: 245,242,235; --accent-rgb: 54,92,69; --ink-rgb: 32,58,45;
  --success: #365c45; --error: #a13932; --warning: #88611c;
  --clear: transparent; --shadow-soft: 0 12px 35px rgba(var(--ink-rgb),.07);
  --shadow-high: 0 28px 70px rgba(var(--ink-rgb),.12);
}
```
所有颜色通过变量引用；人格家族颜色用于浅底装饰，文字使用深墨绿。语义颜色不单独承担状态含义。

## 3. Typography Rules

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@500;600;700&display=swap');
:root {
  --font-body: 'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif;
  --font-title: 'Noto Serif SC','Songti SC',serif;
  --font-code: ui-monospace,'SFMono-Regular',Consolas,monospace;
}
body { font-family: var(--font-body); font-size:16px; line-height:1.8; letter-spacing:.02em; }
h1,h2 { font-family:var(--font-title); font-weight:600; line-height:1.7; }
```

| 层级 | 字体 | 字号 | 字重 | 行高 | 字距 |
| --- | --- | --- | --- | --- | --- |
| H1 | Noto Serif SC | clamp(40px,5.2vw,76px) | 600 | 1.7 | .02em |
| H2 | Noto Serif SC | clamp(28px,3vw,44px) | 600 | 1.7 | .02em |
| H3 | Noto Sans SC | 22px | 600 | 1.7 | .02em |
| 正文 | Noto Sans SC | 16px | 400 | 1.8 | .02em |
| 标签 | Noto Sans SC | 15px | 500 | 1.7 | .02em |
| 代码 | 系统等宽 | 15px | 400 | 1.8 | 0 |

禁止只使用英文字体承担中文、正文小于 15px。H1/H2/正文不使用渐变文字或文字投影。英文类型代码可用等宽字体。

## 4. Component Stylings

```css
button,a { -webkit-tap-highlight-color:var(--clear); }
.btn,.type-button { min-height:44px; padding:12px 20px; border:1px solid var(--border); border-radius:999px; font:inherit; color:var(--text); background:var(--surface); cursor:pointer; transition:transform .2s,background .2s,border-color .2s; }
.btn.primary { background:var(--accent); color:var(--surface); border-color:var(--accent); }
.btn:hover,.type-button:hover { transform:translateY(-2px); background:var(--surface-hover); border-color:var(--border-hover); }
.btn.primary:hover { background:var(--accent-hover); }
.btn:active,.type-button:active { transform:scale(.97); }
:focus-visible { outline:3px solid var(--clay); outline-offset:4px; }
button:disabled,.btn[aria-disabled='true'] { opacity:.5; cursor:not-allowed; transform:none; }
.type-button[aria-pressed='true'] { background:var(--accent); color:var(--surface); }
.card { border:1px solid var(--border); border-radius:24px; padding:28px; background:var(--surface); transition:transform .25s,box-shadow .25s; }
.card:hover { transform:translateY(-3px); box-shadow:var(--shadow-soft); }
.card:focus-within { border-color:var(--border-hover); }
.card:active { transform:translateY(0); }
.card[aria-disabled='true'] { opacity:.5; pointer-events:none; }
.nav { position:sticky; top:0; z-index:20; background:var(--bg); transition:box-shadow .25s; }
.nav.scrolled { box-shadow:0 1px 0 var(--border),var(--shadow-soft); }
a { color:var(--accent); text-underline-offset:5px; transition:color .2s; }
a:hover { color:var(--clay); }
a:active { color:var(--accent-hover); }
a[aria-disabled='true'] { opacity:.5; pointer-events:none; }
.badge { display:inline-flex; align-items:center; min-height:32px; padding:4px 12px; border:1px solid var(--border); border-radius:999px; font-size:15px; }
.badge:not(a) { cursor:default; }
summary { min-height:44px; cursor:pointer; padding:16px 0; }
summary:hover { color:var(--clay); }
summary:active { color:var(--accent-hover); }
```
导航：品牌、体验、安装、GitHub；移动端保留品牌和 GitHub，内容导航由正文入口承接。卡片为容器，无伪装按钮；互动仅由真实按钮承担。静态标签无 disabled/active 行为，链接与按钮状态如上。

## 5. Layout Principles

容器最大宽度 1200px，桌面两侧 40px，移动 20px。正文窄栏 680px。
间距梯度：8/12/16/24/32/48/72/112px。章节上下 96px，移动 64px。
首屏 1.05fr/.95fr 双栏，对话卡片靠右；类型家族以 7/5、5/7 的非对称阵列呈现；安装为两栏步骤与代码。

```css
.container { width:min(1200px,calc(100% - 80px)); margin-inline:auto; }
.hero { display:grid; grid-template-columns:1.05fr .95fr; gap:64px; align-items:center; padding:72px 0 112px; }
.families { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:20px; }
.family:nth-child(4n+1),.family:nth-child(4n+4) { grid-column:span 7; }
.family:nth-child(4n+2),.family:nth-child(4n+3) { grid-column:span 5; }
```

## 6. Depth & Elevation

| 层级 | 处理 | 使用 |
| --- | --- | --- |
| Flat | 无阴影 | 内容、代码、家族浅底 |
| Subtle | --shadow-soft | 卡片悬停、滚动导航 |
| Elevated | --shadow-high | 首屏聊天纸片 |

装饰纸片使用旋转和偏移，正文与实际按钮保持水平。不用大面积模糊。

## 7. Animation & Interaction

L2：原生滚动，160–700ms，主要使用 opacity/transform。字体和内容在无 JS 时仍可读。
六类签名动效：H1 分行 mask 入场、H2 滚动揭示、演示标签/回复短淡入、复制按压反馈、人格选择与对话卡片换页、首屏纸片背景漂浮。
未采用第三方 motion 源码：所需效果可由少量原生 CSS 完成，不加载额外依赖。

```css
@keyframes enter { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes float { 50% { transform:translateY(-10px) rotate(3deg); } }
@keyframes mask { from { clip-path:inset(100% 0 0); transform:translateY(16px); } to { clip-path:inset(0); transform:translateY(0); } }
.hero h1 { animation:mask .9s ease both; }
.hero .badge { animation:enter .6s ease both; }
.paper { animation:float 8s ease-in-out infinite; }
.js .reveal { opacity:0; transform:translateY(24px); transition:opacity .7s,transform .7s; }
.js .reveal.visible { opacity:1; transform:none; }
.reply.enter { animation:enter .3s ease both; }
@media(prefers-reduced-motion:reduce) {
  *,*::before,*::after { animation:none!important; transition:none!important; scroll-behavior:auto!important; }
  .js .reveal { opacity:1; transform:none; }
  .parallax { transform:none!important; }
}
```

```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
let pending=false;
addEventListener('scroll',()=>{
  if(pending) return;
  pending=true;
  requestAnimationFrame(()=>{
    document.querySelector('.nav')?.classList.toggle('scrolled',scrollY>24);
    if(!reduce) document.querySelectorAll('.parallax').forEach(el=>{
      el.style.transform=`translateY(${Math.min(scrollY*.04,30)}px)`;
    });
    pending=false;
  });
},{passive:true});
```

演示切换只更新预设回复、类型标签及 aria-pressed，保留话题“我觉得有点累”；通过 aria-live 宣告变化。圆桌为预设示例。复制采用 Clipboard API，拒绝时显示手动复制内容，不谎报成功。无输入框，避免误认真实 AI 服务。持续动画离屏暂停；移动端隐藏部分装饰并关闭视差。

## 8. Do's and Don'ts

Do：中文先行；展示可复制命令；明确预设演示；按家族组织十六类型；兼顾键盘操作；源码与下载链接真实可用。

Don't：不用虚构用户数或评价；不将 MBTI 当诊断；不加人格刻板标签；不放无法工作的聊天发送框；不使用渐变标题；不劫持滚动；不移动模糊图层；不加全局自定义光标；不依赖动画才能看到内容；不默认多语言。

## 9. Responsive Behavior

| 断点 | 行为 |
| --- | --- |
| >1000px | 双栏首屏、非对称家族阵列、双栏安装 |
| 601–1000px | 缩小间距，首屏上下堆叠；卡片阵列保持两列 |
| ≤600px | 单列、标题40px、导航精简、按钮可换行、停用视差 |

触摸目标至少44×44px；类型选择按钮自动换行。代码使用局部横向滚动，不让页面溢出；长链接可断行。

```css
@media(max-width:1000px) { .hero { grid-template-columns:1fr; gap:48px; } }
@media(max-width:600px) {
  .container { width:calc(100% - 40px); }
  .hero { padding:40px 0 64px; }
  .families { display:grid; grid-template-columns:1fr; }
  .family:nth-child(n) { grid-column:auto; }
  .nav .section-link { display:none; }
  .parallax { transform:none!important; }
  .card { padding:20px; }
}
pre { max-width:100%; overflow:auto; }
a { overflow-wrap:anywhere; }
```
