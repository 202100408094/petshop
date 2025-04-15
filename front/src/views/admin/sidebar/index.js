import { useUserStore } from "@/stores/user";

import guanliyuan from "./guanliyuan";
import yonghu from "./yonghu";
import yuangong from "./yuangong";

export function getMenus() {
    return new Promise((resolve, reject) => {
        var userStore = useUserStore();
        var cx = userStore.getSession("cx");
        if (cx == "管理员") {
            resolve(guanliyuan);
        }
        if (cx == "用户") {
            resolve(yonghu);
        }
        if (cx == "员工") {
            resolve(yuangong);
        }
    });
}

export default {
    getMenus,
};
