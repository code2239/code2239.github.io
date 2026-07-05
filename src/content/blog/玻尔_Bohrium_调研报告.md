---
title: "玻尔（Bohrium）AI 科研平台 — 全面调研报告"
date: "2026-07-05"
tags: ["Bohrium", "AI", "科研", "调研"]
summary: "玻尔 Bohrium AI 科研平台全面调研——公司背景、核心功能、技术架构与应用场景。"
---

# 玻尔（Bohrium）AI 科研平台 —— 全面调研报告

> 调研日期：2026-07-04  
> 说明：本报告基于公开可查的网页资料整理，力求准确，但部分信息受限于公开披露程度，可能存在未尽之处。每个答案末尾均标注了参考文献。

---

## 1. 玻尔是哪一家公司开发的 AI 软件？

**玻尔（Bohrium）** 由 **深势科技（DP Technology）** 联合 **北京科学智能研究院（AISI）** 共同研发。

- **深势科技** 成立于 2018 年，创始人为北京大学元培学院校友、普林斯顿大学应用数学博士 **张林峰**，中国科学院院士 **鄂维南** 担任首席科学顾问。公司是全球 "AI for Science" 研究范式的引领者，致力于运用 AI 和分子模拟算法求解重要科学问题，覆盖生物医药、能源、材料等领域。
- **北京科学智能研究院（AISI）** 是深势科技在学术侧的协同机构。

玻尔以量子力学先驱尼尔斯·玻尔（Niels Bohr）命名，被誉为 **"科研界的 Hugging Face"**，定位为全球首个覆盖「读文献—做计算—做实验—多学科协同」全流程的 AI for Science 旗舰平台。

**参考文献：**
- 新华网报道《智瞰AI｜AI for Science进阶：从工具的革命到革命的工具》（2025年4月17日），https://app.xinhuanet.com/news/article.html?articleId=1ad1f5c084a9c9d5e86003a5d9168e48
- 北京大数据研究院官方报道《科研"读、算、做"全流程智能化升级 玻尔科研空间站正式发布》，http://m.bibdr.org/nd.jsp?mid=5&id=325
- 张林峰百度百科，https://baike.baidu.com/item/%E5%BC%A0%E6%9E%97%E5%B3%B0/61923033

---

## 2. 玻尔使用的大模型是什么？

玻尔采用 **"外部通用大模型 + 自研科学专用大模型"** 的混合路线：

### 外部通用大模型（用于自然语言交互层）
| 模型选项 | 说明 |
|---------|------|
| **Auto** | 自动选择最优模型 |
| **DeepSeek** | 已接入，作为核心底层推理模型之一 |
| **GPT-4o（4o）** | 接入 OpenAI 模型 |
| **Pro** | 高级模型选项 |

资料明确提到平台"整合万方、知网等科研库、语料库、学者库 & DeepSeek、OpenAI 等大模型"。

### 自研科学大模型体系（"深势·宇知"）
这是面向科学研究的垂直领域专用大模型体系，包括：

| 模型 | 说明 |
|------|------|
| **Uni-Mol** | 通用 3D 分子表示学习预训练框架（ICLR 2023） |
| **DeePMD（Deep Potential Molecular Dynamics）** | 深度学习驱动分子动力学模拟工具，获 2020 年 ACM 戈登贝尔奖 |
| **DPA 系列（DPA-1, DPA-2）** | 覆盖近 70 种元素的深度势能原子间势函数预训练大模型 |
| **Uni-RNA / Uni-Fold** | RNA 结构与蛋白质折叠预测模型 |
| **OpenLAM** | 大原子模型计划 |

### 策略总结
> **通用大模型做交互入口，自研模型做科学深度。** 此外玻尔平台支持高校/机构接入自研科学大模型，提供私有化部署能力。

