const useRequest = createFetch({
	baseUrl: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL, // 基础路由
	options: {
		timeout: 10000, // 请求过期时间
		// 在请求前修改配置，如：注入 token 值
		beforeFetch({options}) { 
			// options.headers.Authorization = `Bearer ${token}`
			return {options}
		},
		// 在请求后处理数据，如：拦截错误、处理过期
		afterFetch({data}) {
			// util.message(data.msg,data.code==200?'success':'error')
			return {data}
		},
		// 请求错误
		onFetchError({data,error}) {
			data = undefined
			return { data, error }
		},
	},
	fetchOptions: {
		mode: 'cors'
	},
})
/**
 * 封装 post 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
function usePost(url, payload) {
	return useRequest(url).post(payload).json()
}
/**
 * 封装 get 请求
 * @param url 请求地址
 * @param query 请求参数
 */
function useGet(url, query) {
	return new Promise((resolve)=>{
		const _url = unref(url)
		const _query = unref(query)
		const queryString = isObject(_query) ?stringifyQuery(_query) :_query || ''
		const intact_url=`${_url}${queryString ? '?' : ''}${queryString}`
		useRequest(intact_url).then(data=>data.json()).then(({data})=>{
			resolve(data.value)
		})
	}) 
}
export default {
	usePost,useGet
}
