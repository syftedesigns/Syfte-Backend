import { ObjectDocument } from './docs.class';
import { ObjectSoluclicProvider } from './providers.class';
export class LegalObject {
    constructor (
        public doc: ObjectDocument,
        public client: ObjectSoluclicProvider
    ) {}
}
