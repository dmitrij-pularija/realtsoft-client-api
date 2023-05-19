const NoticeModel = require("./schemas");
const HttpError = require("../../utilities/httpError");
const filterNotices = require("../../utilities/filter");

const addNotice = async ({ body, user: { _id } }) =>
  await NoticeModel.create({ ...body, owner: _id });

  const getFavoriteByOwner = async ({_id , search , age , gender}) => {
    // console.log(_id, search, age, gender);
    const filter = filterNotices({_id ,category: "", search , age , gender});
    // console.log(filter);
  return await NoticeModel.find(filter);
}
  // await NoticeModel.find({ owner: _id, favorite: { $in: [_id] }});

const addNoticeToFavorite = async (id, _id) =>{
  const dubl = await NoticeModel.findOne({
    _id: id,
    favorite: { $in: [_id] }
  });

  if (dubl) throw HttpError(409, `Notice with id:${id} is already in favorites`);
  return await NoticeModel.findOneAndUpdate({ _id: id }, { $push: { favorite: _id } }, { new: true, });
}
const deleteNoticeFromFavorite = async (id, _id) => 
  await NoticeModel.findOneAndUpdate(
    { _id: id, favorite: { $in: [_id] } },
    { $pull: { favorite: _id } },
    { new: true }
  );

const getOneNotice = async ({ id }) => await NoticeModel.findById(id);
const getNoticeCategory = async ({ query: { category, search, age, gender } }) => {
  const conditions = {
    category: decodeURIComponent(category),
  };

  if (search) {
    conditions.$or = [
      { title: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { name: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { breed: { $regex: new RegExp(decodeURIComponent(search), "i") } },
      { comments: { $regex: new RegExp(decodeURIComponent(search), "i") } },
    ];
  }
  
  if (age) {
    const today = new Date();

    if (age === "1") {
      conditions.birthday = {
        $gte: new Date(today.getFullYear() - 2, today.getMonth(), today.getDate()).toLocaleDateString("ru-RU"),
        $lt: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).toLocaleDateString("ru-RU"),
      };
    } else if (age === "2") {
      conditions.birthday = {
        $gte: new Date(today.getFullYear() - 3, today.getMonth(), today.getDate()).toLocaleDateString("ru-RU"),
        $lt: new Date(today.getFullYear() - 2, today.getMonth(), today.getDate()).toLocaleDateString("ru-RU"),
      };
    } else if (age === "3-12") {
      conditions.birthday = {
        $gte: new Date(today.getFullYear(), today.getMonth() - 12, today.getDate()).toLocaleDateString("ru-RU"),
        $lt: new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()).toLocaleDateString("ru-RU"),
      };
    }
  }

  if (gender) {
    conditions.sex = { $regex: new RegExp(gender, "i") };
  }

  return await NoticeModel.find(conditions);  
};
// const getNoticeCategory = async ({ query: { category } }) =>
//   await NoticeModel.find({ category: decodeURIComponent(category) });
const getNoticeByOwnerId = async ({_id , search , age , gender}) =>
  await NoticeModel.find(filterNotices({_id ,category: "", search , age , gender}));
const deleteNotice = async (id, user) =>
  await NoticeModel.findOneAndRemove({ owner: user._id, _id: id });

module.exports = {
  addNotice,
  getFavoriteByOwner,
  addNoticeToFavorite,
  deleteNoticeFromFavorite,
  getNoticeCategory,
  // getNoticeByTitle,
  getNoticeByOwnerId,
  getOneNotice,
  deleteNotice,
};