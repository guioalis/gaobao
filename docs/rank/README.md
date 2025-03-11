# 位次查询

## 功能介绍

位次查询功能可以帮助您了解自己的高考分数在全省的排名情况，包括大致排名和位次、在全省的百分位、可以考虑的大学层次等信息。通过这一功能，您可以更准确地评估自己的竞争力，合理规划志愿填报策略。

## 使用方法

1. 在下方表单中输入您的高考分数
2. 选择您所在的省份
3. 可选择具体年份（不选则默认为当年）
4. 点击"查询位次"按钮
5. 系统将为您展示详细的位次信息和分析

<div class="rank-form-container">
  <form id="rank-form" class="rank-form">
    <div class="form-item">
      <label for="rank-score">高考分数</label>
      <input type="number" id="rank-score" required placeholder="请输入您的高考分数">
    </div>
    
    <div class="form-item">
      <label for="rank-province">所在省份</label>
      <select id="rank-province" required>
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
      <label for="rank-year">年份（可选）</label>
      <select id="rank-year">
        <option value="">当年</option>
        <option value="2023">2023年</option>
        <option value="2022">2022年</option>
        <option value="2021">2021年</option>
        <option value="2020">2020年</option>
        <option value="2019">2019年</option>
      </select>
    </div>
    
    <div class="form-item">
      <button type="submit" class="submit-btn">查询位次</button>
    </div>
  </form>
</div>

<div id="rank-result" class="result-container d-none">
  <div id="rank-loading" class="loading-spinner">
    <div class="spinner"></div>
    <p>正在查询位次信息，请稍候...</p>
  </div>
  <div id="rank-content" class="result-content"></div>
</div>

<script>
  // 这里将在客户端加载时执行相关JavaScript代码
  // VuePress会将此脚本注入到页面中
</script>

<style>
.rank-form-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.rank-form .form-item {
  margin-bottom: 15px;
}

.rank-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.rank-form input,
.rank-form select {
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

.rank-info {
  margin-top: 20px;
}

.rank-info h2 {
  color: #3eaf7c;
  border-bottom: 2px solid #eaecef;
  padding-bottom: 10px;
}

.rank-info .info-item {
  margin-bottom: 15px;
}

.rank-info .info-item h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.rank-info .suggestions {
  margin-top: 20px;
  background-color: #f0f7ff;
  padding: 15px;
  border-radius: 8px;
}

.rank-info .suggestions h3 {
  color: #3eaf7c;
  margin-top: 0;
  margin-bottom: 10px;
}

.rank-info .suggestion-item {
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
}

.rank-info .suggestion-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #3eaf7c;
  font-weight: bold;
}
</style>