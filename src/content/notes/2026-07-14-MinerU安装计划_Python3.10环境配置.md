---
title: "MinerU安装计划_Python3.10环境配置"
date: "2026-07-14"
summary: "目标：在 Windows 电脑上安装 Miniconda → 创建 Python 3.10 环境 → 安装 MinerU（v3.x `mineru` 包）并启用 GPU 加速"
tags: ["mineru", "pdf", "conda", "windows", "installation", "plan"]
category: "research"
---

# MinerU 安装计划：Windows + Python 3.10

> **目标**：在 Windows 电脑上安装 Miniconda → 创建 Python 3.10 环境 → 安装 MinerU（v3.x `mineru` 包）并启用 GPU 加速

---

## 环境前提检查

在开始之前，请先在 Windows 电脑上确认以下信息：

### 1.1 确认 Windows 版本与架构

```powershell
# 按 Win + R，输入 winver，按回车 → 查看 Windows 版本
# 要求在 Windows 10 或 Windows 11，64 位系统（x86_64）
```

### 1.2 确认是否有 NVIDIA 显卡

```powershell
# 方法一：打开任务管理器 → 性能选项卡 → 看是否有 "GPU"（NVIDIA）
# 方法二：打开设备管理器 → 显示适配器 → 看是否有 NVIDIA 显卡

# 方法三：在终端运行（需要已安装 NVIDIA 驱动）
nvidia-smi
```

**如果 `nvidia-smi` 可用**，会显示：
- GPU 型号（如 "NVIDIA GeForce RTX 3060"）
- 显存大小
- CUDA 版本（如 "CUDA Version: 12.4"）
- **恭喜！你的电脑支持 GPU 加速 🎉**

**如果没有 NVIDIA 显卡**：
- MinerU 仍然可以工作，但只能用 CPU 模式，速度慢 3-5 倍
- MinerU v3.x 也支持 DirectML（AMD / Intel 显卡可用）

### 1.3 确认磁盘空间

MinerU 安装后约占用 **5-8 GB**（含模型权重文件约 2-3 GB），确保目标盘有足够空间。

### 1.4 确认终端工具

本教程使用 **Windows PowerShell** 作为终端。打开方式：
```
按 Win + S → 输入 "PowerShell" → 打开 "Windows PowerShell"
```

> ⚠️ **不要用 cmd（命令提示符）**，本教程多数命令基于 PowerShell 语法。

---

## 第一阶段：安装 Miniconda

> **为什么选 Miniconda？**
> - 你只需要一个 Python 3.10 环境来跑 MinerU
> - Miniconda 只有 ~60 MB，比 Anaconda（~3 GB）轻量得多
> - 按需装包，不浪费硬盘

### Step 1.1 下载 Miniconda 安装程序

```powershell
# 用浏览器下载（推荐，更稳定）
# 打开网址：https://docs.anaconda.com/miniconda/
# 点击 "Miniconda3 Windows 64-bit" 下载 .exe 文件

# 或者用命令行下载（如果 Windows 有 curl）
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe
```

**说明：**
- `Windows-x86_64`：64 位 Windows 版本
- 下载到 `Downloads` 文件夹，约 60-70 MB

### Step 1.2 运行安装程序

找到下载的 `Miniconda3-latest-Windows-x86_64.exe`，**双击运行**。

安装过程中的选项：

| 提示 | 应选 | 说明 |
|------|------|------|
| `License Agreement` | ✅ **I Agree** | 接受许可协议 |
| `Install for: Just me / All Users` | ✅ **Just Me**（推荐） | 仅当前用户安装，无需管理员权限 |
| `Installation Location` | 默认（`C:\Users\你的用户名\Miniconda3`） | 保持默认 |
| `Add Miniconda3 to my PATH environment variable` | ✅ **勾选** | ⚠️ **重要**：这样 conda 命令才能在终端直接使用 |
| `Register Miniconda3 as my default Python` | 可选（建议勾选） | 会让系统的 `python` 指向 conda 的 Python |

