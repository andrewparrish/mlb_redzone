import { Id } from '../types/id.type';

export class SavableModel {
    static className(): string {
        return 'model';
    }

    static class(): any {
        return this;
    }

    static uniqueId(id: Id): string {
        return `${this.className().toString()}_${id}`;
    }

    static findById(id): Promise {
        const uniqueId = this.uniqueId(id);
        const model = this.class();
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

    save(afterSave): void {
        chrome.storage.local.set(this.asHash(), afterSave);
    }
}