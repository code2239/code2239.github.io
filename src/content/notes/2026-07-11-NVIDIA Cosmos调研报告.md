---
title: "NVIDIA Cosmos调研报告"
date: "2026-07-11"
summary: "生成日期：2026-07-11"
tags: ["research", "nvidia", "cosmos", "world-model", "physical-ai", "robotics"]
category: "research"
source: "web"
---

# NVIDIA Cosmos 调研报告

> 生成日期：2026-07-11

---

## 1. 开发者与公司背景

### 开发方全称
**NVIDIA Corporation（英伟达）**，总部位于美国加利福尼亚州圣克拉拉。

### 创始人
- **Jensen Huang（黄仁勋）**——创始人兼 CEO，项目主要推动者。2025 CES 宣布推出 Cosmos，2026 Computex 展示 Cosmos 3。

### 核心技术团队

| 人物 | 角色 | 背景 |
|------|------|------|
| **Ming-Yu Liu（刘明宇）** | NVIDIA 研究副总裁、IEEE Fellow | Deep Imagination Research 负责人，Cosmos 架构唯一贡献者 |
| **Jinwei Gu（顾金伟）** | 首席研究科学家兼高级经理 | Cosmos 技术负责人之一，哥伦比亚大学博士 |
| **Huan Ling（凌欢）** | Toronto AI Lab 科学家 | 主攻大规模图像/视频生成模型 |
| **Sameer Dharur** | 研究科学家 | 负责 VLM 构建，曾任 Apple |
| **Wei-Cheng Tseng** | 研究科学家 | CV、生成 AI 方向 |

### 团队规模
- NVIDIA 全球 **36,000+ 人**
- Cosmos 由 **NVIDIA Research** 主导，华人学者占据半壁江山

### 盈利情况
- NVIDIA 2026 财年营收预计超 **$1,300 亿美元**
- Cosmos 策略：模型免费 → 拉动硬件（H200/B200）+ 企业 NIM 微服务销售
- 企业推理 token：机器人 $0.12/1K tokens，车辆 $0.09/1K tokens

### 发展战略
> "机器人技术的 ChatGPT 时刻即将到来。我们创建 Cosmos 是为了让物理 AI 普及化。"——黄仁勋

**战略意义**：打破大模型垄断、强化 CUDA 生态、主导物理 AI 训练数据管道