### Step 1.3 验证安装

安装完成后，**重新打开 PowerShell**（或搜索打开 "Anaconda Prompt (Miniconda)"）：

```powershell
# 验证 conda 命令可用
conda --version
```

**逐行解释：**
- 应该显示类似 `conda 24.x.x` 的版本号
- 如果提示 `conda : 无法将"conda"项识别为 cmdlet...`：
  - **原因**：没有添加到 PATH
  - **解决**：开始菜单 → 搜索 "Anaconda Prompt (Miniconda)" → 用这个终端

### Step 1.4 配置 conda 国内镜像（可选，下载更快）

```powershell
# 如果你在中国大陆，可以换成国内镜像源，下载包更快
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --set show_channel_urls yes
```

**逐行解释：**
- `conda config --add channels ...`：添加清华大学的 conda 镜像源
- `--set show_channel_urls yes`：安装时显示来源渠道

### Step 1.5 更新 conda 到最新版本

```powershell
# 确保 conda 本身是最新版本
conda update conda -y
```

---

## 第二阶段：创建 Python 3.10 环境

### Step 2.1 创建环境

```powershell
# 创建一个名为 MinerU 的环境，指定 Python 版本为 3.10
conda create -n MinerU python=3.10 -y
```

**逐行解释：**
- `conda create`：创建新环境
- `-n MinerU`：环境名称叫 `MinerU`（可以自定义）
- `python=3.10`：使用 Python 3.10.x
- `-y`：自动确认，跳过提示

> **为什么要用 Python 3.10？** 因为 MinerU 的预编译 wheel（detectron2 等）只提供了 Python 3.10 的 Windows 版本。

### Step 2.2 激活环境

```powershell
# 激活 MinerU 环境
conda activate MinerU
```

**逐行解释：**
- 激活后，终端提示符前面会出现 `(MinerU)`
- 此后所有 `python` 和 `pip` 都指向环境内的 Python 3.10

### Step 2.3 验证环境

```powershell
# 确认当前 Python 版本
python --version

# 确认 pip 指向环境内的 pip
Get-Command pip
```

**预期输出：**
```
Python 3.10.x
C:\Users\你的用户名\Miniconda3\envs\MinerU\Scripts\pip.exe
```

> 如果 `Get-Command pip` 显示的是系统目录，说明没有激活环境，回到 Step 2.2。

---

## 第三阶段：安装 MinerU（v3.x 新版）

> ⚠️ **重要说明**：MinerU 有两个版本：

| 版本 | 包名 | 安装命令 | 终端命令 |
|------|------|---------|---------|
| **v2.x（旧版）** | `magic-pdf` | `pip install magic-pdf[full]` | `magic-pdf` |
| **v3.x（新版 ✅）** | **`mineru`** | **`pip install "mineru[all]"`** | **`mineru`** |

> 你要用的是 **v3.x 新版**，命令是 `mineru`，不是 `magic-pdf`。

### Step 3.1 确认有 VC++ 编译工具

MinerU 的部分依赖需要 C++ 编译，Windows 需要安装 **Microsoft C++ Build Tools**：

```powershell
# 检查是否已安装（在 PowerShell 中运行）
Get-Command cl.exe -ErrorAction SilentlyContinue
```

如果没有任何输出，需要下载安装：
1. 打开 https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. 下载 `vs_BuildTools.exe`
3. 运行安装 → 勾选 **"Desktop development with C++"**
4. 只把**安装位置**改为 D 盘即可，不用改其他
5. 安装完成后**重启电脑**

### Step 3.2 升级 pip

```powershell
# 把 MinerU 环境内的 pip 升级到最新版
# 这能避免后续安装时出现的"pip 版本过旧"警告
python -m pip install --upgrade pip
```

### Step 3.3 安装 MinerU 完整版

