import Dimension from "./Dimension";

export default class Item {
    constructor(readonly id: number, readonly description: string, readonly price: number, readonly dimension?: Dimension, readonly weight?: number) {
    }

    getVolume(){
        if(!this.dimension) return 0;
        return this.dimension.getVolume();
    }

    getDensity() {
        if (this.dimension && this.weight) {
            return this.weight / this.dimension.getVolume();
        }
        return 0;
    }
}
