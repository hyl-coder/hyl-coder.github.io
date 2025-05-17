import axios, {AxiosInstance} from "axios";
import {useAuthStore} from "@/store/modules/auth";
import {faultMessage} from "@/utils/message";
import {useRouter} from "vue-router";

const service: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:9000',
    timeout: 60000,
    headers: {}
})

const authStore = useAuthStore()
service.interceptors.response.use(response => {
    if (response.data.code !== 200) {
        faultMessage(response.data.data)
        return Promise.reject(response.data)
    }
    return response
}, error => {
    console.log(error)
    const router = useRouter()
    if (error.response.status === 401) {
        authStore.clearToken()
        faultMessage('请先登陆')
        router.push({name: 'login'})
    } if (error.response.status === 500) {
        faultMessage(error.response.data.message)
    } else {
        faultMessage(error)
    }
    return Promise.reject(error)
})

service.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer '+authStore.getToken
    console.log(config.headers.Authorization)
    return config
})

const request = (option: any) => {
    const { url, method, params, data, headersType, responseType } = option
    return service({
        url: url,
        method,
        params,
        data,
        responseType: responseType,
        headers: {
            'Content-Type': headersType || 'application/json',
        }
    })
}
export default {
    get: <T = any>(option: any) => {
        return request({ method: 'get', ...option }) as unknown as T
    },
    post: <T = any>(option: any) => {
        return request({ method: 'post', ...option }) as unknown as T
    },
    delete: <T = any>(option: any) => {
        return request({ method: 'delete', ...option }) as unknown as T
    },
    put: <T = any>(option: any) => {
        return request({ method: 'put', ...option }) as unknown as T
    }
}