### 链接
- [Cosmos 官网](https://www.nvidia.cn/ai/cosmos/)
- [NVIDIA 开发者博客](https://developer.nvidia.cn/blog/)
- [GitHub - nvidia-cosmos](https://github.com/nvidia-cosmos)
- [Hugging Face - Cosmos 3](https://huggingface.co/nvidia/cosmos3)

> **信息源**：[NVIDIA 官方博客](https://developer.nvidia.com/blog/develop-physical-ai-reasoning-world-and-action-models-with-nvidia-cosmos-3/) · [NVIDIA 研究页面](https://research.nvidia.com/) · [百度百科](https://baike.baidu.com/item/NVIDIA%20Cosmos/67801892) · [网易报道](https://m.163.com/dy/article/JLCV2FBI0511AQHO.html)

---

## 2. 底层技术栈

### 2.1 核心架构：Mixture-of-Transformers（MoT）双塔

```
用户输入（文本/图像/视频/动作）
         ▼
┌─────────────────────────────┐
│    Reasoner Tower（推理塔）    │
│  自回归 VLM，256K 上下文      │
│  理解物体交互、运动、物理规律  │
│  → "大脑"                    │
└──────────┬──────────────────┘
           ▼ Conditioning
┌─────────────────────────────┐
│   Generator Tower（生成器塔） │
│  扩散模型（Diffusion-based） │
│  生成符合物理规律的视频/动作  │
│  → "执行器"                  │
└──────────┬──────────────────┘
           ▼
   输出（视频/图像/文本/动作）
```

### 2.2 模型版本

| 型号 | 参数 | 目标场景 |
|------|------|---------|
| **Cosmos 3 Nano** | 16B（8B+8B） | 工作站级实时推理 |
| **Cosmos 3 Super** | 64B（32B+32B） | 数据中心最高精度 |
| **Cosmos 3 Edge** | 待发布 | 边缘端推理 |
| **Cosmos 3 Nano Policy DROID** | 16B | 机器人策略 |

### 2.3 全模态支持

| 输入 → 输出 | 应用 |
|-------------|------|
| 文本 → 图像 | 物理规律图像生成 |
| 文本 → 视频 | 边缘场景世界模型 |
| 文本+图像 → 视频 | 世界预测模型 |
| **动作+视频+文本** → 视频 | **动作条件世界模型** |
| 视频+文本 → **视频+动作** | **世界动作模型/机器人策略** |

### 2.4 训练数据
数十亿条文本、图像、视频、声音和动作轨迹样本，配套 **Cosmos Curator** 数据治理工具。

### 2.5 推理优化

| 技术 | 效果 |
|------|------|
| **NVFP4 量化** | 4-bit 浮点，推理加速 2× |
| **vLLM** | 高吞吐推理引擎 |
| **EVS 高效视频采样** | 减少 VLM 视频 token 量 |

### 2.6 开发者工具链
**Cosmos Curator**（数据治理）· **Cosmos Evaluator**（质量评分）· **Cosmos Tokenizer**（跨模态转换）· **Cosmos Cookbook**（后训练配方）· **TAO 7**（视觉 AI 微调）

> **信息源**：[NVIDIA 开发者博客：Cosmos 3 发布](https://developer.nvidia.com/blog/develop-physical-ai-reasoning-world-and-action-models-with-nvidia-cosmos-3/) · [NVIDIA 中国博客](https://blogs.nvidia.cn/blog/nvidia-launches-cosmos-3-the-open-frontier-foundation-model-for-physical-ai/) · [IT之家](https://www.ithome.com/0/958/103.htm)

---

## 3. 开源属性与商业模式

### 开源许可

| 版本 | 协议 | 商业使用 |
|------|------|---------|
| Cosmos 原始版（2025.01） | NVIDIA Open Model License | ✅ |
| **Cosmos 3**（2026.06） | **OpenMDW 1.1**（Linux Foundation） | ✅ 明确允许 |

**OpenMDW 1.1 条款**：✅ 商业使用 ✅ 衍生模型 ✅ 不主张输出所有权 ❌ 不得绕过安全护栏

### 定价

| 方式 | 价格 |
|------|------|
| **模型权重下载** | **完全免费** |
| NIM 微服务（推理 token） | 机器人 $0.12/1K；车辆 $0.09/1K |
| 企业永久许可 | 从 $200 万/年起 |
| 云合作伙伴 | Azure、CoreWeave、Nebius |

> **信息源**：[LLM Reference 定价](https://www.llmreference.com/model-family/cosmos-3) · [Featherless.ai](https://featherless.ai/models/nvidia/Cosmos-Reason2-32B) · [数据邦报道](http://www.shujubang.com/home/login/index/gid/21439)

---

## 4. 功能全景解析

### 主要功能
> 面向物理 AI 的开放世界基础模型平台——为机器人/自动驾驶提供理解、生成和预测物理世界的能力。

### 核心功能

#### 4.1 🌍 世界理解（Reasoner 推理塔）
256K 长上下文 VLM，2D/3D 点定位，三阶段训练（ViT → SFT → RL）

#### 4.2 🎬 世界生成（Generator 生成器塔）
扩散模型引导式生成，确保物理一致性，多视图输出，最长 30 秒视频

#### 4.3 🚀 世界预测（Cosmos Predict）
Transformer 架构，专有数据后训练精度提升 10×，首尾帧间多帧生成

#### 4.4 🎯 世界动作模型（WAM）
前向/逆向动力学、策略生成，RoboLab/RoboArena 开源第一

#### 4.5 🎨 可控视频生成（Cosmos Transfer）
Multi-ControlNet，输入控制信号支持分割图/深度图/边缘图/人体关键点/LiDAR/3D 边界框

#### 4.6 🔄 数据闭环
Cosmos Curator → 训练 → Evaluator 评分 → Isaac Sim 验证 → 反馈迭代

> **信息源**：[NVIDIA 开发者博客](https://developer.nvidia.com/blog/develop-physical-ai-reasoning-world-and-action-models-with-nvidia-cosmos-3/) · [Engineering.com](https://www.engineering.com/nvidia-launches-cosmos-3-for-physical-ai-models/)

---

## 5. 功能实现案例

### 案例：用 Cosmos 3 训练机械臂"将杯子放入洗碗机"

**流程**：
1. **世界理解** → 输入真机视频 → Reasoner 解析物体位置、抓取点、物理约束
2. **合成数据生成** → Generator 生成 1,000 段多样化视频（不同杯子/光照/布局）
3. **动作策略生成** → Cosmos 3 Nano Policy DROID 输出关节角度轨迹
4. **后训练优化** → Cosmos Cookbook SFT+RL 训练，Evaluator 评分
5. **真机部署** → 收集反馈数据 → 迭代

**结果**：数月数据采集工作压缩到数天，RoboArena 开源 SOTA。

---

## 6. 主要竞品清单

| # | 竞品 | 开发商 | 定位 | 核心优势 |
|---|------|--------|------|---------|
| 1 | **Kairos 3.0（开悟）** | ACE Robotics | 统一理解-生成-预测 | 4 大基准第一，4B 高效 |
| 2 | **Spirit v1.6** | Spirit AI | 具身智能基础模型 | RoboArena 第一（1924分）|
| 3 | **Genie 3** | Google DeepMind | 交互世界模型 | 从无标注视频生成环境 |
| 4 | **Marble** | World Labs（李飞飞） | 3D 空间智能 | 空间理解与 3D 生成 |
| 5 | **Odyssey-2 Max** | Odyssey | 因果自回归世界模型 | 120 秒连续仿真 |
| 6 | **Sora** | OpenAI | 文生视频 | 视觉质量极高 |
| 7 | **AMI** | Yann LeCun 创业 | 因果推理/JEPA | $10.3 亿种子轮 |

### 世界模型四大流派

| 流派 | 代表 | 核心理念 |
|------|------|---------|
| **视频生成派** | Sora、Veo、Wan | "世界即像素" |
| **物理 AI 派** | **NVIDIA Cosmos** | "世界即物理模拟器" |
| **空间智能派** | World Labs Marble | "世界即 3D 空间" |
| **因果推理派** | AMI | "世界即因果图" |

> **信息源**：[搜狐科技](https://m.sohu.com/a/1024451038_122014422/) · [中信证券研报](https://www.itiger.com/hans/news/2636500053) · [The Next Web](https://thenextweb.com/news/spirit-ai-beats-nvidia-roboarena-physical-ai) · [Analytics Insight](https://www.analyticsinsight.net/artificial-intelligence/best-physical-ai-development-tools-and-frameworks-in-2026)

---

## 7. 与竞品的横向比较

| 对比维度 | **NVIDIA Cosmos 3** | **Kairos 3.0** | **Genie 3** | **Odyssey-2 Max** |
|:---|:---|:---|:---|:---|
| **价格** | ✅ 模型免费（OpenMDW 1.1） | ✅ 开源免费 | ❌ API 闭源 | ❌ 私有 Beta |
| **参数** | 16B / 64B | **4B**（更高效） | 未公开 | 未公开 |
| **物理遵循** | ⭐⭐⭐⭐ Physics-IQ 开源第一 | ⭐⭐⭐⭐⭐ WorldModelBench 9.30 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ VBench 2 第一 |
| **机器人策略** | ⭐⭐⭐⭐ RoboArena 1,881 | ⭐⭐⭐⭐⭐ LIBERO-Plus 89.0 | ❌ | ❌ |
| **开源** | ✅ **完全开放** | ✅ **完全开源** | ❌ 仅 API | ❌ 私有 |
| **模态** | ⭐⭐⭐⭐⭐ 五模态 | ⭐⭐⭐⭐ 统一 | ⭐⭐⭐ 视频 | ⭐⭐⭐ 视频 |
| **生态** | ⭐⭐⭐⭐⭐ CUDA+Isaac 全栈 | ⭐⭐ 起步 | ⭐⭐⭐⭐ DeepMind | ⭐⭐ 起步 |

### 各竞品最适用场景

| 竞品 | 最佳场景 |
|------|---------|
| **NVIDIA Cosmos** | 全栈开放物理 AI 基础设施需求 |
| **Kairos 3.0** | 最高物理遵循 + 端侧部署 |
| **Spirit v1.6** | 最高策略性能，不在意闭源 |
| **Genie 3** | 交互式环境生成 |
| **Odyssey-2 Max** | 长视频连续仿真 |
| **Marble** | 3D 空间理解 |

> **信息源**：四大基准排名 · [中信证券](https://www.itiger.com/hans/news/2636500053) · [The Next Web](https://thenextweb.com/news/spirit-ai-beats-nvidia-roboarena-physical-ai)

---

## 8. 版本迭代信息

### 首次发布
- **Cosmos v1.0**：2025 年 1 月 7 日（CES 2025），8 个开源模型（4B-14B）

### 版本历史

| 版本 | 日期 | 关键变化 |
|------|------|---------|
| **Cosmos 1.0** | 2025.01（CES）| 首批 8 个世界基础模型 |
| Transfer/Predict/Reason | 2025.03（GTC）| 模块化拆分 |
| Cosmos Transfer 2.5 | 2025.10 | Multi-ControlNet |
| Cosmos Predict 2.5 | 2025.10 | 30 秒预测，10× 精度 |
| Cosmos Reason 2 | 2026.03 | 256K 上下文 |
| **Cosmos 3** | **2026.06.01（Computex）** | **MoT 双塔，16B/64B 全模态，OpenMDW 1.1** |
| Cosmos Coalition | 2026.06 | Agile Robots、Runway 等联盟成立 |

### 最新稳定版
- **Cosmos 3 Nano（16B）/ Super（64B）** — 2026 年 6 月 1 日
- 权重：[Hugging Face](https://huggingface.co/nvidia/cosmos3) · 代码：[GitHub](https://github.com/nvidia-cosmos)

> **信息源**：[NVIDIA 官方博客](https://developer.nvidia.com/blog/develop-physical-ai-reasoning-world-and-action-models-with-nvidia-cosmos-3/) · [Engineering.com](https://www.engineering.com/nvidia-launches-cosmos-3-for-physical-ai-models/) · [Telecoms.com](https://www.telecoms.com/ai/nvidia-launches-cosmos-3-for-physical-ai)

---

## 一句话锐评

> **NVIDIA Cosmos 是物理 AI 时代的"操作系统级基础设施"——以完全开放姿态（OpenMDW 1.1）将世界模型权重交到每个开发者手中，再借由 CUDA 生态和 Isaac Sim 牢牢占据物理 AI 训练管道的制高点。虽然在单项基准上被 Kairos、Spirit 超越，但全栈开放+生态成熟的组合拳让 Cosmos 成为这个赛道最安全的"下注"。**

---

*本报告基于 2026 年 7 月 11 日的公开信息编制。*

**核心信息源汇总**：[NVIDIA Cosmos 官网](https://www.nvidia.cn/ai/cosmos/) · [NVIDIA 开发者博客：Cosmos 3](https://developer.nvidia.com/blog/develop-physical-ai-reasoning-world-and-action-models-with-nvidia-cosmos-3/) · [NVIDIA 中国博客](https://blogs.nvidia.cn/blog/nvidia-launches-cosmos-3-the-open-frontier-foundation-model-for-physical-ai/) · [NVIDIA 台湾博客](https://blogs.nvidia.com.tw/blog/nvidia-launches-cosmos-3-the-open-frontier-foundation-model-for-physical-ai/) · [GitHub](https://github.com/nvidia-cosmos) · [Hugging Face](https://huggingface.co/nvidia/cosmos3) · [IT之家](https://www.ithome.com/0/958/103.htm) · [Engineering.com](https://www.engineering.com/nvidia-launches-cosmos-3-for-physical-ai-models/) · [百度百科](https://baike.baidu.com/item/NVIDIA%20Cosmos/67801892) · [搜狐科技](https://m.sohu.com/a/1024451038_122014422/) · [中信证券研报](https://www.itiger.com/hans/news/2636500053) · [The Next Web](https://thenextweb.com/news/spirit-ai-beats-nvidia-roboarena-physical-ai) · [LLM Reference 定价](https://www.llmreference.com/model-family/cosmos-3) · [网易](https://m.163.com/dy/article/JLCV2FBI0511AQHO.html)
