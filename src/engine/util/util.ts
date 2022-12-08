import { f32 } from "../math/math";

export class Util {
    
    static range(n=10) {
        let array = [];
        for (let i = 0; i < n; i++) {
            array.push(i);
        }
        return array;
    }

    static collect(gen: Iterable<f32>) {
        let arr = new Array();
        for (let item of gen) {
            arr.push(item);
        }
        return arr;
    }

    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
