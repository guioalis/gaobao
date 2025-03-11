// 智能高考志愿填报应用 - 前端脚本

document.addEventListener('DOMContentLoaded', function() {
  // 导航切换功能
  setupNavigation();
  
  // 表单提交处理
  setupFormSubmissions();
  
  // 添加/删除志愿选择
  setupChoicesManagement();
});

/**
 * 设置导航切换功能
 */
function setupNavigation() {
  const navItems = document.querySelectorAll('.list-group-item');
  const contentSections = document.querySelectorAll('.content-section');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 移除所有导航项的激活状态
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // 添加当前项的激活状态
      this.classList.add('active');
      
      // 隐藏所有内容区域
      contentSections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('d-none');
      });
      
      // 显示目标内容区域
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.classList.remove('d-none');
      targetSection.classList.add('active');
    });
  });
}

/**
 * 设置表单提交处理
 */
function setupFormSubmissions() {
  // 智能推荐表单
  const recommendForm = document.getElementById('recommend-form');
  if (recommendForm) {
    recommendForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const score = document.getElementById('score').value;
      const province = document.getElementById('province').value;
      const interestsInput = document.getElementById('interests').value;
      const interests = interestsInput.split(',').map(item => item.trim()).filter(item => item);
      
      await submitRecommendForm(score, province, interests);
    });
  }
  
  // 院校查询表单
  const universityForm = document.getElementById('university-form');
  if (universityForm) {
    universityForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const universityName = document.getElementById('university-name').value;
      
      await submitUniversityForm(universityName);
    });
  }
  
  // 分数线查询表单
  const scoreForm = document.getElementById('score-form');
  if (scoreForm) {
    scoreForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const university = document.getElementById('score-university').value;
      const province = document.getElementById('score-province').value;
      const year = document.getElementById('score-year').value;
      
      await submitScoreForm(university, province, year);
    });
  }
  
  // 风险评估表单
  const riskForm = document.getElementById('risk-form');
  if (riskForm) {
    riskForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const score = document.getElementById('risk-score').value;
      const province = document.getElementById('risk-province').value;
      const choices = getChoices();
      
      await submitRiskForm(score, province, choices);
    });
  }
  
  // 位次查询表单
  const rankForm = document.getElementById('rank-form');
  if (rankForm) {
    rankForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const score = document.getElementById('rank-score').value;
      const province = document.getElementById('rank-province').value;
      const year = document.getElementById('rank-year').value;
      
      await submitRankForm(score, province, year);
    });
  }
}

/**
 * 设置志愿选择的添加和删除功能
 */
function setupChoicesManagement() {
  // 添加志愿按钮
  const addChoiceBtn = document.getElementById('add-choice');
  if (addChoiceBtn) {
    addChoiceBtn.addEventListener('click', function() {
      addNewChoice();
    });
  }
  
  // 初始化删除按钮
  setupRemoveChoiceButtons();
}

/**
 * 设置删除志愿按钮的事件监听
 */
function setupRemoveChoiceButtons() {
  const removeButtons = document.querySelectorAll('.remove-choice');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const choiceItem = this.closest('.choice-item');
      const choicesContainer = document.getElementById('choices-container');
      
      // 确保至少保留一个志愿选择
      const choiceItems = document.querySelectorAll('.choice-item');
      if (choiceItems.length > 1) {
        choicesContainer.querySelector('.mb-3').removeChild(choiceItem);
      }
    });
  });
}

/**
 * 添加新的志愿选择
 */
function addNewChoice() {
  const choicesContainer = document.querySelector('#choices-container .mb-3');
  const newChoice = document.createElement('div');
  newChoice.className = 'choice-item mb-2';
  newChoice.innerHTML = `
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
  `;
  
  choicesContainer.appendChild(newChoice);
  
  // 为新添加的删除按钮设置事件监听
  setupRemoveChoiceButtons();
}

/**
 * 获取所有志愿选择
 * @returns {Array<{university: string, major: string}>} 志愿选择数组
 */