**参考文献：**
- 哈尔滨工业大学（威海）图书馆《AI技术讲座：AI4S打造面向科研新范式》，http://lib.hitwh.edu.cn/2025/1121/c3549a207559/page.htm
- 北京软件和信息服务业协会报道《"新质生产力探索实践系列活动"走进深势科技》，https://www.bsia.org.cn/site/content/29370.html
- 玻尔官网功能页面，https://www.bohrium.com/api/workspace

---

## 3. 玻尔开源了吗？

**玻尔平台本身是闭源的商业化 SaaS 产品**，但深势科技在 AI for Science 领域孵化了大量开源项目。

| 维度 | 状态 |
|------|------|
| 玻尔平台（Bohrium）整体 | **闭源 SaaS**，商业产品 |
| DeePMD-kit（深度势能分子动力学） | **开源**，https://github.com/deepmodeling/deepmd-kit |
| Uni-Mol（通用分子预训练框架） | **开源**，https://github.com/dptech-corp/Uni-Mol |
| ABACUS（国产第一性原理电子结构计算） | **开源** |
| DMFF（可微分子力场框架） | **开源** |
| AIS-Square（AI for Science 数据/模型共享平台） | **开源**，https://github.com/deepmodeling/AIS-Square |
| Uni-Lab-OS（实验室设备连接框架） | **开源**（深势主导） |
| DeepModeling 开源社区 | https://github.com/deepmodeling |

**简言之：** 玻尔平台是商业闭源产品，但其生态中包含多个由深势主导或贡献的开源项目，形成了 "上层 SaaS 闭源 + 底层部分组件开源" 的模式。被称为"科研界的 Hugging Face"指的是其平台化、社区化的生态定位，而非平台本身开源。

**参考文献：**
- 深势科技微信公众号《企业风采｜深势科技发布Deploy-Master并上线玻尔》，https://www.bsia.org.cn/site/content/31550.html
- DeepModeling 开源社区，https://github.com/deepmodeling
- Uni-Mol GitHub，https://github.com/dptech-corp/Uni-Mol

---

## 4. 玻尔的核心功能是什么？支撑这些核心功能的核心技术是什么？

### 核心功能

| 功能模块 | 说明 |
|---------|------|
| **科学导航（Science Navigator）** | 自然语言提问，从 1.6 亿+论文/专利/学者中聚合检索，AI 摘要 + 原文链接，每项引用带 DOI |
| **Deep Research（深度研究）** | 一键自动生成长达 10,000+ 词的结构化文献综述 |
| **知识库（Knowledge Base）** | 支持 Zotero/EndNote 一键导入，可对 PDF 进行 AI 解释、改写、提问，支持多篇文献批量对话 |
| **文献伴读** | AI 精读论文结构，自动提取研究方法、关键结论、实验图表数据 |
| **期刊订阅（Journals）** | 覆盖 14 万+ 期刊，关键词组合订阅，AI 速览最新进展 |
| **SciDraw** | 文本描述生成可发表的科学插图 |
| **AI Poster** | 60 秒内将 PDF 论文转为会议海报 |
| **Scholar（学者库）** | 2000 万+ 研究者档案，含引用地图与学术谱系树 |
| **SciencePedia（科学百科）** | 42 万+ 已验证科学概念的零幻觉解释 |
| **批量文献问答** | 百篇论文一键解码，提取整合多篇文献精华 |
| **AI 音频概览** | 根据 PDF 原文自动生成音频概览（支持中英文） |
| **Notebook** | 交互式开发环境，支持 CPU/GPU 在线运行 |
| **Apps 应用商店** | 200+ 科研应用工具 |

### 核心技术

玻尔的核心技术架构基于 **RAG（检索增强生成） + 知识图谱 + 向量嵌入** 的深度融合：