```powershell
# 安装 MinerU v3.x 完整版（含 OCR、版面检测、公式识别等所有功能）
# --trusted-host 是告诉 pip "这个网站我信得过"，忽略 HTTP 警告
pip install -U "mineru[all]" --extra-index-url https://wheels.myhloli.com --trusted-host wheels.myhloli.com
```

**逐行解释：**
- `-U`：升级到最新版本
- `"mineru[all]"`：**安装 mineru 包**（不是 magic-pdf 了），`[all]` 表示包含所有功能：
  - **OCR 识别** — 识别图片中的文字（109 种语言）
  - **版面检测** — 分析段落、标题、页眉页脚
  - **公式识别** — 数学公式转 LaTeX
  - **表格识别** — 识别并还原表格结构
- `--extra-index-url`：从 myhloli 的仓库下载预编译的二进制包
- `--trusted-host`：因为 myhloli 的仓库用 HTTP 不是 HTTPS，加这个避免警告

**关于那个 `--trusted-host` 警告：**
```
WARNING: wheels.myhloli.com is not a trusted or secure host...
```
这个警告是 pip 的"过度保护"——这个仓库是 MinerU 自己的开发者 myhloli 建的，**安全没问题**，只是他没有配 HTTPS 证书。加了 `--trusted-host` 就安静了。

**如果下载慢，可以加国内 pip 镜像：**

```powershell
pip install -U "mineru[all]" --extra-index-url https://wheels.myhloli.com --trusted-host wheels.myhloli.com -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Step 3.4 验证安装

```powershell
# ✅ 这个命令现在能用了（装的是 mineru 包，不是 magic-pdf 了）
mineru --help

# 查看版本
mineru --version
```

**预期输出：**
```
MinerU v3.x.x
```

---

## 第四阶段：配置 GPU 加速（如有 NVIDIA 显卡）

### Step 4.1 确认已安装 CUDA

```powershell
# 查看 CUDA 驱动版本和 GPU 信息
nvidia-smi
```

**关注输出中的两行：**
```
CUDA Version: 12.4          ← 驱动支持的 CUDA 版本
NVIDIA GeForce RTX 3060    ← 你的显卡型号
```

### Step 4.2 安装 CUDA 版 PyTorch

```powershell
# mineru[all] 默认装了 CPU 版 PyTorch，需要换成 CUDA 版

# 先卸载 CPU 版的 PyTorch
pip uninstall torch torchvision torchaudio -y

# 根据 nvidia-smi 显示的 CUDA 版本选择安装：

# 情况一：CUDA 12.4 或更高（推荐，兼容性最好）
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124

# 情况二：CUDA 11.8（老显卡如 GTX 10 系列）
# pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

**逐行解释：**
- `--index-url https://download.pytorch.org/whl/cu124`：从 PyTorch 官网下载 CUDA 12.4 编译版
- `cu124` 中的 `124` 表示 CUDA 12.4 版本
- 选择的 CUDA 版本**不能高于** `nvidia-smi` 中显示的版本

### Step 4.3 验证 GPU 可用

```powershell
# 测试 PyTorch 是否能识别 GPU
python -c "import torch; print('CUDA可用:', torch.cuda.is_available()); print('显卡名称:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else '无')"
```

**成功输出（示例）：**
```
CUDA可用: True
显卡名称: NVIDIA GeForce RTX 3060
```

**失败输出：**
```
CUDA可用: False
显卡名称: 无
```
→ 说明 PyTorch 没有正确安装 CUDA 版本，回到 Step 4.2 重试

### Step 4.4 配置 MinerU 使用 GPU

```powershell
# 创建 MinerU 配置文件
# 用记事本打开文件
notepad $env:USERPROFILE\.mineru.json
```

在弹出的记事本中输入：

```json
{
  "device-mode": "cuda"
}
```

**保存方法：** `Ctrl+S` → 关闭记事本

