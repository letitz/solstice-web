import Immutable from "immutable";
import md5 from "md5";

const MapRecord = Immutable.Record({
    byName: Immutable.OrderedMap(),
    byHash: Immutable.Map()
});

class OrderedMap extends MapRecord {
    constructor(arg) {
        super(arg);
    }

    getByName(name) {
        return this.getIn(["byName", name]);
    }

    setByName(name, data) {
        let thisModified = this;
        if (!this.getByName(name)) {
            // That key was not there yet, add hash -> name mapping.
            thisModified = this.setIn(["byHash", md5(name)], name);
        }
        // Add data to map.
        return thisModified.setIn(["byName", name], data);
    }

    updateByName(name, updater) {
        return this.updateIn(["byName", name], updater);
    }

    getNameByHash(hash) {
        return this.getIn(["byHash", hash]);
    }

    updateAll(nameAndDataList, merger) {
        const { byName } = this;
        let { byHash } = this;

        // First sort the room list by room name
        nameAndDataList.sort(([ name1 ], [ name2 ]) => {
            if (name1 < name2) {
                return -1;
            } else if (name1 > name2) {
                return 1;
            }
            return 0;
        });

        // Then build the new map.
        let newByName = Immutable.OrderedMap();

        for (const [ name, newData ] of nameAndDataList) {
            // Get the old room data.
            let data = byName.get(name);
            if (!data) {
                // Add the hash -> name mapping.
                byHash = byHash.set(md5(name), name);
            }
            // Merge the old data and the new data using the provided function.
            const mergedData = merger(newData, data);
            // Insert that in the new room map.
            newByName = newByName.set(name, mergedData);
        }

        return new OrderedMap({ byName: newByName, byHash });
    }
}

export default () => new OrderedMap();
