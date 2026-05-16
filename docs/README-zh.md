<h1 align="center">
AcadHomepage
</h1>

<div align="center">

[![](https://img.shields.io/github/stars/RayeRen/acad-homepage.github.io)](https://github.com/RayeRen/acad-homepage.github.io)
[![](https://img.shields.io/github/forks/RayeRen/acad-homepage.github.io)](https://github.com/RayeRen/acad-homepage.github.io)
[![](https://img.shields.io/github/issues/RayeRen/acad-homepage.github.io)](https://github.com/RayeRen/acad-homepage.github.io)
[![](https://img.shields.io/github/license/RayeRen/acad-homepage.github.io)](https://github.com/RayeRen/acad-homepage.github.io/blob/main/LICENSE)

</div>

<p align="center">一个适合学术个人主页的轻量级 Jekyll 模板。</p>

<p align="center">
  <br>
  <img src="./screenshot.png" width="100%"/>
  <br>
</p>

## 示例

- [模板示例页面](https://rayeren.github.io/acad-homepage.github.io/)
- [作者个人主页](https://rayeren.github.io/)

## 主要功能

- **自动更新 Google Scholar 引用数**：可以通过 GitHub Actions 抓取并更新作者总引用数，以及各篇论文的引用数。
- **支持 Google Analytics**：在配置文件里填入 Analytics ID 后，就可以统计主页访问情况。
- **响应式布局**：页面会根据桌面端、平板和手机屏幕自动调整排版。
- **简洁的学术主页样式**：适合展示个人简介、研究方向、论文、项目和联系方式。
- **基础 SEO 支持**：可以配置站点标题、简介和搜索引擎验证信息，方便搜索引擎收录。

## 快速开始

1. Fork 这个仓库到 `USERNAME/USERNAME.github.io`，其中 `USERNAME` 是你的 GitHub 用户名。
2. 配置 Google Scholar 引用统计：
   1. 打开你的 Google Scholar 个人主页，在 URL 里找到 Scholar ID。例如 `https://scholar.google.com/citations?user=SCHOLAR_ID` 中的 `SCHOLAR_ID`。
   2. 在 GitHub 仓库页面进入 `Settings -> Secrets -> Actions -> New repository secret`，新增一个 secret：`name=GOOGLE_SCHOLAR_ID`，`value=SCHOLAR_ID`。
   3. 在仓库的 `Actions` 页面启用 workflows。启用后，Action 会把引用统计写入 `google-scholar-stats` 分支中的 `gs_data.json`。每次推送到 `main` 分支时会触发一次更新，此外也会每天 08:00 UTC 定时运行。
3. 用 [favicon-generator](https://redketchup.io/favicon-generator) 生成网站图标，并把下载好的文件放到 `REPO/images`。
4. 修改主页配置文件 [_config.yml](../_config.yml)：
   1. `title`：主页标题。
   2. `description`：主页简介。
   3. `repository`：仓库名，格式是 `USER_NAME/REPO_NAME`。
   4. `google_analytics_id`：可选，Google Analytics ID。
   5. SEO 相关字段：可选，可以从 Google、Bing、Baidu 等搜索引擎控制台获取。
   6. `author`：作者信息，包括主页、邮箱、地点、学校或机构等。
   7. `google_scholar_stats_use_cdn`：如果设为 `true`，页面会通过 CDN 读取保存在 `https://raw.githubusercontent.com/` 上的引用统计数据。这对中国大陆网络环境可能更友好，但 CDN 有缓存，数据更新会有延迟。
   8. 其他配置项可以参考 `_config.yml` 里的注释。
5. 在 [_pages/about.md](../_pages/about.md) 中编辑主页正文。
6. 推送到 GitHub 后，主页会部署到 `https://USERNAME.github.io`。

## 本地预览

1. 用 `git clone` 把仓库下载到本地。
2. 安装 Jekyll 所需环境，包括 `Ruby`、`RubyGems`、`GCC` 和 `Make`。可以参考 [Jekyll 官方安装说明](https://jekyllrb.com/docs/installation/#requirements)。
3. 运行 `bash run_server.sh` 启动本地服务器。
4. 在浏览器打开 [http://127.0.0.1:4000](http://127.0.0.1:4000)。修改源码后，Jekyll 会自动重新编译并刷新页面。
5. 修改完成后，用 `git commit` 和 `git push` 推送到 GitHub。

## 致谢

- AcadHomepage 使用了 Font Awesome，相关文件遵循 SIL OFL 1.1 和 MIT License。
- AcadHomepage 参考了 [mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)，该项目使用 MIT License。
- AcadHomepage 参考了 [academicpages/academicpages.github.io](https://github.com/academicpages/academicpages.github.io)，该项目使用 MIT License。
