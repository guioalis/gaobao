# 风险评估

## 功能介绍

风险评估功能可以帮助您评估所填报志愿的风险程度，包括每个志愿的录取可能性、志愿梯度是否合理、是否存在风险过大的志愿等。通过这一功能，您可以更科学地调整志愿顺序，提高录取成功率。

## 使用方法

1. 在下方表单中输入您的高考分数
2. 选择您所在的省份
3. 添加您计划填报的志愿（大学和专业）
4. 点击"评估风险"按钮
5. 系统将为您展示详细的风险评估结果

<div class="risk-form-container">
  <form id="risk-form" class="risk-form">
    <div class="form-item">
      <label for="risk-score">高考分数</label>
      <input type="number" id="risk-score" required placeholder="请输入您的高考分数">
    </div>
    
    <div class="form-item">
      <label for="risk-province">所在省份</label>
      <select id="risk-province" required>
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
      <label>志愿选择</label>
      <div id="choices-container">
        <div class="mb-3">
          <div class="choice-item mb-2">
            <div class="row">
              <div class="col-md-5">
                <input type="text" class="form-control choice-university" placeholder="大学名称" required>
              </div>
              <div class="col-md-5">
                <input type="text" class="form-control choice-major" placeholder="专业名称" required>
              </div>
              <div class="col-md-2">
                <button type="button" class="btn btn-danger remove-choice">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="button" id="add-choice" class="btn btn-secondary mb-3">添加志愿</button>
    </div>
    
    <div class="form-item">
      <button type="submit" class="submit-btn">评估风险</button>
    </div>
  </form>
</div>

<div id="risk-result" class="result-container d-none">
  <div id="risk-loading" class="loading-spinner">
    <div class="spinner"></div>
    <p>正在评估风险，请稍候...</p>
  </div>
  <div id="risk-content" class="result-content"></div>
</div>

<script>
  // 这里将在客户端加载时执行相关JavaScript代码
  // VuePress会将此脚本注入到页面中
</script>

<style>
.risk-form-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.risk-form .form-item {
  margin-bottom: 15px;
}

.risk-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.risk-form input,
.risk-form select {
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

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.choice-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-md-5 {
  flex: 0 0 41.666667%;
  max-width: 41.666667%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-md-2 {
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
  padding-right: 15px;
  padding-left: 15px;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
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

.risk-assessment {
  margin-top: 20px;
}

.risk-assessment h2 {
  color: #3eaf7c;
  border-bottom: 2px solid #eaecef;
  padding-bottom: 10px;
}

.risk-level {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: bold;
  margin-left: 10px;
}

.risk-low {
  background-color: #d4edda;
  color: #155724;
}

.risk-medium {
  background-color: #fff3cd;
  color: #856404;
}

.risk-high {
  background-color: #f8d7da;
  color: #721c24;
}

.risk-extreme {
  background-color: #dc3545;
  color: white;
}
</style>