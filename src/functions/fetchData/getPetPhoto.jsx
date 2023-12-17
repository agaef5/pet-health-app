import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase-config";

export const getPhoto = async (photoPath) => {
  try {
    const photoUrl = await getDownloadURL(ref(storage, photoPath));
    return photoUrl;
  } catch (error) {
    return null;
  }
};
