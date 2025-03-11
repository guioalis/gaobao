# 院校查询

## 功能介绍

院校查询功能可以帮助您了解各个高校的详细信息，包括学校简介、排名、优势学科、校园环境和就业情况等。通过这一功能，您可以全面了解目标院校，做出更明智的志愿填报决策。

## 使用方法

1. 在下方搜索框中输入您想了解的大学名称
2. 点击"查询"按钮
3. 系统将为您展示该院校的详细信息

<div class="university-form-container">
  <form id="university-form" class="university-form">
    <div class="form-item">
      <label for="university-name">大学名称</label>
      <input type="text" id="university-name" required placeholder="请输入大学名称，如：北京大学">
    </div>
    
    <div class="form-item">
      <button type="submit" class="submit-btn">查询</button>
    </div>
  </form>
</div>

<div id="university-result" class="result-container d-none">
  <div id="university-loading" class="loading-spinner">
    <div class="spinner"></div>
    <p>正在查询院校信息，请稍候...</p>
  </div>
  <div id="university-content" class="result-content"></div>
</div>

<script>
  // 这里将在客户端加载时执行相关JavaScript代码
  // VuePress会将此脚本注入到页面中
</script>

<style>
.university-form-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.university-form .form-item {
  margin-bottom: 15px;
}

.university-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.university-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  background-color: #3eaf7c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #2c8f5e;
}

.result-container {
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

.loading-spinner {
  text-align: center;
  padding: 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3eaf7c;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.d-none {
  display: none;
}

.university-info {
  margin-top: 20px;
}

.university-info h2 {
  color: #3eaf7c;
  border-bottom: 2px solid #eaecef;
  padding-bottom: 10px;
}

.university-info .info-item {
  margin-bottom: 15px;
}

.university-info .info-item h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.university-info .featured-majors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.university-info .major-tag {
  background-color: #f0f7ff;
  color: #3eaf7c;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}
</style>