**逐行解释：**
- `$env:USERPROFILE`：Windows 环境变量，指向 `C:\Users\你的用户名`
- `.mineru.json`：MinerU v3.x 的配置文件
- `"device-mode": "cuda"`：启用 CUDA GPU 加速
  - `"cpu"`：纯 CPU 模式（慢）
  - `"cuda"`：NVIDIA GPU 模式（快）

---

## 磁盘空间规划（重要）

MinerU 安装后占用空间如下：

| 项目 | 大小 | 默认位置 | 能否自定义 |
|------|------|---------|:---------:|
| **Miniconda 本身** | ~500 MB | 安装时选的路径 | ✅ |
| **MinerU 环境**（Python + 依赖包） | ~3-5 GB | `\envs\MinerU\`（和 conda 同盘） | ✅ 用 `-p` 参数 |
| **pip 缓存**（可清） | ~1-2 GB | `C:\Users\xxx\AppData\Local\pip\cache\` | ⚠️ 用完后可 `pip cache purge` |
| **AI 模型文件** | **~2-3 GB** | **`C:\Users\xxx\.cache\`** | **✅ 可以！通过环境变量改到其他盘** |

> ⚠️ **C 盘紧张的用户注意**：模型文件的默认位置在 C 盘，但你可以在**下载前**设一个环境变量，让它直接下到 D 盘，一步到位。

---

## 第五阶段：下载模型权重

MinerU 需要下载 AI 模型文件（约 2-3 GB），用于版面检测、OCR、公式识别等。

### Step 5.0（可选）把模型下载到 D 盘（C 盘紧张必看）

> **在下载模型之前**设置环境变量，告诉 MinerU "模型存在 D 盘，别放 C 盘"。

```powershell
# 方法一：设置 MinerU 模型目录（推荐）
# 在 D 盘创建一个文件夹来存模型
mkdir D:\MinerU_models


setx MINERU_MODEL_DIR D:\MinerU_models

# 同时也设 modelscope 缓存目录（双保险）
setx MODELSCOPE_CACHE D:\MinerU_models
```

**逐行解释：**
- `setx`：Windows 的命令，永久设置环境变量（重启终端后生效）
- `MINERU_MODEL_DIR`：告诉 MinerU "把模型存到这个目录"
- `MODELSCOPE_CACHE`：告诉 modelscope 下载工具"缓存也放这里"
- **设置后，下载的模型直接进 D 盘，不占 C 盘任何空间**

**之后正常运行下载即可：**
```powershell
# 重启 PowerShell 让环境变量生效，然后：
conda activate MinerU
mineru models download
# 模型直接下到 D:\MinerU_models\，C 盘不受影响 ✅
```

### 如果已经下载了模型在 C 盘，想挪到 D 盘

```powershell
# 1. 把已下载的模型搬到 D 盘
xcopy C:\Users\你的用户名\.cache\modelscope D:\MinerU_models /E /H

# 2. 确认复制完整后，删除 C 盘的
rmdir /S /Q C:\Users\你的用户名\.cache\modelscope

# 3. 建一个"符号链接"——让系统以为文件还在 C 盘
mklink /J C:\Users\你的用户名\.cache\modelscope D:\MinerU_models
```

### Step 5.1 设置国内模型下载源（推荐中国大陆用户）

```powershell
# 如果你在中国大陆，建议用 ModelScope 源下载，速度快很多
# 设置环境变量（仅当前终端有效）
$env:MINERU_MODEL_SOURCE = "modelscope"

# 或者永久设置（推荐）
[Environment]::SetEnvironmentVariable("MINERU_MODEL_SOURCE", "modelscope", "User")
```

### Step 5.2 执行模型下载

```powershell
# 下载所有 MinerU 模型文件
mineru models download
```

**逐行解释：**
- `mineru` 是 MinerU v3.x 的命令
- 自动下载所有需要的预训练模型到指定目录（默认 `C:\Users\你的用户名\.cache\`，如已设环境变量则到 `D:\MinerU_models`）
- 总大小约 **2-3 GB**
- 下载时间：根据网络速度，约 15-60 分钟
- **只需要下载一次**——以后删了环境重建，模型还在，不需要重新下载

---

## 第六阶段：测试 MinerU

### Step 6.1 准备一个测试 PDF

```powershell
# 下载一个示例 PDF（学术论文）
curl -O https://arxiv.org/pdf/2303.08774.pdf