function getChoices() {
  const choices = [];
  const choiceItems = document.querySelectorAll('.choice-item');
  
  choiceItems.forEach(item => {
    const university = item.querySelector('.choice-university').value;
    const major = item.querySelector('.choice-major').value;
    
    if (university && major) {
      choices.push({ university, major });
    }
  });
  
  return choices;
}

/**
 * 提交智能推荐表单
 * @param {number} score - 考生分数
 * @param {string} province - 省份
 * @param {string[]} interests - 兴趣爱好
 */
async function submitRecommendForm(score, province, interests) {
  const resultContainer = document.getElementById('recommend-result');
  const loadingSpinner = document.getElementById('recommend-loading');
  const contentDiv = document.getElementById('recommend-content');
  
  // 显示结果区域和加载动画
  resultContainer.classList.remove('d-none');
  loadingSpinner.classList.remove('d-none');
  contentDiv.innerHTML = '';
  
  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score, province, interests })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      displayRecommendations(data.recommendations, contentDiv);
    } else {
      displayError(data.error || '获取推荐失败', contentDiv);
    }
  } catch (error) {
    displayError('请求出错: ' + error.message, contentDiv);
  } finally {
    loadingSpinner.classList.add('d-none');
  }
}

/**
 * 提交院校查询表单
 * @param {string} universityName - 大学名称
 */
async function submitUniversityForm(universityName) {
  const resultContainer = document.getElementById('university-result');
  const loadingSpinner = document.getElementById('university-loading');
  const contentDiv = document.getElementById('university-content');
  
  // 显示结果区域和加载动画
  resultContainer.classList.remove('d-none');
  loadingSpinner.classList.remove('d-none');
  contentDiv.innerHTML = '';
  
  try {
    const response = await fetch(`/api/university?name=${encodeURIComponent(universityName)}`);
    const data = await response.json();
    
    if (response.ok) {
      displayUniversityInfo(data.universityInfo, contentDiv);
    } else {
      displayError(data.error || '获取院校信息失败', contentDiv);
    }
  } catch (error) {
    displayError('请求出错: ' + error.message, contentDiv);
  } finally {
    loadingSpinner.classList.add('d-none');
  }
}

/**
 * 提交分数线查询表单
 * @param {string} university - 大学名称
 * @param {string} province - 省份
 * @param {string} year - 年份
 */
