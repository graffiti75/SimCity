export function createCity(size) {
    const data = [];

    initialize();

    function initialize() {
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                const tile = {
                    x,
                    y,
                    building: undefined,
                };
                if (Math.random() > 0.7) {
                    tile.building = "building";
                }
                row.push(tile);
            }
            data.push(row);
        }
    }

    return {
        size,
        data,
    };
}