# 或者使用你自己的 PDF 文件
```

### Step 6.2 解析 PDF

```powershell
# 将 PDF 转换为 Markdown（新版 mineru 命令）
mineru -p "2303.08774.pdf" -o ./output
```

**逐行解释：**
- `mineru`：v3.x 的命令（不再是 `magic-pdf pdf-command`）
- `-p`：指定输入的 PDF 文件
- `-o`：指定输出目录

**成功后**，`./output` 目录下生成：
```
output/
├── 2303.08774.md          ← 转换后的 Markdown 文件
├── images/                ← 提取的图片
└── 2303.08774.json        ← 结构化 JSON
```

### Step 6.3 启动 Web 界面（可选）

```powershell
# 启动图形化界面，可以在浏览器中上传 PDF
mineru gradio
```

**说明：**
- 启动后终端会显示一个本地地址，如 `http://127.0.0.1:14229`（**端口号不固定，以你实际显示的为准**）
- 在浏览器打开这个地址，可以图形化操作
- 按 `Ctrl+C` 停止服务

---

## 完整安装流程（复制即用版）

以下是从零到完成的全部命令，**在 PowerShell 中按顺序逐条执行**：

```powershell
# ===== 第一阶段：安装 Miniconda =====
# 去 https://docs.anaconda.com/miniconda/ 下载 Miniconda3 Windows 64-bit
# 双击安装，记得勾选 "Add to PATH"
# 装好后重新打开 PowerShell

conda --version                                   # 验证 conda 安装成功

# ===== 第二阶段：创建 Python 3.10 环境 =====
conda create -n MinerU python=3.10 -y             # 创建环境
conda activate MinerU                             # 激活环境
python --version                                  # 确认 → Python 3.10.x

# ===== 第三阶段：安装 MinerU v3.x =====
python -m pip install --upgrade pip               # 升级 pip
pip install -U "mineru[all]" --extra-index-url https://wheels.myhloli.com --trusted-host wheels.myhloli.com
mineru --version                                  # 确认 → MinerU v3.x.x ✅

# ===== 第四阶段：配置 GPU（有 NVIDIA 显卡才需要） =====
pip uninstall torch torchvision torchaudio -y     # 卸载 CPU 版 torch
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
python -c "import torch; print(torch.cuda.is_available())"   # → 应该输出 True

# 创建配置文件
@'{"device-mode": "cuda"}'@ | Out-File -Encoding UTF8 $env:USERPROFILE\.mineru.json

# ===== 第五阶段：下载模型 =====
# 可选：设完重启终端，模型就下到 D 盘（C 盘紧张时用）
setx MINERU_MODEL_DIR D:\MinerU_models
setx MODELSCOPE_CACHE D:\MinerU_models

$env:MINERU_MODEL_SOURCE = "modelscope"           # 国内用，加速下载
mineru models download                            # 下载模型（约2-3GB，等15-60分钟）

# ===== 第六阶段：测试 =====
curl -O https://arxiv.org/pdf/2303.08774.pdf
mineru -p "2303.08774.pdf" -o ./output
Get-ChildItem ./output                            # 查看解析结果
```

---

## 如果你之前已装了 magic-pdf（旧版）

如果之前已经运行了 `pip install magic-pdf[full]`，两种选择：

### 选择 A：继续用旧版（不需要改）

```powershell
# 旧版用 magic-pdf 命令，功能是一样的
magic-pdf --version
magic-pdf pdf-command --pdf "xxx.pdf" --output_path ./output
```