| 技术层面 | 具体方案 |
|---------|---------|
| **RAG 架构** | 意图识别 → 混合检索（BM25 关键词 + 向量相似度）→ 倒数排序融合（RRF）→ LLM 生成 |
| **反幻觉机制** | 100% 引用可追溯，模型在近零温度（near-zero temperature）下生成，严格约束于检索到的真实来源 |
| **向量嵌入** | 使用 RoBERTa 模型进行语义解析；BiLSTM-Attention-CRF 网络进行实体识别 |
| **知识图谱** | 实体识别 → 关系抽取 → 图谱融合（与 DBpedia 等对齐）→ TransE 向量化 → 倒排索引库 |
| **知识库层级树** | UMAP 降维 + GMM 软聚类（RAPTOR 类方法），LLM 对每个聚簇生成摘要，递归向上构建，支持从高层摘要到叶子节点的逐层遍历 |
| **多模态检索** | 支持文本、图表、分子结构、化学结构、实验数据等多模态搜索 |
| **引用准确率** | 内置引文校验模块，引用准确率高达 99.2% |

**参考文献：**
- 玻尔官方博客《What Is Bohrium AI? The Complete Guide to AI-Powered Scientific Research》，https://www.bohrium.com/en/blog/industry-insights/what-is-bohrium-ai-complete-guide/
- 玻尔知识图谱构建页面，https://www.bohrium.com/sciencepedia/feynman/keyword/knowledge_graph_construction
- 上海大学图书馆《AI 科研工具+1！玻尔科学导航开通试用》，https://lib.shu.edu.cn/info/1023/6204.htm

---

## 5. 玻尔如何获得这么多期刊的权限？是靠号主的图书馆账号吗？

**玻尔并非通过单一用户的图书馆账号获取期刊权限**，而是通过以下多种机制组合：

### 获取机制

| 机制 | 说明 |
|------|------|
| **公开元数据聚合** | 玻尔索引了 1.6-1.7 亿篇学术论文、1.6 亿+ 项专利的元数据（标题、摘要、作者、DOI、引用关系等），这些信息本身是公开可获取的 |
| **CARSI 联邦认证** | 玻尔已全面接入 CARSI（中国教育和科研计算机网联邦认证与资源共享基础设施），全国 1000+ 所高校师生可使用校园统一身份认证登录 |
| **校园 IP 绑定** | 高校开通专属子域名（如 `bupt.bohrium.com`、`sustech.bohrium.com`），校园网内访问自动识别机构身份 |
| **数据库合作** | 与 SpringerLink、Wiley Online Library 等主流数据库建立接入关系，机构已订购的内容在玻尔内显示"已订阅"标签，可跳转获取全文 |
| **OA 资源直达** | 开放获取（Open Access）论文可直接查看原文 |
| **机构正式采购** | 如深圳国际科技信息中心已正式订购玻尔科学导航，南方科技大学等可通过 CAS 认证使用 |

### 关键点

**玻尔平台本身不直接提供全部期刊全文**，而是作为 **元数据检索 + AI 辅助平台**：
- OA 资源可直接查看
- 非 OA 资源：通过 CARSI 登录后，点击文献的官网链接（如跳转至 Wiley、SpringerLink），若学校已采购该数据库，可获取全文
- 目前绝大多数高校处于 **"试用期"** 阶段（通常 6 个月至 1 年），试用期结束后可能转为正式采购

**参考文献：**
- 北京邮电大学图书馆《【资源试用】玻尔科学导航》，https://libportal.bupt.edu.cn/a/zuixinziyuan/2025/0609/4931.html
- 超星数据库《玻尔科学导航》详情页，https://wisdom.chaoxing.com/newwisdom/doordatabase/databasedetail.html?wfwfid=23463
- 上海交通大学数据库详情页，https://www.lib.sjtu.edu.cn/f/database/database_detail.shtml?id=445
- 南方科技大学 LibGuides《图书馆订购 AI 工具》，https://sustech.libguides.com/c.php?g=975786&p=7111552

---

## 6. 玻尔运作的核心数据源在哪？是访问图书馆的所有文献吗？

### 核心数据源

