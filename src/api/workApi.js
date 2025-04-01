import request from '@/utils/request';

/**
 * 获取作品列表
 * @returns {Promise} 作品列表数据
 */
export function getWorks(params) {
  return request.get('/work', { params });
}

/**
 * 添加作品
 * @param {Object} workData 作品数据
 * @returns {Promise} 添加结果
 */
export function addWork(workData) {
  return request.post('/work', workData);
}

/**
 * 更新作品
 * @param {String} id 作品ID
 * @param {Object} workData 作品数据
 * @returns {Promise} 更新结果
 */
export function updateWork(id, workData) {
  return request.put(`/work/${id}`, workData);
}

/**
 * 删除作品
 * @param {String} id 作品ID
 * @returns {Promise} 删除结果
 */
export function deleteWork(id) {
  return request.delete(`/work/${id}`);
}