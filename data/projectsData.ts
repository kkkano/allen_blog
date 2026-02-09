interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'FinSight',
    description: `Multi-agent 会话式金融研究平台。提供专业智能体（价格分析、新闻追踪、宏观经济、深度研究），支持实时流式响应、自动生成 8 章节投资报告和投资组合监控。采用 LangGraph、FastAPI 和 React 技术栈开发。`,
    imgSrc: '/static/images/finsight.png',
    href: 'https://github.com/kkkano/FinSight',
  },
  {
    title: 'Tech Digest Daily',
    description: `AI 驱动的技术资讯聚合平台。每天自动推送 GitHub Trending、Hacker News、Product Hunt、Dev.to 热门内容到邮箱，支持 AI 智能总结和个性化推荐。`,
    imgSrc: '/static/images/tech-digest-daily.png',
    href: 'https://github.com/kkkano/tech-digest-daily',
  },
  {
    title: 'AIGC BI',
    description: `基于 Spring Boot + MQ + AIGC（+ React）的智能数据分析平台。区别于传统 BI，用户只需要导入原始数据集、并输入分析诉求，就能自动生成可视化图表及分析结论，实现数据分析的降本增效。`,
    imgSrc: '/static/images/aigc-bi.png',
    href: 'https://github.com/kkkano/BI',
  },
  {
    title: 'OpenAI-Code-Review',
    description: `基于 GitHub Actions + OpenAI(ChatGLM) + Git/GitHub + 公众号模板消息实现，然后串联出从代码提交获取通知，Git 检出分支变化，在使用 OpenAI 进行代码和写入日志，再发送消息通知,完成了一个AI代码评审的功能。`,
    imgSrc: '/static/images/openai-code-review.png',
    href: 'https://github.com/kkkano/openai-code-review',
  },
]

export default projectsData
