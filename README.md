# MBTI 对话室

同一个话题，十六种回应。一个支持随时切换 MBTI 对话风格的 Codex Skill。

[访问落地页与互动演示](https://caishuang-ma.github.io/mbti-chat/) · [下载开源包](https://github.com/Caishuang-ma/mbti-chat/archive/refs/heads/main.zip)

## 能做什么

- 与十六种 MBTI 风格的虚构角色聊天。
- 随时换角色，保留当前话题与明确的表达偏好。
- 让不同类型参与圆桌或回答同一个问题。
- 用自然的 `ENTP：` 标签直接对话，不在切换时插入幕后说明。

## 安装

下载或克隆本仓库，把 `mbti-chat` 文件夹复制到以下任一位置：

- 当前项目：`.agents/skills/mbti-chat/`
- 个人全局：`~/.agents/skills/mbti-chat/`

确保 `SKILL.md` 直接位于该文件夹中。下载 ZIP 本身不等于安装。若技能未出现，重启 Codex。

## 使用

```text
使用 $mbti-chat，和 INFJ 聊聊，我觉得有点累。
```

```text
ENTP，继续刚才的话题。
让 INFP 和 ESTJ 一起帮我分析要不要换工作。
同一个问题，让三种类型分别回答。
简短一些，少问问题。
退出角色。
```

只有明确的切换表达或单独的类型代码才切换；“我朋友是 INFP”不会切换角色。

## 文件

- `mbti-chat/SKILL.md`：入口与对话规则。
- `mbti-chat/references/personas.md`：十六种风格预设。
- `mbti-chat/agents/openai.yaml`：技能显示信息与默认提示。
- `DESIGN.md`：落地页设计规范。
- `docs/`：原生 HTML/CSS/JavaScript 落地页，GitHub Pages 从 `main` 分支的 `/docs` 目录发布。

这些角色是创作性的风格模拟，不是对真实人群的判断、人格测评或心理诊断。不会保证跨聊天记忆，也不提供独立的在线 AI 服务。

## 本地预览落地页

在仓库根目录运行 `python3 -m http.server 8000 --directory docs`，访问 `http://localhost:8000`。页面中的人格切换是预设示例，不调用模型或收集对话。

## 贡献

欢迎通过 Issue 或 Pull Request 提交更自然的角色表达、切换问题和使用示例。请避免将人格类型写成固定缺陷，保持事实标准与用户自主选择。

## License

MIT。参见 [LICENSE](LICENSE)。
