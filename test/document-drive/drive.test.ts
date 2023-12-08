/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from '@acaldas/powerhouse';

import utils from '../../document-models/document-drive/gen/utils';
import { z } from '../../document-models/document-drive/gen/schema';
import { reducer } from '../../document-models/document-drive/gen/reducer';
import * as creators from '../../document-models/document-drive/gen/drive/creators';
import { DocumentDriveDocument } from '../../document-models/document-drive/gen/types';

describe('Drive Operations', () => {
    let document: DocumentDriveDocument;

    beforeEach(() => {
        document = utils.createDocument();
    });

    it('should handle setDriveName operation', () => {
        const input = generateMock(z.SetDriveNameInputSchema());
        const updatedDocument = reducer(document, creators.setDriveName(input));

        expect(updatedDocument.operations).toHaveLength(1);
        expect(updatedDocument.operations[0].type).toBe('SET_DRIVE_NAME');
        expect(updatedDocument.operations[0].input).toStrictEqual(input);
        expect(updatedDocument.operations[0].index).toEqual(0);
    });
});