// AI服务模块 - 处理与AI API的交互

/**
 * AI服务对象，提供与AI API交互的方法
 */
export const aiService = {
  /**
   * 获取志愿推荐
   * @param {number} score - 考生分数
   * @param {string[]} interests - 考生兴趣爱好
   * @param {string} province - 考生所在省份
   * @param {string} apiUrl - API地址
   * @param {string} apiKey - API密钥
   * @param {string} model - 使用的模型
   * @returns {Promise<object>} - 推荐结果
   */
  async getRecommendations(score, interests, province, apiUrl, apiKey, model) {
    const prompt = `
      我是一名高考考生，我的分数是${score}分，来自${province}。
      我的兴趣爱好包括：${interests.join('、')}。
      请根据我的情况，推荐5-8所适合我的大学和专业，并说明理由。
      请按照以下格式返回结果：
      [
        {
          "university": "大学名称",
          "majors": ["专业1", "专业2"],
          "reason": "推荐理由",
          "admission_probability": "录取概率评估"
        },
        ...
      ]
    `;

    return await this._callAI(prompt, apiUrl, apiKey, model);
  },

  /**
   * 获取大学信息
   * @param {string} universityName - 大学名称
   * @param {string} apiUrl - API地址
   * @param {string} apiKey - API密钥
   * @param {string} model - 使用的模型
   * @returns {Promise<object>} - 大学信息
   */
  async getUniversityInfo(universityName, apiUrl, apiKey, model) {
    const prompt = `
      请提供关于${universityName}的详细信息，包括：
      1. 学校简介和历史
      2. 学校排名和声誉
      3. 优势学科和特色专业
      4. 校园环境和地理位置
      5. 就业情况
      
      请按照以下JSON格式返回结果：
      {
        "name": "大学名称",
        "location": "所在地",
        "founded": "创建年份",
        "type": "学校类型（如985、211等）",
        "description": "学校简介",
        "ranking": "学校排名",
        "featured_majors": ["特色专业1", "特色专业2", ...],
        "campus": "校园环境描述",
        "employment": "就业情况描述"
      }
    `;

    return await this._callAI(prompt, apiUrl, apiKey, model);
  },

  /**
   * 获取分数线信息
   * @param {string} universityName - 大学名称
   * @param {string} province - 省份
   * @param {string|null} year - 年份，可选
   * @param {string} apiUrl - API地址
   * @param {string} apiKey - API密钥
   * @param {string} model - 使用的模型
   * @returns {Promise<object>} - 分数线信息
   */
  async getScoreLine(universityName, province, year, apiUrl, apiKey, model) {
    const yearText = year ? `${year}年` : '近三年';
    const prompt = `
      请提供${universityName}在${province}地区${yearText}的高考录取分数线信息，包括：
      1. 文科和理科分数线
      2. 不同专业的分数线差异
      3. 历年分数线变化趋势
      
      请按照以下JSON格式返回结果：
      {
        "university": "${universityName}",
        "province": "${province}",
        "years": [
          {
            "year": "年份",
            "science": {
              "min": 最低分,
              "average": 平均分,
              "max": 最高分
            },
            "liberal_arts": {
              "min": 最低分,
              "average": 平均分,
              "max": 最高分
            },
            "majors": [
              {
                "name": "专业名称",
                "science_min": 理科最低分,
                "liberal_arts_min": 文科最低分
              },
              ...
            ]
          },
          ...
        ],
        "trend": "分数线趋势描述"
      }
    `;

    return await this._callAI(prompt, apiUrl, apiKey, model);
  },

  /**
   * 获取风险评估
   * @param {number} score - 考生分数
   * @param {Array<{university: string, major: string}>} choices - 志愿选择
   * @param {string} province - 省份
   * @param {string} apiUrl - API地址
   * @param {string} apiKey - API密钥
   * @param {string} model - 使用的模型
   * @returns {Promise<object>} - 风险评估结果
   */
  async getRiskAssessment(score, choices, province, apiUrl, apiKey, model) {
    const choicesText = choices.map(c => `${c.university}的${c.major}专业`).join('、');
    const prompt = `
      我是一名来自${province}的高考考生，我的分数是${score}分。
      我计划填报以下志愿：${choicesText}。
      请对我的志愿填报进行风险评估，包括：
      1. 每个志愿的录取可能性（稳妥、适中、风险、高风险）
      2. 志愿梯度是否合理
      3. 是否存在风险过大的志愿
      4. 改进建议
      
      请按照以下JSON格式返回结果：
      {
        "overall_assessment": "总体评估",
        "choices_assessment": [
          {
            "university": "大学名称",
            "major": "专业名称",
            "risk_level": "风险等级",
            "admission_probability": "录取概率百分比",
            "comments": "具体评价"
          },
          ...
        ],
        "gradient_reasonable": true/false,
        "gradient_comments": "梯度合理性评价",
        "suggestions": ["建议1", "建议2", ...]
      }
    `;

    return await this._callAI(prompt, apiUrl, apiKey, model);
  },

  /**
   * 调用AI API的通用方法
   * @param {string} prompt - 提示词
   * @param {string} apiUrl - API地址
   * @param {string} apiKey - API密钥
   * @param {string} model - 使用的模型
   * @returns {Promise<object>} - AI响应结果
   * @private
   */
  async _callAI(prompt, apiUrl, apiKey, model) {
    try {
      const response = await fetch(`${apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content: '你是一个专业的高考志愿填报顾问，擅长分析高考志愿填报策略，了解各大学和专业的情况，以及各省份的高考政策。请提供准确、客观的信息和建议。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // 尝试解析返回的内容为JSON
      try {
        const content = data.choices[0].message.content;
        // 尝试从内容中提取JSON部分
        const jsonMatch = content.match(/\{[\s\S]*\}/m) || content.match(/\[[\s\S]*\]/m);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        // 如果没有找到JSON格式，直接返回内容
        return { raw_content: content };
      } catch (parseError) {
        console.error('解析AI响应内容时出错:', parseError);
        return { raw_content: data.choices[0].message.content };
      }
    } catch (error) {
      console.error('调用AI API时出错:', error);
      throw new Error(`调用AI服务失败: ${error.message}`);
    }
  }
};