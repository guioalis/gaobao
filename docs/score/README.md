# 分数线查询

## 功能介绍

分数线查询功能可以帮助您了解各个高校在不同省份的历年录取分数线，包括文科和理科的最低分、平均分和最高分，以及不同专业的分数线差异。通过这一功能，您可以更准确地评估自己的录取可能性。

## 使用方法

1. 在下方表单中输入您想查询的大学名称
2. 选择您所在的省份
3. 可选择具体年份（不选则显示近三年数据）
4. 点击"查询"按钮
5. 系统将为您展示该院校在指定省份的分数线信息

<div class="score-form-container">
  <form id="score-form" class="score-form">
    <div class="form-item">
      <label for="score-university">大学名称</label>
      <input type="text" id="score-university" required placeholder="请输入大学名称，如：清华大学">
    </div>
    
    <div class="form-item">
      <label for="score-province">所在省份</label>
      <select id="score-province" required>
        <option value="">请选择省份</option>
        <option value="北京">北京</option>
        <option value="上海">上海</option>
        <option value="天津">天津</option>
        <option value="重庆">重庆</option>
        <option value="河北">河北</option>
        <option value="山西">山西</option>
        <option value="辽宁">辽宁</option>
        <option value="吉林">吉林</option>
        <option value="黑龙江">黑龙江</option>
        <option value="江苏">江苏</option>
        <option value="浙江">浙江</option>
        <option value="安徽">安徽</option>
        <option value="福建">福建</option>
        <option value="江西">江西</option>
        <option value="山东">山东</option>
        <option value="河南">河南</option>
        <option value="湖北">湖北</option>
        <option value="湖南">湖南</option>
        <option value="广东">广东</option>
        <option value="海南">海南</option>
        <option value="四川">四川</option>
        <option value="贵州">贵州</option>
        <option value="云南">云南</option>
        <option value="陕西">陕西</option>
        <option value="甘肃">甘肃</option>
        <option value="青海">青海</option>
        <option value="内蒙古">内蒙古</option>
        <option value="广西">广西</option>
        <option value="西藏">西藏</option>
        <option value="宁夏">宁夏</option>
        <option value="新疆">新疆</option>
      </select>
    </div>
    
    <div class="form-item">
      <label for="score-year">年份（可选）</label>
      <select id="score-year">
        <option value="">不限（显示近三年）</option>
        <option value="2023">2023年</option>
        <option value="2022">2022年</option>
        <option value="2021">2021年</option>
        <option value="2020">2020年</option>
        <option value="2019">2019年</option>
      </select>
    </div>
    
    <div class="form-item">
      <button type="submit" class="submit-btn">查询</button>
    </div>
  </form>
</div>

<div id="score-result" class="result-container d-none">
  <div id="score-loading" class="loading-spinner">
    <div class="spinner"></div>
    <p>正在查询分数线信息，请稍候...</p>
  </div>
  <div id="score-content" class="result-content"></div>
</div>

<script>
  // 这里将在客户端加载时执行相关JavaScript代码
  // VuePress会将此脚本注入到页面中
</script>

<style>
.score-form-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.score-form .form-item {
  margin-bottom: 15px;
}

.score-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.score-form input,
.score-form select {
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

.score-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.score-table th,
.score-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.score-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.score-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.score-table tr:hover {
  background-color: #f0f7ff;
}

.trend-chart {
  margin-top: 30px;
}
</style>