interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'AIGC BI',
    description: `基于 Spring Boot + MQ + AIGC（+ React）的智能数据分析平台。区别于传统 BI，用户只需要导入原始数据集、并输入分析诉求，就能自动生成可视化图表及分析结论，实现数据分析的降本增效。`,
    imgSrc: 'https://github.com/kkkano/BI/assets/74480939/24038c09-cc84-4ad9-ab3f-1914eed50736',
    href: 'https://github.com/kkkano/BI',
  },
  {
    title: 'OpenAI-Code-Review',
    description: `基于 GitHub Actions + OpenAI(ChatGLM) + Git/GitHub + 公众号模板消息实现，然后串联出从代码提交获取通知，Git 检出分支变化，在使用 OpenAI 进行代码和写入日志，再发送消息通知,完成了一个AI代码评审的功能。`,
    imgSrc: 'https://github.com/user-attachments/assets/8f379984-c035-459e-913b-015f121c6ccd',
    href: 'https://github.com/kkkano/openai-code-review',
  },
]

export default projectsData
