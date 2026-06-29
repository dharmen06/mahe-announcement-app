import Announcement from "../models/Announcement.js";
import { saveMetafield } from "../services/metafield.server.js";

export const saveAnnouncement =
  async (text, admin, shop) => {
    const announcement =
      await Announcement.create({
        text,
      });

    await saveMetafield(
      admin,
      shop,
      text
    );

    return announcement;
  };