import { Id } from '../types/id.type';

export class SavableModel {
    static className(): string {
        return 'model';
    }

    static klass(): any {
        return this;
    }

    static uniqueId(id: Id): string {
        return `${this.className().toString()}_${id}`;
    }

    static findById(id): Promise<any> {
        const uniqueId = this.uniqueId(id);
        const model = this.klass();
        return new Promise((resolve, _reject) => {
            chrome.storage.local.get([uniqueId], (result) => {
                let data = result[uniqueId];
                if (data) {
                    resolve(new model(data));
                } else {
                    resolve(null);
                }
            });
        });
    }

    static findAllById(ids: Array<Id>): Promise<any> {
        return Promise.all(ids.map(id => this.findById(id)));
    }

    static find(ids: Id | Array<Id>): Promise<any> {
        if (typeof ids === "object") {
            return this.findAllById(ids)
        }  else { 
            return this.findById(ids)
        };
    }

    asHash(): any {
        return this;
    }

    save(uniqueId, afterSave = null): void {
        const data = { [uniqueId]: this.asHash() };
        chrome.storage.local.set(data, afterSave);
    }
}
