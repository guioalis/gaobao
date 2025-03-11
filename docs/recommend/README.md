# 智能志愿推荐

## 功能介绍

智能志愿推荐功能基于AI技术，根据您的高考分数、所在省份和个人兴趣爱好，为您推荐最适合的大学和专业选择。系统会综合考虑各种因素，包括：

- 高考分数与目标院校的录取分数线比较
- 个人兴趣爱好与专业的匹配度
- 院校的综合实力和专业优势
- 地理位置和就业前景

## 使用方法

1. 在下方表单中输入您的高考分数
2. 选择您所在的省份
3. 填写您的兴趣爱好，多个兴趣用逗号分隔
4. 点击"获取推荐"按钮
5. 系统将为您推荐5-8所适合的大学和专业，并提供详细的推荐理由

<div class="recommend-form-container">
  <form id="recommend-form" class="recommend-form">
    <div class="form-item">
      <label for="score">高考分数</label>
      <input type="number" id="score" required placeholder="请输入您的高考分数">
    </div>
    
    <div class="form-item">
      <label for="province">所在省份</label>
      <select id="province" required>
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
      <label for="interests">兴趣爱好</label>
      <input type="text" id="interests" placeholder="多个兴趣用逗号分隔，如：数学,计算机,文学">
    </div>
    
    <div class="form-item">
      <button type="submit" class="submit-btn">获取推荐</button>
    </div>
  </form>
</div>

<div id="recommend-result" class="result-container d-none">
  <div id="recommend-loading" class="loading-spinner">
    <div class="spinner"></div>
    <p>正在生成推荐，请稍候...</p>
  </div>
  <div id="recommend-content" class="result-content"></div>
</div>

<script>
  // 这里将在客户端加载时执行相关JavaScript代码
  // VuePress会将此脚本注入到页面中
</script>

<style>
.recommend-form-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.recommend-form .form-item {
  margin-bottom: 15px;
}

.recommend-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.recommend-form input,
.recommend-form select {
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
</style>