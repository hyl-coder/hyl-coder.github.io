import { ElMessage } from 'element-plus'

export const successMessage = (msg: any = "提交成功") => {
    ElMessage({
        message: msg,
        type: 'success',
        duration: 2000
    })
}

export const faultMessage = (msg: any) => {
    ElMessage({
        message:msg,
        type: 'error',
        showClose: true,
        duration: 20000
    })
}