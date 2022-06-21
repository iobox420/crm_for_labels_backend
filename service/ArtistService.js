const Artist = require("../models-old/Artist.js");
const { models } = require("../models/models-export.js");
const ApiError = require("../exceptions/ApiError.js");

class ArtistService {
  static async getAboutMe(id_user) {
    return models.artists.findOne({
      where: {
        fk_id_user: id_user,
      },
    });
  }
  static async getArtists() {
    return Artist.getAll();
  }

  static async putArtist(puttedArtist) {
    try {
      const { id_artist_contract } = puttedArtist;
      delete puttedArtist.id_artist_contract;
      delete puttedArtist.fk_id_user;
      const artist = await models.artists.update(puttedArtist, {
        where: {
          id_artist_contract: id_artist_contract,
        },
      });
      if (artist[0] === 1) {
        return true;
      } else {
        throw ApiError.DatabaseError("No post has been updated");
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ArtistService;
