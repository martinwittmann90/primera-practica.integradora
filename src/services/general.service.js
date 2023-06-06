import mongoose from "mongoose";

class MongoClass {
    constructor ( collectionName, docSchema ) {
        this.collection = mongoose.model(collectionName, docSchema);
    }
    async getAllItem() {
        try {
            const all = await this.collection.find({}).lean();
            return all;
        } catch (err) {
            throw new Error (err);
        }
    }
    async getOneItem (id) {
        try {
            const one = await this.collection.findById(id).lean();
            return one;
        } catch {
            throw new Error (err);
        }
    }
    async createItem(doc) {
        console.log(doc);
    try {
        const newDoc = await this.collection.create(doc);
        return newDoc;
    } catch (err) {
        throw new Error (err);
    }
}
    async updateItem(id, doc) {
        try {
        await this.collection.findByIdAndUpdate(id, doc);
        const docUpdate = await this.collection.findById(id);
        return docUpdate;
    } catch (err) {
        throw new Error (err);
    }
}
    async deleteItem (id) {
        try {
            const deleteDoc = await this.collection.findByIdAndDelete(id);
            return deleteDoc;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default MongoClass;