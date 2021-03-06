import fs from 'fs';
import { remote } from 'electron';
import { exportVaultToCSV } from '@buttercup/exporter';
import { getArchive } from './archive';

const { dialog } = remote;
const currentWindow = remote.getCurrentWindow();

export function exportVaultToCSVAndSave(archiveId) {
  const archive = getArchive(archiveId);
  if (!archive) {
    throw new Error(`No archive with ID ${archiveId} has been found.`);
  }
  const fileName = dialog.showSaveDialogSync(currentWindow, {
    filters: [
      {
        name: 'Buttercup Export File',
        extensions: ['csv']
      }
    ]
  });
  if (!fileName) {
    return;
  }

  return exportVaultToCSV(archive).then(csv => {
    fs.writeFileSync(fileName, csv, {
      encoding: 'utf8'
    });
  });
}
