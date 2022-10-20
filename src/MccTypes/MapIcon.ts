import MapIconType from "./MapIconType";

class MapIcon {
    constructor(
        public type: MapIconType,
        public x: number,
        public z: number,
        public direction: number,
        public displayName: string
    ) { }
}

export default MapIcon;