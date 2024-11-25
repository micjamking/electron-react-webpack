import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  // Expose any APIs you need here
});