### 选择 B：升级到新版 mineru 命令（推荐）

```powershell
# 直接安装 mineru 包，它会覆盖旧版
pip install -U "mineru[all]" --extra-index-url https://wheels.myhloli.com --trusted-host wheels.myhloli.com

# 现在可以用 mineru 命令了
mineru --version
```

---

## 无 GPU 电脑的替代方案

### CPU 模式（最简单）

```powershell
# mineru[all] 默认就是 CPU 版，不需要额外操作
# 配置文件设为 CPU 模式
@'{"device-mode": "cpu"}'@ | Out-File -Encoding UTF8 $env:USERPROFILE\.mineru.json
```

---

## GPU 性能参考

| GPU 型号 | 显存 | 20 页 PDF 耗时 | 速度对比 CPU |
|---------|------|---------------|------------|
| **CPU only** | — | 15-30 分钟 | 基准 |
| **RTX 3050** | 6 GB | 3-8 分钟 | ~3-5x |
| **RTX 3060** | 12 GB | 2-5 分钟 | ~5-8x |
| **RTX 4090** | 24 GB | 1-2 分钟 | ~10-15x |

---

## 常见问题

### Q1: `conda` 命令找不到
**原因**：安装时没有勾选 "Add to PATH"
**解决**：用开始菜单搜索 "Anaconda Prompt (Miniconda)" 打开

### Q2: `mineru --version` 报错
**原因**：可能装了旧版（magic-pdf）没装新版（mineru）
**解决**：
```powershell
pip install -U "mineru[all]" --extra-index-url https://wheels.myhloli.com --trusted-host wheels.myhloli.com
```

### Q3: `torch.cuda.is_available()` 返回 False
**原因**：PyTorch 安装成了 CPU 版
**解决**：
```powershell
pip uninstall torch torchvision torchaudio -y
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
```

### Q4: 模型下载特别慢
**原因**：默认从 HuggingFace 下载（海外服务器）
**解决**：
```powershell
$env:MINERU_MODEL_SOURCE = "modelscope"
mineru models download
```

### Q5: C 盘空间不够怎么办？
**原因**：模型文件默认下到 C 盘（~2-3 GB），pip 缓存也在 C 盘（~1-2 GB）
**解决**：
```powershell
# 1. 清 pip 缓存（立刻释放，安全）
pip cache purge

# 2. 下载模型前设环境变量，改到 D 盘
setx MINERU_MODEL_DIR D:\MinerU_models
setx MODELSCOPE_CACHE D:\MinerU_models
# 重启 PowerShell → conda activate MinerU → mineru models download

# 3. 如果模型已经下到 C 盘了，可以搬走
xcopy C:\Users\xxx\.cache\modelscope D:\MinerU_models /E /H
rmdir /S /Q C:\Users\xxx\.cache\modelscope
mklink /J C:\Users\xxx\.cache\modelscope D:\MinerU_models
```

### Q6: 想卸载整个环境
```powershell
conda deactivate                       # 先退出环境
conda remove -n MinerU --all           # 删除整个环境
```

---

## 🔗 参考链接

- [MinerU GitHub 仓库](https://github.com/opendatalab/MinerU)
- [Miniconda 官方下载（Windows）](https://docs.anaconda.com/miniconda/)
- [mineru PyPI 页面](https://pypi.org/project/mineru/)
- [MinerU 在线体验 Demo](https://opendatalab.com/OpenSourceTools/Extractor/PDF)
- [PyTorch 官方下载（选 CUDA 版本）](https://pytorch.org/get-started/locally/)

---

**📂 关联笔记**：
- [[Anaconda与Miniconda异同调研报告]] — 为什么选 Miniconda
- [[Python虚拟环境配置指南]] — Conda 基本操作
- [[Python虚拟环境工具调研报告]] — 环境管理全景

**🔄 文档版本**：v3.0（Windows + MinerU v3.x 版） | 最后更新：2026-07-14
