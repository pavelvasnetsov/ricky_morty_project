import { Middleware } from '@nuxt/types'
import { layoutStore } from "@/store"

const layout: Middleware = async (context) => {
    if (!process.client) return;
    setTimeout(
        layoutStore.RESET_SCROLL
        , 300);

}

export default layout