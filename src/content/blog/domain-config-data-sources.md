---
title: "领域配置数据来源地图"
date: "2026-07-06"
tags: ["科研AI", "Program-0", "技术调研"]
summary: "领域配置数据来源地图"
categories: ["program-0/final-output"]
---


> 你的 `domain_config.yaml` 中每一行数据，都可以从以下权威来源免费获取。
> 总计约 4 小时即可生成一份完整的、有权威来源支撑的领域配置。

---

## 一、entity_types（实体类型）：来自权威本体论

| 数据源 | 覆盖 | 获取方式 | 链接 |
|:---|:---|:---|:---|
| **UMLS 语义网络** | 135 种语义类型（疾病/药物/基因/解剖结构等） | 免费注册 → REST API | [uts.nlm.nih.gov](https://uts.nlm.nih.gov/) |
| **MeSH** | 30,000+ 医学术语，含层级结构 | 直接下载 XML/RDF 或 SPARQL | [id.nlm.nih.gov/mesh](https://id.nlm.nih.gov/mesh/) |
| **Gene Ontology** | 基因功能、细胞组分、生物过程 | REST API，无需注册 | [api.geneontology.org](https://api.geneontology.org/api/) |
| **ChEBI** | 140,000+ 小分子化合物 | REST API，无需注册 | [ebi.ac.uk/chebi](https://www.ebi.ac.uk/chebi/) |
| **UniProt** | 蛋白质序列+功能+交叉引用 100+ DB | REST API，无需注册 | [rest.uniprot.org](https://rest.uniprot.org/) |
| **PubChem** | 1 亿+ 化合物+生物活性 | PUG REST API，免费 | [pubchem.ncbi.nlm.nih.gov](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest) |
| **Wikidata** | 全学科实体通吃 | SPARQL 查询，免费 | [query.wikidata.org](https://query.wikidata.org/) |

**实操：1 行 Python 拉取 UMLS 全部 135 种语义类型**

```python
import requests
resp = requests.get(
    "https://uts-ws.nlm.nih.gov/rest/content/current/semanticTypes",
    params={"ticket": "your_service_ticket"}  # 免费注册 UTS 账户后获取
)
# 输出 → 直接写入 domain_config.yaml
# ['Disease or Syndrome', 'Pharmacologic Substance', 'Gene or Genome', ...]
```

---

## 二、relation_types（关系类型）：来自学术基准

| 数据源 | 关系数量 | 示例 | 链接 |
|:---|:---|:---|:---|
| **UMLS MRREL 表** | 100+ 关系类型 | `treats`, `causes`, `associated_with` | [uts.nlm.nih.gov](https://uts.nlm.nih.gov/) |
| **Gene Ontology** | 关系本体 | `part_of`, `regulates`, `positively_regulates` | [geneontology.org](https://geneontology.org/) |
| **ChemProt** | 10 种化合物-蛋白关系 | inhibitor/activator/agonist/antagonist/… | 学术基准数据集 |
| **SemMedDB** | 3000 万 PubMed 摘要自动抽取 | `INHIBITS`, `STIMULATES` | [SemMedDB](https://lhncbc.nlm.nih.gov/ii/tools/SemRep_SemMedDB_SemanticMedline.html) |

**推荐：直接用 ChemProt 的 10 种关系，它们有明确的标注标准、有验证过的 F1 指标。**

---

## 三、experiment_tools（工具白名单）：来自工具注册表

| 数据源 | 覆盖 | 链接 |
|:---|:---|:---|
| **bio.tools** | 28,000+ 生物信息学工具（含版本、EDAM 本体标注） | [bio.tools](https://bio.tools/) |
| **EDAM Ontology** | Topic / Operation / Data / Format 四层分类 | [edamontology.org](https://edamontology.org/) |
| **protocols.io** | 30,000+ 结构化实验协议 | [protocols.io](https://www.protocols.io/) |
| **SciCrunch (RRID)** | 30,000+ 科研工具注册表 | [scicrunch.org](https://scicrunch.org/) |

**实操：从 bio.tools API 拉取某个领域的工具列表**

```python
resp = requests.get(
    "https://bio.tools/api/tool",
    params={"topic": "Sequence analysis", "format": "json", "page_size": 100}
)
tools = [t["name"] for t in resp.json()["list"]]
# → ['BLAST', 'Clustal Omega', 'MAFFT', 'Bowtie2', 'STAR', ...]
```

---

## 四、contradiction_patterns / gap_indicators（语言模式）：来自论文原文

不需要 API——来自学术写作的修辞规范。

**直接可用的高频模式：**

```yaml
contradiction_patterns:
  - "in contrast to"
  - "unexpectedly"
  - "surprisingly"
  - "contrary to previous reports"
  - "we failed to replicate"
  - "this finding challenges"
  - "these results contradict"

gap_indicators:
  - "further studies are needed"
  - "remains unclear"
  - "is not well understood"
  - "the mechanism remains to be elucidated"
  - "future work should investigate"
  - "little is known about"
  - "it is still unknown whether"
  - "warrants further investigation"
```

**想系统性扩展？** 读 20 篇你领域高引论文的 Discussion 章节，复制所有"研究空白"句子，提取共同模式。

---

## 五、hypothesis_templates（假设模板）：来自论文 Introduction

**方法：读 10 篇论文的 Introduction 最后一段 → 提取假设句式 → 泛化。**

```
原文："Given that TGF-β activates SMAD2/3, we hypothesized that inhibition of
TGF-β signaling would suppress tumor metastasis."

↓ 泛化

模板："Given that {pathway} activates {downstream}, we hypothesized that
inhibition of {pathway} would {effect} {phenotype}."
```

---

## 六、review_dimensions（评审维度）：来自学术审稿标准

| 来源 | 维度数 | 链接 |
|:---|:---|:---|
| **ICLR/NeurIPS 审稿指南** | 4-6 维 | 每年公开的审稿指南 |
| **NIH 基金评审标准** | 5 维 | [grants.nih.gov](https://grants.nih.gov/peer-review.htm) |
| **Kosmos ScholarEval** | 8 维（新颖性/可行性/严谨性/影响力/清晰度/可复现性/伦理性/资源需求） | [GitHub](https://github.com/jimmc414/Kosmos) |
| **EQUATOR Network** | 不同研究类型的评审清单 | [equator-network.org](https://www.equator-network.org/) |

---

## 七、总成本

| 配置部分 | 去哪里 | 耗时 | 是否需要代码 |
|:---|:---|:---:|:---:|
| entity_types | UMLS / Wikidata SPARQL / MeSH | 30 分钟 | 10 行 Python |
| relation_types | ChemProt / GO 关系本体 / SemMedDB | 30 分钟 | 手动挑选 |
| experiment_tools | bio.tools API + EDAM 本体 | 30 分钟 | 10 行 Python |
| contradiction_patterns | 20 篇论文 Discussion | 1 小时 | 无需 |
| gap_indicators | 20 篇论文 Discussion | 1 小时 | 无需 |
| hypothesis_templates | 10 篇论文 Introduction | 1 小时 | 无需 |
| review_dimensions | ICLR 审稿指南 / Kosmos | 15 分钟 | 无需 |

**总计：约 4 小时，其中需要写代码的部分仅 1.5 小时。**

---

*编写日期：2026-07-06*