| 数据类别 | 规模 |
|---------|------|
| 英文学术论文 | **1.7 亿+篇** |
| 中文学术文献 | **0.8 亿+篇** |
| 专利数据 | **1.6 亿+项** |
| 全球活跃学者 | **2,000 万+名** |
| 收录期刊 | **14 万+本** |
| 科研图表 | **2 亿+张** |
| 覆盖学科 | **26 大学科领域**、1,000+ 研究主题 |

### 数据源机制

**并非直接访问某个图书馆的馆藏文献**。玻尔的数据来源包括：
- **公开学术索引数据库**：聚合全球主要学术文献数据库的元数据索引
- **DOI 验证的同行评审论文**：所有论文均为 DOI 验证，经结构化解析
- **近 5 年覆盖率约 95%，近 20 年覆盖率约 90%**（根据官方博客）
- **与万方、知网、SpringerLink、Wiley Online Library 等数据库合作接入**
- 来源可信层级：同行评审论文/专利 > SciencePedia 已验证条目 > 网页/新闻

**参考文献：**
- 玻尔官方博客《What Is Bohrium AI? The Complete Guide to AI-Powered Scientific Research》，https://www.bohrium.com/en/blog/industry-insights/what-is-bohrium-ai-complete-guide/
- 光明区图书馆报道《玻尔科学导航在光明区图书馆上线，整合全球1.6亿件文献》，https://www.dutenews.com/n/article/10358786
- 华南理工大学图书馆试用通知，https://inf.muhn.edu.cn/databaseguide/detail/1214

---

## 7. 玻尔的数据源如何及时更新？

根据多个高校图书馆试用说明及官方宣传，玻尔的数据更新机制如下：

| 更新维度 | 说明 |
|----------|------|
| **整体更新频率** | **每日更新**，实时追踪全球最新科研成果 |
| **订阅推送** | 按期刊、关键词、学者、机构等维度订阅后 **实时更新推送** |
| **官方宣传语** | "更新快：实时追踪全球最新科研成果"、"终结「知识更新滞后」" |
| **更新时间** | 超星数据库页面标注 "更新时间: 2025-12-26"（每日刷新级别） |
| **AI 速览功能** | 新文献入库后自动触发处理流水线，生成 AI 提炼要点 |

### 技术实现推估

搜索结果中未找到底层增量更新技术的详细公开文档（如是否使用 CDC、Elasticsearch、流式处理等），但从功能特征推断：
- 多维度订阅 + 实时推送机制，表明平台具备增量索引与消息推送能力
- 每日全量刷新 + AI 自动处理流水线
- 元数据自动标注（作者/时间/期刊/DOI）

**参考文献：**
- 超星数据库《玻尔科学导航》，https://wisdom.chaoxing.com/newwisdom/doordatabase/databasedetail.html?wfwfid=23463
- 华南理工大学图书馆资源试用通知，https://inf.muhn.edu.cn/databaseguide/detail/1214
- 北京邮电大学图书馆《【资源试用】玻尔科学导航》，https://libportal.bupt.edu.cn/a/zuixinziyuan/2025/0609/4931.html

---

## 8. 玻尔是如何处理数据的？是将期刊的 PDF 转化为 markdown 进行处理吗？还是说其他方案？

**玻尔的数据处理方案远不止 PDF 转 Markdown，而是一个多层次的结构化解析与知识提取流水线：**

### 数据处理金字塔

| 处理层次 | 技术方案 |
|---------|---------|
| **结构化解析** | 不仅提取文本，还提取图表、表格、公式、化学结构、分子结构等多模态信息 |
| **实体识别** | 使用 BiLSTM-Attention-CRF 网络 + Seq2Seq 框架进行命名实体识别 |
| **关系抽取** | 基于句法依存分析，获取实体对之间的最短依存路径，构建关系模板（专利 CN119129722A） |
| **语义向量化** | RoBERTa 模型进行文本语义解析，生成语义表示向量 |
| **知识图谱构建** | 实体识别 → 关系抽取 → 图谱融合（与 DBpedia 等结构化数据库对齐）→ TransE 三元组向量化 → 倒排索引库 |
| **知识库层级树** | UMAP 降维 + GMM 软聚类（RAPTOR 类方法），LLM 逐层生成摘要，构建多层知识结构 |
| **RAG 检索增强** | BM25 关键词检索 + 向量相似度检索 → 倒数排序融合（RRF）→ LLM 生成 |

