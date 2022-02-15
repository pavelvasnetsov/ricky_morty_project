import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import Layout from "@/store/layout/Layout";

import MainPage from '@/store/pages/mainPage';

let layoutStore: Layout;
let mainPageStore: MainPage;

const initialiseStores = (store: Store<any>) => {
  layoutStore = getModule(Layout, store);
  mainPageStore = getModule(MainPage, store);
};

const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export {
  initialiseStores,
  layoutStore,
  mainPageStore,
};
