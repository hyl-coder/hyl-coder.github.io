import { resolve } from 'path';

import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue';

const root = process.cwd()

function pathResolve(dir: string) {
    return resolve(root, '.', dir)
}


export default ({ command, mode }: ConfigEnv): UserConfig => {
    let env = {} as any
    const isBuild = command === 'build'
    if (!isBuild) {
        env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
    } else {
        env = loadEnv(mode, root)
    }
    return {
        server: {
            host: '0.0.0.0'
        },
        base: env.VITE_BASE_PATH,
        plugins: [vue()],
        resolve: {
            alias: {
                '@': pathResolve('src'), // 简化为直接使用路径
            },
        }
    }
}