### 官方描述

根据玻尔官方博客：平台对论文进行 **"结构化解析（not just text extraction — charts, tables, formulas, chemical structures are all parsed）"**。这是远超简单 PDF 转 Markdown 的方案：

- 多模态数据提取（文本 + 图表 + 公式 + 化学结构）
- 知识图谱关联建模
- 向量化存储与混合检索
- 引用关系网络构建

**参考文献：**
- 玻尔官方博客《What Is Bohrium AI? The Complete Guide》，https://www.bohrium.com/en/blog/industry-insights/what-is-bohrium-ai-complete-guide/
- 专利 CN119129722A《基于大语言模型及向量库构建知识图谱的方法》（深势科技），https://patentimages.storage.googleapis.com/9c/35/03/d0229757d65203/CN119129722A.pdf
- 专利 CN118861088A（知识库层级树相关），https://patentimages.storage.googleapis.com/b1/65/6f/f0a441cfd2084f/CN118861088A.pdf
- 玻尔 App 小米应用商店页面，https://app.mi.com/details?id=com.bohrium.mobile

---

## 9. 玻尔用什么样的技术进行数据可视化的？

玻尔在数据可视化方面采用了多层次的技术方案：

### 可视化功能矩阵

| 可视化类型 | 技术方案 |
|-----------|---------|
| **知识图谱可视化** | 通过图表、图谱等形式直观呈现研究关系网络、作者合作网络、主题关联 |
| **科研图表数据提取与展示** | 自动提取论文中的图表数据并可视化呈现 |
| **学术海报生成** | 根据 PDF 原文 AI 自动生成学术海报（中英文） |
| **SciDraw 科研插图** | 文本描述 → AI 生成可发表的科学矢量插图 |
| **引用地图与学术谱系树** | 学者模块中的引用关系可视化 |
| **Apps 应用商店** | 200+ 科研工具中涵盖数据可视化、材料可视化、分子可视化、知识图谱等子类 |

### 前端可视化技术堆栈推测

基于搜索结果中华南理工大学论文对玻尔平台的技术参照，平台前端的可视化技术可能包括：

- **ECharts**：标准图表、数据看板、统计图表（声明式配置，内置丰富交互组件）
- **D3.js**：高度定制的知识图谱可视化（力导向布局、树图、弦图等复杂网络关系）
- 力导向布局（Force）、径向布局、树图等图布局算法
- 多模态数据融合可视化（文本/图表/分子结构/实验数据）

### 架构层次

```
前端可视化层（ECharts + D3.js + 自定义组件）
    ↕
数据处理与布局层（力导向布局 / 树图 / 弦图）
    ↕
知识图谱引擎（本体构建 → 语义标注 → 信息抽取）
    ↕
数据源层（论文数据库 / 专利数据库 / 实验数据）
```

**参考文献：**
- 玻尔 Apps 应用商店，https://www.bohrium.com/apps?type=all&tag=15291&sort=default
- 玻尔知识图谱构建页面，https://www.bohrium.com/sciencepedia/feynman/keyword/knowledge_graph_construction
- ECharts 官网，https://echarts.apache.org
- D3.js 官网，https://d3js.org

---

## 10. 玻尔第一版发布的日期是什么时候？版本号是多少？目前最新产品发布的日期是什么？版本号是多少？

### 产品演进时间线

