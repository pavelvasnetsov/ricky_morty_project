
import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
    name: "layout/Layout",
    stateFactory: true,
    namespaced: true
})
export default class Layout extends VuexModule {

    windowWidth = 0;
    windowHeight = 0;
    windowScrollX = 0;
    windowScrollY = 0;
    windowScrollDirection = 'up' // up / down

    lastScrollTop = 0;

    public breakpoints: any = {
        lg: 1920,
        md: 1280,
        sm: 768,
        usm: 414,
    }

    get windowOrientation(): string {
        return this.windowHeight >= this.windowWidth ? 'portrate' : 'landspace';
    }

    get breakpoint(): string {
        if (this.windowWidth <= this.breakpoints.sm) return 'sm';
        if (this.windowWidth <= this.breakpoints.md) return 'md';
        return 'lg'
    }

    get WindowSizes(): { height: number, width: number } {
        return ({ height: this.windowHeight, width: this.windowWidth })
    }

    get scrollDirection() {
        return this.windowScrollDirection
    }

    @Mutation
    SET_WINDOW_SIZES(params: { height: number, width: number }) {
        this.windowHeight = params.height;
        this.windowWidth = params.width;
        this.windowScrollX = window.scrollX;
        this.windowScrollY = window.scrollY;
    }

    @Mutation
    SET_WINDOW_SCROLL(e: Event) {
        this.windowScrollX = window.scrollX;
        this.windowScrollY = window.scrollY;
        if (this.windowScrollY === this.lastScrollTop) {
            this.lastScrollTop = Math.max(this.windowScrollY, 0);
            return
        }
        const result = (this.windowScrollY > this.lastScrollTop) ? 'down' : 'up'
        this.lastScrollTop = Math.max(this.windowScrollY, 0);
        this.windowScrollDirection = result;
    }

    @Mutation RESET_SCROLL() {
        this.lastScrollTop = 0;
        this.windowScrollDirection = 'up';
        this.windowScrollY = 0;
    }
}
