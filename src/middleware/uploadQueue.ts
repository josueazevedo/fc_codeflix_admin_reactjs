import { createListenerMiddleware } from "@reduxjs/toolkit";
import { updateVideo } from "../features/uploads/uploadThunk";
import { addUpload } from "../features/uploads/uploadSlice";

const uploadQueue = createListenerMiddleware();

uploadQueue.startListening({
  actionCreator: addUpload,
  effect: async (action, store) => {
    await store.dispatch(updateVideo(action.payload));
  },
});

export { uploadQueue };