| 时间 | 事件 |
|------|------|
| **2022 年** | 深势科技识别到 AI for Science 推进瓶颈，开始规划玻尔空间站产品体系 |
| **2023 年 6-9 月** | Bohrium 算力平台初步上线：DP Combo APP 在 Bohrium 上线；与九韶智能达成战略合作，联合开发云服务 |
| **2025 年 3 月 29 日** | **全新版本「玻尔科研空间站」正式发布** — 在 2025 中关村论坛年会 AI for Science 青年科学主题论坛上发布，核心升级为「科学导航（Science Navigator）」 |
| **2025 年下半年** | 多所高校陆续开通试用（中山大学、南方科技大学、吉林大学等）；2025 年 8 月，深圳市光明区图书馆成为首家上线玻尔的公共图书馆 |
| **2026 年** | 产品持续迭代，多所高校试用期延续 |

### 版本号信息

| 平台 | 最新版本号 | 更新时间 |
|------|-----------|----------|
| **Android（小米应用商店）** | **v2.2.2** | 2026-06-15 |
| **Android（第三方渠道）** | v2.0.3 | 2026-06-04 |
| **Android（历史版本）** | v1.16.1 | 2025-11-23 |
| **iOS（App Store）** | 已上线 | 2025 年上线 |

### 关于"第一版版本号"的说明

公开报道中**未明确提及玻尔科研空间站发布时的具体版本号**（如 v1.0.0、v2.0 等）。官方表述为"全新版本的玻尔科研空间站"。从移动端 App 的版本号推断，v1.x 系列可能对应 2025 年初版，v2.x 系列对应 2026 年重大升级版本。网页端平台未公开数字版本号。

**参考文献：**
- 北京大数据研究院《科研"读、算、做"全流程智能化升级 玻尔科研空间站正式发布》，http://m.bibdr.org/nd.jsp?mid=5&id=325
- 小米应用商店《玻尔-AI学术搜索,期刊订阅》，https://app.mi.com/details?id=com.bohrium.mobile
- 脚本之家《玻尔(AI科研平台) v2.0.3 安卓版》，https://www.jb51.net/softs/1006169.html
- 玻尔 App Store 页面，https://apps.apple.com/sg/app/%E7%8E%BB%E5%B0%94/id6739486655

---

## 11. 玻尔的知识库模型是如何处理知识的？

玻尔的知识库采用 **多层知识处理架构**，核心是基于 **RAG + 知识图谱 + 向量嵌入 + 层级树** 的深度融合方案：

### 第一层：文档结构化解析
- 论文全文结构化解析：提取文本、图表、表格、公式、化学结构
- 文档语义分块 → 向量化（RoBERTa 嵌入）

### 第二层：实体与关系抽取
- 命名实体识别：BiLSTM-Attention-CRF 网络 + Seq2Seq 框架
- 关系抽取：基于句法依存分析，构建实体关系模板
- 形成 `(命名实体, 属性, 实体关系)` 三元组

### 第三层：知识图谱构建与融合
- 三元组向量化：TransE 算法 — 满足 `h + r ≈ t`
- 图谱融合：与 DBpedia 等结构化数据库对齐，通过字符串匹配与语义相似度计算进行实体对齐
- 构建倒排索引库

### 第四层：知识库层级树（RAPTOR 类方法）
- **叶子层**：文档语义分块 → 向量化
- **聚类层**：UMAP 降维 + 高斯混合模型（GMM）软聚类（一个文本块可属于多个主题簇）
- **摘要层**：LLM 对每个聚簇生成摘要，递归向上构建
- **检索策略**：双阶段查询扩展（一级泛化 → 二级定向）+ 从高层摘要到叶子节点的逐层遍历

### 第五层：混合检索与增强生成
- 混合检索：BM25 关键词检索 + 向量相似度检索（余弦相似度）→ 倒数排序融合（RRF）
- LLM 生成：在近零温度下生成，严格约束于检索到的真实来源
- 引用校验：每一条回答均内置引文校验，引用准确率 99.2%

### 架构总览

