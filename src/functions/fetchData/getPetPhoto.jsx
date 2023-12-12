import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase-config";

export const getPhoto = async (photoPath) => {
  try {
    const photoUrl = await getDownloadURL(ref(storage, photoPath));
    return photoUrl;
  } catch (error) {
    // if no photo is found, return placeholder
    const placeholderUrl = await getDownloadURL(
      ref(storage, "placeholder.png")
    );
    return placeholderUrl;
  }
};