async function submitScoreForm(university, province, year) {
  const resultContainer = document.getElementById('score-result');
  const loadingSpinner = document.getElementById('score-loading');
  const contentDiv = document.getElementById('score-content');
  
  // 显示结果区域和加载动画
  resultContainer.classList.remove('d-none');
  loadingSpinner.classList.remove('d-none');
  contentDiv.innerHTML = '';
  
  try {
    let url = `/api/score-line?university=${encodeURIComponent(university)}&province=${encodeURIComponent(province)}`;
    if (year) {
      url += `&year=${encodeURIComponent(year)}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      displayScoreLineInfo(data.scoreLine, contentDiv);
    } else {
      displayError(data.error || '获取分数线信息失败', contentDiv);
    }
  } catch (error) {
    displayError('请求出错: ' + error.message, contentDiv);
  } finally {
    loadingSpinner.classList.add('d-none');
  }
}

/**
 * 提交风险评估表单
 * @param {number} score - 考生分数
 * @param {string} province - 省份
 * @param {Array<{university: string, major: string}>} choices - 志愿选择
 */
async function submitRiskForm(score, province, choices) {
  const resultContainer = document.getElementById('risk-result');
  const loadingSpinner = document.getElementById('risk-loading');
  const contentDiv = document.getElementById('risk-content');
  
  // 显示结果区域和加载动画
  resultContainer.classList.remove('d-none');
  loadingSpinner.classList.remove('d-none');
  contentDiv.innerHTML = '';
  
  try {
    const response = await fetch('/api/risk-assessment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score, province, choices })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      displayRiskAssessment(data.riskAssessment, contentDiv);
    } else {
      displayError(data.error || '风险评估失败', contentDiv);
    }
  } catch (error) {
    displayError('请求出错: ' + error.message, contentDiv);
  } finally {
    loadingSpinner.classList.add('d-none');
  }
}

/**
 * 显示推荐结果
 * @param {object} recommendations - 推荐结果数据
 * @param {HTMLElement} container - 显示容器
 */
function displayRecommendations(recommendations, container) {
  if (!recommendations || (Array.isArray(recommendations) && recommendations.length === 0)) {
    container.innerHTML = '<div class="alert alert-info">没有找到符合条件的推荐结果</div>';
    return;
  }
  
  let html = '';
  
  if (Array.isArray(recommendations)) {
    recommendations.forEach(rec => {
      html += `
        <div class="recommendation-item">
          <h5>${rec.university}</h5>
          <div class="majors">
            ${rec.majors.map(major => `<span>${major}</span>`).join('')}
          </div>
          <p>${rec.reason}</p>
          <p class="probability">录取概率: ${rec.admission_probability}</p>
        </div>
      `;
    });
  } else if (recommendations.raw_content) {
    // 处理原始内容
    html = `<div class="alert alert-info">${recommendations.raw_content}</div>`;
  } else {
    html = '<div class="alert alert-warning">返回的数据格式不正确</div>';
  }
  
  container.innerHTML = html;
}

/**
 * 显示大学信息
 * @param {object} universityInfo - 大学信息数据
 * @param {HTMLElement} container - 显示容器
 */
function displayUniversityInfo(universityInfo, container) {
  if (!universityInfo) {
    container.innerHTML = '<div class="alert alert-info">没有找到相关院校信息</div>';
    return;
  }
  
  let html = '';
  
  if (universityInfo.name) {
    html = `
      <div class="university-info">
        <h5>${universityInfo.name}</h5>
        <p><strong>所在地:</strong> ${universityInfo.location || '未知'}</p>
        <p><strong>创建年份:</strong> ${universityInfo.founded || '未知'}</p>
        <p><strong>学校类型:</strong> ${universityInfo.type || '未知'}</p>
        <p><strong>学校简介:</strong> ${universityInfo.description || '暂无简介'}</p>
        <p><strong>学校排名:</strong> ${universityInfo.ranking || '未知'}</p>
        <p><strong>特色专业:</strong> ${Array.isArray(universityInfo.featured_majors) ? universityInfo.featured_majors.join('、') : '暂无数据'}</p>
        <p><strong>校园环境:</strong> ${universityInfo.campus || '暂无描述'}</p>
        <p><strong>就业情况:</strong> ${universityInfo.employment || '暂无数据'}</p>
      </div>
    `;
  } else if (universityInfo.raw_content) {
    // 处理原始内容
    html = `<div class="alert alert-info">${universityInfo.raw_content}</div>`;
  } else {
    html = '<div class="alert alert-warning">返回的数据格式不正确</div>';
  }
  
  container.innerHTML = html;
}

/**
 * 显示分数线信息
 * @param {object} scoreLine - 分数线数据
 * @param {HTMLElement} container - 显示容器
 */
function displayScoreLineInfo(scoreLine, container) {
  if (!scoreLine) {
    container.innerHTML = '<div class="alert alert-info">没有找到相关分数线信息</div>';
    return;
  }
  
  let html = '';
  
  if (scoreLine.university) {
    html = `
      <div class="university-info">
        <h5>${scoreLine.university} - ${scoreLine.province}分数线</h5>
    `;
    
    if (Array.isArray(scoreLine.years) && scoreLine.years.length > 0) {
      html += '<div class="table-responsive"><table class="table table-bordered score-table"><thead><tr><th>年份</th><th>类别</th><th>最低分</th><th>平均分</th><th>最高分</th></tr></thead><tbody>';
      
      scoreLine.years.forEach(yearData => {
        if (yearData.science) {
          html += `
            <tr>
              <td rowspan="2">${yearData.year}</td>
              <td>理科</td>
              <td>${yearData.science.min || '-'}</td>
              <td>${yearData.science.average || '-'}</td>
              <td>${yearData.science.max || '-'}</td>
            </tr>
          `;
        }
        
        if (yearData.liberal_arts) {
          html += `
            <tr>
              <td>文科</td>
              <td>${yearData.liberal_arts.min || '-'}</td>
              <td>${yearData.liberal_arts.average || '-'}</td>
              <td>${yearData.liberal_arts.max || '-'}</td>
            </tr>
          `;
        }
        
        if (Array.isArray(yearData.majors) && yearData.majors.length > 0) {
          html += `
            <tr>
              <td colspan="5">
                <strong>专业分数线:</strong>
                <ul class="list-group list-group-flush">
          `;
          
          yearData.majors.forEach(major => {
            html += `
              <li class="list-group-item">
                ${major.name}: 理科 ${major.science_min || '-'}, 文科 ${major.liberal_arts_min || '-'}
              </li>
            `;
          });
          
          html += '</ul></td></tr>';
        }
      });
      
      html += '</tbody></table></div>';
    }
    
    if (scoreLine.trend) {
      html += `<p><strong>趋势分析:</strong> ${scoreLine.trend}</p>`;
    }
    
    html += '</div>';
  } else if (scoreLine.raw_content) {
    // 处理原始内容
    html = `<div class="alert alert-info">${scoreLine.raw_content}</div>`;
  } else {
    html = '<div class="alert alert-warning">返回的数据格式不正确</div>';
  }
  
  container.innerHTML = html;
}

/**
 * 显示风险评估结果
 * @param {object} assessment - 风险评估数据
 * @param {HTMLElement} container - 显示容器
 */
function displayRiskAssessment(assessment, container) {
  if (!assessment) {
    container.innerHTML = '<div class="alert alert-info">没有找到风险评估结果</div>';
    return;
  }
  
  let html = '';
  
  if (assessment.overall_assessment) {
    html = `
      <div class="alert alert-primary">
        <h5>总体评估</h5>
        <p>${assessment.overall_assessment}</p>
      </div>
    `;
    
    if (Array.isArray(assessment.choices_assessment) && assessment.choices_assessment.length > 0) {
      html += '<h5 class="mt-4">各志愿评估</h5>';
      
      assessment.choices_assessment.forEach(choice => {
        let riskClass = '';
        if (choice.risk_level.includes('低') || choice.risk_level.includes('稳')) {
          riskClass = 'risk-low';
        } else if (choice.risk_level.includes('中') || choice.risk_level.includes('适')) {
          riskClass = 'risk-medium';
        } else {
          riskClass = 'risk-high';
        }
        
        html += `
          <div class="card mb-3">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span>${choice.university} - ${choice.major}</span>
              <span class="${riskClass}">${choice.risk_level}</span>
            </div>
            <div class="card-body">
              <p><strong>录取概率:</strong> ${choice.admission_probability}</p>
              <p>${choice.comments}</p>
            </div>
          </div>
        `;
      });
    }
    
    html += `
      <div class="alert ${assessment.gradient_reasonable ? 'alert-success' : 'alert-warning'} mt-3">
        <h5>梯度合理性</h5>
        <p>${assessment.gradient_comments}</p>
      </div>
    `;
    
    if (Array.isArray(assessment.suggestions) && assessment.suggestions.length > 0) {
      html += `
        <div class="alert alert-info mt-3">
          <h5>改进建议</h5>
          <ul>
            ${assessment.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  } else if (assessment.raw_content) {
    // 处理原始内容
    html = `<div class="alert alert-info">${assessment.raw_content}</div>`;
  } else {
    html = '<div class="alert alert-warning">返回的数据格式不正确</div>';
  }
  
  container.innerHTML = html;
}

/**
 * 提交位次查询表单
 * @param {number} score - 考生分数
 * @param {string} province - 省份
 * @param {string} year - 年份（可选）
 */
async function submitRankForm(score, province, year) {
  const resultContainer = document.getElementById('rank-result');
  const loadingSpinner = document.getElementById('rank-loading');
  const contentDiv = document.getElementById('rank-content');
  
  // 显示结果区域和加载动画
  resultContainer.classList.remove('d-none');
  loadingSpinner.classList.remove('d-none');
  contentDiv.innerHTML = '';
  
  try {
    const response = await fetch('/api/rank-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score, province, year })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      displayRankInfo(data.rankInfo, contentDiv);
    } else {
      displayError(data.error || '获取位次信息失败', contentDiv);
    }
  } catch (error) {
    displayError('请求出错: ' + error.message, contentDiv);
  } finally {
    loadingSpinner.classList.add('d-none');
  }
}

/**
 * 显示位次查询结果
 * @param {object} rankInfo - 位次信息数据
 * @param {HTMLElement} container - 显示容器
 */
function displayRankInfo(rankInfo, container) {
  if (!rankInfo) {
    container.innerHTML = '<div class="alert alert-info">没有找到位次信息</div>';
    return;
  }
  
  let html = '';
  
  if (rankInfo.score) {
    html = `
      <div class="rank-info">
        <div class="alert alert-primary">
          <h5>基本信息</h5>
          <p><strong>分数:</strong> ${rankInfo.score}分</p>
          <p><strong>省份:</strong> ${rankInfo.province}</p>
          <p><strong>年份:</strong> ${rankInfo.year}</p>
        </div>
        
        <div class="card mb-3">
          <div class="card-header bg-info text-white">
            <h5 class="mb-0">位次信息</h5>
          </div>
          <div class="card-body">
            <p><strong>预估排名:</strong> ${rankInfo.rank}</p>
            <p><strong>百分位:</strong> ${rankInfo.percentile}</p>
            <p><strong>可考虑的大学层次:</strong> ${rankInfo.university_level}</p>
          </div>
        </div>
        
        <div class="card mb-3">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">可冲刺院校</h5>
          </div>
          <div class="card-body">
            ${Array.isArray(rankInfo.reach_schools) ? 
              rankInfo.reach_schools.map(school => `<p>${school.name}: ${school.min_score}分</p>`).join('') : 
              '<p>暂无数据</p>'
            }
          </div>
        </div>
        
        <div class="card mb-3">
          <div class="card-header bg-warning text-dark">
            <h5 class="mb-0">稳妥院校</h5>
          </div>
          <div class="card-body">
            ${Array.isArray(rankInfo.match_schools) ? 
              rankInfo.match_schools.map(school => `<p>${school.name}: ${school.min_score}分</p>`).join('') : 
              '<p>暂无数据</p>'
            }
          </div>
        </div>
        
        <div class="card mb-3">
          <div class="card-header bg-danger text-white">
            <h5 class="mb-0">保底院校</h5>
          </div>
          <div class="card-body">
            ${Array.isArray(rankInfo.safety_schools) ? 
              rankInfo.safety_schools.map(school => `<p>${school.name}: ${school.min_score}分</p>`).join('') : 
              '<p>暂无数据</p>'
            }
          </div>
        </div>
        
        <div class="card mb-3">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">考生走向分析</h5>
          </div>
          <div class="card-body">
            <p>${rankInfo.analysis || '暂无分析'}</p>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header bg-secondary text-white">
            <h5 class="mb-0">填报建议</h5>
          </div>
          <div class="card-body">
            ${Array.isArray(rankInfo.suggestions) ? 
              `<ul>${rankInfo.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}</ul>` : 
              '<p>暂无建议</p>'
            }
          </div>
          </div>
          <div class="card-body">
            <ul class="list-group">
              ${Array.isArray(rankInfo.suggestions) ? rankInfo.suggestions.map(suggestion => `<li class="list-group-item">${suggestion}</li>`).join('') : '<li class="list-group-item">暂无建议</li>'}
            </ul>
          </div>
        </div>
      </div>
    `;
  } else if (rankInfo.raw_content) {
    // 处理原始内容
    html = `<div class="alert alert-info">${rankInfo.raw_content}</div>`;
  } else {
    html = '<div class="alert alert-warning">返回的数据格式不正确</div>';
  }
  
  container.innerHTML = html;
}

/**
 * 显示错误信息
 * @param {string} message - 错误信息
 * @param {HTMLElement} container - 显示容器
 */
function displayError(message, container) {
  container.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}