```
应用层（AI搜索 / 文献伴读 / 知识库问答 / 智能体）
    ↕
RAG 引擎（意图识别 → 混合检索 BM25+向量 → LLM生成）
    ↕
知识组织（知识图谱三元组 + 知识库层级树向量聚类）
    ↕
向量层（RoBERTa嵌入 / TransE图谱向量 / 倒排索引库）
    ↕
数据层（1.7亿论文 / 1.6亿专利 / 2000万学者 / 14万期刊）
```

### SciencePedia（科学百科）
- 42 万+ 个经过验证的科学概念条目
- 提供零幻觉的概念解释
- 作为 RAG 检索中的可信来源层级之一

**参考文献：**
- 专利 CN119129722A《基于大语言模型及向量库构建知识图谱的方法》，https://patentimages.storage.googleapis.com/9c/35/03/d0229757d65203/CN119129722A.pdf
- 专利 CN118861088A（知识库层级树相关），https://patentimages.storage.googleapis.com/b1/65/6f/f0a441cfd2084f/CN118861088A.pdf
- 玻尔知识图谱构建页面，https://www.bohrium.com/sciencepedia/feynman/keyword/knowledge_graph_construction
- 玻尔官方博客，https://www.bohrium.com/en/blog/industry-insights/what-is-bohrium-ai-complete-guide/

---

## 12. 玻尔使用了哪些可以让读者更好理解知识的技术？

玻尔为提升读者对科学知识的理解深度，构建了多层次的技术矩阵：

### 一、AI 驱动的文献精读与交互

| 技术功能 | 对读者的价值 |
|---------|-------------|
| **AI 文献精读** | 智能解析论文结构，自动提炼研究方法、关键结论、实验设计，降低阅读门槛 |
| **AI 问答与对话** | 支持与文献"对话"，提出深度问题并获得基于原文的精准回答 |
| **智能翻译** | 文献内容的中英文智能翻译 + 关键信息高亮标注 |
| **批量文献问答** | 百篇论文一键解码，提取整合多篇文献精华，支持快速课题调研 |

### 二、多媒体内容生成

| 技术功能 | 对读者的价值 |
|---------|-------------|
| **学术海报自动生成** | 根据 PDF 原文 60 秒内自动生成学术海报（中英文），可视化学术成果 |
| **音频概览** | 根据 PDF 原文自动生成音频概览（中英文），支持"听论文" |
| **SciDraw 科研插图** | 文本描述即可生成可发表的科学插图，降低制图门槛 |

### 三、知识体系化与概念解析

| 技术功能 | 对读者的价值 |
|---------|-------------|
| **SciencePedia 科学百科** | 42 万+ 已验证科学概念条目，零幻觉解释，快速理解陌生领域术语 |
| **AI 伴学** | 通过 SciencePedia 快速拆解学科知识点，思维链式讲解，智能规划学习路径 |
| **知识图谱导航** | 可视化的知识关联网络，帮助理解概念间的关系与演进脉络 |
| **引用地图与学术谱系树** | 学者模块中展示引用关系与学术传承图谱 |

### 四、智能科研辅助

| 技术功能 | 对读者的价值 |
|---------|-------------|
| **AI Mentor（AI 小导师）** | 精准、权威、专业的文献搜索问答体验，适合新手入门 |
| **学者 AI 分身** | 可基于真实学者成果打造 AI 分身进行专业对话，近距离理解前沿研究 |
| **Deep Research** | 一键自动生成 10,000+ 词结构化文献综述，快速了解一个领域全貌 |
| **AI 速览** | 对订阅期刊/关键词自动提炼关键要点，高效追踪前沿 |
| **《AI 科研素养基础课》** | 系统性课程讲解平台在选题、读文献、写作等真实场景中的使用 |

### 五、反幻觉与可信度保障

