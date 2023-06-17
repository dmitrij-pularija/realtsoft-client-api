const { getWordList } = require("../models/lingvo/operations");

// const get = async (req) => {
//   const {
//     params: { category },
//     query: { search, age, gender, page, perpage },
//   } = req;
//   if (category === "favorite")
//     return await getFavoriteByOwner({
//       _id: req.user._id,
//       category,
//       search,
//       age,
//       gender,
//       page,
//       perpage,
//     });
//   if (category === "own")
//     return await getNoticeByOwnerId({
//       _id: req.user._id,
//       category,
//       search,
//       age,
//       gender,
//       page,
//       perpage,
//     });
//   return await getNoticeByCategory({
//     category,
//     search,
//     age,
//     gender,
//     page,
//     perpage,
//   });
// };

// const get = async ({ params: { id }, user: { _id } }) =>
//   await getWordList(id, _id);
const get = async ({ query: { prefix, srcLang, pageSize }}) => await getWordList(prefix, srcLang, pageSize);


module.exports = { get };