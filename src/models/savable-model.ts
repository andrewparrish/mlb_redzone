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
            chrome.storage.local.get(uniqueId, (result) => {
                let data = result[uniqueId];
                if (data) {
                    resolve(new model(data));
                } else {
                    resolve(null);
                }
            });
        });
    }

    asHash(): any {
        return this;
    }

    save(afterSave = null): void {
        chrome.storage.local.set(this.asHash(), afterSave);
    }
}