| 技术 | 对读者的价值 |
|------|-------------|
| **100% 引用可追溯** | 每一条回答均可溯源至原文片段，一键跳转 PDF 高亮位置 |
| **近零温度生成** | LLM 在严格约束下生成内容，大幅降低 AI 幻觉和引用编造 |
| **来源信任层级** | 系统性地优先使用同行评审论文，保障学术可信度 |

**参考文献：**
- 南方科技大学图书馆《AI科研平台 | 南科大专属"玻尔-深圳科学导航"上线》，https://sustech.libguides.com/
- 哈尔滨工业大学图书馆《玻尔科学导航》，https://lib.hit.edu.cn/2026/0205/c14783a387407/page.htm
- 上海师范大学《AI科学导航上线》，https://xxb.shnu.edu.cn/f3/65/c120a848741/page.htm
- 玻尔官方博客，https://www.bohrium.com/en/blog/industry-insights/what-is-bohrium-ai-complete-guide/

---

## 附录：核心参考来源汇总

| 序号 | 来源名称 | URL |
|------|---------|-----|
| 1 | 玻尔官网 | https://www.bohrium.com/ |
| 2 | 玻尔官方博客（英文） | https://www.bohrium.com/en/blog/industry-insights/what-is-bohrium-ai-complete-guide/ |
| 3 | 玻尔知识图谱构建页面 | https://www.bohrium.com/sciencepedia/feynman/keyword/knowledge_graph_construction |
| 4 | 玻尔 Apps 应用商店 | https://www.bohrium.com/apps |
| 5 | 玻尔开发者文档 | https://bohrium-doc.dp.tech/docs/ |
| 6 | 新华网报道 | https://app.xinhuanet.com/news/article.html?articleId=1ad1f5c084a9c9d5e86003a5d9168e48 |
| 7 | 北京大数据研究院报道 | http://m.bibdr.org/nd.jsp?mid=5&id=325 |
| 8 | 深势科技官网 | https://www.dp.tech/product/bohrium/workspace |
| 9 | DeepModeling 开源社区 | https://github.com/deepmodeling |
| 10 | Uni-Mol GitHub | https://github.com/dptech-corp/Uni-Mol |
| 11 | 专利 CN119129722A | https://patentimages.storage.googleapis.com/9c/35/03/d0229757d65203/CN119129722A.pdf |
| 12 | 专利 CN118861088A | https://patentimages.storage.googleapis.com/b1/65/6f/f0a441cfd2084f/CN118861088A.pdf |
| 13 | 北京邮电大学图书馆试用通知 | https://libportal.bupt.edu.cn/a/zuixinziyuan/2025/0609/4931.html |
| 14 | 上海交通大学数据库详情 | https://www.lib.sjtu.edu.cn/f/database/database_detail.shtml?id=445 |
| 15 | 深圳光明区报道 | https://www.dutenews.com/n/article/10358786 |
| 16 | 超星数据库玻尔页面 | https://wisdom.chaoxing.com/newwisdom/doordatabase/databasedetail.html?wfwfid=23463 |
| 17 | 小米应用商店玻尔页面 | https://app.mi.com/details?id=com.bohrium.mobile |
| 18 | 玻尔 App Store 页面 | https://apps.apple.com/sg/app/%E7%8E%BB%E5%B0%94/id6739486655 |
| 19 | 张林峰百度百科 | https://baike.baidu.com/item/%E5%BC%A0%E6%9E%97%E5%B3%B0/61923033 |
| 20 | 北京软件和信息服务业协会报道 | https://www.bsia.org.cn/site/content/31550.html |
| 21 | 南方科技大学LibGuides | https://sustech.libguides.com/c.php?g=975786&p=7111552 |

---

> **免责声明：** 本报告所有信息均来源于截至 2026 年 7 月 4 日的公开网页资料。部分技术细节（如底层增量更新的具体架构、PDF 解析的具体引擎等）未在公开渠道完整披露，本报告基于可获取的信息和合理推断进行了整理。如需最准确的技术细节，建议参考深势科技官方技术文档或直接联系 support@bohrium.com。
