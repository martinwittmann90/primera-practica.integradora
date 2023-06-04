import mongoose from "mongoose";

class MongoClass {
    constructor ( collectionName, docSchema ) {
        this.collection = mongoose.model(collectionName, docSchema);
    }
    async getAll() {
        try {
            const all = await this.collection.find({});
            return all;
        } catch (err) {
            throw new Error (err);
        }
    }
    async getOne (id) {
        try {
            const one = await this.collection.findById(id);
            return one;
        } catch {
            throw new Error (err);
        }
    }
    async create(doc) {
        console.log(doc);
    try {
        const newDoc = await this.collection.create(doc);
        return newDoc;
    } catch (err) {
        throw new Error (err);
    }
}
    async update(id, doc) {
        try {
        await this.collection.findByIdAndUpdate(id, doc);
        const docUpdate = await this.collection.findById(id);
        return docUpdate;
    } catch (err) {
        throw new Error (err);
    }
}
    async delete (id) {
        try {
            const deleteDoc = await this.collection.findByIdAndDelete(id);
            return deleteDoc;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default MongoClass;