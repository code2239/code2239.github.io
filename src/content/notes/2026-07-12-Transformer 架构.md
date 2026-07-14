---
title: "Transformer 架构"
date: "2026-07-12"
summary: "一句话定义：Transformer 是一种完全基于 [[自注意力机制]] 的神经网络架构，去掉了传统序列模型中的循环结构，通过并行计算实现了训练效率和长距离依赖建模的双重突破。"
tags: ["deep-learning", "architecture", "transformer", "nlp", "foundation"]
category: "learning"
---

# Transformer 架构

> **一句话定义**：Transformer 是一种完全基于 [[自注意力机制]] 的神经网络架构，去掉了传统序列模型中的循环结构，通过并行计算实现了训练效率和长距离依赖建模的双重突破。

---

## 基本信息

| 项目 | 内容 |
|------|------|
| **提出时间** | 2017 年 6 月 |
| **论文** | *Attention Is All You Need*（Vaswani et al., 2017） |
| **关键创新** | 完全抛弃 RNN/CNN，仅用注意力机制建模序列 |
| **所属领域** | 深度学习 → 自然语言处理 → 序列建模 |
| **论文链接** | [arXiv:1706.03762](https://arxiv.org/abs/1706.03762) |

> 这篇论文的标题本身就是宣言：**注意力就是你所需要的全部**。

---

## 为什么要提出 Transformer？

### 之前的问题

在 Transformer 出现之前，序列建模主要靠 RNN/LSTM：

| 问题 | 表现 |
|------|------|
| **串行计算** | 每个时间步依赖上一个时间步的计算结果，无法并行加速 |
| **长距离衰减** | 词与词之间的信息传递距离 = 它们在序列中的距离，越远越弱（梯度消失） |
| **训练效率低** | 长序列上训练时间随长度线性增长，难以扩展到大规模数据 |

### Transformer 的解决思路

把序列建模变成**图建模**——每个位置**直接连接所有位置**，让模型自己去发现结构，而不是由时间顺序强加。

---

## 整体架构

Transformer 采用 **Encoder-Decoder 结构**：

```
输入序列 → [Encoder × N] → 中间表示 → [Decoder × N] → 输出序列
                                  ↕
                             (交叉注意力)
```

Vaswani 等人的原始论文中 N = 6（堆叠 6 层）。

---

## Encoder（编码器）

每一层 Encoder 包含两个子层：

### 1. 多头自注意力（Multi-Head Self-Attention）

每个位置的表示通过注意力机制融合所有其他位置的信息。详见 [[自注意力机制]] 和 [[多头注意力]]。

### 2. 前馈神经网络（Feed-Forward Network, FFN）

对每个位置的表示独立做两次线性变换 + ReLU 激活：

```
FFN(x) = max(0, x·W₁ + b₁)·W₂ + b₂
```

**直觉**：注意力层负责「收集信息」，FFN 层负责「加工处理」。

### 残差连接 + LayerNorm

每个子层周围都有残差连接和后接 LayerNorm：

```
output = LayerNorm(x + Sublayer(x))
```

这让深层网络的梯度可以顺畅回传，支持堆叠更多层。

---

## Decoder（解码器）

Decoder 在 Encoder 基础上多了一个子层：

| 子层 | 作用 |
|------|------|
| **掩码多头自注意力** | 与 Encoder 相同，但未来位置被掩掉（Masked），防止看到后面的词 |
| **交叉注意力（Cross-Attention）** | Decoder 的 Query 与 Encoder 输出的 Key/Value 做注意力——让解码时能看到输入序列 |
| **前馈神经网络** | 与 Encoder 相同 |

---

## 核心组件详解

### 自注意力机制（Scaled Dot-Product Attention）

```
Attention(Q, K, V) = softmax(Q·K^T / √d_k) · V
```

详见 [[自注意力机制]]。

### 多头注意力

- 把 Q、K、V 分别映射到 h 个不同的子空间
- 在每个子空间独立做注意力
- 拼接 + 线性变换得到最终输出

**为什么有效**：一个注意力头只能学到一种关联模式（比如语法关系）；多个头可以学到语法关系、语义关系、指代关系、位置关系等不同维度。

### 位置编码（Positional Encoding）

Transformer 没有 RNN 的顺序感，所以需要在输入中注入位置信息：

```
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

- 不同维度的正弦波频率不同 → 模型可以学到相对位置关系
- 无需学习，固定公式 → 可以外推到未见过的序列长度

---

## 关键贡献：为什么 Transformer 成功了？

### 1. 并行计算

所有位置同时计算，训练速度比 RNN 快几个数量级。这是它能够 **scale** 的前提。

### 2. 长距离依赖 O(1)

任意两个位置之间的信息传递路径长度都是 **1**（通过注意力直接连接），而 RNN 是 O(n)。这解决了长文本建模的根本瓶颈。

### 3. 可扩展性

Transformer 的参数量可以轻松扩展到千亿级别，而且增加参数 ≈ 增加注意力头/层数，结构上不会出现 RNN 那种「加深 = 计算瓶颈」的问题。

### 4. 预训练范式的起点

BERT（Encoder-only）和 GPT（Decoder-only）分别衍生自 Transformer 的不同部分，开创了「预训练 + 微调」的时代。

---

## 重要变体

| 变体 | 改动 | 代表作 |
|------|------|--------|
| **Encoder-only** | 去掉 Decoder | [[BERT]]、RoBERTa |
| **Decoder-only** | 去掉 Encoder | [[GPT]] 系列、LLaMA |
| **Encoder-Decoder** | 保留完整结构 | T5、BART |
| **高效 Transformer** | 简化注意力计算 | Linformer、Reformer、Longformer |

---

## 我的理解（思考痕迹）

```
我最初学 Transformer 时的三个困惑：

困惑 1：Q/K/V 到底从哪来的？
→ 从同一个输入分别乘三个不同的权重矩阵 W_Q、W_K、W_V
→ 所以 Q/K/V 本身不是「额外的数据」，而是输入在不同视角下的投影

困惑 2：为什么位置编码用 sin/cos 而不是直接学一个向量？
→ 固定位置编码可以外推到训练时没见过的序列长度
→ 而且 sin/cos 的线性性质让模型可以学到相对位置关系（PE(pos+k) 可以由 PE(pos) 线性表示）

困惑 3：为什么它叫「Transformer」？
→ 因为它把一个序列「变换」成另一个序列——从输入到输出
→ 而驱动这个变换的核心引擎是注意力机制

我认为最重要的 insight：
Transformer 的本质是把「时间」从架构中抽走了。
RNN 把时间嵌在架构里（循环），
CNN 把局部性嵌在架构里（卷积核），
Transformer 说：我不管结构，让数据自己告诉我关系。
这一刀切下去，才有了后来 scaling law 的一切。
```

---

## 关联笔记

- [[自注意力机制]] — 要理解 Transformer，先理解这个
- [[多头注意力]] — 为什么多个头比一个头强
- [[BERT]] — Encoder-only 的代表
- [[GPT]] — Decoder-only 的代表
- [[位置编码]] — Transformer 如何感知顺序
- [[Attention Is All You Need 论文笔记]] — 论文精读（*待生成*）

---

## 🔗 参考来源

- Vaswani et al., 2017. *Attention Is All You Need*. [arXiv:1706.03762](https://arxiv.org/abs/1706.03762)
- Jay Alammar, *The Illustrated Transformer*. [Blog](https://jalammar.github.io/illustrated-transformer/)
- Lilian Weng, *The Transformer Family*. [Blog](https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/)
- 3Blue1Brown, *Attention in transformers, visually explained*. [YouTube](https://www.youtube.com/watch?v=eMlx5fFNoYc)

---

*笔记状态：budding 🌱 — 核心内容已成型，还可继续补充各变体的详细对比和代码实现示例。*
