import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase-config";
import placeholderUrl from "../../assets/placeholder.png";

export const getPhoto = async (photoPath) => {
  try {
    const photoUrl = await getDownloadURL(ref(storage, photoPath));
    return photoUrl;
  } catch (error) {
    return placeholderUrl;
  }
};
